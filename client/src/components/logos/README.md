# Tech Board Logo Components

This directory contains the logo components for the Tech Board 2025 MCQ Testing System.

## Components

### TechBoardLogo
A React component that displays the Tech Board logo using the SVG file from `/public/logoSch.svg`.

**Features:**
- Automatic fallback to a styled text logo if SVG fails to load
- Responsive sizing
- Error handling
- Customizable styling

**Usage:**
```tsx
import TechBoardLogo from './components/TechBoardLogo';

// Basic usage
<TechBoardLogo />

// With custom size and styling
<TechBoardLogo 
  className="w-16 h-16 rounded-lg shadow-md" 
  width={64} 
  height={64}
  alt="Tech Board Logo"
/>
```

### TechBoardLogoSVG
A React component that renders an inline SVG version of the Tech Board logo.

**Features:**
- Inline SVG for better performance
- Customizable colors
- Scalable vector graphics
- No external dependencies

**Usage:**
```tsx
import TechBoardLogoSVG from './components/TechBoardLogoSVG';

// Basic usage
<TechBoardLogoSVG />

// With custom colors and size
<TechBoardLogoSVG 
  width={120} 
  height={60}
  colors={{
    primary: '#E67914',
    secondary: '#F4C005',
    accent: '#3A3633'
  }}
/>
```

## Props

### TechBoardLogo Props
- `className?: string` - CSS classes to apply
- `width?: number | string` - Logo width
- `height?: number | string` - Logo height
- `alt?: string` - Alt text for accessibility

### TechBoardLogoSVG Props
- `className?: string` - CSS classes to apply
- `width?: number | string` - Logo width (default: 120)
- `height?: number | string` - Logo height (default: 60)
- `colors?: object` - Color customization object
  - `primary?: string` - Primary color (default: '#E67914')
  - `secondary?: string` - Secondary color (default: '#F4C005')
  - `accent?: string` - Accent color (default: '#3A3633')

## Color Scheme

The default Tech Board colors are:
- **Primary Orange**: `#E67914`
- **Secondary Yellow**: `#F4C005`
- **Accent Dark**: `#3A3633`

## Examples

### Navigation Bar
```tsx
<nav className="flex items-center space-x-3">
  <TechBoardLogo className="w-10 h-10" width={40} height={40} />
  <span className="text-xl font-bold">Tech Board</span>
</nav>
```

### Hero Section Background
```tsx
<div className="relative">
  <div className="absolute inset-0 opacity-5">
    <TechBoardLogoSVG width={400} height={400} />
  </div>
  <div className="relative z-10">
    {/* Content */}
  </div>
</div>
```

### Footer
```tsx
<footer>
  <div className="flex items-center space-x-2">
    <TechBoardLogoSVG width={32} height={32} />
    <span>Powered by Maples Academy</span>
  </div>
</footer>
```

## Best Practices

1. **Use TechBoardLogo** for most cases where you want the full original logo
2. **Use TechBoardLogoSVG** when you need:
   - Custom colors
   - Inline SVG for performance
   - Simplified logo design
3. **Always provide alt text** for accessibility
4. **Use appropriate sizing** for the context (navigation, hero, footer, etc.)
5. **Consider the background** when choosing colors