import React, { useState } from 'react';
import { metalService } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { BarChart3 } from 'lucide-react';

export function MetalsPage() {
  const [selectedSymbol, setSelectedSymbol] = useState('GOLD');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const symbols = [
    { value: 'GOLD', label: 'Gold' },
    { value: 'XAU', label: 'Gold (XAU)' },
    { value: 'SILVER', label: 'Silver' },
    { value: 'XAG', label: 'Silver (XAG)' },
  ];

  const handleSearch = async (symbol) => {
    setLoading(true);
    setError('');
    try {
      const response = await metalService.getSpotPrice(symbol);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch metal prices');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-app page-fade min-h-screen pb-24 md:pb-10">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Gold & Silver Prices</h1>
          <p className="text-slate-300">Real-time precious metals spot prices</p>
        </div>

        <ErrorMessage message={error} onClose={() => setError('')} />

        <div className="glass-panel rounded-3xl p-8 mb-8">
          <h3 className="text-lg font-bold text-white mb-4">Select Metal</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {symbols.map((symbol) => (
              <button
                key={symbol.value}
                onClick={() => {
                  setSelectedSymbol(symbol.value);
                  handleSearch(symbol.value);
                }}
                className={`py-3 px-4 rounded transition font-medium ${
                  selectedSymbol === symbol.value
                    ? 'bg-lime-500 text-black'
                    : 'bg-black/30 text-slate-300 hover:bg-white/10'
                }`}
              >
                {symbol.label}
              </button>
            ))}
          </div>
        </div>

        {loading && <LoadingSpinner />}

        {result && (
          <div className="glass-panel rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-yellow-600" size={32} />
              <h2 className="text-2xl font-bold text-white">{selectedSymbol} Spot Price</h2>
            </div>

            <div className="rounded-2xl bg-black/35 p-6">
              <pre className="text-gray-300 text-sm overflow-auto whitespace-pre-wrap break-words">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
