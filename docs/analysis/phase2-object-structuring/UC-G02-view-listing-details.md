# UC-G02: View Listing Details - Object Structuring

**Use Case:** View Listing Details
**Date:** 2026-01-26

---

## 5-Step Workflow Analysis

### Step 1: Boundary Objects (Input)
**Question:** Who initiates? How do they send input?

- Actor: Guest
- Phase 1 External Class: `«external user» Guest`, `«external I/O device» WebBrowser`, `«external I/O device» MobileApp`

**Boundary Object:**
- `«user interaction» ListingInteraction` (distinct from search - focused on single listing)

**Confirmed:** ✅

---

### Step 2: Entity Objects (Data)
**Question:** What data is read/created/updated?

From use case sequence:
- "System retrieves listing details"
- "System retrieves current reviews and ratings"
- "System retrieves available dates"
- "System increments view count"

**Entity Objects:**
- `Listing` (read - display details)
- `Review` (read - show reviews/ratings)
- `Calendar` (read - availability dates)
- `Image` (read - photos gallery)
- `Property` (read - property info)

**Confirmed:** ✅ All entities exist in Phase 1.

---

### Step 3: Boundary Objects (Output)
**Question:** Does system display/send output?

From use case:
- "System displays listing page with all sections"
- "System displays 404 error with similar suggestions" (alt)
- "System displays 'Fully Booked' badge" (alt)

**Boundary Object:**
- Reuse `ListingInteraction` (bidirectional)

**Confirmed:** ✅

---

### Step 4: Control Objects
**Question:** Is flow state-dependent?

**Analysis:**
- Different responses: listing found/not found, approved/not approved, available/booked
- View count tracking (state change)
- "Recently viewed" list management (if logged in)
- Image gallery state (current image, thumbnails)

**Decision:** State-dependent control needed.

**Control Object:**
- `«state-dependent control» ListingViewControl`

**Phase 4 Flag:** ⚠️ Requires statechart (listing view states: idle, loading, displaying, not found, unavailable)

---

### Step 5: Application Logic
**Question:** Complex calculations or business rules?

**Identified Logic:**
- Approval status check (only approved listings visible)
- View count increment
- "Recently viewed" list management
- Similar listing suggestion (404 case)
- Image delivery optimization (WebP, lazy loading, CDN)
- Nearest available date calculation

**Application Logic Objects:**
- `«business logic» ListingAccessValidator` (approval check, existence check)
- `«service» ViewTracker` (view count, recently viewed)
- `«service» ImageOptimizer` (CDN, WebP, lazy loading)
- `«algorithm» SimilarListingFinder` (404 suggestions)

**Confirmed:** ✅

---

## Object Summary

| Type | Object | Stereotype | Phase 1 Mapping | Notes |
|------|--------|------------|-----------------|-------|
| Boundary | ListingInteraction | «user interaction» | Guest + WebBrowser/MobileApp | Bidirectional |
| Entity | Listing | «entity» | Phase 1 entity | Display details |
| Entity | Review | «entity» | Phase 1 entity | Show reviews |
| Entity | Calendar | «entity» | Phase 1 entity | Availability dates |
| Entity | Image | «entity» | Phase 1 entity | Photo gallery |
| Entity | Property | «entity» | Phase 1 entity | Property info |
| Control | ListingViewControl | «state-dependent control» | - | ⚠️ Flag for Phase 4 |
| Logic | ListingAccessValidator | «business logic» | - | Approval check |
| Logic | ViewTracker | «service» | - | View count tracking |
| Logic | ImageOptimizer | «service» | - | CDN/WebP/lazy |
| Logic | SimilarListingFinder | «algorithm» | - | 404 suggestions |

---

## Validation Checklist

| Check | Status |
|-------|--------|
| Boundary object maps to Phase 1 external class | ✅ ListingInteraction ← Guest + WebBrowser/MobileApp |
| All entity objects exist in Phase 1 | ✅ Listing, Review, Calendar, Image, Property |
| Control object justified | ✅ State-dependent (approval status, availability, view tracking) |
| State-dependent control flagged | ✅ ListingViewControl flagged for Phase 4 |
| Application logic justified | ✅ Validation, tracking, image optimization, similarity |

---

## Phase 4 Statechart Required

**Control Object:** `ListingViewControl`

**States Identified:**
- Idle
- Loading Listing
- Displaying Details
- Displaying Not Found (404)
- Displaying Not Approved
- Displaying Fully Booked
- Image Gallery View

**Events to Document (from Phase 3):**
- Listing Clicked
- Listing Found / Not Found / Not Approved
- Reviews Loaded
- Availability Checked
- Image Gallery Opened
- Next/Previous Image

---

## Notes

- Only approved listings visible (BR-011)
- View count must be tracked (BR-012)
- Page load < 2s (NFR)
- Images optimized with CDN delivery
- "Recently viewed" only for logged-in guests
- Placeholder images on delivery failure (alt sequence)
