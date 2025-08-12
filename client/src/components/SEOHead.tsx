import React from 'react';
import { generateMetaTags, generateStructuredData, StructuredData } from '../utils/seo';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: StructuredData;
  noindex?: boolean;
}

// SEO-optimized Head component for better search engine visibility
export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
  structuredData,
  noindex = false
}) => {
  const metaTags = generateMetaTags({
    title,
    description,
    keywords,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    canonicalUrl,
    noindex
  });

  return (
    <>
      <title>{title}</title>

      {metaTags.map((tag, index) => {
        if ('name' in tag) {
          return <meta key={index} name={tag.name} content={tag.content} />;
        }
        if ('property' in tag) {
          return <meta key={index} property={tag.property} content={tag.content} />;
        }
        if ('rel' in tag) {
          return <link key={index} rel={tag.rel} href={tag.href} />;
        }
        return null;
      })}

      {/* Open Graph meta tags for social sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TECH BOARD 2025 MCQ System" />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Structured data for rich snippets */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateStructuredData(structuredData)
          }}
        />
      )}

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    </>
  );
};

// Specialized SEO components for different page types
export const QuizPageSEO: React.FC<{
  grade: string;
  subject: string;
  questionCount: number;
  difficulty?: string;
}> = ({ grade, subject, questionCount, difficulty }) => {
  const title = `${grade} ${subject} MCQ Quiz - ${questionCount} Questions | TECH BOARD 2025`;
  const description = `Test your knowledge with our comprehensive ${grade} ${subject} multiple choice quiz. ${questionCount} carefully crafted questions${difficulty ? ` at ${difficulty} level` : ''}.`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: title,
    description,
    educationalLevel: grade,
    learningResourceType: 'Assessment',
    numberOfQuestions: questionCount,
    ...(difficulty && { difficulty })
  };

  return (
    <SEOHead
      title={title}
      description={description}
      keywords={`${grade}, ${subject}, MCQ, quiz, multiple choice, test, exam, practice`}
      structuredData={structuredData}
    />
  );
};

export const GradePageSEO: React.FC<{
  grade: string;
  subjects: string[];
  totalQuestions: number;
}> = ({ grade, subjects, totalQuestions }) => {
  const title = `${grade} MCQ Practice Tests - All Subjects | TECH BOARD 2025`;
  const description = `Comprehensive ${grade} MCQ practice tests covering ${subjects.join(', ')}. Over ${totalQuestions} questions to help you excel in your exams.`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${grade} MCQ Practice`,
    description,
    educationalLevel: grade,
    courseCode: grade.replace(/\s+/g, ''),
    numberOfCredits: subjects.length
  };

  return (
    <SEOHead
      title={title}
      description={description}
      keywords={`${grade}, MCQ, practice test, ${subjects.join(', ')}, exam preparation`}
      structuredData={structuredData}
    />
  );
};

export const HomePageSEO: React.FC<{
  totalQuestions: number;
  grades: string[];
}> = ({ totalQuestions, grades }) => {
  const title = 'TECH BOARD 2025 MCQ Testing System - Practice Tests for All Grades';
  const description = `Master your exams with our comprehensive MCQ testing system. Over ${totalQuestions} questions across ${grades.join(', ')}. Start practicing today!`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'TECH BOARD 2025 MCQ System',
    description,
    url: typeof window !== 'undefined' ? window.location.origin : '',
    educationalCredentialAwarded: 'Practice Certificate'
  };

  return (
    <SEOHead
      title={title}
      description={description}
      keywords="MCQ, multiple choice questions, exam practice, test preparation, online quiz, education, heoster"
      structuredData={structuredData}
    />
  );
};