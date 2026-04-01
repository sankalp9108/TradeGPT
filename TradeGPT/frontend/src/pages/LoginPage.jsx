import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ErrorMessage } from '../components/ErrorMessage';
import { Mail, Lock, LogIn } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      showToast({ type: 'success', title: 'Welcome back', message: 'Login successful.' });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
      showToast({ type: 'error', title: 'Login failed', message: 'Please check your credentials.' });
    }
  };

  return (
    <div className="bg-auth page-fade flex min-h-screen items-center justify-center px-4 py-12">
      <ErrorMessage message={error} onClose={() => setError('')} />

      <div className="glass-panel w-full max-w-md rounded-3xl border border-lime-400/20 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-lime-300 mb-2">TradeGPT</h1>
          <p className="text-slate-300">Login to your account</p>
        </div>



        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-500" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/15 bg-black/30 py-3 pl-10 pr-4 text-white placeholder-slate-500 outline-none transition focus:border-lime-300/60 focus:ring-2 focus:ring-lime-300/20"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-500" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-white/15 bg-black/30 py-3 pl-10 pr-4 text-white placeholder-slate-500 outline-none transition focus:border-lime-300/60 focus:ring-2 focus:ring-lime-300/20"
                placeholder="••••••••"
              />
            </div>
            <div className="mt-2 text-right">
              <a
                href="#"
                className="text-xs text-slate-400 transition hover:text-lime-300"
                onClick={(e) => {
                  e.preventDefault();
                  showToast({ type: 'info', title: 'Forgot password', message: 'Password reset flow can be connected next.' });
                }}
              >
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-lime w-full justify-center py-3 font-medium"
          >
            <LogIn size={20} />
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-lime-300 hover:underline font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
