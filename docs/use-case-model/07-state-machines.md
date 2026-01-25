# State Machine Models

**Project:** Hostel Management System
**Version:** 1.0
**Last Updated:** 2026-01-25

---

[← Back to Model Index](./index.md)

---

## 7.1 Booking Lifecycle State Machine

```mermaid
stateDiagram-v2
    [*] --> pending_payment: Create booking (G03)
    pending_payment --> confirmed: Payment completed (G04)
    pending_payment --> expired: 15min timeout
    pending_payment --> cancelled: Guest cancels (G05)

    confirmed --> checked_in: Check-in day
    confirmed --> cancelled: Guest cancels (G05)
    confirmed --> cancelled: Owner cancels (O04)

    checked_in --> checked_out: Check-out day
    checked_in --> cancelled: Early checkout

    checked_out --> completed: Payment settled
    checked_out --> disputed: Dispute raised (A05)

    completed --> reviewed: Review submitted (G06)
    completed --> [*]: Archive after 90 days

    disputed --> resolved: Dispute resolved (A05)
    disputed --> refunded: Full refund

    expired --> [*]: Cleanup
    cancelled --> [*]: Archive after 30 days
    resolved --> [*]: Archive
    refunded --> [*]: Archive
    reviewed --> [*]: Archive after 90 days

    note right of pending_payment
        Availability locked (Redis)
        15 minute timeout
        Payment gateway redirect
    end note

    note right of confirmed
        Owner notified
        Calendar blocked
        Payment captured
    end note

    note right of disputed
        Admin review required
        Evidence collection
        Resolution decision
    end note
```

### State Transitions

| From | To | Trigger | Use Case |
|------|-------|---------|----------|
| pending_payment | confirmed | Payment success | G04 |
| pending_payment | expired | 15min timeout | System |
| pending_payment | cancelled | Guest cancels | G05 |
| confirmed | checked_in | Check-in date | System |
| confirmed | cancelled | Guest cancels | G05 |
| confirmed | cancelled | Owner cancels | O04 |
| checked_in | checked_out | Check-out date | System |
| checked_out | completed | Payment settled | System |
| checked_out | disputed | Dispute raised | A05 |
| completed | reviewed | Review submitted | G06 |

### Business Rules

- Full refund if cancelled > 48h before check-in
- 50% refund if cancelled 24-48h before check-in
- No refund if cancelled < 24h before check-in
- Owner can cancel with penalty (100% refund to guest)

## 7.2 Property/Listing State Machine

```mermaid
stateDiagram-v2
    [*] --> draft: Owner creates (O01)
    draft --> pending_approval: Owner submits (O01)

    pending_approval --> active: Admin approves (A01)
    pending_approval --> rejected: Admin rejects (A01)
    pending_approval --> info_requested: Admin needs more info (A01)

    rejected --> draft: Owner resubmits (O01)
    info_requested --> pending_approval: Owner provides info (O01)

    active --> suspended: Admin suspends (A02)
    active --> inactive: Owner deactivates (O02)

    suspended --> active: Admin reactivates (A02)
    inactive --> active: Owner reactivates (O02)

    active --> deleted: Owner deletes (O02)
    draft --> deleted: Owner deletes (O02)
    rejected --> deleted: Owner deletes (O02)

    deleted --> [*]: Archive after 30 days

    note right of pending_approval
        Auto-approve if:
        - Verified owner
        - Clean record
        - Complete info

        Manual review otherwise
    end note

    note right of active
        Visible in search (G01)
        Can receive bookings
        Analytics enabled (O05)
    end note

    note right of suspended
        Not visible in search
        Existing bookings honoured
        No new bookings
    end note
```

### State Transitions

| From | To | Trigger | Use Case |
|------|-------|---------|----------|
| draft | pending_approval | Submit for review | O01 |
| pending_approval | active | Admin approval | A01 |
| pending_approval | rejected | Admin rejection | A01 |
| pending_approval | active | Auto-approve | O01 |
| rejected | draft | Resubmit | O01 |
| active | suspended | Admin suspension | A02 |
| active | inactive | Owner deactivation | O02 |
| inactive | active | Owner reactivation | O02 |
| suspended | active | Admin reactivation | A02 |

