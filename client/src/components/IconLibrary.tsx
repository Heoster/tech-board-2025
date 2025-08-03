// React import removed as it's not used in this file

interface IconProps {
  className?: string;
  size?: number;
}

// Modern SVG Icons for 2025 design
export const Icons = {
  // Grade/Education Icons
  GradeBook: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L3 7L12 12L21 7L12 2Z" />
      <path d="M3 17L12 22L21 17" />
      <path d="M3 12L12 17L21 12" />
    </svg>
  ),

  // Computer/Tech Icons
  Computer: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 3H4C2.9 3 2 3.9 2 5V15C2 16.1 2.9 17 4 17H9L8 19V20H16V19L15 17H20C21.1 17 22 16.1 22 15V5C22 3.9 21.1 3 20 3ZM20 15H4V5H20V15Z"/>
    </svg>
  ),

  // Quiz/Test Icons
  Quiz: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
      <path d="M8,12V14H16V12H8M8,16V18H13V16H8Z"/>
    </svg>
  ),

  // Progress/Achievement Icons
  Trophy: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15H17C17,17.32 14.75,19 12,19C9.25,19 7,17.32 7,15M12,1L9,4H15L12,1M12,4C8.13,4 5,7.13 5,11C5,11.64 5.11,12.26 5.29,12.85L4.59,13.54C4.22,13.91 4.22,14.5 4.59,14.87L5.46,15.74C5.83,16.11 6.42,16.11 6.79,15.74L7.5,15.03C8.09,15.21 8.71,15.32 9.35,15.32H14.65C15.29,15.32 15.91,15.21 16.5,15.03L17.21,15.74C17.58,16.11 18.17,16.11 18.54,15.74L19.41,14.87C19.78,14.5 19.78,13.91 19.41,13.54L18.71,12.85C18.89,12.26 19,11.64 19,11C19,7.13 15.87,4 12,4Z"/>
    </svg>
  ),

  // Navigation Icons
  ArrowRight: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  ),

  ArrowLeft: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ),

  // Status Icons
  CheckCircle: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" clipRule="evenodd" />
    </svg>
  ),

  XCircle: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" clipRule="evenodd" />
    </svg>
  ),

  // Time/Clock Icons
  Clock: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" clipRule="evenodd" />
    </svg>
  ),

  // Theme Icons
  Sun: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
    </svg>
  ),

  Moon: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  ),

  // Download/Share Icons
  Download: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),

  Share: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
  ),

  // Refresh/Retry Icons
  Refresh: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),

  // Home Icon
  Home: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),

  // Info Icon
  Info: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),

  // Star Icon
  Star: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),

  // Lightning/Speed Icon
  Lightning: ({ className = "w-6 h-6", size }: IconProps) => (
    <svg className={className} width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
  )
};

export default Icons;