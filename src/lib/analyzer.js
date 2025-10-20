import * as cheerio from 'cheerio';

export async function analyzeDocsPage(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Find main content area
    const content = $('main, article, .content, [role="main"]').first();
    const contentToAnalyze = content.length > 0 ? content : $('body');
    
    // Get text content
    const text = contentToAnalyze.text() || '';
    
    // Count headings
    const h1Count = contentToAnalyze.find('h1').length;
    const h2Count = contentToAnalyze.find('h2').length;
    const h3Count = contentToAnalyze.find('h3').length;
    const h4Count = contentToAnalyze.find('h4').length;
    const h5Count = contentToAnalyze.find('h5').length;
    const h6Count = contentToAnalyze.find('h6').length;
    const totalHeadings = h1Count + h2Count + h3Count + h4Count + h5Count + h6Count;
    
    // Count links
    const allLinks = contentToAnalyze.find('a');
    const totalLinks = allLinks.length;
    
    // Count broken anchor links
    const anchorLinks = contentToAnalyze.find('a[href^="#"]');
    let brokenAnchors = 0;
    anchorLinks.each((_, el) => {
      const href = $(el).attr('href');
      if (href && href !== '#') {
        const target = $(href);
        if (target.length === 0) {
          brokenAnchors++;
        }
      }
    });
    
    const metrics = {
      wordCount: text.split(/\s+/).filter(w => w.length > 0).length,
      codeBlocks: contentToAnalyze.find('pre').length,
      headings: {
        h1: h1Count,
        h2: h2Count,
        h3: h3Count,
        h4: h4Count,
        h5: h5Count,
        h6: h6Count,
        total: totalHeadings
      },
      totalLinks: totalLinks,
      brokenAnchors: brokenAnchors,
      sentences: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
      url: url,
      title: $('title').text() || 'Untitled'
    };
    
    // Calculate derived metrics
    const headingHierarchy = metrics.headings.h1 <= metrics.headings.h2 && 
                            metrics.headings.h2 >= metrics.headings.h3;
    const avgWordsPerSentence = metrics.wordCount / Math.max(metrics.sentences, 1);
    const readingLevel = Math.round(0.39 * avgWordsPerSentence + 11.8 - 15.59);
    
    return {
      ...metrics,
      headingHierarchy,
      readingLevel,
      brokenLinks: metrics.brokenAnchors
    };
    
  } catch (error) {
    throw new Error(`Failed to analyze page: ${error.message}`);
  }
}