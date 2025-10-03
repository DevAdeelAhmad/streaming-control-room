'use client';

import { Asset } from '@/types/database';
import Image from 'next/image';

interface AssetCardProps {
  asset: Asset;
  onSelect?: (asset: Asset) => void;
  onDelete?: (assetId: string) => void;
  selectable?: boolean;
}

export default function AssetCard({
  asset,
  onSelect,
  onDelete,
  selectable = false,
}: AssetCardProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div
      className={`bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 hover:border-purple-500/50 transition ${
        selectable ? 'cursor-pointer' : ''
      }`}
      onClick={() => selectable && onSelect && onSelect(asset)}
    >
      {/* Image Preview */}
      <div className="relative w-full aspect-square bg-gray-800 rounded-lg overflow-hidden mb-2">
        <Image
          src={asset.file_path}
          alt={asset.original_filename}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Asset Info */}
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-white truncate" title={asset.original_filename}>
          {asset.original_filename}
        </h4>
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>{formatFileSize(asset.file_size)}</span>
          <span className="uppercase">{asset.file_type}</span>
        </div>
      </div>

      {/* Actions */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(asset.id);
          }}
          className="mt-2 w-full px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-medium transition"
        >
          🗑️ Delete
        </button>
      )}
    </div>
  );
}

