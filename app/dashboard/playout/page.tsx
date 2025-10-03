'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PlayoutSession } from '@/types/database';

export default function PlayoutManagementPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [sessions, setSessions] = useState<PlayoutSession[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [newSessionName, setNewSessionName] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    useEffect(() => {
        if (status === 'authenticated') {
            fetchSessions();
        }
    }, [status]);

    async function fetchSessions() {
        try {
            const response = await fetch('/api/playout');
            if (response.ok) {
                const data = await response.json();
                setSessions(data.sessions || []);
            }
        } catch (error) {
            console.error('Failed to fetch playout sessions:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function createSession() {
        if (!newSessionName.trim()) return;

        setIsCreating(true);
        try {
            const response = await fetch('/api/playout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newSessionName }),
            });

            if (response.ok) {
                const data = await response.json();
                setSessions([data.session, ...sessions]);
                setNewSessionName('');
                setShowCreateForm(false);
            }
        } catch (error) {
            console.error('Failed to create playout session:', error);
        } finally {
            setIsCreating(false);
        }
    }

    async function deleteSession(id: string) {
        if (!confirm('Are you sure you want to deactivate this playout session?')) {
            return;
        }

        try {
            const response = await fetch(`/api/playout/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setSessions(sessions.filter((s) => s.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete playout session:', error);
        }
    }

    function copyUrl(playoutId: string, mode: 'standard' | 'obs' | 'obs-transparent' = 'standard') {
        let url = `${window.location.origin}/playout/${playoutId}`;
        
        if (mode === 'obs') {
            url += '?obs=true';
        } else if (mode === 'obs-transparent') {
            url += '?obs=true&transparent=true';
        }
        
        navigator.clipboard.writeText(url);
        alert(`${mode === 'standard' ? 'Standard' : mode === 'obs' ? 'OBS Mode' : 'OBS Transparent'} URL copied to clipboard!`);
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
                            <h1 className="text-2xl font-bold text-white">Playout Windows</h1>
                            <p className="text-sm text-gray-300 mt-1">
                                Manage your OBS playout windows
                            </p>
                        </div>
                        <button
                            onClick={() => setShowCreateForm(!showCreateForm)}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition font-medium"
                        >
                            + New Playout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Create Form */}
                {showCreateForm && (
                    <div className="mb-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Create New Playout Window
                        </h3>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={newSessionName}
                                onChange={(e) => setNewSessionName(e.target.value)}
                                placeholder="Playout name (e.g., Main Stream, Event Screen)"
                                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                                onKeyDown={(e) => e.key === 'Enter' && createSession()}
                            />
                            <button
                                onClick={createSession}
                                disabled={isCreating || !newSessionName.trim()}
                                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isCreating ? 'Creating...' : 'Create'}
                            </button>
                            <button
                                onClick={() => {
                                    setShowCreateForm(false);
                                    setNewSessionName('');
                                }}
                                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Sessions List */}
                {sessions.length === 0 ? (
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
                                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            No Playout Windows Yet
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Create your first playout window to get started with OBS integration
                        </p>
                        <button
                            onClick={() => setShowCreateForm(true)}
                            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition font-medium"
                        >
                            Create First Playout
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {sessions.map((playoutSession) => (
                            <div
                                key={playoutSession.id}
                                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold text-white">
                                                {playoutSession.session_name || 'Untitled Playout'}
                                            </h3>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${playoutSession.is_active
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : 'bg-gray-500/20 text-gray-400'
                                                    }`}
                                            >
                                                {playoutSession.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <div className="space-y-1 text-sm text-gray-400">
                                            <div>
                                                <span className="font-medium">ID:</span>{' '}
                                                <code className="bg-black/30 px-2 py-1 rounded">
                                                    {playoutSession.id}
                                                </code>
                                            </div>
                                            <div>
                                                <span className="font-medium">Created:</span>{' '}
                                                {new Date(playoutSession.created_at).toLocaleString()}
                                            </div>
                                            <div>
                                                <span className="font-medium">Last Active:</span>{' '}
                                                {new Date(playoutSession.last_active).toLocaleString()}
                                            </div>
                                        </div>

                                        {/* URL Display with Options */}
                                        <div className="mt-4 p-4 bg-black/30 rounded-lg">
                                            <div className="text-xs text-gray-400 mb-2 font-semibold">
                                                📺 OBS Browser Source URLs:
                                            </div>
                                            
                                            {/* Standard URL */}
                                            <div className="mb-3">
                                                <div className="text-xs text-gray-500 mb-1">Standard (Preview):</div>
                                                <div className="flex items-center gap-2">
                                                    <code className="flex-1 text-xs text-purple-300 break-all bg-black/30 p-2 rounded">
                                                        {`${typeof window !== 'undefined' ? window.location.origin : ''}/playout/${playoutSession.id}`}
                                                    </code>
                                                    <button
                                                        onClick={() => copyUrl(playoutSession.id, 'standard')}
                                                        className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded text-xs font-medium transition whitespace-nowrap"
                                                    >
                                                        📋 Copy
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            {/* OBS Mode URL */}
                                            <div className="mb-3">
                                                <div className="text-xs text-gray-500 mb-1">OBS Mode (Optimized):</div>
                                                <div className="flex items-center gap-2">
                                                    <code className="flex-1 text-xs text-green-300 break-all bg-black/30 p-2 rounded">
                                                        {`${typeof window !== 'undefined' ? window.location.origin : ''}/playout/${playoutSession.id}?obs=true`}
                                                    </code>
                                                    <button
                                                        onClick={() => copyUrl(playoutSession.id, 'obs')}
                                                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition whitespace-nowrap"
                                                    >
                                                        📋 Copy
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            {/* OBS Transparent URL */}
                                            <div>
                                                <div className="text-xs text-gray-500 mb-1">OBS Transparent (No Background):</div>
                                                <div className="flex items-center gap-2">
                                                    <code className="flex-1 text-xs text-blue-300 break-all bg-black/30 p-2 rounded">
                                                        {`${typeof window !== 'undefined' ? window.location.origin : ''}/playout/${playoutSession.id}?obs=true&transparent=true`}
                                                    </code>
                                                    <button
                                                        onClick={() => copyUrl(playoutSession.id, 'obs-transparent')}
                                                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition whitespace-nowrap"
                                                    >
                                                        📋 Copy
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-3 text-xs text-gray-500 italic">
                                                💡 Tip: Use &quot;OBS Mode&quot; for best performance in OBS Studio
                                            </div>
                                        </div>
                                    </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => router.push(`/dashboard/control/${playoutSession.id}`)}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition text-sm font-medium"
                    >
                      ⚙️ Control
                    </button>
                    <button
                      onClick={() => window.open(`/playout/${playoutSession.id}`, '_blank')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium"
                    >
                      👁️ View
                    </button>
                    <button
                      onClick={() => deleteSession(playoutSession.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm font-medium"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* OBS Instructions */}
                <div className="mt-12 bg-blue-500/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        🎬 Quick OBS Setup Guide
                    </h3>
                    <ol className="space-y-2 text-sm text-blue-200 mb-4">
                        <li className="flex items-start gap-2">
                            <span className="font-bold text-blue-400">1.</span>
                            <span>In OBS Studio, click <strong>&quot;+&quot;</strong> in Sources panel and select <strong>&quot;Browser&quot;</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold text-blue-400">2.</span>
                            <span>Copy the <strong className="text-green-300">&quot;OBS Mode&quot;</strong> or <strong className="text-blue-300">&quot;OBS Transparent&quot;</strong> URL from above</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold text-blue-400">3.</span>
                            <span>Paste URL and set: <strong>Width = 1920</strong>, <strong>Height = 1080</strong>, <strong>FPS = 60</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold text-blue-400">4.</span>
                            <span>For transparent backgrounds, uncheck &quot;Shutdown source when not visible&quot;</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold text-blue-400">5.</span>
                            <span>Use the <strong>Control Panel</strong> to update graphics in real-time!</span>
                        </li>
                    </ol>
                    
                    <div className="bg-blue-500/20 p-3 rounded-lg">
                        <div className="text-xs font-semibold text-blue-300 mb-1">📖 Need More Help?</div>
                        <div className="text-xs text-blue-200">
                            Check out <code className="bg-black/30 px-2 py-0.5 rounded">OBS_INTEGRATION_GUIDE.md</code> in the project folder for detailed instructions, troubleshooting, and advanced tips!
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

