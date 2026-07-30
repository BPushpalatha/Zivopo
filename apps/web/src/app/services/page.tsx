'use client';

import { useEffect, useState } from 'react';
import { BrandMark } from '@/components/BrandMark';

const services = [
  { id: 1, slug: 'student-helper', title: 'Student Helpers', desc: 'Get verified student help for tasks', icon: '👤' },
  { id: 2, slug: 'elder-care', title: 'Elder Care', desc: 'Support for senior citizens', icon: '❤️' },
  { id: 3, slug: 'corporate-concierge', title: 'Corporate Concierge', desc: 'Errands for busy professionals', icon: '💼' },
  { id: 4, slug: 'apartment-support', title: 'Apartment Services', desc: 'Community-focused assistance', icon: '🏢' },
  { id: 5, slug: 'event-staff', title: 'Event Workforce', desc: 'Temporary event staff', icon: '🎉' },
];

export default function ServicesPage() {
  type Service = typeof services[0];
  const [user, setUser] = useState<{ token: string } | null>(null);
  const [selected, setSelected] = useState<Service | null>(null);
  const [requestDateTime, setRequestDateTime] = useState('');
  const [requestDuration, setRequestDuration] = useState('1 hour');
  const [requestMessage, setRequestMessage] = useState('');
  const [requestError, setRequestError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      window.location.href = '/auth/login';
    } else {
      setUser({ token });
    }
  }, []);

  async function handleRequestService() {
    if (!selected || !user) {
      return;
    }

    if (!requestDateTime) {
      setRequestError('Choose a date and time for the request.');
      return;
    }

    setIsSubmitting(true);
    setRequestError('');
    setRequestMessage('');

    try {
      const response = await fetch('http://localhost:4000/api/service-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          serviceSlug: selected.slug,
          serviceTitle: selected.title,
          scheduledFor: requestDateTime,
          duration: requestDuration,
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      setRequestMessage(`Request submitted for ${data.serviceTitle}.`);
      setSelected(null);
      setRequestDateTime('');
      setRequestDuration('1 hour');
    } catch {
      setRequestError('Could not submit the request right now.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!user) return <div className="flex min-h-screen items-center justify-center bg-navy text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-navy">
      <header className="border-b border-gold/20 bg-black/40 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <BrandMark />
          <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} className="text-sm text-gold transition hover:opacity-80">
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl font-bold text-white">Book Trusted Help</h1>
          <p className="text-lg text-slate-400">Choose a service category and find verified professionals</p>
        </div>

        {(requestMessage || requestError) && (
          <div className={`mb-8 rounded-2xl border px-4 py-3 text-sm ${requestMessage ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200' : 'border-red-400/40 bg-red-400/10 text-red-200'}`}>
            {requestMessage || requestError}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <div
              key={svc.id}
              onClick={() => {
                setSelected(svc);
                setRequestDateTime('');
                setRequestDuration('1 hour');
                setRequestError('');
              }}
              className="group cursor-pointer rounded-2xl border border-gold/30 bg-white/5 p-6 transition hover:border-gold hover:bg-white/10"
            >
              <div className="mb-4 text-4xl">{svc.icon}</div>
              <h3 className="text-xl font-semibold text-white">{svc.title}</h3>
              <p className="mb-6 text-sm text-slate-400">{svc.desc}</p>
              <button className="w-full rounded-lg bg-gold/80 py-2 font-semibold text-navy transition group-hover:bg-gold">
                Explore
              </button>
            </div>
          ))}
        </div>

        {selected && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-md rounded-2xl border border-gold/30 bg-navy p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{selected.title}</h2>
                <button onClick={() => setSelected(null)} className="text-gold text-2xl">×</button>
              </div>
              <p className="text-slate-400">{selected.desc}</p>
              <div className="space-y-2">
                <label className="block text-sm text-slate-300">Date & Time</label>
                <input
                  type="datetime-local"
                  value={requestDateTime}
                  onChange={(event) => setRequestDateTime(event.target.value)}
                  className="w-full rounded-lg border border-gold/30 bg-white/5 px-4 py-2 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-slate-300">Duration (hours)</label>
                <select
                  value={requestDuration}
                  onChange={(event) => setRequestDuration(event.target.value)}
                  className="w-full rounded-lg border border-gold/30 bg-white/5 px-4 py-2 text-white"
                >
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>Half day</option>
                  <option>Full day</option>
                </select>
              </div>
              <button
                type="button"
                onClick={handleRequestService}
                disabled={isSubmitting}
                className="w-full rounded-lg bg-gold py-2 font-semibold text-navy transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting...' : 'Request Service'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
