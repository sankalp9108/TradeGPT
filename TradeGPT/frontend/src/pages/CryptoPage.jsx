import React, { useState } from 'react';
import { cryptoService } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Search, Bitcoin } from 'lucide-react';

export function CryptoPage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    try {
      const response = await cryptoService.getExchangeRate(query);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch crypto rate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-app page-fade min-h-screen pb-24 md:pb-10">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Cryptocurrency Rates</h1>
          <p className="text-slate-300">Real-time cryptocurrency exchange rates</p>
        </div>

        <ErrorMessage message={error} onClose={() => setError('')} />

        <div className="glass-panel rounded-3xl p-8 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-500" size={20} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., 'BTC to USD' or 'ETH to EUR'"
                className="w-full rounded-xl border border-white/15 bg-black/30 py-3 pl-10 pr-4 text-white placeholder-slate-500 outline-none transition focus:border-lime-300/60 focus:ring-2 focus:ring-lime-300/20"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-lime px-8 py-3 disabled:opacity-60"
            >
              Search
            </button>
          </form>
        </div>

        {loading && <LoadingSpinner />}

        {result && (
          <div className="space-y-6">
            {/* Answer Section */}
            <div className="glass-panel rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Bitcoin className="text-yellow-500" size={32} />
                <h2 className="text-2xl font-bold text-white">AI Response</h2>
              </div>

              <div className="rounded-2xl bg-black/35 p-6">
                <p className="text-gray-200 text-base leading-relaxed whitespace-pre-wrap">
                  {result.final_answer || result}
                </p>
              </div>
            </div>

            {/* Steps Bar */}
            {result.steps && result.steps.length > 0 && (
              <div className="glass-panel rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Reasoning Steps</h3>
                <div className="space-y-4">
                  {result.steps.map((step, index) => (
                    <div key={index} className="rounded-2xl bg-black/35 p-4 border-l-4 border-purple-400">
                      <div className="text-sm font-semibold text-purple-300 mb-2">Step {index + 1}</div>
                      <pre className="text-gray-300 text-sm overflow-auto whitespace-pre-wrap break-words">
                        {typeof step === 'string' ? step : JSON.stringify(step, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
