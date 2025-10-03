'use client';

import { TextLayer, ImageLayer } from '@/types/playout';
import Image from 'next/image';

interface DynamicOverlayProps {
  textLayers: TextLayer[];
  imageLayers: ImageLayer[];
}

export default function DynamicOverlay({
  textLayers,
  imageLayers,
}: DynamicOverlayProps) {
  // Sort layers by zIndex
  const sortedTextLayers = [...textLayers].sort((a, b) => a.zIndex - b.zIndex);
  const sortedImageLayers = [...imageLayers].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <>
      {/* Image Layers */}
      {sortedImageLayers.map((layer) => {
        if (layer.visible === false) return null;

        return (
          <div
            key={layer.id}
            className="absolute"
            style={{
              left: `${layer.position.x}px`,
              top: `${layer.position.y}px`,
              width: `${layer.dimensions.width}px`,
              height: `${layer.dimensions.height}px`,
              transform: layer.rotation ? `rotate(${layer.rotation}deg)` : undefined,
              opacity: layer.opacity !== undefined ? layer.opacity : 1,
              zIndex: layer.zIndex,
            }}
          >
            <Image
              src={layer.url}
              alt={`Layer ${layer.id}`}
              fill
              style={{ objectFit: 'contain' }}
              unoptimized
            />
          </div>
        );
      })}

      {/* Text Layers */}
      {sortedTextLayers.map((layer) => {
        if (layer.visible === false) return null;

        return (
          <div
            key={layer.id}
            className="absolute whitespace-pre-wrap"
            style={{
              left: `${layer.position.x}px`,
              top: `${layer.position.y}px`,
              fontSize: `${layer.style.fontSize}px`,
              fontFamily: layer.style.fontFamily,
              color: layer.style.color,
              fontWeight: layer.style.fontWeight || 'normal',
              textAlign: layer.style.textAlign || 'left',
              textShadow: layer.style.textShadow,
              letterSpacing: layer.style.letterSpacing,
              zIndex: layer.zIndex,
            }}
          >
            {layer.content}
          </div>
        );
      })}
    </>
  );
}

