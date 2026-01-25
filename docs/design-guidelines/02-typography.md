# Typography - Hostel Management System

**Version:** 1.0
**Last Updated:** 2026-01-11

---

## Font Family

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

## Type Scale

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

## Font Weight Usage

| Weight | Usage | Example |
|--------|-------|---------|
| 300 (Light) | Subtle text, decorative elements | Large display watermarks |
| 400 (Regular) | Body text, paragraphs | Main content |
| 500 (Medium) | Emphasized body, labels | Form labels, card titles |
| 600 (SemiBold) | Subheadings, links | Section headers |
| 700 (Bold) | Headings, CTAs | Page titles, buttons |

## Line Height

- **Body text**: 1.5-1.6 (optimal readability)
- **Headings**: 1.1-1.4 (tighter for visual impact)
- **Captions/Helper**: 1.4 (compact but readable)

## Letter Spacing

- **All caps/Overline**: 0.08em (enhanced readability)
- **Headings**: 0em (default)
- **Body**: 0em (default)

## Typography Best Practices

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

**Previous:** [01 - Design Foundation](./01-design-foundation.md)
**Next:** [03 - Components](./03-components.md)
