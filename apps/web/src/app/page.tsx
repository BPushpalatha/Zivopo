import { BrandMark } from '@/components/BrandMark';

const pillars = [
  'Verified student helpers',
  'Corporate concierge',
  'Senior assistance',
  'Apartment community services',
  'Events and campus workforce',
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 lg:px-10">
      <section className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <img src="/logo.svg" alt="ZIVOPO logo" className="h-16 w-auto" />
            <BrandMark />
          </div>
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.45em] text-gold">India’s premium human assistance ecosystem</p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Book trusted help for work, errands, care, and community needs.
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              ZIVOPO combines student gigs, concierge support, senior care, apartment services, and event staffing into one premium marketplace.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/auth/login" className="rounded-full bg-gold px-6 py-3 font-semibold text-navy transition hover:opacity-90">
              Get Started
            </a>
            <a href="/admin" className="rounded-full border border-gold/60 px-6 py-3 font-semibold text-gold transition hover:bg-gold/10">
              Admin Dashboard
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-gold/20 bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur">
          <h2 className="text-2xl font-semibold text-white">Launch pillars</h2>
          <ul className="mt-6 space-y-3 text-slate-200">
            {pillars.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
