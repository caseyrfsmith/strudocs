export function generateStrudelPattern(metrics) {
  const {
    wordCount,
    codeBlocks,
    brokenLinks,
    headingHierarchy,
    headings,
    totalLinks,
  } = metrics;

  const totalHeadings = headings.total;
  const hasGoodStructure = headingHierarchy && totalHeadings > 3;
  const linkDensity = (totalLinks / wordCount) * 100;
  const isWellLinked = linkDensity > 2;

  const scales = {
    excellent: "<c3 e3 g3 b3>",
    good: "<c3 eb3 g3 bb3>",
    okay: "<c3 d3 f3 g3>",
    poor: "<c2 db2 eb2 gb2>",
    broken: "<c2 db2 d2 eb2>"
  };
  
  let scale;
  if (hasGoodStructure && brokenLinks === 0) scale = scales.excellent;
  else if (hasGoodStructure) scale = scales.good;
  else if (brokenLinks < 3) scale = scales.okay;
  else if (brokenLinks < 5) scale = scales.poor;
  else scale = scales.broken;
  
  const sound = codeBlocks > 8 ? "square" : codeBlocks > 5 ? "sawtooth" : codeBlocks > 2 ? "triangle" : "sine";
  const filterFreq = Math.max(300, Math.min(5000, 1000 + (codeBlocks * 200) + (isWellLinked ? 500 : 0)));
  const room = hasGoodStructure ? 0.3 : 0.9;
  const speed = wordCount > 3000 ? 1.5 : wordCount > 1500 ? 1.0 : 0.75;
  
  let pattern = `note("${scale}")
  .s("${sound}")
  .lpf(${filterFreq})
  .room(${room})
  .gain(0.5)
  .speed(${speed})`;

  const rhythmComplexity = codeBlocks + (totalHeadings / 2);
  
  if (rhythmComplexity > 0) {
    let drumPattern;
    if (rhythmComplexity > 15) {
      drumPattern = "bd [~ bd] ~ bd, ~ cp ~ [cp cp], [hh ~]*4";
    } else if (rhythmComplexity > 8) {
      drumPattern = "bd ~ ~ bd, ~ cp ~ cp, [~ hh]*4";
    } else if (rhythmComplexity > 4) {
      drumPattern = "bd ~ sd ~, [~ hh]*2";
    } else {
      drumPattern = "bd ~ ~ ~";
    }
    
    pattern += `
  .stack(
    s("${drumPattern}")
      .gain(0.3)
  )`;
  }

  if (isWellLinked && totalLinks > 10) {
    pattern += `
  .stack(
    s("[~ hh]*${Math.min(8, Math.floor(linkDensity))}")
      .gain(0.15)
  )`;
  }

  if (brokenLinks > 0) {
    const glitchIntensity = Math.min(brokenLinks / 5, 0.7);
    pattern += `
  .sometimes(rev)
  .sometimesBy(${glitchIntensity}, x => x.speed(perlin.range(0.5, 2)))`;
    
    if (brokenLinks > 5) {
      pattern += `
  .sometimes(x => x.crush(${4 + brokenLinks}))`;
    }
  }

  if (hasGoodStructure && codeBlocks > 3) {
    pattern += `
  .every(4, x => x.add(note("12")))`;
  }

  if (wordCount > 6000 || (wordCount > 4000 && codeBlocks < 5)) {
    pattern = `note(perlin.range(30, 80).segment(8))
  .s("square")
  .lpf(perlin.range(200, 3000))
  .crush(perlin.range(4, 10))
  .gain(0.4)
  .speed(perlin.range(0.8, 1.5))
  .stack(
    s("[bd sd cp hh]*8")
      .speed(perlin.range(0.5, 2))
      .degradeBy(0.3)
  )`;
  }

  return pattern;
}

export function generatePatternDescription(metrics) {
  if (metrics.wordCount > 4000 && metrics.brokenLinks > 5) {
    return "Chaotic experimental - dense with interruptions";
  }
  
  if (metrics.brokenLinks > 5) {
    return "Glitch hop - heavily processed";
  }
  
  if (metrics.brokenLinks > 3) {
    return "Lo-fi - textured and rough";
  }
  
  if (!metrics.headingHierarchy && metrics.codeBlocks < 3) {
    return "Free form - minimal structure";
  }
  
  if (!metrics.headingHierarchy) {
    return "Ambient drift - non-linear";
  }
  
  if (metrics.wordCount > 3000) {
    return "Progressive - complex and layered";
  }
  
  if (metrics.codeBlocks > 10 && metrics.headingHierarchy) {
    return "Technical jazz - intricate patterns";
  }
  
  if (metrics.codeBlocks > 5 && metrics.headingHierarchy) {
    return "Synth wave - structured and rhythmic";
  }
  
  if (metrics.codeBlocks < 2 && metrics.headingHierarchy) {
    return "Minimal - sparse and clean";
  }
  
  return "Balanced composition";
}