# Icons, Layout & Tokens - Hostel Management System

**Version:** 1.0
**Last Updated:** 2026-01-11

---

## Icon System

### Icon Library

**Primary:** Lucide Icons (recommended for shadcn/ui)

**Why Lucide:**
- Clean, consistent design
- Lightweight SVG
- Excellent accessibility
- Easy to customize
- Works perfectly with Tailwind CSS

### Icon Sizing

```css
/* Standard icon sizes */
.icon-xs { @apply w-3 h-3; }  /* 12px */
.icon-sm { @apply w-4 h-4; }  /* 16px */
.icon-md { @apply w-5 h-5; }  /* 20px - Default */
.icon-lg { @apply w-6 h-6; }  /* 24px */
.icon-xl { @apply w-8 h-8; }  /* 32px */
.icon-2xl { @apply w-10 h-10; } /* 40px */
```

### Icon Usage Patterns

```html
<!-- Icon with text -->
<div class="flex items-center gap-2">
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
  <span>Ho Chi Minh City</span>
</div>

<!-- Icon button -->
<button class="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
  </svg>
</button>

<!-- Colored icon -->
<div class="flex items-center gap-2 text-success-600">
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
  </svg>
  <span class="font-medium">Confirmed</span>
</div>
```

### Icon Accessibility

```html
<!-- Icon buttons must have aria-label -->
<button aria-label="Search">
  <svg class="w-5 h-5">...</svg>
</button>

<!-- Decorative icons should be hidden -->
<span class="sr-only">Icon label</span>
<svg aria-hidden="true" class="w-5 h-5">...</svg>
```

---

## Layout Patterns

### Grid System

```css
/* Responsive grid */
.grid-responsive {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

/* Custom grid */
.grid-custom {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}

.col-span-1 { grid-column: span 1; }
.col-span-2 { grid-column: span 2; }
.col-span-3 { grid-column: span 3; }
.col-span-4 { grid-column: span 4; }
.col-span-6 { grid-column: span 6; }
.col-span-8 { grid-column: span 8; }
.col-span-12 { grid-column: span 12; }
```

### Flexbox Patterns

```css
/* Center alignment */
.flex-center {
  @apply flex items-center justify-center;
}

/* Space between */
.flex-between {
  @apply flex items-center justify-between;
}

/* Column direction */
.flex-col-center {
  @apply flex flex-col items-center justify-center;
}

/* Gap utilities */
.flex-gap-2 { @apply flex gap-2; }
.flex-gap-4 { @apply flex gap-4; }
.flex-gap-6 { @apply flex gap-6; }
```

### Container Patterns

```css
/* Max width container */
.container {
  @apply w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Narrow container */
.container-narrow {
  @apply w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Wide container */
.container-wide {
  @apply w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

### Section Spacing

```css
/* Standard section padding */
.section {
  @apply py-16 md:py-24 lg:py-32;
}

/* Compact section */
.section-compact {
  @apply py-8 md:py-12 lg:py-16;
}

/* Large section */
.section-large {
  @apply py-24 md:py-32 lg:py-40;
}
```

---

## Z-Index Layers

```css
/* Z-index scale */
.z-base { z-index: 0; }
.z-above { z-index: 10; }
.z-dropdown { z-index: 1000; }
.z-sticky { z-index: 1020; }
.z-fixed { z-index: 1030; }
.z-modal-backdrop { z-index: 1040; }
.z-modal { z-index: 1050; }
.z-popover { z-index: 1060; }
.z-tooltip { z-index: 1070; }
```

---

## Border Radius

```css
/* Border radius scale */
.rounded-none { border-radius: 0; }
.rounded-sm { border-radius: 0.125rem; }  /* 2px */
.rounded { border-radius: 0.25rem; }      /* 4px */
.rounded-md { border-radius: 0.375rem; }  /* 6px */
.rounded-lg { border-radius: 0.5rem; }    /* 8px - Default */
.rounded-xl { border-radius: 0.75rem; }   /* 12px - Cards */
.rounded-2xl { border-radius: 1rem; }     /* 16px */
.rounded-3xl { border-radius: 1.5rem; }   /* 24px */
.rounded-full { border-radius: 9999px; }  /* Pills, badges */
```

---

## Shadows

```css
/* Shadow scale */
.shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
.shadow { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); }
.shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
```

---

## Language Support (Vietnamese)

### Vietnamese Diacritics Support

The selected fonts (Lexend and Source Sans 3) fully support Vietnamese characters:

```html
<!-- All Vietnamese characters render correctly -->
<!-- Uppercase: Ă Â Đ Ê Ô Ơ Ư -->
<!-- Lowercase: ă â đ ê ô ơ ư -->
<!-- Examples: -->

