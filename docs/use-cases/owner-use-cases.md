# Owner Use Cases

## UC-O02: Manage Listings

| Field | Description |
|-------|-------------|
| **Use Case Name** | Manage Listings |
| **Created By** | Product Team |
| **Created Date** | 2026-01-25 |
| **Last Updated By** | Product Team |
| **Last Updated Date** | 2026-01-25 |
| **Summary** | Owner creates, updates, and deactivates listings under their approved properties. Each listing has room types, pricing, and amenities. |
| **Dependency** | UC-O01 (Register Property) |
| **Actors** | Primary: Owner |
| **Preconditions** | Owner authenticated. At least one approved property exists. |
| **Trigger** | Owner navigates to "My Listings" |
| **Main Sequence** | 1. Owner navigates to "My Listings"<br>2. System displays all listings with status indicators<br>3. Owner clicks "Add Listing" or selects existing to edit<br>4. Owner enters listing details (room type, capacity, base price, amenities)<br>5. Owner uploads listing images<br>6. Owner saves listing<br>7. System updates listing<br>8. System initializes availability calendar |
| **Alternative Sequences** | Step 2: If no listings, System displays empty state with "Create your first listing" CTA<br>Step 4: If duplicate listing detected, System warns "Similar listing exists"<br>Step 7: If search index update fails, System queues for retry and shows warning to owner<br>Step 8: If calendar initialization fails, System logs error for manual intervention |
| **Postconditions** | Listing created/updated. Search index updated. Calendar initialized. Audit log created. |
| **Nonfunctional Requirements** | Max 20 images per listing. Amenities predefined list. Price validation (min/max). Search index update reliability. |
| **Business Requirements** | BR-019: Room type must match property type<br>BR-020: Pricing must be within platform limits |
| **Frequency of Use** | Medium |
| **Priority** | High |
| **Outstanding Questions** | How many listings per property? Should changes require re-approval? |

### Sequence Diagram

```mermaid
sequenceDiagram
    participant O as Owner
    participant UI as Owner Dashboard
    participant API as API Gateway
    participant LS as ListingService
    participant VAL as ListingValidator
    participant PS as PricingService
    participant IMG as ImageUploadService
    participant REPO as ListingRepository
    participant ES as SearchIndexService
    participant MQ as RabbitMQ
    participant WS as WebSocket
    participant G as Guest (viewing)

    O->>UI: Navigate to "My Listings"
    UI->>API: GET /api/owner/listings
    API->>REPO: Fetch listings
    REPO-->>API: Listings[]
    API-->>UI: Display listings

    alt No Listings
        UI-->>O: Empty state + "Create first listing"
    end

    O->>UI: Click "Add Listing"
    UI-->>O: Listing form
    O->>UI: Enter details + upload images
    UI->>API: POST /api/listings
    API->>VAL: Validate data
    VAL-->>API: Valid
    API->>REPO: Verify property ownership
    REPO-->>API: Verified
    API->>PS: Check price limits
    PS-->>API: Within limits
    API->>IMG: Upload images
    IMG-->>API: imageUrls[]
    API->>REPO: Create listing
    REPO-->>API: ListingRecord
    API->>MQ: Publish listing.created
    MQ-->>API: Queued
    API-->>UI: ListingResponse (201)

    par Async Search Index Update
        MQ->>ES: Consume message
        ES->>ES: Index in Elasticsearch
        ES->>ES: Success (or retry)
    end

    par Real-time Broadcast
        ES->>WS: Broadcast listing.update
        G-->>WS: Receive update (if viewing search)
    end
```

### Boundary Objects

| Boundary Object | Description | Data Elements |
|----------------|-------------|---------------|
| **ListingDetails** | Listing form data | propertyId, title, description, roomType, capacity, basePrice, currency, amenities[] |
| **ListingResponse** | Created/updated listing | listingId, status, searchIndexStatus, updatedAt |
| **ListingImage** | Listing media | imageId, url, order, caption |
| **AmenityItem** | Amenity selection | amenityId, name, category |
| **PriceValidation** | Price constraint check | minPrice, maxPrice, platformLimits |

