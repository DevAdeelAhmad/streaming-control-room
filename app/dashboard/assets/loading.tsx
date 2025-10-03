export default function AssetsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header Skeleton */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-6 w-32 bg-white/10 rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-white/10 rounded animate-pulse"></div>
              <div className="h-4 w-56 bg-white/10 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upload Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
          <div className="h-6 w-40 bg-white/10 rounded animate-pulse mb-4"></div>
          <div className="h-48 bg-white/5 border-2 border-dashed border-white/20 rounded-xl animate-pulse"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse mb-2"></div>
              <div className="h-8 w-16 bg-white/10 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden"
            >
              {/* Image Skeleton */}
              <div className="aspect-video bg-white/5 animate-pulse"></div>
              
              {/* Info */}
              <div className="p-4 space-y-2">
                <div className="h-4 bg-white/10 rounded animate-pulse"></div>
                <div className="h-3 bg-white/10 rounded animate-pulse w-2/3"></div>
                <div className="flex gap-2 mt-3">
                  <div className="flex-1 h-8 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-8 w-8 bg-white/10 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

