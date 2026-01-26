# UC-O02: Manage Listings - Object Structuring

**Use Case:** Manage Listings
**Date:** 2026-01-26

---

## 5-Step Workflow Analysis

### Step 1: Boundary Objects (Input)
- Actor: Owner
- Phase 1 External Class: `«external user» Owner`, `«external I/O device» WebBrowser`, `«external I/O device» MobileApp`
- **Boundary Object:** `«user interaction» ListingManagementInteraction`

---

### Step 2: Entity Objects (Data)
From use case: "System updates listing", "System initializes availability calendar"
- **Entity Objects:** `Listing` (create/update), `Amenity` (create/update), `Image` (create - listing photos), `Calendar` (create - initialize)

---

### Step 3: Boundary Objects (Output)
- "System displays all listings with status indicators", "System initializes availability calendar"
- **Reuse:** `ListingManagementInteraction` (bidirectional)

---

### Step 4: Control Objects
**State-dependent:** Listing management states (displaying list, creating, editing, initializing calendar)
- **Control Object:** `«state-dependent control» ListingManagementControl`
- **Phase 4 Flag:** ⚠️ Requires statechart

---

### Step 5: Application Logic
**Identified Logic:** Duplicate listing detection, search index update, price validation (min/max), calendar initialization, amenities predefined list
- **Application Logic Objects:**
  - `«business logic» ListingValidator` (room type match, price limits)
  - `«service» SearchIndexUpdater` (update/retry on failure)
  - `«service» CalendarInitializer` (create calendar entries)

---

## Object Summary

| Type | Object | Stereotype | Notes |
|------|--------|------------|-------|
| Boundary | ListingManagementInteraction | «user interaction» | Listing CRUD |
| Entity | Listing | «entity» | Create/update |
| Entity | Amenity | «entity» | Listing amenities |
| Entity | Image | «entity» | Listing photos |
| Entity | Calendar | «entity» | Initialize |
| Control | ListingManagementControl | «state-dependent control» | ⚠️ Flag for Phase 4 |
| Logic | ListingValidator | «business logic» | BR-019/020 |
| Logic | SearchIndexUpdater | «service» | Index sync |
| Logic | CalendarInitializer | «service» | Calendar create |

---

## Phase 4 Statechart Required

**Control Object:** `ListingManagementControl`

**States:** Idle, Displaying Listings, Creating, Editing, Uploading Images, Saving, Initializing Calendar, Error

**Events:** My Listings, Add Listing, Edit Listing, Save, Validation Passed/Failed, Index Updated

---

## Notes

- BR-019: Room type must match property type
- BR-020: Pricing within platform limits
- Max 20 images per listing
- Amenities from predefined list
- Search index update with retry
