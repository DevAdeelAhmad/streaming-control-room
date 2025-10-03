import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth/auth-options';
import LoginForm from '@/components/Auth/LoginForm';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Sign in to your Streaming Control Room</p>
          </div>

          <LoginForm />

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-center text-xs text-gray-400">
              Streaming Control Room - Professional Graphics Control for OBS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
