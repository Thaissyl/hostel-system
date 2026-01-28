# Guest Use Cases

## UC-G01: Search Hostels

| Field | Description |
|-------|-------------|
| **Use Case Name** | Search Hostels |
| **Created By** | Product Team |
| **Created Date** | 2026-01-25 |
| **Last Updated By** | Product Team |
| **Last Updated Date** | 2026-01-25 |
| **Summary** | Guest searches for available hostels using filters like location, dates, price range, amenities, and room type. System retrieves and displays matching results. |
| **Dependency** | UC-G02 (View Listing Details) |
| **Actors** | Primary: Guest |
| **Preconditions** | Guest is on homepage or search page |
| **Trigger** | Guest enters search criteria and clicks search |
| **Main Sequence** | 1. Guest enters search criteria (location, check-in/out dates, number of guests)<br>2. System validates date range (check-out must be after check-in)<br>3. System retrieves accommodations matching search criteria<br>4. System sorts results by relevance and availability<br>5. System displays search results with pagination<br>6. Guest may refine filters or select a listing |
| **Alternative Sequences** | Step 2: If date range invalid, System displays error "Check-out date must be after check-in"<br>Step 3: If no results found, System displays "No hostels found" message with suggested nearby locations or date adjustments<br>Step 5: If search service unavailable, System displays error and offers alternative search options |
| **Postconditions** | Search results displayed to guest. Search criteria stored for navigation. Search analytics logged. |
| **Nonfunctional Requirements** | System shall display search results within 500ms (p95). Support 1000 concurrent searches. Vietnamese/English localization. Mobile-responsive. WCAG 2.1 AA compliance. |
| **Business Requirements** | BR-001: Location must be in Vietnam<br>BR-002: Check-out date must be after check-in date |
| **Frequency of Use** | High |
| **Priority** | High |
| **Outstanding Questions** | Should we save search history for logged-in guests? How to handle location typo corrections? |

### Sequence Diagram

```mermaid
sequenceDiagram
    participant G as Guest
    participant UI as Search UI
    participant API as API Gateway
    participant VAL as SearchQueryValidator
    participant CACHE as SearchCacheService
    participant ES as ListingSearchEngine
    participant AVAIL as AvailabilityService
    participant PRICE as PricingService
    participant SCORE as RelevanceScorer

    G->>UI: Enter search criteria
    UI->>API: POST /api/search
    API->>VAL: Validate criteria

    alt Invalid Date Range
        VAL-->>API: ValidationError
        API-->>UI: Error message
        UI-->>G: Display error
    else Valid
        VAL-->>API: Valid
        API->>CACHE: Check cache
        CACHE-->>API: Cache miss
        API->>ES: Search listings
        ES-->>API: Raw results[]
        API->>AVAIL: Batch check availability
        AVAIL-->>API: AvailabilityMap
        API->>PRICE: Calculate prices
        PRICE-->>API: PriceMap
        API->>SCORE: Score and sort
        SCORE-->>API: SortedResults[]
        API->>CACHE: Cache results (5min TTL)
        API-->>UI: SearchResults
        UI-->>G: Display results
    end

    G->>UI: Refine filters
    UI->>API: POST /api/search/filters
    API->>ES: Refine search
    ES-->>API: FilteredResults[]
    API-->>UI: Updated results
    UI-->>G: Display filtered results
```

### Boundary Objects

| Boundary Object | Description | Data Elements |
|----------------|-------------|---------------|
| **SearchRequest** | Guest's search criteria submitted to system | location, checkInDate, checkOutDate, guestCount, priceRange (min/max), amenities[], roomType[], rating (min) |
| **SearchResults** | System response containing matching accommodations | totalCount, results[], page, pageSize, sortBy, filters |
| **ListingSummary** | Brief listing info for search results display | listingId, title, thumbnailUrl, location (city, country), basePrice, currency, rating, reviewCount, amenities[], availableStatus |
| **FilterOptions** | Available filter values for refinement | priceRange (min/max), locations[], amenityOptions[], roomTypeOptions[], ratingRange |
| **SuggestionItem** | Alternative suggestions when no results found | suggestedLocation, suggestedDates, nearbyListings[] |

