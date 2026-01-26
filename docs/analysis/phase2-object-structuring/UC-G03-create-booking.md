# UC-G03: Create Booking - Object Structuring

**Use Case:** Create Booking
**Date:** 2026-01-26

---

## 5-Step Workflow Analysis

### Step 1: Boundary Objects (Input)
**Question:** Who initiates? How do they send input?

- Actor: Guest
- Phase 1 External Class: `«external user» Guest`, `«external I/O device» WebBrowser`, `«external I/O device» MobileApp`

**Boundary Object:**
- `«user interaction» BookingInteraction` (new - distinct booking checkout flow)

**Confirmed:** ✅

---

### Step 2: Entity Objects (Data)
**Question:** What data is read/created/updated?

From use case sequence:
- "System validates availability for selected dates"
- "System reserves availability for selected dates"
- "System creates booking record with status 'pending_payment'"

**Entity Objects:**
- `Booking` (create - new booking record)
- `Calendar` (read/check - availability validation)
- `Listing` (read - price calculation)
- `User` (read - guest info for booking)

**Confirmed:** ✅ All entities exist in Phase 1.

---

### Step 3: Boundary Objects (Output)
**Question:** Does system display/send output?

From use case:
- "System displays price breakdown (base rate, fees, taxes)"
- "System redirects guest to payment flow"
- "System displays error 'Selected dates no longer available'" (alt)

**Boundary Object:**
- Reuse `BookingInteraction` (bidirectional)

**Confirmed:** ✅

---

### Step 4: Control Objects
**Question:** Is flow state-dependent?

**Analysis:**
- Multiple states: checkout, authentication, availability check, price calculation, reservation, redirect
- "If guest not authenticated, System prompts login/register" - state change
- "If dates no longer available" - different error state
- 15-minute reservation timeout (BR-004) - time-dependent state
- Booking status progression: pending_payment → (payment flow)

**Decision:** State-dependent control needed.

**Control Object:**
- `«state-dependent control» BookingCreationControl`

**Phase 4 Flag:** ⚠️ Requires statechart (booking states: idle, authenticating, validating availability, displaying price, reserving, redirecting to payment, error states)

---

### Step 5: Application Logic
**Question:** Complex calculations or business rules?

**Identified Logic:**
- Availability validation (date range, existing bookings)
- Price calculation (base rate × nights + fees + taxes)
- Reservation timeout management (15 minutes)
- Atomic booking creation (zero double-bookings guarantee)
- Temporary data preservation during authentication

**Application Logic Objects:**
- `«business logic» AvailabilityValidator` (date range, capacity check)
- `«algorithm» PriceCalculator` (base rate, fees, taxes calculation)
- `«service» ReservationManager` (reserve dates, timeout handling)
- `«service» BookingFactory` (atomic booking creation)

**Confirmed:** ✅

---

## Object Summary

| Type | Object | Stereotype | Phase 1 Mapping | Notes |
|------|--------|------------|-----------------|-------|
| Boundary | BookingInteraction | «user interaction» | Guest + WebBrowser/MobileApp | Bidirectional |
| Entity | Booking | «entity» | Phase 1 entity | Create new record |
| Entity | Calendar | «entity» | Phase 1 entity | Check availability |
| Entity | Listing | «entity» | Phase 1 entity | Price calculation |
| Entity | User | «entity» | Phase 1 entity | Guest info |
| Control | BookingCreationControl | «state-dependent control» | - | ⚠️ Flag for Phase 4 |
| Logic | AvailabilityValidator | «business logic» | - | Date/capacity check |
| Logic | PriceCalculator | «algorithm» | - | Rate/fee/tax calc |
| Logic | ReservationManager | «service» | - | Reserve + timeout |
| Logic | BookingFactory | «service» | - | Atomic creation |

---

## Validation Checklist

| Check | Status |
|-------|--------|
| Boundary object maps to Phase 1 external class | ✅ BookingInteraction ← Guest + WebBrowser/MobileApp |
| All entity objects exist in Phase 1 | ✅ Booking, Calendar, Listing, User |
| Control object justified | ✅ State-dependent (auth, availability, price, reservation, timeout) |
| State-dependent control flagged | ✅ BookingCreationControl flagged for Phase 4 |
| Application logic justified | ✅ Validation, pricing, reservation, atomic creation |

---

## Phase 4 Statechart Required

**Control Object:** `BookingCreationControl`

**States Identified:**
- Idle
- Authenticating Guest
- Validating Availability
- Displaying Price Breakdown
- Reserving Dates
- Redirecting to Payment
- Displaying Availability Error
- Displaying Reservation Error
- Handling Timeout

**Events to Document (from Phase 3):**
- Book Now Clicked
- Authenticated / Not Authenticated
- Dates Selected
- Availability Checked (Available / Not Available)
- Price Calculated
- Guest Confirmed Booking
- Reservation Success / Failed
- Timeout Occurred

---

## Notes

- 15-minute reservation timeout (BR-004)
- Zero double-bookings guarantee (NFR)
- Atomic booking creation required (NFR)
- Temporary data preservation during authentication flow (alt sequence)
- Payment gateway failover support (NFR)
- Guest must provide valid contact info (BR-003)
