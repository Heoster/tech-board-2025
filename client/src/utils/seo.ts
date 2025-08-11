// SEO utilities for TECH BOARD 2025 MCQ Testing System
// Optimized for educational content and quiz platforms

interface SEOMetaTags {
    title: string;
    description: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
    noindex?: boolean;
}

interface StructuredData {
    '@context': string;
    '@type': string;
    [key: string]: any;
}

// Meta tag types
type MetaTag =
    | { name: string; content: string }
    | { property: string; content: string }
    | { rel: string; href: string };

// Generate meta tags for better SEO
export const generateMetaTags = (config: SEOMetaTags): MetaTag[] => {
    const tags: MetaTag[] = [
        { name: 'description', content: config.description },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ];

    if (config.keywords) {
        tags.push({ name: 'keywords', content: config.keywords });
    }

    if (config.ogTitle) {
        tags.push({ property: 'og:title', content: config.ogTitle });
    }

    if (config.ogDescription) {
        tags.push({ property: 'og:description', content: config.ogDescription });
    }

    if (config.ogImage) {
        tags.push({ property: 'og:image', content: config.ogImage });
    }

    if (config.canonicalUrl) {
        tags.push({ rel: 'canonical', href: config.canonicalUrl });
    }

    if (config.noindex) {
        tags.push({ name: 'robots', content: 'noindex, nofollow' });
    }

    return tags;
};

// Generate structured data for rich snippets
export const generateStructuredData = (data: StructuredData): string => {
    return JSON.stringify(data);
};

// Common structured data templates
export const structuredDataTemplates = {
    organization: (name: string, url: string, logo?: string): StructuredData => ({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name,
        url,
        ...(logo && { logo })
    }),

    educationalOrganization: (name: string, url: string, description: string): StructuredData => ({
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name,
        url,
        description,
        educationalCredentialAwarded: 'Certificate'
    }),

    quiz: (name: string, description: string, grade: string): StructuredData => ({
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name,
        description,
        educationalLevel: grade,
        learningResourceType: 'Assessment'
    }),

    breadcrumb: (items: Array<{ name: string; url: string }>): StructuredData => ({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
        }))
    })
};

// SEO-friendly URL generation
export const generateSEOFriendlySlug = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim();
};

// Generate sitemap entry
export const generateSitemapEntry = (
    url: string,
    lastmod?: Date,
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
    priority?: number
) => {
    return {
        url,
        lastmod: lastmod?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
        changefreq: changefreq || 'weekly',
        priority: priority || 0.5
    };
};

// Check if page meets SEO best practices
export const validateSEORequirements = (config: {
    title?: string;
    description?: string;
    headings?: string[];
    images?: Array<{ alt?: string; src: string }>;
    links?: Array<{ href: string; text: string }>;
}) => {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Title validation
    if (!config.title) {
        issues.push('Missing page title');
    } else if (config.title.length < 30) {
        recommendations.push('Title could be longer (30-60 characters recommended)');
    } else if (config.title.length > 60) {
        recommendations.push('Title is too long (60 characters max recommended)');
    }

    // Description validation
    if (!config.description) {
        issues.push('Missing meta description');
    } else if (config.description.length < 120) {
        recommendations.push('Description could be longer (120-160 characters recommended)');
    } else if (config.description.length > 160) {
        recommendations.push('Description is too long (160 characters max recommended)');
    }

    // Heading structure validation
    if (config.headings && config.headings.length > 0) {
        const h1Count = config.headings.filter(h => h.startsWith('h1')).length;
        if (h1Count === 0) {
            issues.push('Missing H1 heading');
        } else if (h1Count > 1) {
            issues.push('Multiple H1 headings found (should be only one)');
        }
    }

    // Image alt text validation
    if (config.images) {
        const imagesWithoutAlt = config.images.filter(img => !img.alt);
        if (imagesWithoutAlt.length > 0) {
            issues.push(`${imagesWithoutAlt.length} images missing alt text`);
        }
    }

    // Link validation
    if (config.links) {
        const emptyLinks = config.links.filter(link => !link.text.trim());
        if (emptyLinks.length > 0) {
            issues.push(`${emptyLinks.length} links with empty anchor text`);
        }
    }

    return {
        isValid: issues.length === 0,
        issues,
        recommendations,
        score: Math.max(0, 100 - (issues.length * 20) - (recommendations.length * 5))
    };
};

