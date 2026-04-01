import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, BarChart3, ChevronDown, UserCircle2 } from 'lucide-react';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return null;
  }

  const navItems = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Stocks', to: '/stocks' },
    { label: 'News', to: '/news' },
    { label: 'Crypto', to: '/crypto' },
    { label: 'Metals', to: '/metals' },
  ];

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2 text-lime-300">
          <BarChart3 size={28} />
          <span className="text-xl font-semibold tracking-tight text-white">TradeGPT</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {isAuthenticated
            ? navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm transition ${
                      isActive
                        ? 'bg-lime-300/20 text-lime-200'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))
            : null}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-lime-300/40 hover:bg-lime-400/10"
              >
                <UserCircle2 size={17} />
                <span className="hidden sm:inline">{user?.username || 'Profile'}</span>
                <ChevronDown size={15} />
              </button>

              {menuOpen ? (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-white/10 bg-black/90 p-3 shadow-2xl">
                  <p className="px-2 text-sm font-semibold text-white">{user?.full_name || user?.username}</p>
                  <p className="px-2 text-xs text-slate-400">{user?.email}</p>
                  <button
                    onClick={handleLogout}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-lime-300/30 bg-lime-300/15 px-3 py-2 text-sm text-lime-200 transition hover:bg-lime-300/25"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <Link to="/login" className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
                Login
              </Link>
              <Link to="/register" className="btn-lime text-sm">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
