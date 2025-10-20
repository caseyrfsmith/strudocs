# Strudocs

Turn documentation into live-coded music. Paste any docs URL and hear its metrics as a Strudel pattern.

**Important: This is a playful art project, not a real documentation quality analyzer.** The music patterns are generated from arbitrary metric mappings and don't represent actual doc quality. I made this for fun. 

## What it does

Strudocs analyzes documentation pages and translates their metrics into music code. Each page gets a unique sonic pattern based on word count, code blocks, headings, links, and structure.

The music patterns are created using deterministic rules, not AI or machine learning. We count metrics (like code blocks and headings), then map those numbers to musical parameters using simple if/else logic. No neural networks, no training data, just straightforward code.

## How it works

1. You paste a documentation URL
2. Playwright crawler extracts metrics from the page
3. Pattern generator maps metrics to Strudel music parameters
4. Embedded Strudel player loads and plays the generated pattern
5. Every analysis generates a unique pattern based on that page's specific metrics

## Metrics analyzed

- **Word count** - Total words on the page
- **Code blocks** - Number of code examples (only `<pre>` tags, not inline code)
- **Headings** - Total count of all headings (h1-h6)
- **Links** - Total number of links on the page
- **Broken links** - Anchor links with no target
- **Heading hierarchy** - Whether headings follow proper structure

## Musical mappings (completely arbitrary)

### Heading structure to scale
- Good hierarchy (h1 < h2 < h3) produces harmonious major-ish scales
- Poor or flat hierarchy produces dissonant dark scales

### Code examples to sound texture
- Many code blocks (8+) use square waves (retro, harsh)
- Good amount (5-8) use sawtooth waves (bright, modern synth)
- Some (2-5) use triangle waves (warm, balanced)
- Few (0-2) use sine waves (pure, simple)

### Code examples and headings to rhythm
- Rhythm complexity calculated from code blocks plus half the heading count
- Very high complexity (15+) adds jazz-like drum patterns
- High complexity (8+) adds full beats with kick, snare, hi-hats
- Medium complexity (4+) adds simple beats
- Low complexity adds minimal kick drum only

### Link density to hi-hat layers
- Pages with more than 2 links per 100 words get extra hi-hat percussion
- More links = more textured rhythm

### Filter brightness
- Based on code blocks and link density
- More code examples and better linking = brighter, higher-frequency filters
- Minimal content = muted, low-frequency filters

### Structure to reverb
- Good structure has tight, focused reverb (0.3)
- Poor structure has spacious, echoey reverb (0.9)

### Broken links to glitches
- Adds random reversals and speed changes
- More broken links = more audio artifacts and bit crushing

### Word count to speed
- Dense docs (3000+ words) play fast (1.5x speed)
- Medium docs (1500-3000) play normal speed
- Sparse docs play slow (0.75x speed)

### Content overload to chaos
- Pages over 6000 words trigger complete sonic chaos
- Or pages over 4000 words with fewer than 5 code blocks
- Random pitches, bit crushing, and unpredictable patterns

## Tech stack

- **Frontend** - React, Vite, Tailwind CSS
- **Crawler** - Playwright for browser automation
- **Analysis** - Custom metrics extraction in browser context
- **Music** - Strudel embedded web component
- **API** - Express server for local dev, Vercel serverless for production
- **Deploy** - Vercel

## Installation

```bash
# Clone the repository
git clone https://github.com/caseyrfsmith/strudocs
cd strudocs

# Install dependencies
npm install

# Install Playwright browser
npx playwright install chromium
```

## Development

Run both the frontend and API server:

```bash
npm run dev:all
```

Or run them separately:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - API
npm run dev:api
```

The app will be available at `http://localhost:5173`

## Project structure

```
strudocs/
├── src/
│   ├── components/
│   │   ├── App.jsx              # Main application
│   │   ├── AnalyzeForm.jsx      # URL input form
│   │   ├── MetricsDisplay.jsx   # Metrics visualization
│   │   ├── StrudelPlayer.jsx    # Embedded music player
│   │   ├── HowItWorks.jsx       # Explanation accordion
│   │   └── Footer.jsx           # Footer with links
│   └── lib/
│       ├── analyzer.js           # Playwright crawler
│       └── patternGenerator.js   # Metrics to music mapping
├── api/
│   └── analyze.js                # Serverless function
├── server.js                     # Local dev API server
├── index.html
├── vite.config.js
└── package.json
```

## Deployment to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Vercel will automatically detect the serverless function in the `api/` directory.


## Why this exists

This is a creative exploration of data sonification - turning information into sound. Every documentation page has a unique "fingerprint" of metrics, and translating that into music creates something playful and unexpected. It's also a fun way to introduce people to Strudel's live coding environment, which I was recently introduced to (and delighted by).

## Credits

Built with [Strudel](https://strudel.cc/), a browser-based live coding environment for music patterns created by Felix Roos. Strudel brings TidalCycles-style pattern language to JavaScript.

## License

AGPL-3.0-or-later

This project uses Strudel, which is licensed under the GNU Affero General Public License v3.0 or later. As required by that license, this project is also distributed under AGPL-3.0-or-later. This means:

- You can use, modify, and distribute this software
- You must make your source code available when you distribute it
- Any derivative works must also be licensed under AGPL-3.0 or compatible licenses
- If you run a modified version as a web service, you must make the source available to users

See the [LICENSE](LICENSE) file for full details.