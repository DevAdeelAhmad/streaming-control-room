export default function PlayoutLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header Skeleton */}
            <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="space-y-2">
                            <div className="h-6 w-32 bg-white/10 rounded animate-pulse"></div>
                            <div className="h-8 bg-white/10 rounded animate-pulse w-48"></div>
                            <div className="h-4 w-56 bg-white/10 rounded animate-pulse"></div>
                        </div>
                        <div className="h-10 w-32 bg-white/10 rounded-lg animate-pulse"></div>
                    </div>
                </div>
            </header>

            {/* Main Content Skeleton */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Playout Session Cards */}
                <div className="grid grid-cols-1 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1 space-y-4">
                                    {/* Title */}
                                    <div className="flex items-center gap-3">
                                        <div className="h-6 w-48 bg-white/10 rounded animate-pulse"></div>
                                        <div className="h-6 w-16 bg-white/10 rounded-full animate-pulse"></div>
                                    </div>
                                    {/* Details */}
                                    <div className="space-y-2">
                                        <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse"></div>
                                        <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse"></div>
                                        <div className="h-4 w-1/2 bg-white/10 rounded animate-pulse"></div>
                                    </div>
                                    {/* URL Section */}
                                    <div className="p-4 bg-black/30 rounded-lg space-y-3">
                                        <div className="h-4 w-40 bg-white/10 rounded animate-pulse"></div>
                                        <div className="h-12 bg-white/10 rounded animate-pulse"></div>
                                        <div className="h-12 bg-white/10 rounded animate-pulse"></div>
                                        <div className="h-12 bg-white/10 rounded animate-pulse"></div>
                                    </div>
                                </div>
                                {/* Action Buttons */}
                                <div className="flex gap-2 ml-4">
                                    <div className="h-10 w-24 bg-white/10 rounded-lg animate-pulse"></div>
                                    <div className="h-10 w-20 bg-white/10 rounded-lg animate-pulse"></div>
                                    <div className="h-10 w-24 bg-white/10 rounded-lg animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Instructions Card */}
                <div className="mt-12 bg-blue-500/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
                    <div className="h-6 w-48 bg-white/10 rounded animate-pulse mb-4"></div>
                    <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-4 bg-white/10 rounded animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

