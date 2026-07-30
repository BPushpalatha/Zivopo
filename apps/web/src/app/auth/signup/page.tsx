'use client';

import { useState } from 'react';
import { BrandMark } from '@/components/BrandMark';

export default function SignupPage() {
  const [form, setForm] = useState({ displayName: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        window.location.href = '/auth/login';
      } else {
        setError('Signup failed. Try again.');
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-gold/20 bg-black/40 p-8 backdrop-blur">
        <div className="flex justify-center">
          <BrandMark />
        </div>
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold text-white">Join ZIVOPO</h1>
          <p className="text-sm text-slate-400">Create your account in seconds</p>
        </div>
        <form onSubmit={handleSignup} className="space-y-4">
          <input type="text" placeholder="Full name" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} className="w-full rounded-lg border border-gold/30 bg-white/5 px-4 py-2 text-white placeholder-slate-500 transition focus:border-gold focus:outline-none" required />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-gold/30 bg-white/5 px-4 py-2 text-white placeholder-slate-500 transition focus:border-gold focus:outline-none" required />
          <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-gold/30 bg-white/5 px-4 py-2 text-white placeholder-slate-500 transition focus:border-gold focus:outline-none" required />
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-lg border border-gold/30 bg-white/5 px-4 py-2 text-white placeholder-slate-500 transition focus:border-gold focus:outline-none" required />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-gold py-2 font-semibold text-navy transition disabled:opacity-50 hover:opacity-90">
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>
        <a href="/auth/login" className="block text-center text-sm text-slate-400 transition hover:text-gold">
          Already have an account? Sign in
        </a>
      </div>
    </div>
  );
}
