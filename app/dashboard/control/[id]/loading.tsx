export default function ControlPanelLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header Skeleton */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-6 w-32 bg-white/10 rounded animate-pulse"></div>
              <div className="h-8 w-64 bg-white/10 rounded animate-pulse"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-10 w-32 bg-white/10 rounded-lg animate-pulse"></div>
              <div className="h-10 w-32 bg-white/10 rounded-lg animate-pulse"></div>
              <div className="h-10 w-24 bg-white/10 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="max-w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Control Panel Section (Left) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Connection Status */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="h-5 w-48 bg-white/10 rounded animate-pulse"></div>
            </div>

            {/* Tabs */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
              <div className="flex border-b border-white/10 p-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-10 w-24 bg-white/10 rounded-lg animate-pulse mx-1"></div>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6 space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="h-5 w-32 bg-white/10 rounded animate-pulse"></div>
                    <div className="h-12 bg-white/10 rounded-lg animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview Section (Right) */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 sticky top-6">
              <div className="h-6 w-32 bg-white/10 rounded animate-pulse mb-4"></div>
              <div className="aspect-video bg-black/50 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

