import { chromium } from 'playwright';

export async function analyzeDocsPage(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);
    
    const metrics = await page.evaluate(() => {
      const content = document.querySelector('main, article, .content, [role="main"]') || document.body;
      const text = content.innerText || '';
      
      const h1Count = content.querySelectorAll('h1').length;
      const h2Count = content.querySelectorAll('h2').length;
      const h3Count = content.querySelectorAll('h3').length;
      const h4Count = content.querySelectorAll('h4').length;
      const h5Count = content.querySelectorAll('h5').length;
      const h6Count = content.querySelectorAll('h6').length;
      const totalHeadings = h1Count + h2Count + h3Count + h4Count + h5Count + h6Count;
      
      const allLinks = content.querySelectorAll('a');
      const totalLinks = allLinks.length;
      
      const brokenAnchors = Array.from(content.querySelectorAll('a[href^="#"]')).filter(a => {
        const target = a.getAttribute('href');
        return target && !document.querySelector(target);
      }).length;
      
      return {
        wordCount: text.split(/\s+/).length,
        codeBlocks: content.querySelectorAll('pre').length,
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
        sentences: text.split(/[.!?]+/).length,
        url: window.location.href,
        title: document.title
      };
    });
    
    const headingHierarchy = metrics.headings.h1 <= metrics.headings.h2 && metrics.headings.h2 >= metrics.headings.h3;
    const avgWordsPerSentence = metrics.wordCount / metrics.sentences;
    const readingLevel = Math.round(0.39 * avgWordsPerSentence + 11.8 - 15.59);
    
    await browser.close();
    
    return {
      ...metrics,
      headingHierarchy,
      readingLevel,
      brokenLinks: metrics.brokenAnchors
    };
    
  } catch (error) {
    await browser.close();
    throw error;
  }
}