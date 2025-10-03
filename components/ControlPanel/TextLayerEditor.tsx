'use client';

import { TextLayer } from '@/types/playout';
import { useState } from 'react';

interface TextLayerEditorProps {
  layers: TextLayer[];
  selectedLayerId: string | null;
  onSelectLayer: (id: string) => void;
  onAddLayer: () => void;
  onUpdateLayer: (id: string, updates: Partial<TextLayer>) => void;
  onRemoveLayer: (id: string) => void;
}

export default function TextLayerEditor({
  layers,
  selectedLayerId,
  onSelectLayer,
  onAddLayer,
  onUpdateLayer,
  onRemoveLayer,
}: TextLayerEditorProps) {
  const selectedLayer = layers.find((l) => l.id === selectedLayerId);

  const fonts = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Verdana',
    'Georgia',
    'Palatino',
    'Garamond',
    'Comic Sans MS',
    'Impact',
  ];

  const fontWeights = [
    { value: 'normal', label: 'Normal' },
    { value: 'bold', label: 'Bold' },
    { value: '300', label: 'Light' },
    { value: '600', label: 'Semi Bold' },
    { value: '900', label: 'Black' },
  ];

  return (
    <div className="space-y-4">
      {/* Add Button */}
      <button
        onClick={onAddLayer}
        className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
      >
        + Add Text Layer
      </button>

      {/* Layers List */}
      {layers.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="mb-2">No text layers yet</p>
          <p className="text-sm">Click "Add Text Layer" to get started</p>
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
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-white font-medium truncate">{layer.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {layer.style.fontSize}px • {layer.style.fontFamily}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveLayer(layer.id);
                  }}
                  className="ml-2 px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
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
          <h3 className="text-lg font-semibold text-white mb-4">Edit Text Layer</h3>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content
            </label>
            <textarea
              value={selectedLayer.content}
              onChange={(e) =>
                onUpdateLayer(selectedLayer.id, { content: e.target.value })
              }
              className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              rows={3}
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

          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Font Family
            </label>
            <select
              value={selectedLayer.style.fontFamily}
              onChange={(e) =>
                onUpdateLayer(selectedLayer.id, {
                  style: { ...selectedLayer.style, fontFamily: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
            >
              {fonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Font Size: {selectedLayer.style.fontSize}px
            </label>
            <input
              type="range"
              min="12"
              max="200"
              value={selectedLayer.style.fontSize}
              onChange={(e) =>
                onUpdateLayer(selectedLayer.id, {
                  style: {
                    ...selectedLayer.style,
                    fontSize: parseInt(e.target.value),
                  },
                })
              }
              className="w-full"
            />
          </div>

          {/* Font Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Font Weight
            </label>
            <select
              value={selectedLayer.style.fontWeight || 'normal'}
              onChange={(e) =>
                onUpdateLayer(selectedLayer.id, {
                  style: { ...selectedLayer.style, fontWeight: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
            >
              {fontWeights.map((weight) => (
                <option key={weight.value} value={weight.value}>
                  {weight.label}
                </option>
              ))}
            </select>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Text Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={selectedLayer.style.color}
                onChange={(e) =>
                  onUpdateLayer(selectedLayer.id, {
                    style: { ...selectedLayer.style, color: e.target.value },
                  })
                }
                className="w-20 h-10 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={selectedLayer.style.color}
                onChange={(e) =>
                  onUpdateLayer(selectedLayer.id, {
                    style: { ...selectedLayer.style, color: e.target.value },
                  })
                }
                className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Text Shadow */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Text Shadow (CSS)
            </label>
            <input
              type="text"
              value={selectedLayer.style.textShadow || ''}
              onChange={(e) =>
                onUpdateLayer(selectedLayer.id, {
                  style: { ...selectedLayer.style, textShadow: e.target.value },
                })
              }
              placeholder="2px 2px 4px rgba(0,0,0,0.8)"
              className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
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

