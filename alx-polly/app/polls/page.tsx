'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authcontext';
import { Card } from '@/components/ui/card';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-8 bg-gray-50">
      <Card className="w-full max-w-2xl p-8 mb-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.email || 'User'}!</h1>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mb-4"
          onClick={() => router.push('/create-poll')}
        >
          + Create Poll
        </button>
        <p className="text-gray-600">Start a new poll or view your existing ones below.</p>
      </Card>
      <Card className="w-full max-w-2xl p-8">
        <h2 className="text-xl font-semibold mb-2">Your Polls</h2>
        <div className="text-gray-500">No polls yet.</div>
      </Card>
    </div>
  );
}