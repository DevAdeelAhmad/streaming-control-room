'use client';

import { signOut } from 'next-auth/react';

interface DashboardHeaderProps {
  userName: string;
}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Streaming Control Room
            </h1>
            <p className="text-sm text-gray-300 mt-1">
              Welcome back, {userName}!
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}