### Auto-Approval Criteria

- Owner verified (email/phone)
- No prior violations
- Complete property information
- Quality score > 80%

## 7.3 Payment State Machine

```mermaid
stateDiagram-v2
    [*] --> pending: Initiate payment (G04)
    pending --> processing: Submitted to gateway
    pending --> failed: Gateway rejected
    pending --> cancelled: User cancelled

    processing --> completed: Payment successful
    processing --> failed: Payment declined
    processing --> timeout: No response (5min)

    failed --> pending: Retry (max 3)
    failed --> refunded: Refund initiated
    timeout --> pending: Retry

    completed --> refunded: Refund requested (A05)
    completed --> settled: Settlement complete (7 days)

    refunded --> settled: Refund processed
    settled --> [*]: Archive

    cancelled --> [*]: Archive
    failed --> [*]: Archive after 24h

    note right of pending
        Payment record created
        Gateway redirect URL generated
        15 minute booking lock active
    end note

    note right of processing
        Awaiting gateway webhook
        Booking status: pending_payment
        Lock active
    end note

    note right of completed
        Booking status: confirmed
        Owner notified
        Availability committed
    end note

    note right of refunded
        Refund initiated to gateway
        Booking status: refunded
        Availability released
    end note
```

### State Transitions

| From | To | Trigger | Timeout |
|------|-------|---------|----------|
| pending | processing | Gateway accepts | N/A |
| pending | failed | Gateway rejects | N/A |
| pending | cancelled | User cancels | 15min |
| processing | completed | Webhook success | 5min |
| processing | failed | Webhook failed | 5min |
| processing | timeout | No webhook | 5min |
| failed | pending | Retry | Immediate |
| completed | refunded | Refund request | N/A |
| completed | settled | Settlement | 7 days |

### Error Handling

- Max retries: 3
- Retry delay: Exponential backoff
- Timeout: 5 minutes for webhook
- Fallback: Manual reconciliation

## 7.4 User Account State Machine

```mermaid
stateDiagram-v2
    [*] --> unverified: Registration (G03, O01)

    unverified --> verified: Email/phone verified
    unverified --> suspended: Suspicious activity
    unverified --> deleted: Account deleted

    verified --> active: Profile complete
    verified --> suspended: Verification timeout (7 days)

    active --> suspended: Admin suspends (A02)
    active --> inactive: User deactivates
    active --> deleted: User deletes

    suspended --> active: Admin reactivates (A02)
    suspended --> deleted: Permanent ban

    inactive --> active: User reactivates
    inactive --> deleted: User deletes

    deleted --> [*]: Data anonymized (30 days)

    note right of unverified
        Limited access
        Cannot create bookings (G03)
        Cannot register properties (O01)
        Email verification required
    end note

    note right of active
        Full access to role features
        Guest: Search, book, review
        Owner: Manage properties, bookings
        Admin: Platform management
    end note

    note right of suspended
        No access allowed
        Existing bookings honoured
        Properties hidden
        Reason provided
    end note
```

### State Transitions

| From | To | Trigger | Use Case |
|------|-------|---------|----------|
| unverified | verified | Email/phone verified | System |
| unverified | suspended | Suspicious activity | A02 |
| verified | active | Profile complete | System |
| verified | suspended | Verification timeout | System |
| active | suspended | Admin suspension | A02 |
| active | inactive | User deactivation | User |
| suspended | active | Admin reactivation | A02 |
| inactive | active | User reactivation | User |

### Role-Based Access

| State | Guest Access | Owner Access | Admin Access |
|-------|-------------|--------------|--------------|
| unverified | Read-only | None | None |
| verified | Limited | None | None |
| active | Full | Full | Full |
| suspended | None | None | None |
| inactive | None | None | None |

---

[← Back to Model Index](./index.md)
