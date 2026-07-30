'use client';

import { useState } from 'react';
import { BrandMark } from '@/components/BrandMark';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone: email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('accessToken', data.accessToken);
        window.location.href = '/services';
      } else {
        setError('Invalid email or password');
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
          <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
          <p className="text-sm text-slate-400">Sign in to your ZIVOPO account</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email or phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gold/30 bg-white/5 px-4 py-2 text-white placeholder-slate-500 transition focus:border-gold focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gold/30 bg-white/5 px-4 py-2 text-white placeholder-slate-500 transition focus:border-gold focus:outline-none"
            required
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gold py-2 font-semibold text-navy transition disabled:opacity-50 hover:opacity-90"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gold/20" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-navy px-2 text-slate-400">New to ZIVOPO?</span>
          </div>
        </div>
        <a href="/auth/signup" className="block rounded-lg border border-gold/50 py-2 text-center font-semibold text-gold transition hover:bg-gold/10">
          Create account
        </a>
      </div>
    </div>
  );
}
