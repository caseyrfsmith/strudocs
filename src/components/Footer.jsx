import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 pt-8 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-purple-300 text-sm">
        <div className="flex items-center gap-2">
          <span>Built by</span>
          <a
            href="https://docsgoblin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-200 hover:text-white transition-colors flex items-center gap-1"
          >
            CT Smith
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        
        <div className="flex items-center gap-6">
          <a
            href="https://strudel.cc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            Powered by Strudel
            <ExternalLink className="w-3 h-3" />
          </a>
          
          <a
            href="https://github.com/caseyrfsmith/strudocs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Github className="w-4 h-4" />
            View source
          </a>
        </div>
      </div>
    </footer>
  );
}