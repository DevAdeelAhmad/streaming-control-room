'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { PlayoutConfig, TextLayer, ImageLayer } from '@/types/playout';
import { Theme } from '@/types/database';
import TextLayerEditor from '@/components/ControlPanel/TextLayerEditor';
import ImageLayerEditor from '@/components/ControlPanel/ImageLayerEditor';
import LivePreview from '@/components/ControlPanel/LivePreview';
import { io, Socket } from 'socket.io-client';

export default function ControlPanelPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const playoutId = params.id as string;

  const [config, setConfig] = useState<PlayoutConfig>({
    id: playoutId,
    textLayers: [],
    imageLayers: [],
    layoutSettings: {
      width: 1920,
      height: 1080,
      backgroundColor: '#000000',
    },
  });

  const [activeTab, setActiveTab] = useState<'text' | 'images' | 'layout'>('text');
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveThemeModal, setShowSaveThemeModal] = useState(false);
  const [showLoadThemeModal, setShowLoadThemeModal] = useState(false);
  const [themeName, setThemeName] = useState('');
  const [themeDescription, setThemeDescription] = useState('');
  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Initialize Socket.IO
  useEffect(() => {
    const socketInstance = io({
      path: '/api/socket',
      addTrailingSlash: false,
    });

    socketInstance.on('connect', () => {
      console.log('Control panel connected to WebSocket');
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Control panel disconnected from WebSocket');
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Load initial configuration
  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await fetch(`/api/playout/${playoutId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.config) {
            setConfig(data.config);
          }
        }
      } catch (error) {
        console.error('Failed to load config:', error);
      }
    }

    loadConfig();
  }, [playoutId]);

  // Broadcast config updates to playout window
  function broadcastUpdate(updatedConfig: PlayoutConfig) {
    if (socket && isConnected) {
      socket.emit('broadcast-to-playout', {
        playoutId,
        data: {
          type: 'config_update',
          data: updatedConfig,
          timestamp: Date.now(),
        },
      });
    }
  }

  // Update configuration and broadcast
  function updateConfig(newConfig: Partial<PlayoutConfig>) {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    broadcastUpdate(updated);
  }

  // Text Layer Management
  function addTextLayer() {
    const newLayer: TextLayer = {
      id: `text-${Date.now()}`,
      content: 'New Text',
      position: { x: 100, y: 100 },
      style: {
        fontSize: 48,
        fontFamily: 'Arial',
        color: '#ffffff',
        fontWeight: 'bold',
      },
      zIndex: config.textLayers.length + 1,
      visible: true,
    };

    updateConfig({
      textLayers: [...config.textLayers, newLayer],
    });
    setSelectedLayerId(newLayer.id);
  }

  function updateTextLayer(id: string, updates: Partial<TextLayer>) {
    const updatedLayers = config.textLayers.map((layer) =>
      layer.id === id ? { ...layer, ...updates } : layer
    );
    updateConfig({ textLayers: updatedLayers });
  }

  function removeTextLayer(id: string) {
    updateConfig({
      textLayers: config.textLayers.filter((layer) => layer.id !== id),
    });
    if (selectedLayerId === id) {
      setSelectedLayerId(null);
    }
  }

  // Image Layer Management
  function addImageLayer(url: string) {
    const newLayer: ImageLayer = {
      id: `image-${Date.now()}`,
      url,
      position: { x: 50, y: 50 },
      dimensions: { width: 200, height: 200 },
      rotation: 0,
      opacity: 1,
      zIndex: config.imageLayers.length + 1,
      visible: true,
    };

    updateConfig({
      imageLayers: [...config.imageLayers, newLayer],
    });
    setSelectedLayerId(newLayer.id);
  }

  function updateImageLayer(id: string, updates: Partial<ImageLayer>) {
    const updatedLayers = config.imageLayers.map((layer) =>
      layer.id === id ? { ...layer, ...updates } : layer
    );
    updateConfig({ imageLayers: updatedLayers });
  }

  function removeImageLayer(id: string) {
    updateConfig({
      imageLayers: config.imageLayers.filter((layer) => layer.id !== id),
    });
    if (selectedLayerId === id) {
      setSelectedLayerId(null);
    }
  }

  // Load themes
  useEffect(() => {
    loadThemes();
  }, []);

  async function loadThemes() {
    try {
      const response = await fetch('/api/themes');
      if (response.ok) {
        const data = await response.json();
        setThemes(data.themes || []);
      }
    } catch (error) {
      console.error('Failed to load themes:', error);
    }
  }

  // Save configuration to database
  async function saveConfiguration() {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/playout/${playoutId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        alert('Configuration saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save configuration:', error);
      alert('Failed to save configuration');
    } finally {
      setIsSaving(false);
    }
  }

  // Save as theme
  async function saveAsTheme() {
    if (!themeName.trim()) {
      alert('Please enter a theme name');
      return;
    }

    try {
      const response = await fetch('/api/themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: themeName,
          description: themeDescription,
          configuration: {
            textLayers: config.textLayers,
            imageLayers: config.imageLayers,
            layoutSettings: config.layoutSettings,
          },
        }),
      });

      if (response.ok) {
        alert('Theme saved successfully!');
        setShowSaveThemeModal(false);
        setThemeName('');
        setThemeDescription('');
        loadThemes();
      }
    } catch (error) {
      console.error('Failed to save theme:', error);
      alert('Failed to save theme');
    }
  }

  // Load theme
  function loadTheme(theme: Theme) {
    const themeConfig = typeof theme.configuration === 'string'
      ? JSON.parse(theme.configuration)
      : theme.configuration;

    updateConfig({
      textLayers: themeConfig.textLayers || [],
      imageLayers: themeConfig.imageLayers || [],
      layoutSettings: themeConfig.layoutSettings || config.layoutSettings,
    });

    setShowLoadThemeModal(false);
    alert(`Theme "${theme.name}" loaded successfully!`);
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <button
                onClick={() => router.push('/dashboard/playout')}
                className="text-gray-400 hover:text-white mb-2 flex items-center gap-2"
              >
                ← Back to Playouts
              </button>
              <h1 className="text-2xl font-bold text-white">Control Panel</h1>
              <p className="text-sm text-gray-300 mt-1">
                Playout ID: <code className="bg-black/30 px-2 py-1 rounded">{playoutId}</code>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  isConnected
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-red-500/20 text-red-400 border border-red-500/50'
                }`}
              >
                {isConnected ? '● Connected' : '○ Disconnected'}
              </div>
              <button
                onClick={() => setShowSaveThemeModal(true)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
              >
                🎨 Save Theme
              </button>
              <button
                onClick={() => setShowLoadThemeModal(true)}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition font-medium"
              >
                📂 Load Theme
              </button>
              <button
                onClick={saveConfiguration}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : '💾 Save'}
              </button>
              <button
                onClick={() => window.open(`/playout/${playoutId}`, '_blank')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition font-medium"
              >
                🎥 Open Playout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Panel - Controls */}
        <div className="w-96 bg-black/20 backdrop-blur-lg border-r border-white/10 overflow-y-auto">
          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 px-4 py-3 font-medium transition ${
                activeTab === 'text'
                  ? 'bg-purple-600/20 text-purple-300 border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📝 Text
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`flex-1 px-4 py-3 font-medium transition ${
                activeTab === 'images'
                  ? 'bg-purple-600/20 text-purple-300 border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🖼️ Images
            </button>
            <button
              onClick={() => setActiveTab('layout')}
              className={`flex-1 px-4 py-3 font-medium transition ${
                activeTab === 'layout'
                  ? 'bg-purple-600/20 text-purple-300 border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🎨 Layout
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === 'text' && (
              <TextLayerEditor
                layers={config.textLayers}
                selectedLayerId={selectedLayerId}
                onSelectLayer={setSelectedLayerId}
                onAddLayer={addTextLayer}
                onUpdateLayer={updateTextLayer}
                onRemoveLayer={removeTextLayer}
              />
            )}

            {activeTab === 'images' && (
              <ImageLayerEditor
                layers={config.imageLayers}
                selectedLayerId={selectedLayerId}
                onSelectLayer={setSelectedLayerId}
                onAddLayer={addImageLayer}
                onUpdateLayer={updateImageLayer}
                onRemoveLayer={removeImageLayer}
              />
            )}

            {activeTab === 'layout' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={config.layoutSettings.backgroundColor || '#000000'}
                    onChange={(e) =>
                      updateConfig({
                        layoutSettings: {
                          ...config.layoutSettings,
                          backgroundColor: e.target.value,
                        },
                      })
                    }
                    className="w-full h-12 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <p className="text-sm text-blue-200">
                    💡 Tip: Use transparent backgrounds for overlays in OBS!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="flex-1 p-4 overflow-auto">
          <LivePreview config={config} />
        </div>
      </div>

      {/* Save Theme Modal */}
      {showSaveThemeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full mx-4 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Save as Theme</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Theme Name *
                </label>
                <input
                  type="text"
                  value={themeName}
                  onChange={(e) => setThemeName(e.target.value)}
                  placeholder="My Awesome Theme"
                  className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description (optional)
                </label>
                <textarea
                  value={themeDescription}
                  onChange={(e) => setThemeDescription(e.target.value)}
                  placeholder="Describe your theme..."
                  className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={saveAsTheme}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                >
                  Save Theme
                </button>
                <button
                  onClick={() => {
                    setShowSaveThemeModal(false);
                    setThemeName('');
                    setThemeDescription('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Load Theme Modal */}
      {showLoadThemeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-2xl w-full mx-4 border border-white/10 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">Load Theme</h3>
            {themes.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="mb-2">No themes saved yet</p>
                <p className="text-sm">Save your first theme to see it here!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-500/50 transition cursor-pointer"
                    onClick={() => loadTheme(theme)}
                  >
                    <h4 className="font-semibold text-white mb-1">{theme.name}</h4>
                    {theme.description && (
                      <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                        {theme.description}
                      </p>
                    )}
                    <div className="flex gap-2 text-xs text-gray-500">
                      <span>
                        {JSON.parse(theme.configuration).textLayers?.length || 0} text
                      </span>
                      <span>•</span>
                      <span>
                        {JSON.parse(theme.configuration).imageLayers?.length || 0} images
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => setShowLoadThemeModal(false)}
              className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

