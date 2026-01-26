# UC-G04: Process Payment - Object Structuring

**Use Case:** Process Payment
**Date:** 2026-01-26

---

## 5-Step Workflow Analysis

### Step 1: Boundary Objects (Input)
**Question:** Who initiates? How do they send input?

- Primary Actor: Guest
- Secondary Actor: SePay Payment Gateway
- Phase 1 External Class: `«external user» Guest`, `«external I/O device» WebBrowser`, `«external I/O device» MobileApp`, `«external system» SePayGateway`

**Boundary Objects:**
- `«user interaction» PaymentInteraction` (guest payment interface)
- `«proxy» SePayProxy` (payment gateway communication)

**Confirmed:** ✅

---

### Step 2: Entity Objects (Data)
**Question:** What data is read/created/updated?

From use case sequence:
- "System verifies payment notification"
- "System updates booking status based on payment result"
- "System releases availability reservation"

**Entity Objects:**
- `Payment` (create - new payment record)
- `Booking` (update - status change)
- `Calendar` (update - release reservation)

**Confirmed:** ✅ All entities exist in Phase 1.

---

### Step 3: Boundary Objects (Output)
**Question:** Does system display/send output?

From use case:
- "System redirects guest to payment gateway"
- "System sends confirmation email/SMS to guest"
- "System displays booking confirmation to guest"
- "Payment gateway redirects guest back with success/failure"

**Boundary Objects:**
- Reuse `PaymentInteraction` (guest display)
- Reuse `SePayProxy` (gateway callback handling)
- `«output» EmailNotificationInterface` (email sending)
- `«output» SMSNotificationInterface` (SMS sending)

**Confirmed:** ✅

---

### Step 4: Control Objects
**Question:** Is flow state-dependent?

**Analysis:**
- Multiple payment states: selecting method, processing, verifying, confirmed, failed, cancelled, timeout
- "If payment cancelled by guest, System keeps booking pending for retry"
- "If payment timeout, System marks booking as 'payment_failed'"
- Payment verification and status updates
- Idempotent notification processing (same notification may be received multiple times)

**Decision:** State-dependent control needed.

**Control Object:**
- `«state-dependent control» PaymentControl`

**Phase 4 Flag:** ⚠️ Requires statechart (payment states: idle, selecting method, processing, verifying, confirmed, failed, cancelled, timeout, retry)

---

### Step 5: Application Logic
**Question:** Complex calculations or business rules?

**Identified Logic:**
- Payment gateway request generation with callback URLs
- Payment verification (signature validation, amount validation)
- Idempotent notification processing (prevent duplicate processing)
- Booking status update based on payment result
- Availability reservation release
- Email/SMS confirmation sending
- Payment timeout handling (< 30 seconds)

**Application Logic Objects:**
- `«business logic» PaymentValidator` (verify signature, amount, booking)
- `«service» PaymentProcessor` (gateway communication, idempotent handling)
- `«service» BookingStatusUpdater` (update confirmed/failed)
- `«service» ReservationReleaser` (release availability)
- `«service» NotificationService` (email/SMS confirmation)

**Confirmed:** ✅

---

## Object Summary

| Type | Object | Stereotype | Phase 1 Mapping | Notes |
|------|--------|------------|-----------------|-------|
| Boundary | PaymentInteraction | «user interaction» | Guest + WebBrowser/MobileApp | Bidirectional |
| Boundary | SePayProxy | «proxy» | SePayGateway | Gateway comm |
| Boundary | EmailNotificationInterface | «output» | External email system | Email sending |
| Boundary | SMSNotificationInterface | «output» | External SMS system | SMS sending |
| Entity | Payment | «entity» | Phase 1 entity | Create record |
| Entity | Booking | «entity» | Phase 1 entity | Update status |
| Entity | Calendar | «entity» | Phase 1 entity | Release reservation |
| Control | PaymentControl | «state-dependent control» | - | ⚠️ Flag for Phase 4 |
| Logic | PaymentValidator | «business logic» | - | Verify payment |
| Logic | PaymentProcessor | «service» | - | Idempotent processing |
| Logic | BookingStatusUpdater | «service» | - | Status update |
| Logic | ReservationReleaser | «service» | - | Release dates |
| Logic | NotificationService | «service» | - | Email/SMS send |

---

## Validation Checklist

| Check | Status |
|-------|--------|
| Boundary object maps to Phase 1 external class | ✅ PaymentInteraction ← Guest, SePayProxy ← SePayGateway |
| All entity objects exist in Phase 1 | ✅ Payment, Booking, Calendar |
| Control object justified | ✅ State-dependent (method selection, processing, verification, retry, timeout) |
| State-dependent control flagged | ✅ PaymentControl flagged for Phase 4 |
| Application logic justified | ✅ Validation, idempotent processing, status updates, notifications |

---

## Phase 4 Statechart Required

**Control Object:** `PaymentControl`

**States Identified:**
- Idle
- Selecting Payment Method
- Generating Payment Request
- Redirecting to Gateway
- Waiting for Payment
- Processing Notification
- Verifying Payment
- Payment Confirmed
- Payment Failed
- Payment Cancelled
- Payment Timeout
- Processing Retry

**Events to Document (from Phase 3):**
- Payment Method Selected
- Payment Request Generated
- Redirected to Gateway
- Payment Completed / Cancelled / Timeout
- Notification Received
- Verification Passed / Failed
- Booking Updated
- Confirmation Sent

---

## Notes

- Payment processing timeout < 30 seconds (NFR)
- Idempotent payment notification processing (NFR)
- PCI DSS compliance - no card data stored (NFR)
- Payment must be completed within 15 minutes (BR-005)
- Confirmation email within 1 minute (BR-006)
- Booking status: pending_payment → confirmed / payment_failed
- Availability reservation released on completion/failure
- Callback URLs for gateway redirect
