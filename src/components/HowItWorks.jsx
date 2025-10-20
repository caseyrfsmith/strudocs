import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function HowItWorks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-4 flex items-center justify-between text-white hover:bg-white/5 transition-colors"
      >
        <span className="text-lg font-semibold">How does this work?</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      
      {isOpen && (
        <div className="px-8 pb-8 text-purple-200 space-y-6">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-200 text-sm">
              <strong>Important:</strong> This is a playful art project, not a real documentation quality analyzer! 
              The music patterns are generated from arbitrary metrics and don't represent actual doc quality.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2">The process</h3>
            <ol className="space-y-2 list-decimal list-inside">
              <li>A headless browser (Playwright) visits the documentation URL</li>
              <li>We count basic metrics: words, code blocks, headings, links, broken anchor links</li>
              <li>These numbers get mapped to musical parameters (scales, sounds, rhythms)</li>
              <li>We generate live-coded music using Strudel's pattern language</li>
              <li>The pattern plays in an embedded Strudel player</li>
            </ol>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2">Musical mappings (completely arbitrary!)</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-blue-300 font-medium">Heading structure → Musical scale</div>
                <div className="text-purple-300 mt-1">
                  Standard hierarchy (h1 &lt; h2 &lt; h3) = harmonious scales. Flat structure = dissonant scales.
                  <br/><span className="text-purple-400 text-xs italic">Why? No reason. It just sounds cool.</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-green-300 font-medium">Code blocks → Sound texture & rhythm</div>
                <div className="text-purple-300 mt-1">
                  More code examples = brighter synth tones + fuller drum patterns.
                  <br/><span className="text-purple-400 text-xs italic">More code blocks = more beep and boops.</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-red-300 font-medium">Broken links → Glitchy effects</div>
                <div className="text-purple-300 mt-1">
                  Broken anchor links (#links with no target) add audio distortion and speed randomization.
                  <br/><span className="text-purple-400 text-xs italic">Broken things sound broken!</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-purple-300 font-medium">Link density → Hi-hat layers</div>
                <div className="text-purple-300 mt-1">
                  Pages with a lot of links per 100 words get extra hi-hat percussion layers.
                  <br/><span className="text-purple-400 text-xs italic">Links = connections = more noises</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-yellow-300 font-medium">Word count → Speed and chaos</div>
                <div className="text-purple-300 mt-1">
                  Dense docs play faster. Super long pages (6000+ words) trigger complete sonic chaos.
                  <br/><span className="text-purple-400 text-xs italic">I don't have a reason for this.</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2">About Strudel</h3>
            <p className="text-sm">
              This tool uses{' '}
              <a 
                href="https://strudel.cc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 underline"
              >
                Strudel
              </a>
              , a browser-based live coding environment for music created by Felix Roos. The patterns you hear are 
              actual code that generates music in real-time using algorithmic patterns and synthesis. It's like 
              TidalCycles but in JavaScript!
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2">Why did I make this?</h3>
            <p className="text-sm">
              Because it's fun! This is a creative exploration of data sonification - turning information into 
              sound. Every documentation page has a unique "fingerprint" of metrics, and translating that into 
              music creates something goofy and fun. Plus, Strudel is neat and more people should know about it.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}