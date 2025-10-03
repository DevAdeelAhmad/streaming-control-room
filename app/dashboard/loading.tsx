export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header Skeleton */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-8 w-64 bg-white/10 rounded animate-pulse"></div>
              <div className="h-4 w-48 bg-white/10 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-24 bg-white/10 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Skeletons */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-white/10 rounded animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded w-5/6 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Start Guide Skeleton */}
        <div className="mt-12 bg-blue-500/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
          <div className="h-6 w-48 bg-white/10 rounded animate-pulse mb-4"></div>
          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-5 bg-white/10 rounded animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded w-4/5 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

