# UC-G06: Submit Review - Object Structuring

**Use Case:** Submit Review
**Date:** 2026-01-26

---

## 5-Step Workflow Analysis

### Step 1: Boundary Objects (Input)
- Actor: Guest
- Phase 1 External Class: `«external user» Guest`, `«external I/O device» WebBrowser`, `«external I/O device» MobileApp`
- **Boundary Object:** `«user interaction» ReviewInteraction`

---

### Step 2: Entity Objects (Data)
From use case: "System creates review", "Listing rating recalculated"
- **Entity Objects:** `Review` (create), `Booking` (read - validate completion), `Listing` (update - aggregate rating), `Image` (create - review photos)

---

### Step 3: Boundary Objects (Output)
- "System displays review form", "System queues notification for admin moderation"
- **Reuse:** `ReviewInteraction` (bidirectional)

---

### Step 4: Control Objects
**State-dependent:** Review submission states (form displayed, validating, submitted, pending moderation, published)
- **Control Object:** `«state-dependent control» ReviewSubmissionControl`
- **Phase 4 Flag:** ⚠️ Requires statechart

---

### Step 5: Application Logic
**Identified Logic:** Review validation (min length, rating required), profanity filter, spam detection, listing rating recalculation
- **Application Logic Objects:**
  - `«business logic» ReviewValidator` (min 50 chars, rating required)
  - `«service» ProfanityFilter` (flag for moderation)
  - `«service» SpamDetector` (spam detection)
  - `«algorithm» RatingAggregator` (recalculate listing average)

---

## Object Summary

| Type | Object | Stereotype | Notes |
|------|--------|------------|-------|
| Boundary | ReviewInteraction | «user interaction» | Review submission |
| Entity | Review | «entity» | Create review |
| Entity | Booking | «entity» | Validate completion |
| Entity | Listing | «entity» | Update rating |
| Entity | Image | «entity» | Review photos |
| Control | ReviewSubmissionControl | «state-dependent control» | ⚠️ Flag for Phase 4 |
| Logic | ReviewValidator | «business logic» | Validation rules |
| Logic | ProfanityFilter | «service» | Moderation flag |
| Logic | SpamDetector | «service» | Spam detection |
| Logic | RatingAggregator | «algorithm» | Rating calc |

---

## Phase 4 Statechart Required

**Control Object:** `ReviewSubmissionControl`

**States:** Idle, Displaying Form, Validating, Submitted, Pending Moderation, Published, Error

**Events:** Write Review Clicked, Review Submitted, Validation Passed/Failed, Moderation Complete

---

## Notes

- BR-016: Only guests who completed stays can submit reviews
- BR-017: One review per booking
- Max 5 photos per review, 5MB each
- Auto-publish vs moderation flow
