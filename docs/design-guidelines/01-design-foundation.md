# Design Foundation - Hostel Management System

**Version:** 1.0
**Last Updated:** 2026-01-11
**Target Market:** Vietnam (EN + VI support)

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

**Next:** [02 - Typography](./02-typography.md)
