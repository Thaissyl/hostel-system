# Responsive & Accessibility - Hostel Management System

**Version:** 1.0
**Last Updated:** 2026-01-11

---

## Responsive Breakpoints

### Breakpoint System (Tailwind Default)

```css
/* Mobile First Approach */

/* Extra Small (Mobile) - Default */
@media (min-width: 0px) { /* No prefix */ }
/* Screen: 320px - 639px */

/* Small (Tablet) */
@media (min-width: 640px) { /* sm: prefix */ }
/* Screen: 640px - 767px */

/* Medium (Tablet Landscape) */
@media (min-width: 768px) { /* md: prefix */ }
/* Screen: 768px - 1023px */

/* Large (Desktop) */
@media (min-width: 1024px) { /* lg: prefix */ }
/* Screen: 1024px - 1279px */

/* Extra Large (Large Desktop) */
@media (min-width: 1280px) { /* xl: prefix */ }
/* Screen: 1280px - 1535px */

/* 2X Large (Extra Large Desktop) */
@media (min-width: 1536px) { /* 2xl: prefix */ }
/* Screen: 1536px+ */
```

### Container Max Widths

```css
/* Container sizes */
.container {
  @apply w-full mx-auto px-4 sm:px-6 lg:px-8;
}

.container-sm { @apply max-w-screen-sm; }  /* 640px */
.container-md { @apply max-w-screen-md; }  /* 768px */
.container-lg { @apply max-w-screen-lg; }  /* 1024px */
.container-xl { @apply max-w-screen-xl; }  /* 1280px */
.container-2xl { @apply max-w-screen-2xl; } /* 1536px */
```

### Layout Patterns by Breakpoint

| Component | Mobile (320px+) | Tablet (768px+) | Desktop (1024px+) |
|-----------|-----------------|-----------------|-------------------|
| **Navbar** | Hamburger menu | Full nav | Full nav + CTA |
| **Grid** | 1 column | 2 columns | 3-4 columns |
| **Sidebar** | Hidden/off-canvas | Collapsible | Always visible |
| **Card** | Full width | 2 per row | 3 per row |
| **Font size** | Base | Base + 1 | Base + 2 |
| **Padding** | 1rem | 1.5rem | 2rem |

---

## Accessibility Standards

### WCAG 2.1 AA Compliance

All components must meet WCAG 2.1 AA standards:

#### Color Contrast

- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text (18px+)**: Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio
- **Graphical objects**: Minimum 3:1 contrast ratio

#### Keyboard Navigation

```html
<!-- All interactive elements must be keyboard accessible -->
<button class="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
  Accessible Button
</button>

<a href="#" class="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded">
  Accessible Link
</a>
```

#### Focus Indicators

```css
/* Visible focus indicator for all interactive elements */
.focus-visible {
  @apply outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
}
```

#### ARIA Labels

```html
<!-- Icon buttons must have aria-label -->
<button aria-label="Close modal">
  <svg class="w-6 h-6">...</svg>
</button>

<!-- Form inputs must have associated labels -->
<label for="search">Search</label>
<input id="search" type="text">

<!-- Or use aria-label if label is not visible -->
<input aria-label="Search hostels" type="text">
```

#### Screen Reader Support

```html
<!-- Screen reader only text -->
<span class="sr-only">This text is only visible to screen readers</span>

<!-- Hide decorative elements from screen readers -->
<img src="..." alt="" role="presentation">

<!-- Announce dynamic content -->
<div role="status" aria-live="polite">
  Booking confirmed! Check your email for details.
</div>
```

#### Skip Links

```html
<!-- Skip to main content link -->
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-lg">
  Skip to main content
</button>
```

#### Semantic HTML

```html
<!-- Use proper heading hierarchy -->
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>

<!-- Use landmark regions -->
<header role="banner">
<nav role="navigation" aria-label="Main">
<main role="main" id="main-content">
<aside role="complementary">
<footer role="contentinfo">
```

---

## Animation Guidelines

### Animation Duration

```css
/* Fast interactions - 100-150ms */
.animation-fast {
  animation-duration: 100ms;
  transition-duration: 150ms;
}

/* Standard transitions - 200-300ms */
.animation-base {
  animation-duration: 200ms;
  transition-duration: 250ms;
}

/* Slow, deliberate - 400-500ms */
.animation-slow {
  animation-duration: 400ms;
  transition-duration: 500ms;
}
```

### Easing Functions

```css
/* Enter animations - Ease out */
.transition-enter {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1); /* ease-out */
}

/* Exit animations - Ease in */
.transition-exit {
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1); /* ease-in */
}

/* Standard transitions - Ease in out */
.transition-standard {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); /* ease-in-out */
}
```

### Respects Reduced Motion

```css
/* Check for reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Common Animations

```css
/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale in */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Usage */
.animate-fade-in {
  animation: fadeIn 250ms ease-out;
}

.animate-slide-up {
  animation: slideUp 300ms ease-out;
}
```

### Hover Animations

```css
/* DO - Smooth color transitions */
.button-hover {
  @apply transition-colors duration-200 ease-out;
}

/* DON'T - Scale transforms that shift layout */
.button-hover-bad {
  @apply transition-transform duration-200;
}
.button-hover-bad:hover {
  @apply scale-105; /* Causes layout shift */
}

/* DO - Subtle shadow expansion */
.card-hover {
  @apply transition-shadow duration-200 ease-out;
}
.card-hover:hover {
  @apply shadow-md;
}
```

---

**Previous:** [03 - Components](./03-components.md)
**Next:** [05 - Icons, Layout & Tokens](./05-icons-layout-tokens.md)
