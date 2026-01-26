# UC-G01: Search Hostels - Object Structuring

**Use Case:** Search Hostels
**Date:** 2026-01-26

---

## 5-Step Workflow Analysis

### Step 1: Boundary Objects (Input)
**Question:** Who initiates? How do they send input?

- Actor: Guest
- Phase 1 External Class: `«external user» Guest`, `«external I/O device» WebBrowser`, `«external I/O device» MobileApp`

**Boundary Object:**
- `«user interaction» SearchInteraction` (handles both web and mobile)

**Confirmed:** ✅

---

### Step 2: Entity Objects (Data)
**Question:** What data is read/created/updated?

From use case sequence:
- "System retrieves accommodations matching search criteria"
- "System sorts results by relevance and availability"
- "System displays search results with pagination"

**Entity Objects:**
- `Listing` (read - filter by criteria)
- `Calendar` (read - check availability)
- `Property` (read - for location matching)

**Confirmed:** ✅ All entities exist in Phase 1.

---

### Step 3: Boundary Objects (Output)
**Question:** Does system display/send output?

From use case:
- "System displays search results with pagination"
- "System displays error messages" (alternative sequence)

**Boundary Object:**
- Reuse `SearchInteraction` (bidirectional - input/output)

**Confirmed:** ✅

---

### Step 4: Control Objects
**Question:** Is flow state-dependent?

**Analysis:**
- Different responses based on: search mode (initial vs. refine), availability state
- "Guest may refine filters or select a listing" - state depends on current results
- Pagination state management

**Decision:** State-dependent control needed.

**Control Object:**
- `«state-dependent control» SearchControl`

**Phase 4 Flag:** ⚠️ Requires statechart (search states: idle, displaying results, refining filters, loading more)

---

### Step 5: Application Logic
**Question:** Complex calculations or business rules?

**Identified Logic:**
- Date range validation (checkout must be after checkin)
- Search relevance scoring algorithm
- Availability filtering
- Pagination calculation
- Location proximity calculation (Vietnam provinces)

**Application Logic Objects:**
- `«business logic» SearchValidator` (date validation, location validation)
- `«algorithm» SearchRanker` (relevance scoring, sorting)
- `«service» AvailabilityService` (check available dates)

**Confirmed:** ✅

---

## Object Summary

| Type | Object | Stereotype | Phase 1 Mapping | Notes |
|------|--------|------------|-----------------|-------|
| Boundary | SearchInteraction | «user interaction» | Guest + WebBrowser/MobileApp | Bidirectional |
| Entity | Listing | «entity» | Phase 1 entity | Filter/read |
| Entity | Calendar | «entity» | Phase 1 entity | Check availability |
| Entity | Property | «entity» | Phase 1 entity | Location match |
| Control | SearchControl | «state-dependent control» | - | ⚠️ Flag for Phase 4 |
| Logic | SearchValidator | «business logic» | - | Validation rules |
| Logic | SearchRanker | «algorithm» | - | Relevance scoring |
| Logic | AvailabilityService | «service» | - | Date availability |

---

## Validation Checklist

| Check | Status |
|-------|--------|
| Boundary object maps to Phase 1 external class | ✅ SearchInteraction ← Guest + WebBrowser/MobileApp |
| All entity objects exist in Phase 1 | ✅ Listing, Calendar, Property |
| Control object justified | ✅ State-dependent (pagination, refine mode) |
| State-dependent control flagged | ✅ SearchControl flagged for Phase 4 |
| Application logic justified | ✅ Validation, ranking, availability check |

---

## Phase 4 Statechart Required

**Control Object:** `SearchControl`

**States Identified:**
- Idle
- Waiting for Search Criteria
- Displaying Results
- Refining Filters
- Loading More Results
- Displaying Error

**Events to Document (from Phase 3):**
- Search Criteria Entered
- Date Range Valid / Invalid
- Results Found / No Results
- Filter Refinement Requested
- Load More Requested
- Listing Selected

---

## Notes

- Search criteria stored temporarily for navigation (Postconditions)
- Search analytics logged (non-functional requirement)
- Suggested nearby locations when no results (alternative sequence)
- Performance requirement: < 500ms p95
