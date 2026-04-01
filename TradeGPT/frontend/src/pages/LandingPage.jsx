import React from 'react';
import { Link } from 'react-router-dom';
import {
  BrainCircuit,
  CandlestickChart,
  Newspaper,
  Bitcoin,
  Coins,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Gauge,
  UserCircle2,
  ArrowRight,
  Rocket,
} from 'lucide-react';

const features = [
  {
    title: 'Stock Analysis',
    description: 'Real-time prices, trend heatmaps, and AI directional insights.',
    icon: CandlestickChart,
    color: 'feature-stock',
  },
  {
    title: 'Market News & Sentiment',
    description: 'News streams summarized with sentiment signal overlays.',
    icon: Newspaper,
    color: 'feature-news',
  },
  {
    title: 'Crypto Tracking',
    description: 'Live coin monitoring with volatility alerts and watch triggers.',
    icon: Bitcoin,
    color: 'feature-crypto',
  },
  {
    title: 'Gold & Silver Prices',
    description: 'Precious metals spot tracking with macro context snapshots.',
    icon: Coins,
    color: 'feature-metals',
  },
];

const aiBullets = [
  'NIFTY futures show a bullish continuation setup in short-term frames.',
  'BTC volatility is expanding; consider wider stop buffers on swings.',
  'Gold remains resilient with persistent risk-off buying behavior.',
];

