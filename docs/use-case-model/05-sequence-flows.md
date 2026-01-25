# Sequence Model

**Project:** Hostel Management System
**Version:** 1.0
**Last Updated:** 2026-01-25

---

[← Back to Model Index](./index.md)

---

## 5.1 Core Booking Flow Sequence

The complete guest booking journey from search to review.

```mermaid
sequenceDiagram
    participant G as Guest
    participant S as System
    participant O as Owner
    participant A as Admin

    %% Search
    G->>S: SearchRequest (G01)
    S-->>G: SearchResults
    G->>S: Select listing

    %% View Details
    G->>S: View Listing Details (G02)
    S-->>G: ListingDetails

    %% Create Booking
    G->>S: Book Now (G03)
    S->>S: Validate availability
    S->>S: Reserve dates (15min lock)
    S->>S: Create booking (pending_payment)
    S-->>G: Redirect to payment

    %% Process Payment
    G->>S: PaymentRequest (G04)
    S->>S: Process via gateway
    S-->>G: PaymentConfirmation
    S->>S: Update booking (confirmed)

    %% Notifications
    S-->>G: Confirmation email
    S-->>O: New booking notification

    %% Manage Bookings
    G->>S: View bookings (G05)
    S-->>G: BookingResponse[]

    %% Submit Review
    G->>S: Submit review (G06)
    S->>S: Queue for moderation
    S-->>G: ReviewResponse
```

### Key State Transitions

1. Search → Selection → Booking Initiation
2. Pending Payment → Confirmed → Completed/Cancelled
3. Completed → Reviewed

### Critical Locks

- Availability lock: 15 minutes (Redis)
- Payment lock: Until gateway response

## 5.2 Property Setup Flow Sequence

Owner journey from property registration to listing management.

```mermaid
sequenceDiagram
    participant O as Owner
    participant S as System
    participant A as Admin

    %% Register Property
    O->>S: Register Property (O01)
    S->>S: Validate data
    S->>S: Upload images
    S->>S: Create property (pending_approval)
    S->>S: Notify admin
    S-->>O: PropertyResponse

    %% Admin Approval
    A->>S: View approval queue (A01)
    S-->>A: ApprovalQueue
    A->>S: Approve property
    S->>S: Update status (active)
    S->>S: Index in search
    S-->>O: Listing approved notification

    %% Manage Listings
    O->>S: Create/update listing (O02)
    S-->>O: ListingResponse

    %% Update Calendar
    O->>S: Update calendar (O03)
    S->>S: Update availability
    S-->>O: CalendarResponse

    %% View Analytics
    O->>S: View analytics (O05)
    S-->>O: AnalyticsResponse
```

### Key State Transitions

1. Draft → Pending Approval → Active/Rejected
2. Active → Listed → Bookable

### Approval SLA

48 hours (A01)

## 5.3 Admin Approval Flow Sequence

```mermaid
sequenceDiagram
    participant O as Owner
    participant S as System
    participant A as Admin

    O->>S: Submit property (O01)
    S->>S: Create property (pending_approval)
    S->>S: Publish to RabbitMQ

    rect rgb(255, 240, 240)
        Note over A: Async Processing
        A->>S: Receive notification
        A->>S: View approval queue (A01)
        S-->>A: ApprovalItem with quality score
    end

    A->>S: Review property
    A->>S: Approve (A01)
    S->>S: Update status (active)
    S->>S: Sync to Elasticsearch
    S->>S: Publish approval event

    S-->>O: Approval notification
```

### Async Processing

- Property submission → RabbitMQ → Admin notification worker
- Approval decision → RabbitMQ → Search index worker

## 5.4 Payment Processing Flow

```mermaid
sequenceDiagram
    participant G as Guest
    participant S as System
    participant PG as Payment Gateway

    G->>S: Create booking (G03)
    S->>S: Reserve availability
    S-->>G: Redirect to payment

    G->>S: Initiate payment (G04)
    S->>S: Create payment record
    S->>PG: Redirect to gateway

    PG-->>G: Payment page
    G->>PG: Complete payment
    PG-->>G: Redirect to return URL

    PG->>S: Webhook callback
    S->>S: Verify signature
    S->>S: Update payment status
    S->>S: Update booking status
    S->>S: Release availability lock
    S->>S: Queue notifications

    S-->>G: Payment confirmation
    S-->>G: Booking confirmation
```

### Payment States

1. pending → processing → completed/failed
2. Webhook timeout: 5 minutes
3. Retry on failure: 3 attempts

---

**Next:** [Error Handling Model](./06-error-handling.md)
