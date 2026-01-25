# Internal Software Object Model

**Project:** Hostel Management System
**Version:** 1.0
**Last Updated:** 2026-01-25

---

[← Back to Model Index](./index.md)

---

Internal software objects implement business logic and coordinate system operations.

## 3.1 Service Layer Architecture

### Core Services

| Service | Responsibility | Used In |
|---------|---------------|---------|
| **SearchService** | Validates criteria, orchestrates search | G01 |
| **ListingService** | CRUD operations for listings | G02, O02 |
| **BookingService** | Orchestrates booking creation flow | G03, O04 |
| **PaymentService** | Payment gateway integration | G04, A05 |
| **AvailabilityService** | Manages availability reservations | G03, O03 |
| **PricingService** | Calculates pricing with fees/taxes | G03, G04 |
| **ReviewService** | Review submission and moderation | G06 |
| **UserService** | User management and authentication | All |
| **PropertyService** | Property registration and management | O01, O02 |
| **ApprovalService** | Admin approval workflow | A01 |
| **AnalyticsService** | Metrics aggregation and reporting | O05, A04 |
| **DisputeService** | Dispute resolution workflow | A05 |

### Supporting Services

| Service | Responsibility | Used In |
|---------|---------------|---------|
| **AuthService** | Authentication and authorization | All authenticated UCs |
| **NotificationService** | Email/SMS notification queuing | All UCs |
| **SessionService** | Temporary session management | G03 |
| **ImageUploadService** | Image upload to S3 | O01, O02 |
| **ImageProcessingService** | Thumbnail and variant generation | O01, O02 |
| **GeocodingService** | Address to coordinates conversion | O01, G01 |
| **AddressValidationService** | Vietnam address validation | O01 |
| **QualityService** | Automated quality checks | A01 |
| **SpamDetectionService** | Flag suspicious content | A01, G06 |
| **DuplicateDetectionService** | Identify duplicate properties | O01 |

## 3.2 Repository Pattern Overview

| Repository | Domain | Operations |
|------------|--------|------------|
| **ListingRepository** | Listings | findAll, findOne, create, update, delete, search |
| **BookingRepository** | Bookings | findAll, findOne, create, update, findByGuest, findByOwner |
| **PropertyRepository** | Properties | findAll, findOne, create, update, delete, findByOwner |
| **UserRepository** | Users | findAll, findOne, create, update, delete, findByEmail |
| **PaymentRepository** | Payments | findAll, findOne, create, update, findByBooking |
| **ReviewRepository** | Reviews | findAll, findOne, create, update, findByListing |
| **AvailabilityRepository** | Availability | query, reserve, release, batchCheck |
| **AnalyticsRepository** | Analytics | aggregate, trends, comparisons |
| **DisputeRepository** | Disputes | findAll, findOne, create, update, resolve |

## 3.3 Validator Objects Catalog

| Validator | Responsibility | Validates |
|-----------|---------------|-----------|
| **SearchQueryValidator** | Search criteria validation | Date ranges, guest counts, filters |
| **BookingValidator** | Booking constraints | Dates, capacity, minimum stay |
| **PaymentValidator** | Payment data | Amount, currency, payment method |
| **PropertyValidator** | Property data | Required fields, address format |
| **ReviewValidator** | Review content | Rating range, comment length |
| **UserValidator** | User data | Email format, password strength |
| **AddressValidator** | Vietnam addresses | Provinces, districts, wards |
| **ImageValidator** | Image uploads | Format, size, dimensions |

## 3.4 Adapter Objects (External Services)

| Adapter | External Service | Responsibility |
|---------|------------------|---------------|
| **StripeAdapter** | Stripe payment API | Payment processing |
| **PayPalAdapter** | PayPal payment API | Alternative payment |
| **SePayAdapter** | SePay payment API | Vietnam payments |
| **EmailAdapter** | SendGrid/AWS SES | Email delivery |
| **SMSAdapter** | Twilio/Vonage | SMS notifications |
| **S3Adapter** | AWS S3 | Image storage |
| **ElasticsearchAdapter** | Elasticsearch | Search indexing |
| **RedisAdapter** | Redis | Caching, locks |
| **RabbitMQAdapter** | RabbitMQ | Message queuing |

## 3.5 Service Interaction Patterns

### Pattern 1: Service Orchestration

Services coordinate multiple repositories and external services:

```
BookingService
  ↓
  ├─→ BookingRepository (persist)
  ├─→ AvailabilityService (reserve)
  ├─→ PricingService (calculate)
  ├─→ PaymentService (process)
  └─→ NotificationService (notify)
```

### Pattern 2: Service Chain

Services call other services in a chain:

```
SearchService
  ↓
ListingSearchEngine → AvailabilityService → PricingService
```

### Pattern 3: Event-Driven Services

Services publish events for other services to consume:

```
BookingService → RabbitMQ → AnalyticsService
                          → NotificationService
```

---

**Next:** [Message Communication Model](./04-message-communication.md)
