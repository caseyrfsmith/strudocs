import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function AnalyzeForm({ onAnalyze, disabled }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      onAnalyze(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
        <div className="flex gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://docs.example.com"
            className="flex-1 px-6 py-4 bg-white/20 border-2 border-white/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-white/50"
            disabled={disabled}
            required
          />
          <button
            type="submit"
            disabled={disabled || !url}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-xl font-semibold flex items-center gap-2 transition-all disabled:cursor-not-allowed"
          >
            <Search className="w-5 h-5" />
            Analyze
          </button>
        </div>
      </div>
    </form>
  );
}