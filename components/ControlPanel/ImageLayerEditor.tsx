'use client';

import { ImageLayer } from '@/types/playout';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Asset } from '@/types/database';
import FileUploader from '@/components/Assets/FileUploader';

interface ImageLayerEditorProps {
  layers: ImageLayer[];
  selectedLayerId: string | null;
  onSelectLayer: (id: string) => void;
  onAddLayer: (url: string) => void;
  onUpdateLayer: (id: string, updates: Partial<ImageLayer>) => void;
  onRemoveLayer: (id: string) => void;
}

export default function ImageLayerEditor({
  layers,
  selectedLayerId,
  onSelectLayer,
  onAddLayer,
  onUpdateLayer,
  onRemoveLayer,
}: ImageLayerEditorProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [showAssetPicker, setShowAssetPicker] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const selectedLayer = layers.find((l) => l.id === selectedLayerId);

  // Load assets
  useEffect(() => {
    loadAssets();
  }, []);

  async function loadAssets() {
    try {
      const response = await fetch('/api/assets');
      if (response.ok) {
        const data = await response.json();
        setAssets(data.assets || []);
      }
    } catch (error) {
      console.error('Failed to load assets:', error);
    }
  }

  function handleAddImage() {
    if (imageUrl.trim()) {
      onAddLayer(imageUrl);
      setImageUrl('');
    }
  }

  function handleUploadSuccess(url: string) {
    onAddLayer(url);
    loadAssets();
  }

  function handleSelectAsset(asset: Asset) {
    onAddLayer(asset.file_path);
    setShowAssetPicker(false);
  }

  return (
    <div className="space-y-4">
      {/* Upload Section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Upload Image
        </label>
        <FileUploader onUploadSuccess={handleUploadSuccess} />
      </div>

      {/* Asset Picker */}
      {assets.length > 0 && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Or Choose from Library ({assets.length})
          </label>
          <button
            onClick={() => setShowAssetPicker(!showAssetPicker)}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
          >
            {showAssetPicker ? '✕ Close Library' : '📂 Browse Library'}
          </button>
          
          {showAssetPicker && (
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-2 bg-black/20 rounded-lg">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => handleSelectAsset(asset)}
                  className="relative aspect-square bg-gray-800 rounded cursor-pointer hover:ring-2 hover:ring-purple-500 transition"
                >
                  <Image
                    src={asset.file_path}
                    alt={asset.original_filename}
                    fill
                    className="object-cover rounded"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add by URL */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Or Add by URL
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.png"
            className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
            onKeyDown={(e) => e.key === 'Enter' && handleAddImage()}
          />
          <button
            onClick={handleAddImage}
            disabled={!imageUrl.trim()}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>

      {/* Layers List */}
      {layers.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="mb-2">No image layers yet</p>
          <p className="text-sm">Add an image URL above to get started</p>
        </div>
      ) : (
        <div className="space-y-2">
          {layers.map((layer) => (
            <div
              key={layer.id}
              onClick={() => onSelectLayer(layer.id)}
              className={`p-3 rounded-lg cursor-pointer transition ${
                selectedLayerId === layer.id
                  ? 'bg-purple-600/30 border-2 border-purple-500'
                  : 'bg-white/5 border-2 border-transparent hover:border-white/20'
              }`}
            >
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 bg-black/30 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={layer.url}
                    alt="Layer"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{layer.url}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {layer.dimensions.width}x{layer.dimensions.height}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveLayer(layer.id);
                  }}
                  className="ml-2 px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs flex-shrink-0"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Panel */}
      {selectedLayer && (
        <div className="mt-6 p-4 bg-white/5 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Edit Image Layer</h3>

          {/* Preview */}
          <div className="aspect-video bg-black/30 rounded-lg overflow-hidden flex items-center justify-center">
            <Image
              src={selectedLayer.url}
              alt="Preview"
              width={200}
              height={200}
              className="max-w-full max-h-full object-contain"
              unoptimized
            />
          </div>

          {/* Position */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                X Position
              </label>
              <input
                type="number"
                value={selectedLayer.position.x}
                onChange={(e) =>
                  onUpdateLayer(selectedLayer.id, {
                    position: {
                      ...selectedLayer.position,
                      x: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Y Position
              </label>
              <input
                type="number"
                value={selectedLayer.position.y}
                onChange={(e) =>
                  onUpdateLayer(selectedLayer.id, {
                    position: {
                      ...selectedLayer.position,
                      y: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Width
              </label>
              <input
                type="number"
                value={selectedLayer.dimensions.width}
                onChange={(e) =>
                  onUpdateLayer(selectedLayer.id, {
                    dimensions: {
                      ...selectedLayer.dimensions,
                      width: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Height
              </label>
              <input
                type="number"
                value={selectedLayer.dimensions.height}
                onChange={(e) =>
                  onUpdateLayer(selectedLayer.id, {
                    dimensions: {
                      ...selectedLayer.dimensions,
                      height: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Rotation */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Rotation: {selectedLayer.rotation || 0}°
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={selectedLayer.rotation || 0}
              onChange={(e) =>
                onUpdateLayer(selectedLayer.id, {
                  rotation: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>

          {/* Opacity */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Opacity: {Math.round((selectedLayer.opacity || 1) * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={(selectedLayer.opacity || 1) * 100}
              onChange={(e) =>
                onUpdateLayer(selectedLayer.id, {
                  opacity: parseInt(e.target.value) / 100,
                })
              }
              className="w-full"
            />
          </div>

          {/* Z-Index */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Layer Order (Z-Index)
            </label>
            <input
              type="number"
              value={selectedLayer.zIndex}
              onChange={(e) =>
                onUpdateLayer(selectedLayer.id, {
                  zIndex: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Visibility Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Visible</label>
            <button
              onClick={() =>
                onUpdateLayer(selectedLayer.id, {
                  visible: !selectedLayer.visible,
                })
              }
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedLayer.visible
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              {selectedLayer.visible ? '👁️ Visible' : '🚫 Hidden'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