<h1>Tìm Phòng Trọ</h1> <!-- Search for Rooms -->
<p>Chào mừng đến với HostelVN</p> <!-- Welcome to HostelVN -->
<button>Đặt Ngay</button> <!-- Book Now -->
```

### Bilingual UI Patterns

```html
<!-- Language switcher -->
<div class="flex items-center gap-2">
  <button class="px-3 py-1.5 text-sm font-medium rounded-lg bg-primary-500 text-white">
    EN
  </button>
  <button class="px-3 py-1.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100">
    VI
  </button>
</div>
```

---

## Dark Mode Considerations

### Dark Mode Color Adjustments

```css
/* Dark mode requires higher contrast backgrounds */
.dark .card {
  @apply bg-slate-800 border-slate-700;
}

.dark .text-primary {
  @apply text-slate-100;
}

.dark .text-secondary {
  @apply text-slate-400;
}

.dark .border {
  @apply border-slate-700;
}
```

### Dark Mode Implementation

```html
<!-- Toggle dark mode -->
<button class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
  <svg class="w-5 h-5 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
  </svg>
  <svg class="w-5 h-5 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
  </svg>
</button>
```

---

## Design Tokens Summary

### Complete Token Reference

```css
:root {
  /* Colors */
  --primary-50: #EFF6FF;
  --primary-500: #3B82F6;
  --primary-600: #2563EB;
  --primary-900: #1E3A8A;

  --secondary-500: #F59E0B;
  --secondary-600: #D97706;

  --success-500: #10B981;
  --warning-500: #F59E0B;
  --error-500: #EF4444;

  --slate-50: #F8FAFC;
  --slate-100: #F1F5F9;
  --slate-200: #E2E8F0;
  --slate-600: #475569;
  --slate-900: #0F172A;

  /* Typography */
  --font-heading: 'Lexend', sans-serif;
  --font-body: 'Source Sans 3', sans-serif;

  --text-display-2xl: 4.5rem;
  --text-h1: 2.5rem;
  --text-h2: 2rem;
  --text-h3: 1.5rem;
  --text-body: 1rem;

  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;

  /* Border Radius */
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  /* Z-Index */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal: 1050;

  /* Transitions */
  --transition-fast: 150ms;
  --transition-base: 250ms;
  --transition-slow: 500ms;
}
```

---

## Implementation Checklist

Before implementing any component, verify:

- [ ] Colors meet WCAG 2.1 AA contrast standards
- [ ] Typography uses correct font pairing (Lexend + Source Sans 3)
- [ ] Spacing follows the defined scale
- [ ] All interactive elements have visible focus states
- [ ] Icons are from consistent icon set (Lucide)
- [ ] Hover states provide clear visual feedback
- [ ] Transitions use appropriate easing and duration
- [ ] Component is responsive across all breakpoints
- [ ] Semantic HTML is used (headings, landmarks, labels)
- [ ] ARIA labels are added where needed
- [ ] Reduced motion is respected
- [ ] Vietnamese characters render correctly

---

## Resources

### Design Inspiration
- Dribbble: https://dribbble.com/search/travel-booking
- Behance: https://www.behance.net/search/projects?search=hostel%20booking
- Awwwards: https://www.awwwards.com/websites/travel/

### Component Libraries
- shadcn/ui: https://ui.shadcn.com/
- Radix UI: https://www.radix-ui.com/
- Headless UI: https://headlessui.com/

### Icon Libraries
- Lucide Icons: https://lucide.dev/
- Heroicons: https://heroicons.com/

### Font Resources
- Google Fonts: https://fonts.google.com/
- FontPair: https://fontpair.co/

### Accessibility Tools
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- axe DevTools: https://www.deque.com/axe/devtools/
- WAVE: https://wave.webaim.org/

---

**Previous:** [04 - Responsive & Accessibility](./04-responsive-accessibility.md)
**Document Version:** 1.0
**Last Updated:** 2026-01-11
**Maintained By:** UI/UX Design Team
