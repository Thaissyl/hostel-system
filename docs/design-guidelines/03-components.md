# Components - Hostel Management System

**Version:** 1.0
**Last Updated:** 2026-01-11

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

**Previous:** [02 - Typography](./02-typography.md)
**Next:** [04 - Responsive & Accessibility](./04-responsive-accessibility.md)
