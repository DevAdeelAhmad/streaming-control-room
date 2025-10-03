'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Theme } from '@/types/database';
import ThemeCard from '@/components/Themes/ThemeCard';

export default function ThemesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchThemes();
    }
  }, [status]);

  async function fetchThemes() {
    try {
      const response = await fetch('/api/themes');
      if (response.ok) {
        const data = await response.json();
        setThemes(data.themes || []);
      }
    } catch (error) {
      console.error('Failed to fetch themes:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteTheme(themeId: string) {
    if (!confirm('Are you sure you want to delete this theme?')) {
      return;
    }

    try {
      const response = await fetch(`/api/themes/${themeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setThemes(themes.filter((t) => t.id !== themeId));
      }
    } catch (error) {
      console.error('Failed to delete theme:', error);
      alert('Failed to delete theme');
    }
  }

  function loadTheme(theme: Theme) {
    // Store theme in localStorage for control panel to use
    localStorage.setItem('selectedTheme', JSON.stringify(theme));
    alert('Theme selected! Open a control panel to apply it.');
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gray-400 hover:text-white mb-2 flex items-center gap-2"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-white">Theme Gallery</h1>
              <p className="text-sm text-gray-300 mt-1">
                Manage your saved overlay themes
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Info Banner */}
        <div className="mb-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
          <p className="text-sm text-blue-200">
            💡 <strong>Tip:</strong> Save themes from the Control Panel, then load them here or directly in the control panel!
          </p>
        </div>

        {/* Themes Grid */}
        {themes.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No Themes Yet
            </h3>
            <p className="text-gray-400 mb-6">
              Create your first theme in the Control Panel
            </p>
            <button
              onClick={() => router.push('/dashboard/playout')}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition font-medium"
            >
              Go to Playouts
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                onLoad={loadTheme}
                onDelete={deleteTheme}
              />
            ))}
          </div>
        )}

        {/* How to Use */}
        <div className="mt-12 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">
            How to Use Themes
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex gap-3">
              <span className="text-purple-400 font-bold">1.</span>
              <p>Open a Control Panel for any playout window</p>
            </div>
            <div className="flex gap-3">
              <span className="text-purple-400 font-bold">2.</span>
              <p>Design your overlay with text and images</p>
            </div>
            <div className="flex gap-3">
              <span className="text-purple-400 font-bold">3.</span>
              <p>Click &quot;Save as Theme&quot; in the control panel</p>
            </div>
            <div className="flex gap-3">
              <span className="text-purple-400 font-bold">4.</span>
              <p>Name your theme and add a description</p>
            </div>
            <div className="flex gap-3">
              <span className="text-purple-400 font-bold">5.</span>
              <p>Load themes anytime from here or the control panel!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

