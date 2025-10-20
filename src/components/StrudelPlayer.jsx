import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

export default function StrudelPlayer({ pattern, description, url, title }) {
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);

  // Force re-render when pattern changes
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [pattern]);

  const handleCopy = () => {
    navigator.clipboard.writeText(pattern);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-400 backdrop-blur-lg rounded-2xl overflow-hidden">
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            Generated Pattern: {description}
          </h2>
          <p className="text-green-200 text-sm">
            Based on analysis of {title || url}
          </p>
        </div>

        {/* Embedded Strudel Player */}
        <div key={key} className="bg-black/40 rounded-xl overflow-hidden mb-4" style={{ minHeight: '400px' }}>
          <strudel-repl dangerouslySetInnerHTML={{ __html: `<!-- ${pattern} -->` }} />
        </div>

        {/* Pattern Code */}
        <div className="bg-black/40 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-black/60 border-b border-green-400/30">
            <span className="text-xs text-green-400 font-mono uppercase">Strudel Pattern Code</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 text-xs text-green-300 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className="p-6 text-green-300 font-mono text-sm overflow-x-auto max-h-64">
            {pattern}
          </pre>
        </div>

        <div className="mt-4 p-4 bg-green-900/30 rounded-lg">
          <p className="text-green-100 text-sm">
            <strong>How to play:</strong> Click the ▶ Play button in the embedded player above to hear your docs as music!
          </p>
        </div>
      </div>
    </div>
  );
}