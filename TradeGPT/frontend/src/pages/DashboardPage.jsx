import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SkeletonCard } from '../components/SkeletonCard';
import { TrendingUp, Newspaper, Bitcoin, Coins, Activity, BrainCircuit, Sparkles, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <TrendingUp size={30} />,
    title: 'Stock Prices',
    description: 'Real-time prices + AI momentum and setup insights.',
    link: '/stocks',
    tone: 'stock-tone',
    chart: ['28%', '52%', '44%', '70%', '68%', '82%'],
  },
  {
    icon: <Newspaper size={30} />,
    title: 'Market News',
    description: 'News pulse with AI sentiment and macro context.',
    link: '/news',
    tone: 'news-tone',
    badge: 'Sentiment: Positive',
  },
  {
    icon: <Bitcoin size={30} />,
    title: 'Crypto Rates',
    description: 'Live price ticker and volatility spotlight feed.',
    link: '/crypto',
    tone: 'crypto-tone',
    ticker: ['BTC +2.1%', 'ETH +1.3%', 'SOL -0.6%', 'XRP +0.9%'],
  },
  {
    icon: <Coins size={30} />,
    title: 'Gold & Silver',
    description: 'Precious metals tracking with defensive trend signals.',
    link: '/metals',
    tone: 'metals-tone',
    metal: true,
  },
];

const overview = [
  { name: 'NIFTY', value: '22,441.20', move: '+0.76%' },
  { name: 'SENSEX', value: '73,811.42', move: '+0.52%' },
  { name: 'BTC', value: '$68,221', move: '+2.18%' },
  { name: 'GOLD', value: '$2,306', move: '+0.31%' },
];

const watchlist = [
  { symbol: 'AAPL', price: '$188.12', change: '+1.22%' },
  { symbol: 'NVDA', price: '$914.38', change: '+2.08%' },
  { symbol: 'RELIANCE', price: 'INR 2,978', change: '-0.44%' },
  { symbol: 'TSLA', price: '$176.51', change: '-1.18%' },
];

const recentActivity = [
  'Viewed BTC volatility map',
  'Searched TSLA news sentiment',
  'Opened Gold spot price panel',
  'Checked NIFTY momentum insight',
];

export function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="bg-app page-fade pb-24 md:pb-10">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:py-10">
        <div className="ticker-wrap mb-6">
          <div className="ticker-track">
            {[...overview, ...overview].map((item, index) => (
              <div key={`${item.name}-${index}`} className="ticker-item">
                <span>{item.name}</span>
                <strong>{item.value}</strong>
                <em className={item.move.startsWith('+') ? 'text-lime-300' : 'text-red-300'}>{item.move}</em>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h1 className="gradient-title mb-2 text-4xl font-bold">Welcome back, {user?.full_name || user?.username}! 👋</h1>
          <p className="text-slate-300">Your AI desk is ready. Review signals, monitor risk, and act with confidence.</p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <Link key={feature.title} to={feature.link} className={`premium-card ${feature.tone}`}>
              <div className="mb-4 flex items-center justify-between text-white">
                {feature.icon}
                <ArrowRight size={18} className="opacity-70" />
              </div>
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{feature.description}</p>



              {feature.badge ? <span className="mt-4 inline-block rounded-full bg-amber-400/20 px-3 py-1 text-xs text-amber-200">{feature.badge}</span> : null}

              {feature.ticker ? (
                <div className="ticker-mini mt-4">
                  <div>
                    {feature.ticker.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ) : null}

              {feature.metal ? <div className="metal-panel mt-4 rounded-2xl p-3 text-sm text-amber-100">XAU trend stable, XAG gaining momentum.</div> : null}

              <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm text-white">
                Explore
                <span className="text-base">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="glass-panel rounded-3xl p-6 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <BrainCircuit className="text-lime-300" size={20} />
              <h2 className="text-xl font-semibold text-white">Today&apos;s AI Insights</h2>
            </div>
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="rounded-2xl bg-white/5 px-4 py-3">NIFTY shows bullish momentum with improving breadth.</li>
              <li className="rounded-2xl bg-white/5 px-4 py-3">BTC volatility is increasing; position sizing should be conservative.</li>
              <li className="rounded-2xl bg-white/5 px-4 py-3">Gold demand remains firm under persistent macro uncertainty.</li>
            </ul>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <Activity className="text-blue-300" size={20} />
              <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              {recentActivity.map((activity) => (
                <li key={activity} className="rounded-xl bg-white/5 px-3 py-2">
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="glass-panel rounded-3xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="text-violet-300" size={20} />
              <h2 className="text-xl font-semibold text-white">Watchlist</h2>
            </div>
            <div className="space-y-2">
              {watchlist.map((item) => (
                <div key={item.symbol} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <div>
                    <p className="font-semibold text-white">{item.symbol}</p>
                    <p className="text-xs text-slate-400">{item.price}</p>
                  </div>
                  <p className={item.change.startsWith('+') ? 'text-sm font-semibold text-lime-300' : 'text-sm font-semibold text-red-300'}>{item.change}</p>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
