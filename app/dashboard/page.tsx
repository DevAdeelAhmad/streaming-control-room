import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth/auth-options';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import FeatureCard from '@/components/Dashboard/FeatureCard';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DashboardHeader userName={session.user.name || 'User'} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Status Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">System Status</h3>
                <p className="text-sm text-gray-300">All systems operational</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Database</span>
                <span className="text-green-400 font-medium">Connected</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Authentication</span>
                <span className="text-green-400 font-medium">Active</span>
              </div>
            </div>
          </div>

          {/* Control Panel Card */}
          <FeatureCard
            title="Control Panel"
            description="Live stream controls"
            href="/dashboard/playout"
            color="purple"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            }
          />

          {/* Playout Window Card */}
          <FeatureCard
            title="Playout Windows"
            description="Manage OBS displays"
            href="/dashboard/playout"
            color="blue"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />

          {/* Themes Card */}
          <FeatureCard
            title="Themes"
            description="Save & load themes"
            href="/dashboard/themes"
            color="pink"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            }
          />

          {/* Assets Card */}
          <FeatureCard
            title="Assets"
            description="Upload & manage images"
            href="/dashboard/assets"
            color="yellow"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />

          {/* User Info Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gray-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Your Profile</h3>
                <p className="text-sm text-gray-300">Account information</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-gray-400">Email:</span>
                <p className="text-white font-medium">{session.user.email}</p>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Name:</span>
                <p className="text-white font-medium">{session.user.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="mt-12 bg-blue-500/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Quick Start Guide
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-200">
            <div>
              <h3 className="font-semibold text-blue-300 mb-2">1. Create a Playout Window</h3>
              <p>Go to <strong>Playout Windows</strong> and create a new playout session for OBS.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-300 mb-2">2. Add to OBS</h3>
              <p>Copy the OBS URL and add it as a <strong>Browser Source</strong> in OBS Studio.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-300 mb-2">3. Control Graphics</h3>
              <p>Use the <strong>Control Panel</strong> to edit text and images in real-time.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-300 mb-2">4. Save Themes</h3>
              <p>Save your configurations as <strong>Themes</strong> for quick loading later.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
