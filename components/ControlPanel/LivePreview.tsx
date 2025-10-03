'use client';

import { PlayoutConfig } from '@/types/playout';
import DynamicOverlay from '@/components/DynamicOverlay';

interface LivePreviewProps {
  config: PlayoutConfig;
}

export default function LivePreview({ config }: LivePreviewProps) {
  // Scale factor to fit preview (1920x1080 scaled down)
  const scale = 0.5; // 50% scale for preview
  const previewWidth = config.layoutSettings.width * scale;
  const previewHeight = config.layoutSettings.height * scale;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Live Preview</h2>
        <p className="text-sm text-gray-400">
          Updates automatically as you make changes
        </p>
      </div>

      {/* Preview Container with Checkerboard Background */}
      <div className="relative bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
        {/* Checkerboard pattern for transparency visualization */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          }}
        />

        {/* Scaled Preview */}
        <div
          className="relative"
          style={{
            width: `${previewWidth}px`,
            height: `${previewHeight}px`,
            backgroundColor: config.layoutSettings.backgroundColor || '#000000',
            backgroundImage: config.layoutSettings.backgroundImage
              ? `url(${config.layoutSettings.backgroundImage})`
              : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {/* Scaled Overlays */}
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <DynamicOverlay
              textLayers={config.textLayers}
              imageLayers={config.imageLayers}
            />
          </div>
        </div>

        {/* Resolution Label */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {config.layoutSettings.width}x{config.layoutSettings.height}
        </div>
      </div>

      {/* Info Cards */}
      <div className="mt-6 grid grid-cols-3 gap-4 w-full max-w-2xl">
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10 text-center">
          <p className="text-2xl font-bold text-purple-400">
            {config.textLayers.length}
          </p>
          <p className="text-sm text-gray-400 mt-1">Text Layers</p>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10 text-center">
          <p className="text-2xl font-bold text-blue-400">
            {config.imageLayers.length}
          </p>
          <p className="text-sm text-gray-400 mt-1">Image Layers</p>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10 text-center">
          <p className="text-2xl font-bold text-green-400">
            {config.textLayers.length + config.imageLayers.length}
          </p>
          <p className="text-sm text-gray-400 mt-1">Total Layers</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30 max-w-2xl">
        <p className="text-sm text-blue-200">
          💡 <strong>Tip:</strong> Changes appear instantly in the preview and will update in OBS in real-time when you save!
        </p>
      </div>
    </div>
  );
}

