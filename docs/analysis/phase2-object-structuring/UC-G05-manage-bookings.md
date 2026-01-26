# UC-G05: Manage Bookings - Object Structuring

**Use Case:** Manage Bookings
**Date:** 2026-01-26

---

## 5-Step Workflow Analysis

### Step 1: Boundary Objects (Input)
- Actor: Guest
- Phase 1 External Class: `«external user» Guest`, `«external I/O device» WebBrowser`, `«external I/O device» MobileApp`
- **Boundary Object:** `«user interaction» BookingManagementInteraction`

---

### Step 2: Entity Objects (Data)
From use case: "System retrieves all bookings for guest", "System processes cancellation"
- **Entity Objects:** `Booking` (read/update), `Payment` (read - refund info), `Listing` (read - display info)

---

### Step 3: Boundary Objects (Output)
- "System displays bookings grouped by status", "System shows full booking details"
- **Reuse:** `BookingManagementInteraction` (bidirectional)

---

### Step 4: Control Objects
**State-dependent:** Booking listing states (upcoming, completed, cancelled), cancellation policy enforcement
- **Control Object:** `«state-dependent control» BookingManagementControl`
- **Phase 4 Flag:** ⚠️ Requires statechart

---

### Step 5: Application Logic
**Identified Logic:** Cancellation policy calculation (24h/48h rules), refund calculation, pagination
- **Application Logic Objects:**
  - `«business logic» CancellationPolicyValidator` (time limits, penalty calculation)
  - `«algorithm» RefundCalculator` (full/50%/no refund based on timing)

---

## Object Summary

| Type | Object | Stereotype | Notes |
|------|--------|------------|-------|
| Boundary | BookingManagementInteraction | «user interaction» | Guest bookings management |
| Entity | Booking | «entity» | Read/update status |
| Entity | Payment | «entity» | Refund info |
| Entity | Listing | «entity» | Display info |
| Control | BookingManagementControl | «state-dependent control» | ⚠️ Flag for Phase 4 |
| Logic | CancellationPolicyValidator | «business logic» | BR-013/014/015 |
| Logic | RefundCalculator | «algorithm» | Refund amount |

---

## Phase 4 Statechart Required

**Control Object:** `BookingManagementControl`

**States:** Idle, Displaying Bookings, Viewing Details, Cancelling, Cancellation Confirming, Displaying Error

**Events:** View Bookings, Select Booking, Click Cancel, Confirm Cancellation, Cancellation Period Ended

---

## Notes

- BR-013: Full refund if cancelled 24h before check-in
- BR-014: 50% refund if cancelled 48h before check-in
- BR-015: No refund if cancelled less than 48h before check-in
- Paginated display (20 per page)
- Owner receives cancellation notifications
