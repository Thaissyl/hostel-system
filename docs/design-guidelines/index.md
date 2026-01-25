# Design Guidelines - Hostel Management System

**Version:** 1.0
**Last Updated:** 2026-01-11
**Target Market:** Vietnam (EN + VI support)

---

## Overview

This design system provides comprehensive guidelines for building a professional, accessible hostel management platform tailored for the Vietnam market. All guidelines prioritize WCAG 2.1 AA compliance, mobile-first responsive design, and bilingual support (English/Vietnamese).

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

## Documentation Structure

| Section | Description | Lines |
|---------|-------------|-------|
| [01 - Design Foundation](./01-design-foundation.md) | Color system, semantic usage, dark mode, contrast requirements | ~160 LOC |
| [02 - Typography](./02-typography.md) | Font families, type scale, weights, line heights, best practices | ~130 LOC |
| [03 - Components](./03-components.md) | Spacing system, buttons, cards, forms, navigation, modals | ~450 LOC |
| [04 - Responsive & Accessibility](./04-responsive-accessibility.md) | Breakpoints, WCAG compliance, keyboard navigation, animations | ~280 LOC |
| [05 - Icons, Layout & Tokens](./05-icons-layout-tokens.md) | Icon system, grid/flex patterns, z-index, shadows, dark mode, resources | ~390 LOC |

---

## Quick Reference

### Color Palette
```css
--primary-500: #3B82F6; /* Main brand color */
--secondary-500: #F59E0B; /* Accent/gold */
--success-500: #10B981; /* Confirmations */
--error-500: #EF4444; /* Errors */
```

### Typography
```css
font-family: 'Lexend', sans-serif; /* Headings */
font-family: 'Source Sans 3', sans-serif; /* Body */
```

### Spacing Scale
```css
/* Base unit: 4px (0.25rem) */
--spacing-1: 0.25rem;  /* 4px */
--spacing-4: 1rem;     /* 16px */
--spacing-8: 2rem;     /* 32px */
```

### Breakpoints
```css
sm: 640px   /* Tablet */
md: 768px   /* Tablet landscape */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

---

## Implementation Checklist

Before implementing any component:

- [ ] Colors meet WCAG 2.1 AA contrast standards
- [ ] Typography uses correct font pairing (Lexend + Source Sans 3)
- [ ] Spacing follows the defined scale
- [ ] All interactive elements have visible focus states
- [ ] Icons are from consistent icon set (Lucide)
- [ ] Component is responsive across all breakpoints
- [ ] Semantic HTML is used (headings, landmarks, labels)
- [ ] ARIA labels are added where needed
- [ ] Reduced motion is respected
- [ ] Vietnamese characters render correctly

---

**Document Version:** 1.0
**Last Updated:** 2026-01-11
**Maintained By:** UI/UX Design Team
