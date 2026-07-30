'use client';

import { useEffect, useState } from 'react';
import { BrandMark } from '@/components/BrandMark';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, bookings: 0, revenue: 0 });
  const [users, setUsers] = useState<Array<{ id: string; displayName: string; email: string; role: string }>>([]);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      window.location.href = '/auth/login';
    } else {
      // Load mock data
      setStats({ users: 1243, bookings: 5678, revenue: 234567 });
      setUsers([
        { id: '1', displayName: 'Raj Kumar', email: 'raj@example.com', role: 'STUDENT' },
        { id: '2', displayName: 'Priya Singh', email: 'priya@example.com', role: 'PROFESSIONAL' },
        { id: '3', displayName: 'Amit Patel', email: 'amit@example.com', role: 'CUSTOMER' },
      ]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-navy">
      <header className="border-b border-gold/20 bg-black/40 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <BrandMark />
          <div className="text-sm text-slate-400">Admin Dashboard</div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {[
            { label: 'Total Users', value: stats.users.toLocaleString() },
            { label: 'Total Bookings', value: stats.bookings.toLocaleString() },
            { label: 'Revenue (₹)', value: stats.revenue.toLocaleString() },
          ].map((card) => (
            <div key={card.label} className="rounded-xl border border-gold/20 bg-white/5 p-6">
              <p className="text-sm text-slate-400">{card.label}</p>
              <p className="mt-2 text-3xl font-bold text-gold">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-gold/20 bg-white/5 p-6">
          <div className="mb-6 flex gap-2">
            {['overview', 'users', 'bookings'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  tab === t ? 'bg-gold text-navy' : 'border border-gold/30 text-gold hover:bg-white/5'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {tab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <p>✓ 12 new users signed up today</p>
                <p>✓ 45 new bookings placed</p>
                <p>✓ ₹34,500 in revenue generated</p>
              </div>
            </div>
          )}

          {tab === 'users' && (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Users</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gold/20">
                    <tr>
                      <th className="px-4 py-2 text-left text-gold">Name</th>
                      <th className="px-4 py-2 text-left text-gold">Email</th>
                      <th className="px-4 py-2 text-left text-gold">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-gold/10 hover:bg-white/5">
                        <td className="px-4 py-2 text-white">{u.displayName}</td>
                        <td className="px-4 py-2 text-slate-400">{u.email}</td>
                        <td className="px-4 py-2 text-slate-400">{u.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'bookings' && (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Recent Bookings</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-gold/20 bg-black/40 p-4">
                    <div>
                      <p className="font-semibold text-white">Student Helper - {i} hours</p>
                      <p className="text-xs text-slate-500">Order #100{i}</p>
                    </div>
                    <span className="rounded-full bg-green-900/50 px-3 py-1 text-xs text-green-300">Completed</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
