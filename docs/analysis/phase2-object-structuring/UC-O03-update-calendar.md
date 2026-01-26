# UC-O03: Update Calendar - Object Structuring

**Use Case:** Update Calendar
**Date:** 2026-01-26

---

## 5-Step Workflow Analysis

### Step 1: Boundary Objects (Input)
- Actor: Owner
- Phase 1 External Class: `«external user» Owner`, `«external I/O device» WebBrowser`, `«external I/O device» MobileApp`
- **Boundary Object:** `«user interaction» CalendarInteraction`

---

### Step 2: Entity Objects (Data)
From use case: "System updates calendar", "System invalidates cached data"
- **Entity Objects:** `Calendar` (update), `Booking` (read - display existing bookings)

---

### Step 3: Boundary Objects (Output)
- "System displays calendar with current bookings", "System broadcasts update to connected guests"
- **Reuse:** `CalendarInteraction` (bidirectional)

---

### Step 4: Control Objects
**State-dependent:** Calendar states (displaying, selecting dates, updating, broadcasting)
- **Control Object:** `«state-dependent control» CalendarUpdateControl`
- **Phase 4 Flag:** ⚠️ Requires statechart

---

### Step 5: Application Logic
**Identified Logic:** Bulk date update, minimum price enforcement, confirmed booking protection, cache invalidation, real-time broadcast
- **Application Logic Objects:**
  - `«business logic» CalendarValidator` (date range, min price, booking protection)
  - `«service» CacheInvalidator` (invalidate affected dates)
  - `«service» RealTimeBroadcaster` (notify connected guests)

---

## Object Summary

| Type | Object | Stereotype | Notes |
|------|--------|------------|-------|
| Boundary | CalendarInteraction | «user interaction» | Calendar management |
| Entity | Calendar | «entity» | Update dates/prices |
| Entity | Booking | «entity» | Display bookings |
| Control | CalendarUpdateControl | «state-dependent control» | ⚠️ Flag for Phase 4 |
| Logic | CalendarValidator | «business logic» | BR-021/022 |
| Logic | CacheInvalidator | «service» | Cache invalidation |
| Logic | RealTimeBroadcaster | «service» | Real-time updates |

---

## Phase 4 Statechart Required

**Control Object:** `CalendarUpdateControl`

**States:** Idle, Displaying Calendar, Selecting Dates, Updating, Broadcasting, Error

**Events:** Open Calendar, Select Date Range, Set Price/Availability, Save, Validation Passed/Failed, Broadcast Complete

---

## Notes

- BR-021: Dates with confirmed bookings cannot be modified
- BR-022: Minimum price enforced
- Real-time updates to connected guests
- Bulk update API support
- Audit trail for all changes
