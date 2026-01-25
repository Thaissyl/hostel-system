# Message Communication Model

**Project:** Hostel Management System
**Version:** 1.0
**Last Updated:** 2026-01-25

---

[← Back to Model Index](./index.md)

---

## 4.1 HTTP API Patterns (REST Endpoints)

### Guest Endpoints

| Method | Endpoint | Use Case | Purpose |
|--------|----------|----------|---------|
| POST | /api/search | G01 | Search hostels |
| POST | /api/search/filters | G01 | Update search filters |
| GET | /api/listings/:id | G02 | Get listing details |
| POST | /api/bookings/initiate | G03 | Initiate booking session |
| POST | /api/bookings | G03 | Create booking |
| POST | /api/payments | G04 | Process payment |
| GET | /api/bookings | G05 | List guest bookings |
| GET | /api/bookings/:id | G05 | Get booking details |
| PATCH | /api/bookings/:id/cancel | G05 | Cancel booking |
| POST | /api/reviews | G06 | Submit review |
| POST | /api/wishlist | G07 | Add to wishlist |
| GET | /api/wishlist | G07 | Get wishlist |
| DELETE | /api/wishlist/:id | G07 | Remove from wishlist |

### Owner Endpoints

| Method | Endpoint | Use Case | Purpose |
|--------|----------|----------|---------|
| POST | /api/properties | O01 | Register property |
| POST | /api/images/upload | O01 | Upload property images |
| GET | /api/properties/:id | O02 | Get property details |
| PATCH | /api/properties/:id | O02 | Update property |
| DELETE | /api/properties/:id | O02 | Delete property |
| GET | /api/properties/:id/listings | O02 | Get property listings |
| POST | /api/listings | O02 | Create listing |
| PATCH | /api/listings/:id | O02 | Update listing |
| DELETE | /api/listings/:id | O02 | Delete listing |
| PUT | /api/listings/:id/calendar | O03 | Update calendar |
| GET | /api/bookings | O04 | List owner bookings |
| GET | /api/bookings/:id | O04 | Get booking details |
| PATCH | /api/bookings/:id/confirm | O04 | Confirm booking |
| GET | /api/analytics | O05 | Get analytics |

### Admin Endpoints

| Method | Endpoint | Use Case | Purpose |
|--------|----------|----------|---------|
| GET | /api/admin/approvals | A01 | Get approval queue |
| POST | /api/admin/approvals/:id/approve | A01 | Approve listing |
| POST | /api/admin/approvals/:id/reject | A01 | Reject listing |
| GET | /api/admin/users | A02 | List users |
| PATCH | /api/admin/users/:id | A02 | Update user |
| DELETE | /api/admin/users/:id | A02 | Delete user |
| POST | /api/admin/users/:id/suspend | A02 | Suspend user |
| GET | /api/admin/payments/config | A03 | Get payment config |
| PUT | /api/admin/payments/config | A03 | Update payment config |
| GET | /api/admin/analytics | A04 | Get system analytics |
| GET | /api/admin/disputes | A05 | List disputes |
| POST | /api/admin/disputes/:id/resolve | A05 | Resolve dispute |

## 4.2 WebSocket Events Catalog

| Event | Direction | Use Case | Data |
|-------|-----------|----------|------|
| **booking.created** | System → Guest | G03, O04 | BookingConfirmation |
| **booking.confirmed** | System → Guest | G05, O04 | BookingResponse |
| **booking.cancelled** | System → Guest, Owner | G05, O04 | BookingResponse |
| **availability.update** | System → Guests viewing | G01, G02 | ListingId, availability |
| **payment.completed** | System → Guest | G04 | PaymentConfirmation |
| **payment.failed** | System → Guest | G04 | ErrorResponse |
| **review.submitted** | System → Owner | G06 | ReviewResponse |
| **review.moderated** | System → Guest | G06 | ReviewResponse |
| **listing.approved** | System → Owner | O01, A01 | PropertyResponse |
| **listing.rejected** | System → Owner | O01, A01 | PropertyResponse |

## 4.3 RabbitMQ Message Types and Routing

### Exchange Types

| Exchange | Type | Purpose |
|----------|------|---------|
| **hostel.events** | topic | Domain events (booking, payment, review) |
| **hostel.notifications** | fanout | Notification queue |
| **hostel.analytics** | topic | Analytics events |
| **hostel.admin** | direct | Admin operations |

### Message Types

| Routing Key | Message | Payload | Consumer |
|-------------|---------|---------|----------|
| **booking.created** | BookingCreatedEvent | bookingId, guestId, listingId, dates | Notification, Analytics |
| **booking.confirmed** | BookingConfirmedEvent | bookingId, ownerId, dates | Notification, Analytics |
| **booking.cancelled** | BookingCancelledEvent | bookingId, reason | Notification, Analytics |
| **payment.completed** | PaymentCompletedEvent | paymentId, bookingId, amount | Notification, Analytics |
| **payment.failed** | PaymentFailedEvent | paymentId, bookingId, reason | Notification |
| **review.submitted** | ReviewSubmittedEvent | reviewId, listingId, rating | Notification, Analytics |
| **property.pending_approval** | PropertyPendingApprovalEvent | propertyId, ownerId | Admin Notification |
| **listing.approved** | ListingApprovedEvent | listingId, ownerId | Notification, Analytics |
| **listing.rejected** | ListingRejectedEvent | listingId, reason | Notification |
| **dispute.created** | DisputeCreatedEvent | disputeId, bookingId | Admin Notification |

## 4.4 Async Processing Patterns

### Pattern 1: Fire-and-Forget (Analytics)

```
API Request → Service → Repository → Response
                         ↓
                    RabbitMQ → Analytics Worker
```

**Used in:** All use cases for analytics logging

### Pattern 2: Request-Reply (Payment)

```
API Request → PaymentService → Gateway
                         ↓
                    Wait for callback (webhook)
                         ↓
                    Update DB → Response
```

**Used in:** G04 (Process Payment)

### Pattern 3: Publish-Subscribe (Notifications)

```
API Request → Service → Repository
                         ↓
                    RabbitMQ → Multiple Notification Workers
                                    ↓
                            Email Worker, SMS Worker
```

**Used in:** All notification scenarios

### Pattern 4: Async Processing (Image Upload)

```
API Request → Upload Service → Store Original → Response
                                    ↓
                            RabbitMQ → Image Processing Worker
                                    ↓
                            Generate thumbnails, WebP
```

**Used in:** O01 (Register Property)

---

**Next:** [Sequence Model](./05-sequence-flows.md)
