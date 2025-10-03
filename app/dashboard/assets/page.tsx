'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Asset } from '@/types/database';
import AssetCard from '@/components/Assets/AssetCard';
import FileUploader from '@/components/Assets/FileUploader';

export default function AssetsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchAssets();
    }
  }, [status]);

  async function fetchAssets() {
    try {
      const response = await fetch('/api/assets');
      if (response.ok) {
        const data = await response.json();
        setAssets(data.assets || []);
      }
    } catch (error) {
      console.error('Failed to fetch assets:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteAsset(assetId: string) {
    if (!confirm('Are you sure you want to delete this asset?')) {
      return;
    }

    try {
      const response = await fetch(`/api/assets/${assetId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAssets(assets.filter((a) => a.id !== assetId));
      }
    } catch (error) {
      console.error('Failed to delete asset:', error);
      alert('Failed to delete asset');
    }
  }

  function handleUploadSuccess() {
    fetchAssets();
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

  const totalSize = assets.reduce((sum, asset) => sum + asset.file_size, 0);
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);

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
              <h1 className="text-2xl font-bold text-white">Asset Library</h1>
              <p className="text-sm text-gray-300 mt-1">
                Manage your uploaded images
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{assets.length}</div>
              <div className="text-sm text-gray-400">Assets ({totalSizeMB} MB)</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upload Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Upload New Asset</h2>
          <FileUploader onUploadSuccess={handleUploadSuccess} />
        </div>

        {/* Assets Grid */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Your Assets</h2>
          {assets.length === 0 ? (
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Assets Yet</h3>
              <p className="text-gray-400">Upload your first image above</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {assets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  onDelete={deleteAsset}
                />
              ))}
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-12 bg-blue-500/10 rounded-lg border border-blue-500/30 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">💡 Tips</h3>
          <ul className="space-y-2 text-sm text-blue-200">
            <li>• Use assets in the Control Panel Image Editor</li>
            <li>• Optimize images before uploading for best performance</li>
            <li>• PNG format supports transparency for overlays</li>
            <li>• Maximum file size: 10MB per image</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