### Internal Software Objects

| Internal Object | Responsibility |
|-----------------|---------------|
| **ListingService** | Manages listing CRUD operations |
| **ListingValidator** | Validates listing constraints |
| **PricingService** | Validates and enforces price limits |
| **AmenityService** | Manages available amenities |
| **ImageUploadService** | Handles listing image uploads |
| **SearchIndexService** | Syncs listings to Elasticsearch |
| **ListingRepository** | Persists listing records |
| **PropertyRepository** | Verifies property ownership |
| **NotificationService** | Notifies of search index issues |
| **AuditLogService** | Logs listing changes |

### Message Communication Sequence

#### Create/Update Listing Flow
```
Owner → System: CreateListing (HTTP POST /api/listings)
    ↓
System → ListingValidator: Validate data
    ← Valid
System → PropertyRepository: Verify property ownership
    ← Verified
System → PricingService: Check price limits
    ← Within limits
System → ImageUploadService: Upload images
    ← imageUrls[]
System → ListingRepository: Create listing
    ← ListingRecord
System → SearchIndexService: Sync to Elasticsearch
    ← Indexed
System → AuditLogService: Log creation
    ← Logged
System → Owner: ListingResponse (HTTP 201)
```

#### Search Index Sync Flow
```
System → RabbitMQ: Publish listing.created
    ↓
Search Index Worker → SearchIndexService: Index in Elasticsearch
    ← Success (or Failure)
    ↓
If Failure → NotificationService: Alert admins
    ← Alerted
```

### Communication Sequence Diagram

**Scenario**: Owner creates new listing

```mermaid
graph LR
    Owner((Owner))
    ListInt[": ListingManagementInteraction"]
    Control[": ListingManagementControl"]
    Validator[": ListingValidator"]
    IndexUpdater[": SearchIndexUpdater"]
    CalendarInit[": CalendarInitializer"]
    Listing[": Listing"]
    Amenity[": Amenity"]
    Image[": Image"]
    Calendar[": Calendar"]

    Owner -->|1: My Listings| ListInt
    ListInt -->|1.1: List Request| Control
    Control -->|1.2: Get Listings| Listing
    Listing -->|1.3: Listings| Control
    Control -->|1.4: Display List| ListInt
    ListInt -->|1.5: Show Listings| Owner

    Owner -->|2: Add Listing| ListInt
    ListInt -->|2.1: Create Request| Control
    Control -->|2.2: Display Form| ListInt
    ListInt -->|2.3: Show Form| Owner

    Owner -->|3: Enter Details| ListInt
    ListInt -->|3.1: Listing Data| Control
    Control -->|3.2: Validate| Validator
    Validator -->|3.3: Valid| Control

    Owner -->|4: Upload Images| ListInt
    ListInt -->|4.1: Image Files| Image
    Image -->|4.2: Images Stored| Control

    Owner -->|5: Save Listing| ListInt
    ListInt -->|5.1: Save Request| Control
    Control -->|5.2: Validate All| Validator
    Validator -->|5.3: All Valid| Control
    Control -->|5.4: Create Listing| Listing
    Listing -->|5.5: Listing Created| Control
    Control -->|5.6: Save Amenities| Amenity
    Amenity -->|5.7: Amenities Saved| Control
    Control -->|5.8: Initialize Calendar| CalendarInit
    CalendarInit -->|5.9: Calendar Entries| Calendar
    Calendar -->|5.10: Calendar Initialized| CalendarInit
    CalendarInit -->|5.11: Ready| Control
    Control -->|5.12: Update Index| IndexUpdater
    IndexUpdater -->|5.13: Index Updated| Control
    Control -->|5.14: Listing Active| ListInt
    ListInt -->|5.15: Show Success| Owner
```

**Message Flow Description**

