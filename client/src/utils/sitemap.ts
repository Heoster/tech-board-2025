// Sitemap generation utilities for SEO optimization
// Implements the sitemap.xml recommendations from the SEO guide

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

interface SitemapConfig {
  baseUrl: string;
  grades: string[];
  subjects: Record<string, string[]>; // grade -> subjects mapping
}

// Generate sitemap entries for the MCQ system
export const generateSitemapEntries = (config: SitemapConfig): SitemapEntry[] => {
  const entries: SitemapEntry[] = [];
  const { baseUrl, grades, subjects } = config;

  // Homepage - highest priority
  entries.push({
    url: baseUrl,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 1.0
  });

  // Grade pages - high priority
  grades.forEach(grade => {
    entries.push({
      url: `${baseUrl}/${grade.toLowerCase().replace(/\s+/g, '-')}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 0.8
    });

    // Subject pages for each grade - medium priority
    const gradeSubjects = subjects[grade] || [];
    gradeSubjects.forEach(subject => {
      entries.push({
        url: `${baseUrl}/${grade.toLowerCase().replace(/\s+/g, '-')}/${subject.toLowerCase().replace(/\s+/g, '-')}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 0.6
      });

      // Quiz pages - medium priority
      entries.push({
        url: `${baseUrl}/${grade.toLowerCase().replace(/\s+/g, '-')}/${subject.toLowerCase().replace(/\s+/g, '-')}/quiz`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.5
      });
    });
  });

  // Static pages - lower priority
  const staticPages = [
    { path: '/about', priority: 0.4 },
    { path: '/contact', priority: 0.4 },
    { path: '/privacy', priority: 0.3 },
    { path: '/terms', priority: 0.3 }
  ];

  staticPages.forEach(page => {
    entries.push({
      url: `${baseUrl}${page.path}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: page.priority
    });
  });

  return entries;
};

// Generate XML sitemap content
export const generateSitemapXML = (entries: SitemapEntry[]): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';

  const urlEntries = entries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('');

  return `${xmlHeader}\n${urlsetOpen}${urlEntries}\n${urlsetClose}`;
};

// Generate robots.txt content
export const generateRobotsTxt = (baseUrl: string): string => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/

# Allow important pages
Allow: /api/performance/metrics

# Crawl delay (optional)
Crawl-delay: 1`;
};

// Validate sitemap entries for SEO best practices
export const validateSitemapEntries = (entries: SitemapEntry[]): {
  isValid: boolean;
  warnings: string[];
  recommendations: string[];
} => {
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Check total number of URLs (should be under 50,000)
  if (entries.length > 50000) {
    warnings.push('Sitemap contains more than 50,000 URLs. Consider splitting into multiple sitemaps.');
  }

  // Check for duplicate URLs
  const urls = entries.map(entry => entry.url);
  const duplicates = urls.filter((url, index) => urls.indexOf(url) !== index);
  if (duplicates.length > 0) {
    warnings.push(`Found ${duplicates.length} duplicate URLs in sitemap.`);
  }

  // Check priority distribution
  const highPriorityCount = entries.filter(entry => entry.priority > 0.8).length;
  if (highPriorityCount > entries.length * 0.1) {
    recommendations.push('Consider reducing the number of high-priority pages (>0.8) to less than 10% of total pages.');
  }

  // Check for very old lastmod dates
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const oldEntries = entries.filter(entry => new Date(entry.lastmod) < oneYearAgo);
  if (oldEntries.length > 0) {
    recommendations.push(`${oldEntries.length} pages have lastmod dates older than one year. Consider updating them.`);
  }

  return {
    isValid: warnings.length === 0,
    warnings,
    recommendations
  };
};

// Generate sitemap index for large sites
export const generateSitemapIndex = (sitemapUrls: string[], baseUrl: string): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const sitemapIndexOpen = '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const sitemapIndexClose = '</sitemapindex>';

  const sitemapEntries = sitemapUrls.map(url => `
  <sitemap>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('');

  return `${xmlHeader}\n${sitemapIndexOpen}${sitemapEntries}\n${sitemapIndexClose}`;
};