export function LandingPage() {
  return (
    <div className="relative overflow-x-hidden bg-app page-fade">
      <div className="aurora aurora-top" />
      <div className="aurora aurora-bottom" />

      <section className="container mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-20 pt-16 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-lime-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-lime-200">
            <Sparkles size={14} />
            AI-Native Fintech Platform
          </span>
          <h1 className="mt-6 text-balance text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            AI-Powered Market Intelligence for Smarter Investing
          </h1>
          <p className="mt-5 max-w-xl text-base text-slate-300 sm:text-lg">
            Analyze stocks, crypto, and market trends in real-time using AI.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/register" className="btn-lime">
              Get Started Free
              <ArrowRight size={16} />
            </Link>
            <a href="#dashboard-preview" className="btn-ghost">
              View Demo
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="glass-panel rounded-2xl p-4 text-center">
              <p className="text-2xl font-semibold text-lime-300">10,000+</p>
              <p className="text-xs text-slate-300">users</p>
            </div>
            <div className="glass-panel rounded-2xl p-4 text-center">
              <p className="text-2xl font-semibold text-blue-300">24/7</p>
              <p className="text-xs text-slate-300">Real-time data</p>
            </div>
            <div className="glass-panel rounded-2xl p-4 text-center">
              <p className="text-2xl font-semibold text-violet-300">AI</p>
              <p className="text-xs text-slate-300">driven insights</p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 lg:p-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-200">Live Strategy Dashboard</p>
            <span className="rounded-full bg-lime-400/20 px-3 py-1 text-xs text-lime-300">Live</span>
          </div>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 rounded-2xl bg-white/5 p-4">
              <p className="text-xs text-slate-400">Portfolio AI Confidence</p>
              <p className="mt-2 text-3xl font-semibold text-lime-300">87%</p>
            </div>
            <div className="col-span-6 rounded-2xl bg-white/5 p-4">
              <p className="text-xs text-slate-400">BTC/USD</p>
              <p className="mt-2 text-lg font-semibold text-violet-300">+2.18%</p>
            </div>
            <div className="col-span-6 rounded-2xl bg-white/5 p-4">
              <p className="text-xs text-slate-400">NIFTY</p>
              <p className="mt-2 text-lg font-semibold text-blue-300">+0.74%</p>
            </div>
            <div className="col-span-12 rounded-2xl bg-white/5 p-4">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Signal Feed</span>
                <ChevronRight size={14} />
              </div>
              <div className="mt-3 space-y-2 text-sm text-slate-200">
                <p>AI: Momentum breakout forming on AAPL.</p>
                <p>AI: ETH showing accumulation near support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 pb-16">
        <h2 className="section-title">Power Features</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className={`feature-card ${feature.color}`}>
                <div className="feature-inner">
                  <Icon className="text-white" size={26} />
                  <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 pb-16">
        <h2 className="section-title">How It Works</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { title: 'Connect', desc: 'Sign up, set your watchlist, and choose your market interests.', icon: UserCircle2 },
            { title: 'Analyze', desc: 'TradeGPT scans trends, sentiment, and volatility in real time.', icon: BrainCircuit },
            { title: 'Act', desc: 'Use AI-backed insights to make faster and smarter decisions.', icon: Rocket },
          ].map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="glass-panel rounded-3xl p-6">
                <Icon className="text-lime-300" size={26} />
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 pb-16">
        <div className="glass-panel rounded-3xl p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <BrainCircuit className="text-lime-300" size={24} />
            <h2 className="section-title mb-0">Ask TradeGPT anything</h2>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
            <p className="mb-3 text-xs uppercase tracking-wide text-slate-400">Prompt</p>
            <p className="rounded-xl bg-white/5 px-4 py-3 text-sm text-slate-100">
              Should I rotate from tech into metals if inflation prints above expectations this week?
            </p>
            <div className="mt-4 rounded-xl border border-lime-300/20 bg-lime-300/10 px-4 py-3 text-sm text-lime-100">
              AI suggests a partial hedge: maintain quality tech while increasing gold exposure by 10-15%.
            </div>
          </div>
        </div>
      </section>

      <section id="dashboard-preview" className="container mx-auto max-w-7xl px-4 pb-16">
        <h2 className="section-title">Dashboard Preview</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="glass-panel rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">Market Pulse</p>
              <Gauge className="text-blue-300" size={18} />
            </div>
            <p className="mt-5 text-2xl font-semibold text-white">Bullish Momentum</p>
            <p className="mt-2 text-sm text-slate-400">AI confidence 82%</p>
          </div>
          <div className="glass-panel rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">Security</p>
              <ShieldCheck className="text-lime-300" size={18} />
            </div>
            <p className="mt-5 text-2xl font-semibold text-white">Bank-grade Auth</p>
            <p className="mt-2 text-sm text-slate-400">Encrypted sessions + protected routes</p>
          </div>
          <div className="glass-panel rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">AI Co-Pilot</p>
              <BrainCircuit className="text-violet-300" size={18} />
            </div>
            <p className="mt-5 text-2xl font-semibold text-white">Context Aware</p>
            <p className="mt-2 text-sm text-slate-400">Signals from price, sentiment, and macro data</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 pb-16">
        <h2 className="section-title">Pricing</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="glass-panel rounded-3xl p-6">
            <p className="text-sm uppercase tracking-wide text-slate-400">Free</p>
            <p className="mt-3 text-3xl font-semibold text-white">$0</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-300">
              <li>Core dashboard access</li>
              <li>Limited AI prompts</li>
              <li>Basic watchlist</li>
            </ul>
          </div>
          <div className="glass-panel lime-border rounded-3xl p-6">
            <p className="text-sm uppercase tracking-wide text-lime-300">Pro</p>
            <p className="mt-3 text-3xl font-semibold text-white">$19/mo</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-200">
              <li>Unlimited AI insights</li>
              <li>Advanced watchlists and alerts</li>
              <li>Priority market sentiment feeds</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 pb-20 text-center">
        <div className="glass-panel rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Start analyzing markets with AI today</h2>
          <Link to="/register" className="btn-lime mx-auto mt-6 inline-flex">
            Launch TradeGPT
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/30 py-10">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 text-sm text-slate-400 md:flex-row">
          <p>TradeGPT © 2026</p>
          <div className="flex gap-5">
            <a href="#">About</a>
            <a href="#">Features</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
