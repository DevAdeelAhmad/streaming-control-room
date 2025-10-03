'use client';

import { Theme } from '@/types/database';
import Image from 'next/image';

interface ThemeCardProps {
  theme: Theme;
  onLoad: (theme: Theme) => void;
  onDelete: (themeId: string) => void;
}

export default function ThemeCard({ theme, onLoad, onDelete }: ThemeCardProps) {
  const config = typeof theme.configuration === 'string' 
    ? JSON.parse(theme.configuration) 
    : theme.configuration;

  const textCount = config.textLayers?.length || 0;
  const imageCount = config.imageLayers?.length || 0;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:border-purple-500/50 transition">
      {/* Thumbnail or Placeholder */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden mb-3">
        {theme.thumbnail_url ? (
          <Image
            src={theme.thumbnail_url}
            alt={theme.name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🎨</div>
              <p className="text-xs text-gray-400">No Preview</p>
            </div>
          </div>
        )}
        {theme.is_default && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
            Default
          </div>
        )}
      </div>

      {/* Theme Info */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-white truncate mb-1">
          {theme.name}
        </h3>
        {theme.description && (
          <p className="text-sm text-gray-400 line-clamp-2 mb-2">
            {theme.description}
          </p>
        )}
        <div className="flex gap-3 text-xs text-gray-400">
          <span>📝 {textCount} text</span>
          <span>🖼️ {imageCount} images</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onLoad(theme)}
          className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition text-sm font-medium"
        >
          Load Theme
        </button>
        <button
          onClick={() => onDelete(theme.id)}
          className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm font-medium"
        >
          🗑️
        </button>
      </div>

      {/* Metadata */}
      <div className="mt-2 text-xs text-gray-500">
        Updated {new Date(theme.updated_at).toLocaleDateString()}
      </div>
    </div>
  );
}

