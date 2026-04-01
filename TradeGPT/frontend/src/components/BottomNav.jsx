import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, Newspaper, Bitcoin, Coins } from 'lucide-react';

const items = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/stocks', label: 'Stocks', icon: LineChart },
  { to: '/news', label: 'News', icon: Newspaper },
  { to: '/crypto', label: 'Crypto', icon: Bitcoin },
  { to: '/metals', label: 'Metals', icon: Coins },
];

export function BottomNav() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-white/10 bg-black/65 p-2 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center rounded-xl px-1 py-2 text-[11px] transition ${
                  isActive
                    ? 'bg-lime-400/25 text-lime-300'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={16} />
              <span className="mt-1">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