| Seq# | From | To | Message | Description |
|------|------|-----|---------|-------------|
| 1 | Owner | ListingManagementInteraction | My Listings | Navigate to listings |
| 1.1 | ListingManagementInteraction | ListingManagementControl | List Request | Get all listings |
| 1.2 | ListingManagementControl | Listing | Get Listings | Query listings by owner |
| 1.3 | Listing | ListingManagementControl | Listings | Return listing list |
| 1.4 | ListingManagementControl | ListingManagementInteraction | Display List | Show with status |
| 1.5 | ListingManagementInteraction | Owner | Show Listings | Display listings |
| 2 | Owner | ListingManagementInteraction | Add Listing | Click "Add Listing" |
| 2.1 | ListingManagementInteraction | ListingManagementControl | Create Request | Request creation form |
| 2.2 | ListingManagementControl | ListingManagementInteraction | Display Form | Show listing form |
| 2.3 | ListingManagementInteraction | Owner | Show Form | Display form fields |
| 3 | Owner | ListingManagementInteraction | Enter Details | Room type, capacity, price |
| 3.1 | ListingManagementInteraction | ListingManagementControl | Listing Data | Listing details |
| 3.2 | ListingManagementControl | ListingValidator | Validate | Validate listing data |
| 3.3 | ListingValidator | ListingManagementControl | Valid | Validation passed |
| 4 | Owner | ListingManagementInteraction | Upload Images | Upload listing photos |
| 4.1 | ListingManagementInteraction | Image | Image Files | Upload images |
| 4.2 | Image | ListingManagementControl | Images Stored | Images saved |
| 5 | Owner | ListingManagementInteraction | Save Listing | Submit listing |
| 5.1 | ListingManagementInteraction | ListingManagementControl | Save Request | Save listing |
| 5.2 | ListingManagementControl | ListingValidator | Validate All | Final validation |
| 5.3 | ListingValidator | ListingManagementControl | All Valid | All validations passed |
| 5.4 | ListingManagementControl | Listing | Create Listing | Create listing record |
| 5.5 | Listing | ListingManagementControl | Listing Created | Listing saved |
| 5.6 | ListingManagementControl | Amenity | Save Amenities | Save amenities |
| 5.7 | Amenity | ListingManagementControl | Amenities Saved | Amenities saved |
| 5.8 | ListingManagementControl | CalendarInitializer | Initialize Calendar | Create calendar |
| 5.9 | CalendarInitializer | Calendar | Calendar Entries | Initialize calendar dates |
| 5.10 | Calendar | CalendarInitializer | Calendar Initialized | Calendar created |
| 5.11 | CalendarInitializer | ListingManagementControl | Ready | Initialization complete |
| 5.12 | ListingManagementControl | SearchIndexUpdater | Update Index | Update search index |
| 5.13 | SearchIndexUpdater | ListingManagementControl | Index Updated | Search index updated |
| 5.14 | ListingManagementControl | ListingManagementInteraction | Listing Active | Listing is active |
| 5.15 | ListingManagementInteraction | Owner | Show Success | Display confirmation |

### Expanded Alternative Sequences

#### Step 4: Duplicate Detection
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| Same room type + property | Warning: "Similar listing exists" | Allow with confirmation |
| Same capacity + price range | Warning: "May duplicate existing" | Show existing listing |
| Different property | No warning | Continue normally |

#### Step 7: Search Index Failures
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| Elasticsearch down | Queue for retry | Listing created, "Pending search" badge |
| Index timeout | Retry in background | Notify when indexed |
| Partial success | Warning: "Some fields not searchable" | Re-sync available |
| Connection lost | Queue in RabbitMQ | Worker will retry |

#### Step 8: Calendar Initialization
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| Date range invalid | Error: "Invalid date range" | Prompt for valid dates |
| Database constraint | Log error, manual fix | Flag for admin review |
| Async init succeeded | Silent success | Calendar ready |
| Init timeout | Background retry | Notify when ready |

**Related Use Cases**: [UC-G01: Search Hostels](./guest-use-cases.md#uc-g01-search-hostels) (listings appear in search), [UC-G02: View Listing Details](./guest-use-cases.md#uc-g02-view-listing-details) (details displayed)

---

[← Back to Use Cases Index](./index.md)