// Performance-based SEO recommendations
export const getPerformanceSEORecommendations = (coreWebVitals: {
    fcp: number;
    lcp: number;
    fid: number;
    cls: number;
    ttfb: number;
}) => {
    const recommendations: string[] = [];

    if (coreWebVitals.fcp > 1800) {
        recommendations.push('Optimize First Contentful Paint (FCP) - consider code splitting and resource optimization');
    }

    if (coreWebVitals.lcp > 2500) {
        recommendations.push('Improve Largest Contentful Paint (LCP) - optimize images and critical resources');
    }

    if (coreWebVitals.fid > 100) {
        recommendations.push('Reduce First Input Delay (FID) - minimize JavaScript execution time');
    }

    if (coreWebVitals.cls > 0.1) {
        recommendations.push('Fix Cumulative Layout Shift (CLS) - ensure stable layouts and reserve space for dynamic content');
    }

    if (coreWebVitals.ttfb > 800) {
        recommendations.push('Improve Time to First Byte (TTFB) - optimize server response time and caching');
    }

    return recommendations;
};

// Default SEO configurations for TECH BOARD 2025 MCQ System
export const defaultSEOConfig = {
    siteName: 'TECH BOARD 2025 MCQ test',
    siteDescription: 'Comprehensive MCQ testing platform for students preparing for TECH BOARD 2025 examinations. Practice tests for grades 6-12 across multiple subjects.',
    siteUrl: import.meta.env.VITE_SITE_URL || 'https://techboard2025.com',
    defaultImage: '/images/og-default.jpg',
    twitterHandle: '@techboard2025',
    keywords: 'MCQ tests, TECH BOARD 2025, online examination, student assessment, practice tests, educational platform, heoster'
};

// Generate page-specific SEO for quiz pages
export const generateQuizSEO = (grade: string, subject: string, questionCount: number): SEOMetaTags => {
    const title = `Grade ${grade} ${subject} MCQ Test - ${questionCount} Questions | TECH BOARD 2025`;
    const description = `Practice ${subject} with ${questionCount} multiple choice questions for Grade ${grade}. Prepare for TECH BOARD 2025 examinations with our comprehensive MCQ testing platform.`;

    return {
        title,
        description,
        keywords: `Grade ${grade}, ${subject}, MCQ, multiple choice questions, TECH BOARD 2025, practice test, examination preparation`,
        ogTitle: title,
        ogDescription: description,
        ogImage: `${defaultSEOConfig.siteUrl}/images/quiz-${grade}-${subject.toLowerCase()}.jpg`
    };
};

// Generate SEO for student dashboard
export const generateDashboardSEO = (studentName?: string): SEOMetaTags => {
    const title = studentName
        ? `${studentName}'s Dashboard | TECH BOARD 2025 MCQ System`
        : 'Student Dashboard | TECH BOARD 2025 MCQ System';
    const description = 'Access your personalized dashboard to track progress, view test results, and continue your TECH BOARD 2025 examination preparation.';

    return {
        title,
        description,
        keywords: 'student dashboard, progress tracking, test results, TECH BOARD 2025, MCQ system',
        ogTitle: title,
        ogDescription: description,
        noindex: true // Dashboard pages should not be indexed
    };
};

// Generate SEO for grade-specific landing pages
export const generateGradeSEO = (grade: string, subjectCount: number): SEOMetaTags => {
    const title = `Grade ${grade} MCQ Tests & Practice Questions | TECH BOARD 2025`;
    const description = `Comprehensive Grade ${grade} MCQ tests covering ${subjectCount} subjects. Practice with thousands of questions designed for TECH BOARD 2025 examination preparation.`;

    return {
        title,
        description,
        keywords: `Grade ${grade}, MCQ tests, practice questions, TECH BOARD 2025, examination preparation, multiple subjects`,
        ogTitle: title,
        ogDescription: description,
        ogImage: `${defaultSEOConfig.siteUrl}/images/grade-${grade}-overview.jpg`
    };
};