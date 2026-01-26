# UC-O04: Manage Bookings (Owner View) - Object Structuring

**Use Case:** Manage Bookings (Owner View)
**Date:** 2026-01-26

---

## 5-Step Workflow Analysis

### Step 1: Boundary Objects (Input)
- Actor: Owner
- Phase 1 External Class: `«external user» Owner`, `«external I/O device» WebBrowser`, `«external I/O device» MobileApp`
- **Boundary Object:** `«user interaction» OwnerBookingManagementInteraction`

---

### Step 2: Entity Objects (Data)
From use case: "System displays bookings", "Owner may send message to guest", "Owner may cancel booking"
- **Entity Objects:** `Booking` (read/update), `User` (read - guest info), `Message` (create), `Listing` (read - display)

---

### Step 3: Boundary Objects (Output)
- "System shows guest info, booking details", "System delivers message to guest"
- **Reuse:** `OwnerBookingManagementInteraction` (bidirectional)

---

### Step 4: Control Objects
**State-dependent:** Booking states (pending, confirmed, checked_in, checked_out), request booking approval flow
- **Control Object:** `«state-dependent control» OwnerBookingControl`
- **Phase 4 Flag:** ⚠️ Requires statechart

---

### Step 5: Application Logic
**Identified Logic:** Cancellation penalty calculation, message delivery (1 minute SLA), approval vs instant booking handling
- **Application Logic Objects:**
  - `«business logic» CancellationPolicyValidator` (owner cancellation penalties)
  - `«service» MessageDeliveryService` (guest notification)
  - `«algorithm» RefundCalculator` (penalty calculation)

---

## Object Summary

| Type | Object | Stereotype | Notes |
|------|--------|------------|-------|
| Boundary | OwnerBookingManagementInteraction | «user interaction» | Owner bookings |
| Entity | Booking | «entity» | Read/update status |
| Entity | User | «entity» | Guest info |
| Entity | Message | «entity» | Create messages |
| Entity | Listing | «entity» | Display info |
| Control | OwnerBookingControl | «state-dependent control» | ⚠️ Flag for Phase 4 |
| Logic | CancellationPolicyValidator | «business logic» | BR-023 |
| Logic | MessageDeliveryService | «service» | BR-024 |
| Logic | RefundCalculator | «algorithm» | Penalty calc |

---

## Phase 4 Statechart Required

**Control Object:** `OwnerBookingControl`

**States:** Idle, Displaying Bookings, Viewing Details, Accepting/Declining, Sending Message, Cancelling, Processing Refund

**Events:** View Bookings, Select Booking, Accept/Decline, Send Message, Cancel, Guest Arrives/Departs

---

## Notes

- BR-023: Owner cancellations require reason and penalty explanation
- BR-024: Guest messages delivered within 1 minute
- Request booking: Accept/Decline buttons
- Instant booking: Confirmed status
- Real-time booking notifications
