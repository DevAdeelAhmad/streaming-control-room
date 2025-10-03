export default function ThemesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header Skeleton */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-6 w-32 bg-white/10 rounded animate-pulse"></div>
              <div className="h-8 w-32 bg-white/10 rounded animate-pulse"></div>
              <div className="h-4 w-48 bg-white/10 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Theme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              {/* Theme Icon */}
              <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-4 animate-pulse"></div>
              
              {/* Theme Title */}
              <div className="h-6 bg-white/10 rounded animate-pulse mb-3"></div>
              
              {/* Theme Description */}
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-white/10 rounded animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded animate-pulse w-3/4"></div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-black/20 rounded-lg">
                <div className="h-4 bg-white/10 rounded animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded animate-pulse"></div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <div className="flex-1 h-10 bg-white/10 rounded-lg animate-pulse"></div>
                <div className="h-10 w-10 bg-white/10 rounded-lg animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

