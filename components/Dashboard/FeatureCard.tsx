'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  color: 'purple' | 'blue' | 'pink' | 'yellow';
}

const colorClasses = {
  purple: 'bg-purple-500/20 text-purple-400 hover:border-purple-500/50',
  blue: 'bg-blue-500/20 text-blue-400 hover:border-blue-500/50',
  pink: 'bg-pink-500/20 text-pink-400 hover:border-pink-500/50',
  yellow: 'bg-yellow-500/20 text-yellow-400 hover:border-yellow-500/50',
};

export default function FeatureCard({
  title,
  description,
  icon,
  href,
  color,
}: FeatureCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 ${colorClasses[color]} transition cursor-pointer`}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-12 h-12 ${colorClasses[color].split(' ')[0]} rounded-full flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      </div>
      <p className="text-sm text-green-400 font-medium">✅ Available Now!</p>
    </div>
  );
}

