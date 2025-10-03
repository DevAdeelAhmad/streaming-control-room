'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PlayoutConfig } from '@/types/playout';
import RivePlayer from '@/components/RivePlayer';
import DynamicOverlay from '@/components/DynamicOverlay';
import { usePlayoutWebSocket } from '@/hooks/usePlayoutWebSocket';

export default function PlayoutWindow() {
  const params = useParams();
  const searchParams = useSearchParams();
  const playoutId = params.id as string;
  
  // OBS mode: transparent background, no dev indicators
  const obsMode = searchParams.get('obs') === 'true';
  const transparentBg = searchParams.get('transparent') === 'true';
  
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

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // WebSocket connection for real-time updates
  const { isConnected, lastMessage } = usePlayoutWebSocket(playoutId);

  // Fetch initial configuration
  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch(`/api/playout/${playoutId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.config) {
            setConfig(data.config);
          }
        }
      } catch (err) {
        console.error('Failed to fetch playout config:', err);
        setError('Failed to load configuration');
      } finally {
        setIsLoading(false);
      }
    }

    fetchConfig();
  }, [playoutId]);

  // Handle WebSocket updates
  useEffect(() => {
    if (lastMessage) {
      try {
        const update = JSON.parse(lastMessage);
        if (update.type === 'config_update' && update.data) {
          setConfig((prev) => ({
            ...prev,
            ...update.data,
          }));
        }
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
      }
    }
  }, [lastMessage]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <div className="text-white text-2xl">Loading playout window...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <div className="text-red-500 text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: `${config.layoutSettings.width}px`,
        height: `${config.layoutSettings.height}px`,
        backgroundColor: transparentBg 
          ? 'transparent' 
          : (config.layoutSettings.backgroundColor || '#000000'),
        backgroundImage: config.layoutSettings.backgroundImage
          ? `url(${config.layoutSettings.backgroundImage})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Connection Status Indicator (hidden in OBS mode) */}
      {!obsMode && process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 z-50">
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isConnected
                ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                : 'bg-red-500/20 text-red-400 border border-red-500/50'
            }`}
          >
            {isConnected ? '● Live' : '○ Disconnected'}
          </div>
        </div>
      )}

      {/* Rive Animation Layer */}
      {config.riveFile && (
        <RivePlayer
          src={config.riveFile}
          width={config.layoutSettings.width}
          height={config.layoutSettings.height}
        />
      )}

      {/* Dynamic Overlays (Text and Images) */}
      <DynamicOverlay
        textLayers={config.textLayers}
        imageLayers={config.imageLayers}
      />

      {/* Playout ID Display (development only, not in OBS mode) */}
      {!obsMode && process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-3 py-2 rounded font-mono">
          Playout ID: {playoutId}
        </div>
      )}
    </div>
  );
}

