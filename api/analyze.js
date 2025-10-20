import { analyzeDocsPage } from '../src/lib/analyzer.js';
import { generateStrudelPattern, generatePatternDescription } from '../src/lib/patternGenerator.js';

async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL required' });
  }

  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const metrics = await analyzeDocsPage(url);
    const pattern = generateStrudelPattern(metrics);
    const description = generatePatternDescription(metrics);

    return res.status(200).json({
      metrics,
      pattern,
      description
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({ 
      error: 'Failed to analyze documentation',
      details: error.message 
    });
  }
}

export default handler;