### Internal Software Objects

| Internal Object | Responsibility |
|-----------------|---------------|
| **SearchService** | Validates search criteria, coordinates search orchestration |
| **SearchQueryValidator** | Validates date range logic, filter constraints, guest count limits |
| **ListingSearchEngine** | Queries Elasticsearch for matching listings |
| **AvailabilityService** | Checks real-time availability for search dates |
| **PricingService** | Calculates total prices for search date range |
| **GeoLocationService** | Handles location-based queries and nearby searches |
| **SearchCacheService** | Manages cached search results (5-minute TTL) |
| **SearchAnalyticsLogger** | Logs search queries for analytics and optimization |
| **PaginationService** | Handles result pagination and cursor-based navigation |
| **RelevanceScorer** | Calculates relevance scores for result sorting |

### Message Communication Sequence

#### Search Flow
```
Guest → System: SearchRequest (HTTP POST /api/search)
    ↓
System → SearchQueryValidator: Validate criteria
    ← ValidationResult
System → SearchCacheService: Check cache
    ← CacheMiss
System → ListingSearchEngine: Search listings (Elasticsearch)
    ← RawResults[]
System → AvailabilityService: Batch check availability
    ← AvailabilityMap
System → PricingService: Calculate prices
    ← PriceMap
System → RelevanceScorer: Score and sort
    ← SortedResults[]
System → SearchAnalyticsLogger: Log search
System ← SearchAnalyticsLogger: Logged
System → Guest: SearchResults (HTTP 200)
```

#### Filter Update Flow
```
Guest → System: UpdateFilters (HTTP POST /api/search/filters)
    ↓
System → ListingSearchEngine: Refine search
    ← FilteredResults[]
System → Guest: SearchResults
```

#### Suggestion Flow (No Results)
```
System → GeoLocationService: Find nearby locations
    ← NearbyLocations[]
System → AvailabilityService: Check nearby availability
    ← NearbyAvailability[]
System → Guest: SuggestionItem
```

### Expanded Alternative Sequences

#### Step 2: Date Range Validation
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| Check-out before check-in | Error: "Check-out must be after check-in" | Auto-swap dates option |
| Check-out equals check-in | Error: "Minimum stay is 1 night" | Suggest next day |
| Check-out beyond 365 days | Error: "Booking limited to 1 year ahead" | Suggest max date |
| Check-in before today | Error: "Check-in cannot be in the past" | Set to today |
| Date range exceeds 90 days | Error: "Maximum stay is 90 nights" | Suggest 90-day limit |
| Guest count exceeds capacity | Error: "Enter valid guest count" | Show max guest hint |

#### Step 3: No Results Found
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| Exact location no results | Show nearby listings (within 50km) | "Show results nearby" button |
| Date range no availability | Suggest alternative dates | Flexible date picker |
| Filter too restrictive | Relax filters gradually | "Remove some filters" suggestion |
| Price range no matches | Suggest price adjustment | Show available price range |
| Complete no results | Popular destinations list | Browse all listings |

#### Step 5: Search Service Unavailable
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| Elasticsearch timeout | Fallback to MySQL search | "Showing partial results" warning |
| Complete service failure | Cached results only | "Last updated X min ago" notice |
| Network latency | Loading indicator + retry | Auto-retry after 3s |
| Partial results returned | Return available results | "Some results unavailable" message |

#### Step 6: Real-time Updates
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| Listing sold during search | Mark as unavailable | Show alternative listings |
| Price changed during search | Update displayed price | "Price may vary" disclaimer |
| New listing matches criteria | Optional refresh prompt | "New listings available" toast |

