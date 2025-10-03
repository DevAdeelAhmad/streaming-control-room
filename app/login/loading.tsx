export default function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* Header Skeleton */}
          <div className="text-center mb-8 space-y-3">
            <div className="h-9 bg-white/10 rounded animate-pulse mx-auto w-3/4"></div>
            <div className="h-5 bg-white/10 rounded animate-pulse mx-auto w-2/3"></div>
          </div>

          {/* Form Skeleton */}
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse mb-2"></div>
              <div className="h-12 bg-white/5 border border-white/10 rounded-lg animate-pulse"></div>
            </div>

            {/* Password Field */}
            <div>
              <div className="h-4 w-20 bg-white/10 rounded animate-pulse mb-2"></div>
              <div className="h-12 bg-white/5 border border-white/10 rounded-lg animate-pulse"></div>
            </div>

            {/* Submit Button */}
            <div className="h-12 bg-white/10 rounded-lg animate-pulse"></div>

            {/* Footer Link */}
            <div className="h-4 bg-white/10 rounded animate-pulse mx-auto w-1/2"></div>
          </div>

          {/* Bottom Border */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="h-3 bg-white/10 rounded animate-pulse mx-auto w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

