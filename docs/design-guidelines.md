# Design Guidelines - Hostel Management System

**Version:** 1.0
**Last Updated:** 2026-01-11
**Target Market:** Vietnam (EN + VI support)

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Component Patterns](#component-patterns)
6. [Responsive Breakpoints](#responsive-breakpoints)
7. [Accessibility Standards](#accessibility-standards)
8. [Animation Guidelines](#animation-guidelines)
9. [Icon System](#icon-system)
10. [Layout Patterns](#layout-patterns)

---

## Design Philosophy

**Core Principles:**

- **Clean & Professional**: Modern, trustworthy aesthetic suitable for Vietnam market
- **Accessibility First**: WCAG 2.1 AA compliance minimum
- **Mobile-First**: Responsive design starting from 320px
- **Performance-Optimized**: Fast loading, smooth interactions
- **Conversion-Focused**: Clear CTAs, intuitive booking flow
- **Cultural Adaptation**: Vibrant yet professional, bilingual support (EN/VI)

**Design Style:** Soft UI Evolution + Minimalism + Swiss Modernism 2.0

---

## Color System

### Primary Palette

Based on travel/hospitality industry research with Vietnam market considerations:

```css
/* Primary Colors - Trust & Professionalism */
--primary-50: #EFF6FF;  /* Light blue background */
--primary-100: #DBEAFE; /* Subtle backgrounds */
--primary-200: #BFDBFE; /* Borders, dividers */
--primary-300: #93C5FD; /* Hover states */
--primary-400: #60A5FA; /* Active states */
--primary-500: #3B82F6; /* Primary actions - Main Brand Color */
--primary-600: #2563EB; /* Primary button hover */
--primary-700: #1D4ED8; /* Primary button active */
--primary-800: #1E40AF; /* Dark navigation, footer */
--primary-900: #1E3A8A; /* Darkest blue - High emphasis */

/* Secondary Colors - Warm Hospitality */
--secondary-50: #FEF3C7;  /* Light gold background */
--secondary-100: #FDE68A; /* Subtle highlights */
--secondary-200: #FCD34D; /* Warning states */
--secondary-300: #FBBF24; /* Gold accents */
--secondary-400: #F59E0B; /* Icons, badges */
--secondary-500: #F59E0B; /* Secondary CTAs */
--secondary-600: #D97706; /* Secondary button hover */
--secondary-700: #B45309; /* Link text */
--secondary-800: #92400E; /* Dark gold */
--secondary-900: #78350F; /* Darkest gold */
```

### Accent Colors

```css
/* Success - Confirmations, Available dates */
--success-50: #ECFDF5;
--success-500: #10B981;
--success-600: #059669;
--success-700: #047857;

/* Warning - Pending bookings, Limited availability */
--warning-50: #FFFBEB;
--warning-500: #F59E0B;
--warning-600: #D97706;

/* Error - Errors, Rejected bookings, Fully booked */
--error-50: #FEF2F2;
--error-500: #EF4444;
--error-600: #DC2626;
--error-700: #B91C1C;

/* Info - Notifications, Information */
--info-50: #EFF6FF;
--info-500: #3B82F6;
--info-600: #2563EB;
```

### Neutral Colors

```css
/* Neutral Grays - Text, backgrounds, borders */
--slate-50: #F8FAFC;   /* Page background */
--slate-100: #F1F5F9;  /* Card backgrounds */
--slate-200: #E2E8F0;  /* Borders */
--slate-300: #CBD5E1;  /* Disabled borders */
--slate-400: #94A3B8;  /* Disabled text */
--slate-500: #64748B;  /* Secondary text */
--slate-600: #475569;  /* Body text */
--slate-700: #334155;  /* Headings */
--slate-800: #1E293B;  /* Dark text */
--slate-900: #0F172A;  /* Darkest text */
```

### Semantic Color Usage

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| **Primary Button** | Primary 500 | #3B82F6 | Main CTAs (Book Now, Search) |
| **Primary Hover** | Primary 600 | #2563EB | Button hover state |
| **Secondary Button** | Secondary 500 | #F59E0B | Alternative actions |
| **Success Badge** | Success 500 | #10B981 | Available, Confirmed |
| **Warning Badge** | Warning 500 | #F59E0B | Pending, Limited |
| **Error Badge** | Error 500 | #EF4444 | Fully booked, Cancelled |
| **Link Text** | Primary 600 | #2563EB | Navigation links |
| **Muted Text** | Slate 500 | #64748B | Secondary information |
| **Border Light** | Slate 200 | #E2E8F0 | Card borders |
| **Border Dark** | Slate 300 | #CBD5E1 | Input borders |

### Dark Mode Colors

```css
/* Dark mode adjustments for better contrast */
--dark-bg-primary: #0F172A;    /* Main background */
--dark-bg-secondary: #1E293B;  /* Card background */
--dark-bg-tertiary: #334155;   /* Elevated surfaces */
--dark-border: #475569;        /* Borders */
--dark-text-primary: #F8FAFC;  /* Primary text */
--dark-text-secondary: #CBD5E1; /* Secondary text */
--dark-text-muted: #94A3B8;    /* Muted text */
```

### Contrast Requirements

All color combinations must meet WCAG 2.1 AA standards:
- **Normal text (< 18px)**: 4.5:1 minimum contrast ratio
- **Large text (≥ 18px)**: 3:1 minimum contrast ratio
- **UI components**: 3:1 minimum contrast ratio

**Examples:**
- Primary 500 (#3B82F6) on White: ✅ 4.8:1 (Pass)
- Primary 600 (#2563EB) on White: ✅ 6.3:1 (Pass)
- Slate 600 (#475569) on White: ✅ 7.1:1 (Pass)
- Slate 500 (#64748B) on White: ⚠️ 4.6:1 (Barely Pass)
- Slate 400 (#94A3B8) on White: ❌ 2.8:1 (Fail - use for decorative only)

---

## Typography

### Font Family

**Selected Pairing:** Corporate Trust (Lexend + Source Sans 3)

**Rationale:**
- **Lexend**: Designed specifically for readability, excellent accessibility
- **Source Sans 3**: Clean, professional, supports Vietnamese characters perfectly
- Both fonts support Vietnamese diacritics: ă, â, đ, ê, ô, ơ, ư, etc.
- Modern, trustworthy aesthetic suitable for hospitality industry

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Tailwind Config

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['Lexend', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
      }
    }
  }
}
```

### Type Scale

```css
/* Typography Scale - Modular Scale (1.250) */
/* Base: 16px (1rem) */

/* Display - Hero titles, landing pages */
.text-display-2xl { font-size: 4.5rem; line-height: 1.1; font-weight: 700; } /* 72px */
.text-display-xl { font-size: 3.75rem; line-height: 1.1; font-weight: 700; } /* 60px */
.text-display-lg { font-size: 3rem; line-height: 1.2; font-weight: 700; } /* 48px */

/* Headings - Page titles, section headers */
.text-h1 { font-size: 2.5rem; line-height: 1.2; font-weight: 700; } /* 40px */
.text-h2 { font-size: 2rem; line-height: 1.3; font-weight: 600; } /* 32px */
.text-h3 { font-size: 1.5rem; line-height: 1.4; font-weight: 600; } /* 24px */
.text-h4 { font-size: 1.25rem; line-height: 1.4; font-weight: 600; } /* 20px */
.text-h5 { font-size: 1.125rem; line-height: 1.5; font-weight: 500; } /* 18px */

/* Body - Content, paragraphs, labels */
.text-body-xl { font-size: 1.25rem; line-height: 1.6; font-weight: 400; } /* 20px */
.text-body-lg { font-size: 1.125rem; line-height: 1.6; font-weight: 400; } /* 18px */
.text-body-base { font-size: 1rem; line-height: 1.6; font-weight: 400; } /* 16px */
.text-body-sm { font-size: 0.875rem; line-height: 1.5; font-weight: 400; } /* 14px */
.text-body-xs { font-size: 0.75rem; line-height: 1.4; font-weight: 400; } /* 12px */

/* Overline - Categories, badges, metadata */
.text-overline { font-size: 0.75rem; line-height: 1.4; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }

/* Utility - Captions, fine print */
.text-caption { font-size: 0.875rem; line-height: 1.4; font-weight: 400; }
.text-helper { font-size: 0.75rem; line-height: 1.4; font-weight: 400; }
```

### Font Weight Usage

| Weight | Usage | Example |
|--------|-------|---------|
| 300 (Light) | Subtle text, decorative elements | Large display watermarks |
| 400 (Regular) | Body text, paragraphs | Main content |
| 500 (Medium) | Emphasized body, labels | Form labels, card titles |
| 600 (SemiBold) | Subheadings, links | Section headers |
| 700 (Bold) | Headings, CTAs | Page titles, buttons |

### Line Height

- **Body text**: 1.5-1.6 (optimal readability)
- **Headings**: 1.1-1.4 (tighter for visual impact)
- **Captions/Helper**: 1.4 (compact but readable)

### Letter Spacing

- **All caps/Overline**: 0.08em (enhanced readability)
- **Headings**: 0em (default)
- **Body**: 0em (default)

### Typography Best Practices

```css
/* DO - Good typography examples */
.good-heading {
  font-family: 'Lexend', sans-serif;
  font-weight: 600;
  font-size: 2rem;
  line-height: 1.3;
  color: #0F172A;
}

.good-body {
  font-family: 'Source Sans 3', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.6;
  color: #334155;
}

/* DON'T - Bad typography examples */
.bad-heading {
  font-weight: 300; /* Too light for headings */
  line-height: 1;   /* Too tight */
  letter-spacing: 1px; /* Don't manually add spacing */
}

.bad-body {
  font-size: 0.75rem; /* Too small for body */
  line-height: 1.2;  /* Too tight for readability */
  color: #94A3B8;    /* Too light, fails contrast */
}
```

---

## Spacing System

### Spacing Scale (Tailwind-based)

```css
/* Base unit: 4px (0.25rem) */

/* Micro spacing - Details, tight gaps */
--spacing-0: 0;
--spacing-px: 1px;
--spacing-0_5: 0.125rem; /* 2px */
--spacing-1: 0.25rem;    /* 4px */

/* Small spacing - Compact layouts */
--spacing-1_5: 0.375rem; /* 6px */
--spacing-2: 0.5rem;     /* 8px */
--spacing-2_5: 0.625rem; /* 10px */
--spacing-3: 0.75rem;    /* 12px */

/* Medium spacing - Standard layout */
--spacing-3_5: 0.875rem; /* 14px */
--spacing-4: 1rem;       /* 16px */
--spacing-5: 1.25rem;    /* 20px */
--spacing-6: 1.5rem;     /* 24px */

/* Large spacing - Section separation */
--spacing-7: 1.75rem;    /* 28px */
--spacing-8: 2rem;       /* 32px */
--spacing-9: 2.25rem;    /* 36px */
--spacing-10: 2.5rem;    /* 40px */

/* Extra large spacing - Major sections */
--spacing-12: 3rem;      /* 48px */
--spacing-14: 3.5rem;    /* 56px */
--spacing-16: 4rem;      /* 64px */
--spacing-20: 5rem;      /* 80px */
--spacing-24: 6rem;      /* 96px */
```

### Spacing Usage Guidelines

| Context | Spacing | Tailwind Class | Usage |
|---------|---------|----------------|-------|
| **Card padding** | 1.5rem | `p-6` | Standard card content |
| **Section padding** | 4rem | `py-16` | Vertical section spacing |
| **Button padding** | 0.75rem × 1.5rem | `px-6 py-3` | Medium button |
| **Input padding** | 0.75rem | `px-4 py-3` | Form inputs |
| **Gap between cards** | 1.5rem | `gap-6` | Grid gaps |
| **Gap between elements** | 1rem | `gap-4` | Standard gap |
| **Navbar height** | 4rem | `h-16` | Fixed navbar |
| **Sidebar width** | 16rem | `w-64` | Desktop sidebar |

### Responsive Spacing

```css
/* Mobile-first spacing */
.responsive-padding {
  padding: 1rem; /* 16px mobile */
}

@media (min-width: 768px) {
  .responsive-padding {
    padding: 1.5rem; /* 24px tablet */
  }
}

@media (min-width: 1024px) {
  .responsive-padding {
    padding: 2rem; /* 32px desktop */
  }
}

/* Tailwind utility classes */
.responsive-padding {
  @apply px-4 md:px-6 lg:px-8;
}
```

---

## Component Patterns

### Buttons

#### Primary Button

```html
<button class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary-500 border border-transparent rounded-lg shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:ring-offset-white transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
  <span>Book Now</span>
</button>
```

**States:**
- Default: `bg-primary-500 text-white`
- Hover: `bg-primary-600`
- Active: `bg-primary-700`
- Focus: `ring-2 ring-primary-500 ring-offset-2`
- Disabled: `opacity-50 cursor-not-allowed`

**Sizes:**
- Small: `px-4 py-2 text-sm`
- Medium: `px-6 py-3 text-base` (default)
- Large: `px-8 py-4 text-lg`

#### Secondary Button

```html
<button class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-white transition-colors duration-200 cursor-pointer">
  <span>Learn More</span>
</button>
```

#### Ghost Button

```html
<button class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-600 bg-transparent border border-transparent hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200 cursor-pointer">
  <span>Cancel</span>
</button>
```

#### Icon Button

```html
<button class="inline-flex items-center justify-center p-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors duration-200 cursor-pointer" aria-label="Close">
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
  </svg>
</button>
```

### Cards

#### Standard Card

```html
<div class="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
  <!-- Card image -->
  <div class="aspect-video w-full bg-slate-100">
    <img src="..." alt="..." class="object-cover w-full h-full">
  </div>

  <!-- Card content -->
  <div class="p-6">
    <h3 class="text-lg font-semibold text-slate-900 mb-2">Card Title</h3>
    <p class="text-slate-600 text-body-base mb-4">Card description goes here...</p>

    <!-- Card actions -->
    <div class="flex items-center justify-between pt-4 border-t border-slate-200">
      <span class="text-sm text-slate-500">$50/night</span>
      <button class="text-primary-600 hover:text-primary-700 font-medium text-sm">View Details</button>
    </div>
  </div>
</div>
```

#### Card Variations

```css
/* Card with shadow (elevated) */
.card-elevated {
  @apply bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200;
}

/* Card with border (outlined) */
.card-outlined {
  @apply bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors duration-200;
}

/* Card without border (flat) */
.card-flat {
  @apply bg-white rounded-xl;
}

/* Glass card (light mode) */
.card-glass {
  @apply bg-white/80 backdrop-blur-md rounded-xl border border-white/20 shadow-sm;
}

/* Dark card */
.card-dark {
  @apply bg-slate-800 rounded-xl border border-slate-700;
}
```

### Form Elements

#### Text Input

```html
<div class="space-y-1.5">
  <label for="email" class="block text-sm font-medium text-slate-700">
    Email Address
    <span class="text-error-500">*</span>
  </label>
  <input
    type="email"
    id="email"
    name="email"
    required
    class="block w-full px-4 py-3 text-base text-slate-900 bg-white border border-slate-300 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:placeholder:text-slate-500 transition-colors duration-200"
    placeholder="you@example.com"
  >
  <p class="text-sm text-slate-500">We'll never share your email.</p>
</div>
```

#### Input States

```css
/* Default state */
.input-default {
  @apply border-slate-300 focus:border-primary-500 focus:ring-primary-500;
}

/* Error state */
.input-error {
  @apply border-error-500 focus:border-error-500 focus:ring-error-500 text-error-900 placeholder:text-error-400;
}

/* Success state */
.input-success {
  @apply border-success-500 focus:border-success-500 focus:ring-success-500;
}

/* Disabled state */
.input-disabled {
  @apply bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed;
}
```

#### Select Dropdown

```html
<div class="space-y-1.5">
  <label for="location" class="block text-sm font-medium text-slate-700">
    Location
  </label>
  <select
    id="location"
    name="location"
    class="block w-full px-4 py-3 text-base text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;base64,...')] bg-no-repeat bg-right"
  >
    <option value="">Select a location</option>
    <option value="hcmc">Ho Chi Minh City</option>
    <option value="hanoi">Hanoi</option>
    <option value="da-nang">Da Nang</option>
  </select>
</div>
```

#### Checkbox

```html
<div class="flex items-start">
  <div class="flex items-center h-5">
    <input
      id="terms"
      type="checkbox"
      class="w-5 h-5 text-primary-600 border-slate-300 rounded focus:ring-primary-500 cursor-pointer"
    >
  </div>
  <div class="ml-3 text-sm">
    <label for="terms" class="font-medium text-slate-700 cursor-pointer">
      I agree to the Terms and Conditions
    </label>
    <p class="text-slate-500">Please read our terms carefully.</p>
  </div>
</div>
```

#### Radio Buttons

```html
<div class="space-y-3">
  <label class="flex items-center cursor-pointer">
    <input
      type="radio"
      name="room-type"
      value="dorm"
      class="w-5 h-5 text-primary-600 border-slate-300 focus:ring-primary-500 cursor-pointer"
    >
    <span class="ml-3 text-slate-700">Dormitory Bed</span>
    <span class="ml-2 text-sm text-slate-500">$10/night</span>
  </label>

  <label class="flex items-center cursor-pointer">
    <input
      type="radio"
      name="room-type"
      value="private"
      class="w-5 h-5 text-primary-600 border-slate-300 focus:ring-primary-500 cursor-pointer"
    >
    <span class="ml-3 text-slate-700">Private Room</span>
    <span class="ml-2 text-sm text-slate-500">$30/night</span>
  </label>
</div>
```

### Badges

```html
<!-- Success badge -->
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
  Available
</span>

<!-- Warning badge -->
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
  Pending
</span>

<!-- Error badge -->
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
  Fully Booked
</span>

<!-- Info badge -->
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-info-100 text-info-800">
  New
</span>

<!-- Neutral badge -->
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
  Draft
</span>
```

### Modals

```html
<div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <!-- Backdrop -->
  <div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"></div>

  <!-- Modal panel -->
  <div class="flex min-h-full items-center justify-center p-4">
    <div class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
      <!-- Header -->
      <div class="bg-white px-6 py-4 border-b border-slate-200">
        <h3 class="text-lg font-semibold text-slate-900" id="modal-title">Modal Title</h3>
        <button class="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="px-6 py-6">
        <p class="text-slate-600">Modal content goes here...</p>
      </div>

      <!-- Footer -->
      <div class="bg-slate-50 px-6 py-4 flex flex-row-reverse gap-3">
        <button class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">Confirm</button>
        <button class="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
      </div>
    </div>
  </div>
</div>
```

### Navigation

#### Primary Navbar (Desktop)

```html
<nav class="sticky top-0 z-40 bg-white border-b border-slate-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a href="/" class="text-xl font-bold text-primary-600">HostelVN</a>
      </div>

      <!-- Desktop nav links -->
      <div class="hidden md:block">
        <div class="flex items-center space-x-1">
          <a href="/explore" class="px-4 py-2 text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors">Explore</a>
          <a href="/about" class="px-4 py-2 text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors">About</a>
          <a href="/help" class="px-4 py-2 text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors">Help</a>
        </div>
      </div>

      <!-- CTA -->
      <div class="hidden md:flex items-center space-x-3">
        <a href="/login" class="px-4 py-2 text-slate-700 hover:text-primary-600 font-medium">Sign In</a>
        <a href="/signup" class="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium transition-colors">Sign Up</a>
      </div>

      <!-- Mobile menu button -->
      <button class="md:hidden p-2 text-slate-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>
  </div>
</nav>
```

### Tabs

```html
<div class="border-b border-slate-200">
  <nav class="flex -mb-px space-x-8" aria-label="Tabs">
    <button class="border-primary-500 text-primary-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
      Search
    </button>
    <button class="border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors">
      Saved
    </button>
    <button class="border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors">
      Booked
    </button>
  </nav>
</div>
```

### Pagination

```html
<nav class="flex items-center justify-between" aria-label="Pagination">
  <div class="flex-1 flex justify-between sm:hidden">
    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">Previous</a>
    <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">Next</a>
  </div>

  <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
    <div>
      <p class="text-sm text-slate-700">
        Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of <span class="font-medium">97</span> results
      </p>
    </div>
    <div>
      <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
          Previous
        </a>
        <a href="#" aria-current="page" class="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">1</a>
        <a href="#" class="bg-white border-slate-300 text-slate-500 hover:bg-slate-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">2</a>
        <a href="#" class="bg-white border-slate-300 text-slate-500 hover:bg-slate-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">3</a>
        <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
          Next
        </a>
      </nav>
    </div>
  </div>
</nav>
```

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

**Document Version:** 1.0
**Last Updated:** 2026-01-11
**Maintained By:** UI/UX Design Team

