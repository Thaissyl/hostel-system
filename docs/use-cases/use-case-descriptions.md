# Use Case Descriptions - Hostel Management System

**Version:** 1.0
**Last Updated:** 2026-01-11
**Total Use Cases:** 17

---

## Table of Contents

1. [Guest Use Cases](#guest-use-cases) (7)
2. [Owner Use Cases](#owner-use-cases) (5)
3. [Admin Use Cases](#admin-use-cases) (5)
4. [Use Case Template](#use-case-template)
5. [Summary Matrix](#summary-matrix)

---

## Use Case Template

Each use case follows this 10-section format:

| Section | Description |
|---------|-------------|
| 1. Use Case Name | Unique identifier and name |
| 2. Summary | Brief description of the use case |
| 3. Dependency | Related use cases or prerequisites |
| 4. Actors | Primary and secondary actors involved |
| 5. Preconditions | State required before use case begins |
| 6. Main Sequence | Step-by-step happy path |
| 7. Alternative Sequences | Error handling and edge cases |
| 8. Nonfunctional Requirements | Performance, security, usability constraints |
| 9. Post Condition | System state after successful completion |
| 10. Outstanding Questions | Unresolved items for clarification |

---

## Use Case Overview Diagram

```mermaid
flowchart TD
    subgraph Guest["Guest Use Cases"]
        G1[Search Hostels]
        G2[View Listing Details]
        G3[Create Booking]
        G4[Process Payment]
        G5[Manage Bookings]
        G6[Submit Review]
        G7[Manage Wishlist]
    end

    subgraph Owner["Owner Use Cases"]
        O1[Register Property]
        O2[Manage Listings]
        O3[Update Calendar]
        O4[Manage Bookings]
        O5[View Analytics]
    end

    subgraph Admin["Admin Use Cases"]
        A1[Approve Listings]
        A2[Manage Users]
        A3[Configure Payments]
        A4[View System Analytics]
        A5[Handle Disputes]
    end
```

---

# Guest Use Cases

## UC-G01: Search Hostels

| Section | Content |
|---------|---------|
| **1. Use Case Name** | Search Hostels |
| **2. Summary** | Guests search for available hostels using filters like location, dates, price range, amenities, and room type. Results are fetched from Elasticsearch with <500ms response time. |
| **3. Dependency** | UC-G02 (View Listing Details), Elasticsearch index populated, Redis cache available |
| **4. Actors** | Primary: Guest. Secondary: System (auto-suggest) |
| **5. Preconditions** | Guest is on homepage or search page, Elasticsearch indices are synced, Redis cache is operational |
| **6. Main Sequence** | 1. Guest enters search criteria (location, check-in/out dates, guests)<br>2. System validates dates (check-out > check-in)<br>3. System queries Elasticsearch with filters<br>4. System retrieves results from cache if available<br>5. System displays sorted/filtered results with pagination<br>6. Guest may refine filters or select a listing |
| **7. Alternative Sequences** | **3a. No results found:** Display "No hostels found" message with suggested nearby locations or date adjustments<br>**5a. Cache miss:** Query Elasticsearch directly, populate Redis cache<br>**6a. Invalid date range:** Show error "Check-out date must be after check-in"<br>**6b. Elasticsearch unavailable:** Fallback to MySQL query, show degraded performance notice |
| **8. Nonfunctional Requirements** | Response time < 500ms (p95), Support 1000 concurrent searches, Vietnamese/English localization, Mobile-responsive, WCAG 2.1 AA compliance |
| **9. Post Condition** | Search results displayed, search criteria stored in session for back navigation, Search analytics logged |
| **10. Outstanding Questions** | Should we save search history for logged-in guests? How to handle location typo corrections? |

```mermaid
sequenceDiagram
    participant G as Guest
    participant F as Frontend
    participant API as Backend API
    participant ES as Elasticsearch
    participant R as Redis Cache

    G->>F: Enter search criteria
    F->>API: POST /api/search
    API->>API: Validate dates
    API->>R: Check cache

    alt Cache Hit
        R-->>API: Return cached results
    else Cache Miss
        API->>ES: Search with filters
        ES-->>API: Listing IDs + metadata
        API->>R: Populate cache (5min TTL)
    end

    API-->>F: Return results
    F-->>G: Display listings
```

---

## UC-G02: View Listing Details

| Section | Content |
|---------|---------|
| **1. Use Case Name** | View Listing Details |
| **2. Summary** | Guest views comprehensive details of a specific hostel including photos, amenities, pricing, reviews, and availability calendar. |
| **3. Dependency** | UC-G01 (Search Hostels), Listing exists and is approved |
| **4. Actors** | Primary: Guest. Secondary: System (analytics tracking) |
| **5. Preconditions** | Guest has selected a listing from search results or direct link, Listing status is 'approved' |
| **6. Main Sequence** | 1. Guest clicks on a listing from search results<br>2. System fetches listing details from MySQL<br>3. System fetches current reviews and ratings<br>4. System fetches available dates from calendar service<br>5. System displays listing page with all sections<br>6. System increments view count (async via RabbitMQ) |
| **7. Alternative Sequences** | **2a. Listing not found:** Display 404 error with similar listing suggestions<br>**2b. Listing not approved:** Display "This listing is under review" message<br>**4a. No availability for selected dates:** Show "Fully Booked" badge with nearest available dates<br>**6a. Image CDN failure:** Display placeholder images, log error for retry |
| **8. Nonfunctional Requirements** | Page load < 2s, Images optimized (WebP, lazy loading), CDN delivery for images, Mobile-responsive, Vietnamese diacritics support |
| **9. Post Condition** | Listing viewed event logged (analytics), View count incremented, Listing added to "Recently Viewed" (if logged in) |
| **10. Outstanding Questions** | Should we show "X people viewing this now" for urgency? How many images per listing max? |

```mermaid
sequenceDiagram
    participant G as Guest
    participant F as Frontend
    participant API as Backend API
    participant DB as MySQL
    participant Cal as Calendar Service
    participant MQ as RabbitMQ

    G->>F: Click listing
    F->>API: GET /api/listings/:id
    API->>DB: Fetch listing details
    DB-->>API: Listing data
    API->>Cal: Check availability
    Cal-->>API: Available dates
    API-->>F: Return full details
    F-->>G: Render listing page

    API->>MQ: Emit 'listing.viewed' event
```

---

## UC-G03: Create Booking

| Section | Content |
|---------|---------|
| **1. Use Case Name** | Create Booking |
| **2. Summary** | Guest initiates a booking request by selecting dates, room type, and number of guests. System validates availability and creates a pending booking record. |
| **3. Dependency** | UC-G02 (View Listing Details), Guest authenticated (or will authenticate in flow), Calendar availability confirmed |
| **4. Actors** | Primary: Guest. Secondary: Payment System, Calendar Service |
| **5. Preconditions** | Guest is authenticated or will authenticate, Listing is available for selected dates, Room type is available |
| **6. Main Sequence** | 1. Guest clicks "Book Now" from listing page<br>2. System redirects to checkout page (or prompts login if not authenticated)<br>3. Guest selects/accommodates dates, room type, guests<br>4. System validates availability using Redis distributed lock<br>5. System displays price breakdown (base rate, fees, taxes)<br>6. Guest confirms booking details<br>7. System creates booking record with status 'pending_payment'<br>8. System redirects to payment flow |
| **7. Alternative Sequences** | **3a. Dates unavailable:** Show error "Selected dates no longer available" with available alternatives<br>**4a. Lock acquisition fails:** Display "Someone is booking this room. Please try again in a moment"<br>**7a. Guest not authenticated:** Prompt login/register, preserve booking data in temporary state<br>**8a. Booking creation failed:** Display error with retry option, release lock |
| **8. Nonfunctional Requirements** | Lock timeout: 15 minutes, Zero double-bookings (distributed lock), Atomic booking creation, Payment gateway failover support |
| **9. Post Condition** | Booking record created (status: pending_payment), Availability reserved via lock, Payment initiated, Notification queued |
| **10. Outstanding Questions** | Lock timeout duration: 10 or 15 minutes? How to handle abandoned bookings (cleanup schedule)? |

```mermaid
sequenceDiagram
    participant G as Guest
    participant F as Frontend
    participant API as Backend API
    participant R as Redis Lock
    participant DB as MySQL
    participant Cal as Calendar Service
    participant P as Payment Service

    G->>F: Click "Book Now"
    F->>API: GET /api/booking/initiate
    API->>R: Acquire lock (listing_id, dates)

    alt Lock Available
        R-->>API: Lock acquired
        API->>Cal: Verify availability
        Cal-->>API: Available
        API-->>F: Show checkout page

        G->>F: Confirm booking
        F->>API: POST /api/bookings
        API->>DB: Create booking (pending_payment)
        API->>Cal: Reserve dates
        API-->>F: Redirect to payment
    else Lock Unavailable
        R-->>API: Lock denied
        API-->>F: Show unavailable error
    end
```

---

## UC-G04: Process Payment

| Section | Content |
|---------|---------|
| **1. Use Case Name** | Process Payment |
| **2. Summary** | Guest completes payment for booking using Vietnam payment gateway (VNPAY/Ngan Luong/MoMo). System handles success/failure webhooks and updates booking status. |
| **3. Dependency** | UC-G03 (Create Booking), Payment gateway configured, Booking exists with 'pending_payment' status |
| **4. Actors** | Primary: Guest. Secondary: Payment Gateway, Webhook Handler |
| **5. Preconditions** | Booking exists with valid 'pending_payment' status, Payment gateway is operational, Redis lock is still active |
| **6. Main Sequence** | 1. Guest selects payment method (VNPAY/Ngan Luong/MoMo)<br>2. System generates payment URL with callback URLs<br>3. System redirects guest to payment gateway<br>4. Guest completes payment on gateway<br>5. Gateway redirects back with success/failure<br>6. System verifies payment via webhook<br>7. System updates booking status<br>8. System releases Redis lock<br>9. System sends confirmation email/SMS<br>10. Guest receives booking confirmation |
| **7. Alternative Sequences** | **5a. Payment cancelled by guest:** Redirect back, show "Payment cancelled" message, keep booking pending for retry<br>**5b. Payment timeout:** Mark booking as 'payment_failed', release lock, allow retry<br>**6a. Webhook verification fails:** Log for manual review, keep pending status<br>**7a. Payment successful:** Update booking to 'confirmed', trigger confirmation notifications<br>**7b. Payment failed:** Update booking to 'payment_failed', release lock, allow retry |
| **8. Nonfunctional Requirements** | Payment webhook timeout < 5s, Idempotent webhook processing, Secure webhook signature verification, PCI DSS compliance (no card data stored), 99.9% payment gateway uptime requirement |
| **9. Post Condition** | Booking status updated (confirmed/failed), Lock released, Payment record created, Notifications sent, Analytics updated |
| **10. Outstanding Questions** | Payment retry limit? How to handle partial payments? Refund process automation? |

```mermaid
sequenceDiagram
    participant G as Guest
    participant F as Frontend
    participant API as Backend API
    participant PG as Payment Gateway
    participant WH as Webhook Handler
    participant DB as MySQL
    participant R as Redis
    participant Notif as Notification Service

    G->>F: Select payment method
    F->>API: POST /api/payments/initiate
    API->>PG: Create payment URL
    PG-->>API: Payment URL
    API-->>F: Redirect to gateway

    G->>PG: Complete payment
    PG->>WH: Webhook (success/failed)

    alt Payment Successful
        WH->>WH: Verify signature
        WH->>DB: Update booking (confirmed)
        WH->>R: Release lock
        WH->>Notif: Send confirmation
        PG-->>G: Redirect to success page
    else Payment Failed
        WH->>DB: Update booking (payment_failed)
        WH->>R: Release lock
        PG-->>G: Redirect to failed page
    end
```

---

## UC-G05: Manage Bookings

| Section | Content |
|---------|---------|
| **1. Use Case Name** | Manage Bookings |
| **2. Summary** | Authenticated guest views their booking history, details, and can cancel bookings within the allowed cancellation period. |
| **3. Dependency** | Guest authenticated, At least one booking exists |
| **4. Actors** | Primary: Guest. Secondary: Owner (receives cancellation notifications) |
| **5. Preconditions** | Guest is logged in, Booking records exist for this guest |
| **6. Main Sequence** | 1. Guest navigates to "My Bookings" page<br>2. System fetches all bookings for guest<br>3. System displays bookings grouped by status (upcoming, completed, cancelled)<br>4. Guest clicks on a booking to view details<br>5. System shows full booking details with actions available<br>6. Guest may cancel if within cancellation period |
| **7. Alternative Sequences** | **2a. No bookings found:** Display "You have no bookings yet" with CTA to search hostels<br>**4a. Booking cancelled by owner:** Display "This booking was cancelled by the property"<br>**6a. Outside cancellation period:** Disable cancel button, show "Cancellation period ended"<br>**6b. Cancellation penalty applies:** Show refund amount before confirmation |
| **8. Nonfunctional Requirements** | Paginated display (20 per page), Real-time status updates (WebSocket), Cancellation policy enforcement, Refund calculation accuracy |
| **9. Post Condition** | Booking status updated (if cancelled), Refund initiated, Notifications sent to owner, Calendar availability updated |
| **10. Outstanding Questions** | Cancellation policy: full refund 24h before? 48h? Penalty structure? |

```mermaid
stateDiagram-v2
    [*] --> MyBookings: View bookings page
    MyBookings --> Upcoming: Filter upcoming
    MyBookings --> Completed: Filter completed
    MyBookings --> Cancelled: Filter cancelled

    Upcoming --> ViewDetails: Select booking
    ViewDetails --> CancelBooking: Click cancel (if allowed)
    CancelBooking --> ConfirmCancel: Confirm cancellation
    ConfirmCancel --> MyBookings: Booking cancelled

    ViewDetails --> MyBookings: Back

    note right of CancelBooking
        Check cancellation policy:
        - Before 24h: Full refund
        - Before 48h: 50% refund
        - After 48h: No refund
    end note
```

---

## UC-G06: Submit Review

| Section | Content |
|---------|---------|
| **1. Use Case Name** | Submit Review |
| **2. Summary** | Guest who completed a booking can submit a review with rating (1-5 stars) and text. Reviews are moderated before publishing. |
| **3. Dependency** | UC-G05 (Manage Bookings), Booking status is 'completed', Stay date has passed |
| **4. Actors** | Primary: Guest. Secondary: Admin (moderation), Owner (responds to reviews) |
| **5. Preconditions** | Guest is authenticated, Booking is completed, Stay date is in the past, No review exists for this booking |
| **6. Main Sequence** | 1. Guest navigates to "My Bookings" and selects a completed booking<br>2. Guest clicks "Write a Review"<br>3. System displays review form (rating 1-5, text, photos optional)<br>4. Guest submits review<br>5. System validates review (min length, rating required)<br>6. System creates review with status 'pending_moderation'<br>7. System queues notification for admin moderation |
| **7. Alternative Sequences** | **3a. Review already exists:** Display existing review, disable submit<br>**5a. Validation failed:** Show inline errors (rating required, min 50 chars)<br>**5b. Profanity detected:** Flag for moderation, allow submission with warning<br>**7a. Auto-publish enabled:** Bypass moderation, publish immediately |
| **8. Nonfunctional Requirements** | Max 5 photos per review, Photo size limit 5MB each, Profanity filter, Spam detection, Review aggregation for listings |
| **9. Post Condition** | Review created (pending_moderation or published), Listing rating recalculated (when published), Owner notified |
| **10. Outstanding Questions** | Can guests edit reviews after submission? Delete reviews? Time limit for submitting reviews? |

```mermaid
flowchart TD
    A[Guest selects completed booking] --> B{Review exists?}
    B -->|Yes| C[Display existing review]
    B -->|No| D[Click 'Write a Review']
    D --> E[Display review form]
    E --> F[Submit review]
    F --> G{Valid?}
    G -->|No| H[Show validation errors]
    H --> E
    G -->|Yes| I{Auto-publish?}
    I -->|Yes| J[Publish immediately]
    I -->|No| K[Status: pending_moderation]
    J --> L[Notify owner]
    K --> M[Queue for moderation]
    L --> N[Update listing rating]
    M -->|Approved| J
    M -->|Rejected| O[Notify guest: rejected]
```

---

## UC-G07: Manage Wishlist

| Section | Content |
|---------|---------|
| **1. Use Case Name** | Manage Wishlist |
| **2. Summary** | Guest can save listings to wishlist for later. Wishlist persists across sessions and can be shared. |
| **3. Dependency** | Guest authenticated (or use temporary storage for guests) |
| **4. Actors** | Primary: Guest |
| **5. Preconditions** | Guest is logged in (for persistence) |
| **6. Main Sequence** | 1. Guest clicks "heart" icon on any listing<br>2. System adds/removes from wishlist (toggle)<br>3. System updates UI state immediately (optimistic)<br>4. System syncs with backend via API<br>5. Guest navigates to wishlist page<br>6. System displays all saved listings with current prices |
| **7. Alternative Sequences** | **1a. Guest not logged in:** Save to localStorage, prompt "Sign in to sync your wishlist"<br>**4a. API call fails:** Revert optimistic update, show error toast<br>**6a. Wishlist empty:** Display empty state with "Start exploring" CTA<br>**6b. Some listings unavailable:** Show "No longer available" badge, option to remove |
| **8. Nonfunctional Requirements** | Optimistic UI updates, Wishlist max 100 items, Real-time price updates, Shareable wishlist link |
| **9. Post Condition** | Wishlist updated in database, Analytics logged (if added), Email alerts for price drops (opt-in) |
| **10. Outstanding Questions** | Should we notify when wishlist listings get price drops? Wishlist expiration policy? |

```mermaid
flowchart LR
    A[View Listing] --> B[Click Heart Icon]
    B --> C{Is Saved?}
    C -->|Yes| D[Remove from Wishlist]
    C -->|No| E[Add to Wishlist]

    E --> F[Optimistic UI Update]
    F --> G[API Call]
    G --> H{Success?}
    H -->|Yes| I[Wishlist Updated]
    H -->|No| J[Revert UI + Error]

    D --> F

    I --> K[View Wishlist Page]
    K --> L[Display Saved Listings]
```

---

# Owner Use Cases

## UC-O01: Register Property

| Section | Content |
|---------|---------|
| **1. Use Case Name** | Register Property |
| **2. Summary** | Owner registers a new hostel property with basic information. Property requires admin approval before listings become visible. |
| **3. Dependency** | Owner account exists and verified |
| **4. Actors** | Primary: Owner. Secondary: Admin (approves property) |
| **5. Preconditions** | Owner is authenticated, Owner account is verified (email/phone) |
| **6. Main Sequence** | 1. Owner navigates to "Add Property"<br>2. System displays property registration form<br>3. Owner enters property details (name, address, type, description)<br>4. Owner uploads property images (cover + gallery)<br>5. Owner submits property for review<br>6. System validates input<br>7. System creates property with status 'pending_approval'<br>8. System queues notification for admin |
| **7. Alternative Sequences** | **4a. Image upload fails:** Show error, allow retry or skip<br>**6a. Validation failed:** Display inline errors (required fields, address format)<br>**6b. Duplicate property detected:** Warn "Similar property exists" but allow submission<br>**8a. Auto-approve enabled:** Set status to 'active' immediately |
| **8. Nonfunctional Requirements** | Max 10 images per property, Image size limit 5MB each, Address validation (Vietnam provinces), Business license verification (optional) |
| **9. Post Condition** | Property created (pending_approval), Admin notified, Owner sees "Under Review" status |
| **10. Outstanding Questions** | Should we require business license? How many properties per owner max? |

```mermaid
flowchart TD
    A[Owner: Add Property] --> B[Enter Property Details]
    B --> C[Upload Images]
    C --> D{Images Valid?}
    D -->|No| E[Show Error]
    E --> C
    D -->|Yes| F[Submit for Review]
    F --> G{Data Valid?}
    G -->|No| H[Show Validation Errors]
    H --> B
    G -->|Yes| I{Auto-approve?}
    I -->|Yes| J[Status: Active]
    I -->|No| K[Status: Pending Approval]
    K --> L[Notify Admin]
    J --> M[Create First Listing]
    L -->|Approved| J
    L -->|Rejected| N[Notify Owner: Rejected]
```

---

## UC-O02: Manage Listings

| Section | Content |
|---------|---------|
| **1. Use Case Name** | Manage Listings |
| **2. Summary** | Owner creates, updates, and deactivates listings under their approved properties. Each listing has room types, pricing, and amenities. |
| **3. Dependency** | UC-O01 (Register Property), Property status is 'active' |
| **4. Actors** | Primary: Owner |
| **5. Preconditions** | Owner authenticated, At least one approved property exists |
| **6. Main Sequence** | 1. Owner navigates to "My Listings"<br>2. System displays all listings with status indicators<br>3. Owner clicks "Add Listing" or selects existing to edit<br>4. Owner enters listing details (room type, capacity, base price, amenities)<br>5. Owner uploads listing images<br>6. Owner saves listing<br>7. System syncs listing to Elasticsearch<br>8. System updates calendar availability |
| **7. Alternative Sequences** | **2a. No listings:** Display empty state with "Create your first listing" CTA<br>**4a. Duplicate listing:** Warn "Similar listing exists"<br>**7a. Elasticsearch sync fails:** Queue for retry, show warning to owner<br>**8a. Calendar sync fails:** Log error for manual intervention |
| **8. Nonfunctional Requirements** | Max 20 images per listing, Amenities predefined list, Price validation (min/max), Elasticsearch sync reliability |
| **9. Post Condition** | Listing created/updated, Elasticsearch index updated, Calendar initialized, Audit log created |
| **10. Outstanding Questions** | How many listings per property? Should listing changes require re-approval? |

```mermaid
flowchart TD
    A[Owner: My Listings] --> B{Listings Exist?}
    B -->|No| C[Empty State]
    C --> D[Click 'Add Listing']
    B -->|Yes| E[Display Listings]
    E --> F[Click 'Add' or Select to Edit]
    D --> G[Enter Listing Details]
    F --> G
    G --> H[Upload Images]
    H --> I[Save Listing]
    I --> J{Valid?}
    J -->|No| K[Show Errors]
    K --> G
    J -->|Yes| L[Sync to Elasticsearch]
    L --> M[Update Calendar]
    M --> N[Listing Active]
```

---

## UC-O03: Update Calendar

| Section | Content |
|---------|---------|
| **1. Use Case Name** | Update Calendar |
| **2. Summary** | Owner manages availability and pricing for specific dates. Bulk update and season pricing supported. Changes sync in real-time to guests. |
| **3. Dependency** | UC-O02 (Manage Listings), Listing exists |
| **4. Actors** | Primary: Owner. Secondary: Guests (see real-time updates) |
| **5. Preconditions** | Owner authenticated, Listing selected, Calendar data loaded |
| **6. Main Sequence** | 1. Owner opens calendar for a listing<br>2. System displays calendar with current bookings and availability<br>3. Owner selects date range to update<br>4. Owner sets availability (available/unavailable) and/or price<br>5. Owner saves changes<br>6. System updates calendar in MySQL<br>7. System invalidates Redis cache for affected dates<br>8. System broadcasts update via WebSocket to connected guests |
| **7. Alternative Sequences** | **3a. Dates have confirmed bookings:** Disable editing, show "Dates with bookings cannot be modified"<br>**4a. Price below minimum:** Show error, enforce minimum price<br>**6a. Database update fails:** Rollback changes, show error<br>**8a. WebSocket broadcast fails:** Log error, cache invalidation ensures eventual consistency |
| **8. Nonfunctional Requirements** | Real-time WebSocket updates, Calendar view performance (1 year range), Bulk update API, Audit trail for all changes |
| **9. Post Condition** | Calendar updated, Cache invalidated, WebSocket broadcast sent, Audit log created |
| **10. Outstanding Questions** | How far in advance can owners set availability? Season pricing templates? |

```mermaid
sequenceDiagram
    participant O as Owner
    participant F as Frontend
    participant API as Backend API
    participant DB as MySQL
    participant R as Redis Cache
    participant WS as WebSocket Server
    participant G as Guest(s)

    O->>F: Open calendar
    F->>API: GET /api/calendar/:listingId
    API-->>F: Return calendar data
    F-->>O: Display calendar

    O->>F: Select dates + update
    F->>API: PUT /api/calendar/:listingId
    API->>DB: Update calendar
    DB-->>API: Updated
    API->>R: Invalidate cache
    API->>WS: Broadcast update

    WS->>G: Push calendar update
    API-->>F: Success response
    F-->>O: Show confirmation
```

---

## UC-O04: Manage Bookings (Owner View)

| Section | Content |
|---------|---------|
| **1. Use Case Name** | Manage Bookings (Owner View) |
| **2. Summary** | Owner views incoming bookings for their properties, can accept/decline requests (if applicable), and manages guest communications. |
| **3. Dependency** | At least one booking exists for owner's properties |
| **4. Actors** | Primary: Owner. Secondary: Guest (receives notifications) |
| **5. Preconditions** | Owner authenticated, Has active listings |
| **6. Main Sequence** | 1. Owner navigates to "Bookings" dashboard<br>2. System displays bookings grouped by status (pending, confirmed, checked-in, checked-out, cancelled)<br>3. Owner filters by listing, date range, status<br>4. Owner clicks booking to view details<br>5. Owner sees guest info, booking details, and available actions<br>6. Owner may send message to guest<br>7. Owner may cancel booking (with penalty explanation) |
| **7. Alternative Sequences** | **2a. No bookings:** Display empty state with "No bookings yet"<br>**5a. Request booking (if approval required):** Show "Accept" / "Decline" buttons<br>**6a. Instant booking:** No approval needed, show confirmed status<br>**7a. Cancellation by owner:** Require reason, notify guest, process refund |
| **8. Nonfunctional Requirements** | Real-time booking notifications, Message inbox integration, Cancellation policy enforcement, Export booking data (CSV) |
| **9. Post Condition** | Booking status updated, Guest notified, Calendar updated (if cancelled), Analytics updated |
| **10. Outstanding Questions** | Approval flow vs instant booking? Owner cancellation penalties? |

```mermaid
stateDiagram-v2
    [*] --> BookingDashboard
    BookingDashboard --> FilterBookings: Apply filters
    BookingDashboard --> ViewBooking: Select booking

    ViewBooking --> RequestBooking: Status: pending
    ViewBooking --> ConfirmedBooking: Status: confirmed
    ViewBooking --> CheckedIn: Status: checked_in
    ViewBooking --> CheckedOut: Status: checked_out
    ViewBooking --> CancelledBooking: Status: cancelled

    RequestBooking --> AcceptBooking: Owner accepts
    RequestBooking --> DeclineBooking: Owner declines

    AcceptBooking --> ConfirmedBooking
    ConfirmedBooking --> CheckedIn: Guest arrives
    CheckedIn --> CheckedOut: Guest departs

    ConfirmedBooking --> CancelledBooking: Owner cancels
    CheckedIn --> CancelledBooking: Early checkout

    CancelledBooking --> [*]
    CheckedOut --> [*]
```

---

## UC-O05: View Analytics

| Section | Content |
|---------|---------|
| **1. Use Case Name** | View Analytics |
| **2. Summary** | Owner accesses dashboard with key metrics: occupancy rate, revenue, booking trends, guest ratings, and top-performing listings. |
| **3. Dependency** | At least one listing with booking history |
| **4. Actors** | Primary: Owner |
| **5. Preconditions** | Owner authenticated, Has booking data |
| **6. Main Sequence** | 1. Owner navigates to "Analytics"<br>2. System displays dashboard with key metrics (cards)<br>3. Owner views charts: revenue over time, occupancy rate, booking sources<br>4. Owner filters by date range, listing<br>5. Owner drills down into specific metrics<br>6. System updates charts with filtered data |
| **7. Alternative Sequences** | **2a. No data available:** Display "No analytics data yet" with onboarding tips<br>**6a. Export requested:** Generate CSV/PDF report for download |
| **8. Nonfunctional Requirements** | Chart rendering performance (< 2s), Data aggregation efficiency, Export to PDF/CSV, Mobile-responsive dashboard |
| **9. Post Condition** | Analytics viewed, Export generated (if requested) |
| **10. Outstanding Questions** | Real-time vs daily aggregated data? Comparison to market averages? |

```mermaid
flowchart LR
    A[Owner: Analytics] --> B[Dashboard Metrics]
    B --> C[Occupancy Rate]
    B --> D[Revenue]
    B --> E[Booking Trends]
    B --> F[Guest Ratings]
    B --> G[Top Listings]

    C --> H[Filter by Date Range]
    D --> H
    E --> H
    F --> H
    G --> H

    H --> I[Apply Filters]
    I --> J[Update Charts]

    J --> K[Drill Down]
    K --> L[View Details]

    J --> M[Export]
    M --> N[Generate PDF/CSV]
```

---

# Admin Use Cases

## UC-A01: Approve Listings

| Section | Content |
|---------|---------|
| **1. Use Case Name** | Approve Listings |
| **2. Summary** | Admin reviews pending property/listing submissions for compliance, accuracy, and quality before approving or rejecting. |
| **3. Dependency** | New properties/listings submitted with status 'pending_approval' |
| **4. Actors** | Primary: Admin. Secondary: Owner (receives decision) |
| **5. Preconditions** | Admin authenticated, Has permission to approve listings |
| **6. Main Sequence** | 1. Admin navigates to "Pending Approvals"<br>2. System displays queue of pending items<br>3. Admin selects an item to review<br>4. System displays property/listing details, images, owner info<br>5. Admin reviews for compliance (business license, accurate info, quality images)<br>6. Admin approves or rejects<br>7. System updates status and notifies owner<br>8. If approved, sync to Elasticsearch |
| **7. Alternative Sequences** | **2a. Queue empty:** Display "All caught up!" message<br>**6a. Approve with conditions:** Approve but flag for follow-up review<br>**6b. Reject:** Require rejection reason, notify owner with feedback<br>**8a. Sync fails:** Queue for retry, keep status as approved but not visible |
| **8. Nonfunctional Requirements** | SLA: Review within 48 hours, Bulk action support, Audit trail, Rejection reason templates |
| **9. Post Condition** | Status updated, Owner notified, Elasticsearch synced (if approved), Audit log created |
| **10. Outstanding Questions** | Should we require business license? What photo quality standards? |

```mermaid
flowchart TD
    A[Admin: Pending Approvals] --> B{Pending Items?}
    B -->|No| C[All Caught Up]
    B -->|Yes| D[Display Queue]
    D --> E[Select Item to Review]
    E --> F[View Details + Images]
    F --> G{Compliant?}
    G -->|Yes| H[Approve]
    G -->|No| I[Select Rejection Reason]
    H --> J[Update Status: Active]
    I --> K[Update Status: Rejected]
    J --> L[Sync to Elasticsearch]
    K --> M[Notify Owner + Feedback]
    L --> N[Notify Owner: Approved]
    M --> O[Owner Can Resubmit]
    N --> P[Listing Live]
```

---

## UC-A02: Manage Users

| Section | Content |
|---------|---------|
| **1. Use Case Name** | Manage Users |
| **2. Summary** | Admin views, searches, and manages user accounts. Can suspend/ban users, verify accounts, and view user activity. |
| **3. Dependency** | User accounts exist in system |
| **4. Actors** | Primary: Admin. Secondary: Users (affected by actions) |
| **5. Preconditions** | Admin authenticated, Has user management permissions |
| **6. Main Sequence** | 1. Admin navigates to "User Management"<br>2. System displays user table with search and filters<br>3. Admin searches by email, name, phone<br>4. Admin filters by role, status, verification level<br>5. Admin selects a user to view details<br>6. Admin sees user profile, bookings, reviews, activity log<br>7. Admin may suspend, ban, verify, or unverify user |
| **7. Alternative Sequences** | **3a. User not found:** Display "No users found" message<br>**5a. User has bookings:** Show booking summary with links<br>**7a. Suspend user:** Require reason, set end date (optional)<br>**7b. Ban user:** Permanent, require justification, disable all bookings |
| **8. Nonfunctional Requirements** | Paginated user list (50 per page), Quick search (< 1s), Action confirmation dialogs, Email notifications to users |
| **9. Post Condition** | User status updated, User notified via email, Audit log created |
| **10. Outstanding Questions** | Appeal process for banned users? Data retention for banned users? |

```mermaid
flowchart TD
    A[Admin: User Management] --> B[User Table]
    B --> C[Search/Filter Users]
    C --> D[Select User]
    D --> E[View User Profile]

    E --> F{Action?}
    F --> G[Suspend]
    F --> H[Ban]
    F --> I[Verify]
    F --> J[Unverify]

    G --> K[Enter Reason + Duration]
    H --> L[Enter Justification]
    I --> M[Confirm Verification]
    J --> N[Confirm Unverification]

    K --> O[Update Status: Suspended]
    L --> P[Update Status: Banned]
    M --> Q[Update Status: Verified]
    N --> R[Update Status: Unverified]

    O --> S[Notify User]
    P --> S
    Q --> S
    R --> S
```

---

## UC-A03: Configure Payments

| Section | Content |
|---------|---------|
| **1. Use Case Name** | Configure Payments |
| **2. Summary** | Admin configures payment gateway settings (VNPAY, Ngan Luong, MoMo) including API keys, webhooks, and commission rates. |
| **3. Dependency** | Payment gateway accounts obtained |
| **4. Actors** | Primary: Admin |
| **5. Preconditions** | Admin authenticated, Has payment configuration permissions |
| **6. Main Sequence** | 1. Admin navigates to "Payment Settings"<br>2. System displays configured payment gateways<br>3. Admin selects a gateway to configure<br>4. Admin enters API credentials (merchant ID, secret key, hash key)<br>5. Admin configures webhook URLs<br>6. Admin sets platform commission rate (%)<br>7. Admin tests connection<br>8. System validates and saves configuration |
| **7. Alternative Sequences** | **4a. Invalid credentials:** Show error, don't save<br>**7a. Connection test fails:** Display error details, allow retest<br>**8a. Save fails:** Show error, keep values for retry |
| **8. Nonfunctional Requirements** | Encrypted credential storage, Credential rotation support, Test mode support, Configuration audit log |
| **9. Post Condition** | Payment gateway configured, Credentials encrypted, Test transaction recorded |
| **10. Outstanding Questions** | Multiple gateways active simultaneously? Fallback priority? |

```mermaid
flowchart LR
    A[Admin: Payment Settings] --> B[View Gateways]
    B --> C[Select Gateway]
    C --> D[Enter API Credentials]
    D --> E[Configure Webhooks]
    E --> F[Set Commission Rate]
    F --> G[Test Connection]
    G --> H{Test Successful?}
    H -->|Yes| I[Save Configuration]
    H -->|No| J[Show Error]
    J --> D
    I --> K[Encrypt Credentials]
    K --> L[Configuration Active]
```

---

## UC-A04: View System Analytics

| Section | Content |
|---------|---------|
| **1. Use Case Name** | View System Analytics |
| **2. Summary** | Admin accesses platform-wide analytics including total bookings, revenue, user growth, search trends, and system performance metrics. |
| **3. Dependency** | Analytics data collection enabled |
| **4. Actors** | Primary: Admin |
| **5. Preconditions** | Admin authenticated, Has analytics permissions |
| **6. Main Sequence** | 1. Admin navigates to "System Analytics"<br>2. System displays executive dashboard with KPIs<br>3. Admin views sections: Business metrics, User metrics, Technical metrics<br>4. Admin filters by date range, region<br>5. Admin drills down into specific metrics<br>6. System updates with filtered data |
| **7. Alternative Sequences** | **6a. Export requested:** Generate comprehensive report (PDF/Excel)<br>**6b. Real-time mode:** Switch to live metrics view |
| **8. Nonfunctional Requirements** | Aggregation efficiency, Chart rendering (< 2s), Large dataset handling, Scheduled reports (email) |
| **9. Post Condition** | Analytics viewed, Export generated (if requested) |
| **10. Outstanding Questions** | Real-time vs hourly aggregation? Custom dashboard creation? |

```mermaid
flowchart TD
    A[Admin: System Analytics] --> B[Executive Dashboard]
    B --> C[Business Metrics]
    B --> D[User Metrics]
    B --> E[Technical Metrics]

    C --> C1[Total Bookings]
    C --> C2[Revenue]
    C --> C3[Commission Earned]

    D --> D1[Total Users]
    D --> D2[Active Users]
    D --> D3[User Growth]

    E --> E1[Response Times]
    E --> E2[Error Rates]
    E --> E3[Payment Success Rate]

    C1 --> F[Apply Filters]
    C2 --> F
    C3 --> F
    D1 --> F
    D2 --> F
    D3 --> F
    E1 --> F
    E2 --> F
    E3 --> F

    F --> G[Update Charts]
    G --> H[Drill Down]
    G --> I[Export Report]
```

---

## UC-A05: Handle Disputes

| Section | Content |
|---------|---------|
| **1. Use Case Name** | Handle Disputes |
| **2. Summary** | Admin manages disputes between guests and owners, reviews evidence, makes rulings, and processes refunds if necessary. |
| **3. Dependency** | Dispute submitted by guest or owner |
| **4. Actors** | Primary: Admin. Secondary: Guest, Owner |
| **5. Preconditions** | Admin authenticated, Has dispute resolution permissions |
| **6. Main Sequence** | 1. Admin navigates to "Disputes"<br>2. System displays list of open disputes with priority markers<br>3. Admin selects a dispute<br>4. System displays dispute details, messages from both parties, evidence<br>5. Admin reviews booking details, messages, evidence<br>6. Admin may request additional information<br>7. Admin makes ruling: refund guest, refund owner, or split<br>8. System processes refund according to ruling<br>9. System notifies both parties of decision |
| **7. Alternative Sequences** | **2a. No open disputes:** Display "No open disputes"<br>**6a. Evidence insufficient:** Request more info from parties<br>**7a. Escalate to legal:** Flag for legal team review<br>**8a. Refund fails:** Log for manual processing |
| **8. Nonfunctional Requirements** | Dispute SLA: respond within 24h, resolve within 72h, Evidence file upload support, Secure messaging, Decision audit trail |
| **9. Post Condition** | Dispute resolved, Refund processed, Parties notified, Analytics updated |
| **10. Outstanding Questions** | Appeal process? Partial refund calculations? Dispute categories? |

```mermaid
stateDiagram-v2
    [*] --> OpenDisputes: Admin views disputes
    OpenDisputes --> ReviewDispute: Select dispute
    ReviewDispute --> RequestInfo: Need more evidence
    RequestInfo --> ReviewDispute: Evidence received
    ReviewDispute --> MakeRuling: Ready to decide

    MakeRuling --> RefundGuest: Full refund to guest
    MakeRuling --> RefundOwner: Payment to owner
    MakeRuling --> SplitRefund: Split refund
    MakeRuling --> Escalate: Legal review needed

    RefundGuest --> NotifyParties: Decision sent
    RefundOwner --> NotifyParties
    SplitRefund --> NotifyParties
    Escalate --> LegalReview: External review

    NotifyParties --> Resolved: Dispute closed
    LegalReview --> Resolved
    Resolved --> [*]
```

---

# Summary Matrix

```mermaid
flowchart TD
    subgraph Summary["Use Cases Summary"]
        direction TB

        subgraph GuestUC["Guest Use Cases (7)"]
            GUC[UC-G01: Search Hostels<br>UC-G02: View Listing Details<br>UC-G03: Create Booking<br>UC-G04: Process Payment<br>UC-G05: Manage Bookings<br>UC-G06: Submit Review<br>UC-G07: Manage Wishlist]
        end

        subgraph OwnerUC["Owner Use Cases (5)"]
            OUC[UC-O01: Register Property<br>UC-O02: Manage Listings<br>UC-O03: Update Calendar<br>UC-O04: Manage Bookings<br>UC-O05: View Analytics]
        end

        subgraph AdminUC["Admin Use Cases (5)"]
            AUC[UC-A01: Approve Listings<br>UC-A02: Manage Users<br>UC-A03: Configure Payments<br>UC-A04: View System Analytics<br>UC-A05: Handle Disputes]
        end
    end

    style GuestUC fill:#3B82F6,color:#fff
    style OwnerUC fill:#F59E0B,color:#fff
    style AdminUC fill:#10B981,color:#fff
```

## Use Case Count by Role

| Role | Count | Complexity |
|------|-------|------------|
| Guest | 7 | High (payment integration, real-time updates) |
| Owner | 5 | Medium (CRUD operations, analytics) |
| Admin | 5 | Medium (management, configuration) |
| **Total** | **17** | - |

## Outstanding Questions Summary

| Category | Questions |
|----------|-----------|
| **Booking** | Lock timeout duration? Cancellation policy? Abandoned booking cleanup? |
| **Payment** | Retry limit? Refund process? Partial payments? Multiple gateways? |
| **Search** | Search history saved? Location typo corrections? |
| **Reviews** | Edit after submission? Delete? Time limit? |
| **Wishlist** | Price drop notifications? Expiration policy? |
| **Listings** | Max per property? Re-approval required? Image limits? |
| **Calendar** | Advance booking limit? Season pricing templates? |
| **Users** | Appeal process? Data retention for banned users? |
| **Disputes** | Appeal process? Partial refund calculations? Categories? |
| **Properties** | Business license required? Max per owner? |

---

**Document Version:** 1.0
**Last Updated:** 2026-01-11
**Maintained By:** Product Team