**Related Use Cases**: [UC-G02: View Listing Details](#uc-g02-view-listing-details) (next step in flow)

---

## UC-G02: View Listing Details

| Field | Description |
|-------|-------------|
| **Use Case Name** | View Listing Details |
| **Created By** | Product Team |
| **Created Date** | 2026-01-25 |
| **Last Updated By** | Product Team |
| **Last Updated Date** | 2026-01-25 |
| **Summary** | Guest views comprehensive details of a specific hostel including photos, amenities, pricing, reviews, and availability calendar. |
| **Dependency** | UC-G01 (Search Hostels) |
| **Actors** | Primary: Guest |
| **Preconditions** | Guest has selected a listing from search results or direct link. Listing status is 'approved'. |
| **Trigger** | Guest clicks on a listing from search results |
| **Main Sequence** | 1. Guest clicks on a listing from search results<br>2. System retrieves listing details<br>3. System retrieves current reviews and ratings<br>4. System retrieves available dates<br>5. System displays listing page with all sections<br>6. System increments view count |
| **Alternative Sequences** | Step 2: If listing not found, System displays 404 error with similar listing suggestions<br>Step 2: If listing not approved, System displays "This listing is under review" message<br>Step 4: If no availability for selected dates, System shows "Fully Booked" badge with nearest available dates<br>Step 5: If image delivery fails, System displays placeholder images |
| **Postconditions** | Listing viewed event logged. View count incremented. Listing added to "Recently Viewed" (if logged in). |
| **Nonfunctional Requirements** | Page load < 2s. Images optimized (WebP, lazy loading). CDN delivery for images. Mobile-responsive. Vietnamese diacritics support. |
| **Business Requirements** | BR-011: Only approved listings are visible to guests<br>BR-012: View count must be tracked for analytics |
| **Frequency of Use** | High |
| **Priority** | High |
| **Outstanding Questions** | Should we show "X people viewing this now" for urgency? How many images per listing max? |

### Sequence Diagram

```mermaid
sequenceDiagram
    participant G as Guest
    participant UI as Listing UI
    participant API as API Gateway
    participant CACHE as ListingCacheService
    participant LS as ListingService
    participant RS as ReviewService
    participant AVAIL as AvailabilityService
    participant PS as PricingService
    participant MS as MediaService
    participant VCS as ViewCountService

    G->>UI: Click listing
    UI->>API: GET /api/listings/:id
    API->>CACHE: Check cache

    alt Cache Hit
        CACHE-->>API: Cached data
        API-->>UI: ListingDetailView (fast)
    else Cache Miss
        API->>LS: Get listing
        LS-->>API: ListingData
        API->>RS: Get reviews
        RS-->>API: ReviewSummary
        API->>AVAIL: Get calendar
        AVAIL-->>API: AvailabilityCalendar
        API->>PS: Calculate pricing
        PS-->>API: PriceInfo
        API->>MS: Get image URLs
        MS-->>API: MediaItem[]
        API->>CACHE: Cache response (15min TTL)
        API-->>UI: ListingDetailView
    end

    par Async Operations
        API->>VCS: Increment view count
        API->>CACHE: Add to recently viewed (if logged in)
    end

    UI-->>G: Display listing page

    G->>UI: Load image
    UI->>API: GET /cdn/images/:id
    API->>MS: Serve optimized image
    MS-->>UI: WebP image
    UI-->>G: Display image
```

### Boundary Objects

| Boundary Object | Description | Data Elements |
|----------------|-------------|---------------|
| **ListingDetailView** | Complete listing data for display | listingId, title, description, location, images[], amenities[], policies, hostInfo, rating, reviewCount |
| **ReviewSummary** | Aggregated review data | averageRating, ratingDistribution, recentReviews[], totalReviews |
| **AvailabilityCalendar** | Calendar data for selected month | dates[], availableDates[], bookedDates[], priceByDate{} |
| **PriceBreakdown** | Pricing details for search dates | basePrice, cleaningFee, serviceFee, taxes, totalPrice, currency |
| **MediaItem** | Individual image/video data | mediaId, type (image/video), url, thumbnailUrl, caption, order |
| **LocationInfo** | Location and map data | address, city, country, coordinates (lat, lng), nearbyPlaces[], distanceFromCenter |

### Internal Software Objects

| Internal Object | Responsibility |
|-----------------|---------------|
| **ListingService** | Retrieves listing details by ID |
| **ReviewService** | Fetches reviews and aggregates ratings |
| **AvailabilityService** | Loads availability calendar data |
| **PricingService** | Calculates pricing for date ranges |
| **MediaService** | Handles image URLs, CDN delivery, thumbnails |
| **LocationService** | Provides map data and nearby places |
| **ViewCountService** | Increments and tracks listing views |
| **RecentlyViewedService** | Manages "Recently Viewed" for logged-in users |
| **ListingCacheService** | Caches listing details (15-minute TTL) |
| **ImageOptimizationService** | Generates WebP variants and responsive images |

### Message Communication Sequence

#### Listing View Flow
```
Guest → System: ViewListing (HTTP GET /api/listings/:id)
    ↓
System → ListingCacheService: Check cache
    ← CacheMiss
System → ListingService: Get listing
    ← ListingData
System → ReviewService: Get reviews
    ← ReviewSummary
System → AvailabilityService: Get calendar
    ← AvailabilityCalendar
System → PricingService: Calculate base pricing
    ← PriceInfo
System → MediaService: Get optimized image URLs
    ← MediaItem[]
System → ViewCountService: Increment view (async, non-blocking)
System → RecentlyViewedService: Add to history (if logged in)
System → ListingCacheService: Cache response
System → Guest: ListingDetailView (HTTP 200)
```

#### Image Load Flow
```
Guest → System: RequestImage (HTTP GET /cdn/images/:id)
    ↓
System → MediaService: Validate access
System → CDN: Serve image (WebP, resized)
System → Guest: ImageResponse
```

#### WebSocket: Real-time Availability Update
```
Owner → System: CalendarUpdate (WebSocket)
    ↓
System → AvailabilityService: Update calendar
System → WebSocket: Broadcast to connected guests viewing listing
Guest ← System: AvailabilityUpdate (WebSocket event)
```

### Expanded Alternative Sequences

#### Step 2: Listing Not Found
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| Invalid listing ID | 404 error page | Similar listings suggestions |
| Listing deleted | 410 Gone error | Alternative properties in same area |
| Listing not approved | "Under review" message | Estimated approval date |
| Listing suspended | "Temporarily unavailable" | Contact support option |
| Listing inactive | "Not currently bookable" | Owner's other listings |

#### Step 4: No Availability
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| Fully booked for dates | "Fully Booked" badge | Nearest available dates |
| Partial availability | Show available dates only | Split booking option |
| Calendar not published | "Contact owner for availability" | Message owner button |
| Blackout dates | "Not available these dates" | Alternative date suggestions |

#### Step 5: Image Delivery Failures
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| CDN timeout | Fallback to origin | Loading retry |
| Image not found | Placeholder image | "Image unavailable" badge |
| Slow image load | Progressive loading | Low-res placeholder first |
| Video playback error | Show thumbnail | "Video unavailable" message |

#### Step 6: Authentication Edge Cases
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| Not logged in | Skip "Recently Viewed" | "Sign in to save" prompt |
| Session expired | Silently fail history save | Continue viewing normally |
| Rate limit exceeded | Cache view count locally | Batch update later |

**Related Use Cases**: [UC-G01: Search Hostels](#uc-g01-search-hostels) (entry point), [UC-G03: Create Booking](#uc-g03-create-booking) (next action)

---

## UC-G03: Create Booking

| Field | Description |
|-------|-------------|
| **Use Case Name** | Create Booking |
| **Created By** | Product Team |
| **Created Date** | 2026-01-25 |
| **Last Updated By** | Product Team |
| **Last Updated Date** | 2026-01-25 |
| **Summary** | Guest initiates a booking request by selecting dates, room type, and number of guests. System validates availability, reserves the dates, and creates a pending booking record. |
| **Dependency** | UC-G02 (View Listing Details) |
| **Actors** | Primary: Guest |
| **Preconditions** | Guest is authenticated (or will authenticate in flow). Selected listing is available for desired dates. |
| **Trigger** | Guest clicks "Book Now" from listing page |
| **Main Sequence** | 1. Guest clicks "Book Now" from listing page<br>2. System redirects to checkout page (or prompts login if not authenticated)<br>3. Guest selects or confirms dates, room type, number of guests<br>4. System validates availability for selected dates<br>5. System displays price breakdown (base rate, fees, taxes)<br>6. Guest confirms booking details<br>7. System reserves availability for selected dates<br>8. System creates booking record with status 'pending_payment'<br>9. System redirects guest to payment flow |
| **Alternative Sequences** | Step 2: If guest not authenticated, System prompts login/register, preserves booking data temporarily<br>Step 3: If dates no longer available, System displays error "Selected dates no longer available" with available alternatives<br>Step 4: If availability reservation fails, System displays "Someone is booking this room. Please try again in a moment"<br>Step 7: If booking creation fails, System releases reservation and displays error with retry option |
| **Postconditions** | Booking record created (status: pending_payment). Availability reserved. Payment initiated. Notification queued. |
| **Nonfunctional Requirements** | Availability reservation timeout: 15 minutes. Zero double-bookings guarantee. Atomic booking creation. Payment gateway failover support. |
| **Business Requirements** | BR-003: Guest must provide valid contact information<br>BR-004: Availability reservation expires after 15 minutes if payment not completed |
| **Frequency of Use** | High |
| **Priority** | High |
| **Outstanding Questions** | Reservation timeout: 10 or 15 minutes? How to handle abandoned bookings (cleanup schedule)? |

### Sequence Diagram

```mermaid
sequenceDiagram
    participant G as Guest
    participant UI as Checkout UI
    participant API as API Gateway
    participant AUTH as AuthService
    participant BS as BookingService
    participant VAL as BookingValidator
    participant AVAIL as AvailabilityService
    participant LOCK as ReservationLockService
    participant PRICE as PricingService
    participant REPO as BookingRepository
    participant NS as NotificationService
    participant REDIS as Redis Cache

    G->>UI: Click "Book Now"
    UI->>API: POST /api/bookings/initiate
    API->>AUTH: Check authentication

    alt Not Authenticated
        AUTH-->>API: NotAuthenticated
        API-->>UI: Redirect to login
        UI-->>G: Login form
        G->>UI: Submit credentials
        UI->>AUTH: Authenticate
        AUTH-->>UI: AuthToken
    end

    UI->>API: POST /api/bookings/initiate
    API->>BS: Create booking session
    BS-->>API: SessionId
    API-->>UI: Checkout page

    G->>UI: Confirm booking details
    UI->>API: POST /api/bookings
    API->>VAL: Validate constraints
    VAL-->>API: Valid
    API->>AVAIL: Check availability
    AVAIL-->>API: Available
    API->>LOCK: Acquire lock (15min TTL)
    LOCK->>REDIS: SETNX reservation:lock
    REDIS-->>LOCK: LockAcquired
    LOCK-->>API: reservationId
    API->>PRICE: Calculate total
    PRICE-->>API: PriceBreakdown
    API->>REPO: Create booking (status: pending_payment)
    REPO-->>API: BookingRecord
    API->>NS: Queue notifications
    NS-->>API: Queued
    API-->>UI: Redirect to payment

    par Cleanup (Background)
        loop Every 5 minutes
            REPO->>REPO: Find expired bookings
            REPO->>LOCK: Release locks
            REPO->>REPO: Update status to expired
        end
    end
```

### Boundary Objects

| Boundary Object | Description | Data Elements |
|----------------|-------------|---------------|
| **BookingRequest** | Guest's booking initiation | listingId, roomId, checkInDate, checkOutDate, guestCount, specialRequests |
| **BookingConfirmation** | Created booking details | bookingId, status, reservationExpiresAt, priceBreakdown |
| **PriceBreakdown** | Detailed cost calculation | basePrice, cleaningFee, serviceFee, taxes, totalPrice, currency |
| **AvailabilityReservation** | Temporary hold on dates | reservationId, roomId, dateRange, expiresAt |
| **GuestDetails** | Guest information for booking | guestId, name, email, phone, specialRequests |
| **CheckoutSession** | Checkout page session data | sessionId, listingData, dateData, pricingData, expiresAt |

### Internal Software Objects

| Internal Object | Responsibility |
|-----------------|---------------|
| **BookingService** | Orchestrates booking creation flow |
| **AvailabilityService** | Manages availability reservations and locks |
| **PricingService** | Calculates total pricing with fees and taxes |
| **BookingRepository** | Persists booking records |
| **ReservationLockService** | Manages distributed locks for availability (Redis) |
| **GuestService** | Fetches guest details |
| **AuthService** | Validates authentication state |
| **BookingValidator** | Validates booking constraints (dates, capacity) |
| **NotificationService** | Queues booking notifications |
| **SessionService** | Manages temporary booking session data |

### Message Communication Sequence

#### Booking Creation Flow
```
Guest → System: BookNow (HTTP POST /api/bookings/initiate)
    ↓
System → AuthService: Check authentication
    ← NotAuthenticated
System → Guest: Redirect to login (HTTP 302)
Guest → System: Authenticate
    ↓
System → BookingService: Create booking session
    ← SessionId
System → Guest: Checkout page (HTTP 200)
    ↓
Guest → System: ConfirmBooking (HTTP POST /api/bookings)
    ↓
System → BookingValidator: Validate constraints
    ← Valid
System → AvailabilityService: Check availability
    ← Available
System → ReservationLockService: Acquire lock (Redis, 15min TTL)
    ← LockAcquired (reservationId)
System → PricingService: Calculate total
    ← PriceBreakdown
System → BookingRepository: Create booking (status: pending_payment)
    ← BookingRecord
System → NotificationService: Queue notifications
    ← Queued
System → Guest: Redirect to payment (HTTP 302)
```

#### Lock Expiration Flow
```
System (scheduler) → BookingRepository: Find expired pending bookings
    ← expiredBookings[]
System → ReservationLockService: Release locks
    ← Released
System → BookingRepository: Update status (expired)
```

#### WebSocket: Real-time Availability
```
System → WebSocket: Broadcast booking.created event
Guest(s) viewing listing ← System: AvailabilityUpdate
```

### Expanded Alternative Sequences

#### Step 2: Authentication States
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| Not logged in | Redirect to login | Preserve booking data in session |
| Session expired | Re-authenticate required | Restore booking session after login |
| Email not verified | Block with verification prompt | Verify email to continue |
| Account suspended | Block with message | Contact support |

#### Step 3: Availability Changes
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| Dates became unavailable | Error: "No longer available" | Show alternative dates |
| Price increased since page load | Show new price | Confirm or cancel |
| Room capacity exceeded | Error: "Too many guests" | Suggest additional rooms |
| Minimum stay not met | Error: "Minimum X nights" | Adjust dates |

#### Step 4: Reservation Failures
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| Concurrent booking attempt | Error: "Someone is booking this room" | Retry button with countdown |
| Lock acquisition timeout | Error: "Unable to reserve. Try again" | Auto-retry up to 3 times |
| Redis connection failure | Fallback to database lock | Degraded performance notice |
| Duplicate booking detected | Error: "You already have a booking" | Link to existing booking |

#### Step 7: Booking Creation Failures
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| Database constraint violation | Error: "Booking creation failed" | Release lock, retry |
| Payment gateway unavailable | Queue for retry | Notify when payment available |
| Notification queue full | Continue booking | Log for later notification |
| Session expired | Error: "Session expired" | Restart booking flow |

**Related Use Cases**: [UC-G02: View Listing Details](#uc-g02-view-listing-details) (entry point), [UC-A02: Manage Users](./admin-use-cases.md#uc-a02-manage-users) (user status impacts)

---

[← Back to Use Cases Index](./index.md)
