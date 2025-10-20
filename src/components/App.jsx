import React, { useState } from 'react';
import { Music, Sparkles, Loader, AlertCircle } from 'lucide-react';
import AnalyzeForm from './AnalyzeForm';
import MetricsDisplay from './MetricsDisplay';
import StrudelPlayer from './StrudelPlayer';
import HowItWorks from './HowItWorks';
import Footer from './Footer';

export default function App() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (url) => {
    setAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze docs');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="w-20 h-20 text-white" />
            <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Strudocs
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-2">
            Turn documentation into live-coded music
          </p>
          <p className="text-sm text-purple-300 mb-4">
            Each page creates a unique sonic pattern
          </p>
        </div>

        <AnalyzeForm onAnalyze={handleAnalyze} disabled={analyzing} />

        <HowItWorks />

        {analyzing && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center mt-8">
            <Loader className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
            <p className="text-white text-lg">Analyzing documentation...</p>
            <p className="text-purple-300 text-sm mt-2">This may take 10-20 seconds</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border-2 border-red-400 rounded-2xl p-6 mt-8">
            <div className="flex items-center gap-3 text-red-200">
              <AlertCircle className="w-6 h-6" />
              <div>
                <p className="font-semibold">Error analyzing docs</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6 mt-8">
            <MetricsDisplay metrics={result.metrics} />
            <StrudelPlayer 
              pattern={result.pattern}
              description={result.description}
              url={result.metrics.url}
              title={result.metrics.title}
            />
          </div>
        )}

        {!result && !analyzing && (
          <div className="mt-12 bg-white/5 backdrop-blur-lg rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">Try these examples</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => handleAnalyze('https://docs.stripe.com/api/charges')}
                className="text-left p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <div className="text-white font-semibold">Stripe API</div>
              </button>
              <button
                onClick={() => handleAnalyze('https://react.dev/reference/react/useState')}
                className="text-left p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <div className="text-white font-semibold">React Docs</div>
              </button>
              <button
                onClick={() => handleAnalyze('https://docs.anthropic.com/en/api/messages')}
                className="text-left p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <div className="text-white font-semibold">Anthropic API</div>
              </button>
              <button
                onClick={() => handleAnalyze('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array')}
                className="text-left p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <div className="text-white font-semibold">MDN Web Docs</div>
              </button>
              <button
                onClick={() => handleAnalyze('https://kubernetes.io/docs/concepts/overview/')}
                className="text-left p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <div className="text-white font-semibold">Kubernetes</div>
              </button>
              <button
                onClick={() => handleAnalyze('https://strudel.cc/learn/getting-started/')}
                className="text-left p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <div className="text-white font-semibold">Strudel Docs</div>
              </button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}