import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ErrorMessage } from '../components/ErrorMessage';
import { Mail, Lock, User, UserPlus } from 'lucide-react';

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      showToast({ type: 'error', title: 'Validation error', message: 'Passwords do not match.' });
      return;
    }

    try {
      await register(email, username, fullName, password);
      showToast({ type: 'success', title: 'Account ready', message: 'Registration successful.' });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
      showToast({ type: 'error', title: 'Registration failed', message: 'Please review your inputs.' });
    }
  };

  return (
    <div className="bg-auth page-fade flex min-h-screen items-center justify-center px-4 py-12">
      <ErrorMessage message={error} onClose={() => setError('')} />

      <div className="glass-panel w-full max-w-md rounded-3xl border border-lime-400/20 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-lime-300 mb-2">TradeGPT</h1>
          <p className="text-slate-300">Create your account</p>
        </div>



        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-500" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-xl border border-white/15 bg-black/30 py-3 pl-10 pr-4 text-white placeholder-slate-500 outline-none transition focus:border-lime-300/60 focus:ring-2 focus:ring-lime-300/20"
                placeholder="johndoe"
                minLength="3"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Full Name (Optional)</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-lime-300/60 focus:ring-2 focus:ring-lime-300/20"
              placeholder="John Doe"
            />
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
                minLength="8"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-500" size={20} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-white/15 bg-black/30 py-3 pl-10 pr-4 text-white placeholder-slate-500 outline-none transition focus:border-lime-300/60 focus:ring-2 focus:ring-lime-300/20"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-lime mt-6 w-full justify-center py-3 font-medium"
          >
            <UserPlus size={20} />
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-lime-300 hover:underline font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
