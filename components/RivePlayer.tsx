'use client';

import { useEffect, useRef, useState } from 'react';
import { useRive, UseRiveParameters, Layout, Fit, Alignment } from '@rive-app/react-canvas';

interface RivePlayerProps {
  src: string;
  width: number;
  height: number;
  autoplay?: boolean;
  stateMachines?: string | string[];
  animations?: string | string[];
}

export default function RivePlayer({
  src,
  width,
  height,
  autoplay = true,
  stateMachines,
  animations,
}: RivePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  const riveParams: UseRiveParameters = {
    src,
    autoplay,
    stateMachines,
    animations,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    onLoadError: (err) => {
      console.error('Failed to load Rive file:', err);
      setError('Failed to load animation');
    },
  };

  const { RiveComponent } = useRive(riveParams);

  if (error) {
    return (
      <div
        className="flex items-center justify-center bg-gray-900"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div className="text-red-400 text-center">
          <div className="text-xl font-semibold mb-2">Animation Error</div>
          <div className="text-sm">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <RiveComponent />
    </div>
  );
}

