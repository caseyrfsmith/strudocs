import React from 'react';
import { FileText, Code, Link, BarChart } from 'lucide-react';

export default function MetricsDisplay({ metrics }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Documentation Metrics</h2>
      
      <div className="mb-4">
        <div className="text-purple-200 text-sm mb-1">Analyzing:</div>
        <div className="text-white font-mono text-sm break-all">{metrics.url}</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MetricCard
          icon={<FileText className="w-5 h-5" />}
          label="Words"
          value={metrics.wordCount.toLocaleString()}
          color="blue"
        />
        <MetricCard
          icon={<Code className="w-5 h-5" />}
          label="Code Blocks"
          value={metrics.codeBlocks}
          color="purple"
        />
        <MetricCard
          icon={<BarChart className="w-5 h-5" />}
          label="Headings"
          value={metrics.headings.total}
          color="cyan"
        />
        <MetricCard
          icon={<Link className="w-5 h-5" />}
          label="Links"
          value={metrics.totalLinks}
          color="green"
        />
        <MetricCard
          icon={<Link className="w-5 h-5" />}
          label="Broken Links"
          value={metrics.brokenLinks}
          color="pink"
        />
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, color }) {
  const colors = {
    blue: 'from-blue-500/30 border-blue-400',
    green: 'from-green-500/30 border-green-400',
    yellow: 'from-yellow-500/30 border-yellow-400',
    red: 'from-red-500/30 border-red-400',
    purple: 'from-purple-500/30 border-purple-400',
    pink: 'from-pink-500/30 border-pink-400',
    cyan: 'from-cyan-500/30 border-cyan-400'
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} border-2 backdrop-blur-sm rounded-xl p-4`}>
      <div className="text-white/70 mb-2">{icon}</div>
      <div className="text-white font-bold text-2xl mb-1">{value}</div>
      <div className="text-white/80 text-xs uppercase tracking-wide">{label}</div>
    </div>
  );
}
