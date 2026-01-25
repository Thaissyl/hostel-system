# Use Case Specifications Index

**Project:** Hostel Management System
**Version:** 1.0
**Last Updated:** 2026-01-25
**Total Use Cases:** 17

---

## Use Case Files

### Guest Use Cases (7)

| File | Use Case | Priority | Status |
|------|----------|----------|--------|
| [UC-G01-search-hostels.md](UC-G01-search-hostels.md) | Search Hostels | High | ✅ Created |
| [UC-G02-view-listing-details.md](UC-G02-view-listing-details.md) | View Listing Details | High | ✅ Created |
| [UC-G03-create-booking.md](UC-G03-create-booking.md) | Create Booking | High | ✅ Created |
| [UC-G04-process-payment.md](UC-G04-process-payment.md) | Process Payment | High | ✅ Created |
| [UC-G05-manage-bookings.md](UC-G05-manage-bookings.md) | Manage Bookings | High | ✅ Created |
| [UC-G06-submit-review.md](UC-G06-submit-review.md) | Submit Review | Medium | ✅ Created |
| [UC-G07-manage-wishlist.md](UC-G07-manage-wishlist.md) | Manage Wishlist | Low | ✅ Created |

### Owner Use Cases (5)

| File | Use Case | Priority | Status |
|------|----------|----------|--------|
| [UC-O01-register-property.md](UC-O01-register-property.md) | Register Property | High | ✅ Created |
| [UC-O02-manage-listings.md](UC-O02-manage-listings.md) | Manage Listings | High | ✅ Created |
| [UC-O03-update-calendar.md](UC-O03-update-calendar.md) | Update Calendar | Medium | ✅ Created |
| [UC-O04-manage-bookings-owner.md](UC-O04-manage-bookings-owner.md) | Manage Bookings (Owner) | High | ✅ Created |
| [UC-O05-view-analytics.md](UC-O05-view-analytics.md) | View Analytics | Medium | ✅ Created |

### Admin Use Cases (5)

| File | Use Case | Priority | Status |
|------|----------|----------|--------|
| [UC-A01-approve-listings.md](UC-A01-approve-listings.md) | Approve Listings | High | ✅ Created |
| [UC-A02-manage-users.md](UC-A02-manage-users.md) | Manage Users | High | ✅ Created |
| [UC-A03-configure-payments.md](UC-A03-configure-payments.md) | Configure Payments | High | ✅ Created |
| [UC-A04-view-system-analytics.md](UC-A04-view-system-analytics.md) | View System Analytics | Medium | ✅ Created |
| [UC-A05-handle-disputes.md](UC-A05-handle-disputes.md) | Handle Disputes | High | ✅ Created |

---

## Specification Format

Each use case specification follows the enhanced COMET template format with black box compliance:

| Field | Description |
|-------|-------------|
| Use Case Name | Verb-Noun format |
| Summary | Brief description of goal |
| Actors | Primary and Secondary |
| Preconditions | Required state before start |
| Trigger | Event that initiates use case |
| Main Sequence | Actor → System interactions |
| Alternative Sequences | Error handling and edge cases |
| Postconditions | State after successful completion |
| Nonfunctional Requirements | Performance, security constraints |
| Business Requirements | Reference to business rules |
| Frequency of Use | High/Medium/Low |
| Priority | High/Medium/Low |
| Outstanding Questions | Unresolved items |
| **Boundary Objects** | Data crossing system boundaries |
| **Internal Software Objects** | Services, repositories, validators |
| **Message Communication Sequence** | HTTP/WebSocket/RabbitMQ flows |
| **Expanded Alternative Sequences** | Detailed error handling tables |

---

## Black Box Compliance

All 17 specifications maintain **strict black box perspective**:

✅ **ALLOWED:**
- Actor actions (clicks, enters, selects)
- System responses (validates, retrieves, displays)
- External system interactions (payment gateway, email service)

❌ **NOT ALLOWED:**
- Database names (MySQL, tables)
- Internal services (Elasticsearch, Redis)
- Algorithms (bubble sort, encryption method)
- Implementation details (API endpoints, components)

---

## Use Case Dependencies

```
Booking Flow (Guest):
UC-G01 → UC-G02 → UC-G03 → UC-G04 → UC-G05 → UC-G06
UC-G07 (independent)

Property Setup (Owner):
UC-O01 → UC-O02 → UC-O03
UC-O02 → UC-O04
UC-O02 → UC-O05

Admin Operations:
UC-O01 → UC-A01
All others independent
```

---

## Reference Document

For complete use case descriptions with additional details, see:

**[../use-cases/use-case-descriptions.md](../use-cases/use-case-descriptions.md)**

This main document contains all 17 use cases with full details, sequence diagrams, and cross-references.