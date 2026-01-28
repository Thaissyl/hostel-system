# Hostel Management System - Use Cases Documentation

Comprehensive documentation covering admin, guest, and owner interactions with detailed architectural patterns and implementation specifications.

---

## Key Insights

- **Zero Double-Booking Guarantee**: Distributed locking (Redis) ensures atomic availability reservations
- **15-Minute Booking Window**: Pending payments expire automatically with cleanup scheduler
- **Real-time Availability**: WebSocket broadcasts keep listings synchronized across clients
- **Search Performance**: 500ms p95 response with Elasticsearch + 5-minute cache layer
- **Admin Actions Cascade**: User suspension/ban triggers booking cancellations and token invalidation

---

## Quick Reference: Use Case Overview

| Use Case | Actor | Priority | Frequency | Complexity | Dependencies |
|----------|-------|----------|-----------|------------|--------------|
| **UC-A02**: Manage Users | Admin | High | Medium | High | None |
| **UC-G01**: Search Hostels | Guest | High | High | Medium | UC-G02 |
| **UC-G02**: View Listing Details | Guest | High | High | Medium | UC-G01 |
| **UC-G03**: Create Booking | Guest | High | High | High | UC-G02 |
| **UC-O02**: Manage Listings | Owner | High | Medium | Medium | UC-O01 |

---

## System Architecture Overview

```mermaid
graph TB
    subgraph "Client Layer"
        WEB[Web App]
        MOBILE[Mobile App]
    end

    subgraph "API Gateway"
        API[REST API]
        WS[WebSocket Server]
    end

    subgraph "Core Services"
        AS[Auth Service]
        US[User Service]
        LS[Listing Service]
        BS[Booking Service]
        PS[Payment Service]
        NS[Notification Service]
    end

    subgraph "Data Layer"
        PG[(PostgreSQL)]
        REDIS[(Redis Cache)]
        ES[(Elasticsearch)]
        S3[CDN/Media]
    end

    subgraph "Message Queue"
        MQ[RabbitMQ]
    end

    WEB --> API
    MOBILE --> API
    WEB --> WS

    API --> AS
    API --> US
    API --> LS
    API --> BS
    API --> PS

    AS --> PG
    AS --> REDIS
    US --> PG
    LS --> PG
    LS --> ES
    BS --> PG
    BS --> REDIS
    PS --> PG

    LS --> S3
    BS --> MQ
    NS --> MQ

    MQ --> NS
```

---

## Actor-Role Interactions

```mermaid
graph LR
    ADMIN[👑 Admin]
    GUEST[👤 Guest]
    OWNER[🏠 Owner]

    ADMIN -->|UC-A02| USERS[Manage Users]
    ADMIN -.->|Affects| USERS

    GUEST -->|UC-G01| SEARCH[Search Hostels]
    SEARCH -->|UC-G02| DETAILS[View Details]
    DETAILS -->|UC-G03| BOOKING[Create Booking]

    OWNER -->|UC-O02| LISTINGS[Manage Listings]
    LISTINGS -.->|Appears in| SEARCH
    BOOKING -.->|Uses| DETAILS

    style ADMIN fill:#ff6b6b
    style GUEST fill:#4ecdc4
    style OWNER fill:#ffe66d
```

---

## Entity State Machines

### User State Machine

```mermaid
stateDiagram-v2
    [*] --> Pending: Register
    Pending --> Active: Verify Email
    Pending --> Banned: Admin Action
    Active --> Suspended: Admin Suspend
    Active --> Verified: Admin Verify
    Active --> Banned: Admin Ban
    Suspended --> Active: Unsuspend
    Verified --> Suspended: Admin Suspend
    Verified --> Banned: Admin Ban
    Banned --> [*]
    Verified --> [*]
```

### Booking State Machine

```mermaid
stateDiagram-v2
    [*] --> PendingPayment: Guest Book Now
    PendingPayment --> Confirmed: Payment Success
    PendingPayment --> Expired: 15min Timeout
    PendingPayment --> Cancelled: Guest Cancel
    Confirmed --> CheckedIn: Owner Check-in
    Confirmed --> Cancelled: Guest Cancel (Refund)
    CheckedIn --> Completed: Check-out
    CheckedIn --> Cancelled: Early Checkout (Partial Refund)
    Completed --> [*]
    Expired --> [*]
    Cancelled --> [*]
```

### Listing State Machine

```mermaid
stateDiagram-v2
    [*] --> Draft: Owner Create
    Draft --> PendingReview: Owner Submit
    PendingReview --> Approved: Admin Approve
    PendingReview --> Rejected: Admin Reject
    Approved --> Active: Owner Activate
    Approved --> Suspended: Admin Suspend
    Active --> Inactive: Owner Deactivate
    Active --> Suspended: Admin Suspend
    Suspended --> Active: Admin Reinstate
    Inactive --> Active: Owner Reactivate
    Rejected --> Draft: Owner Revise
    Inactive --> [*]
```

---

## Entity Relationships

```mermaid
erDiagram
    USER ||--o{ BOOKING : makes
    USER ||--o{ REVIEW : writes
    USER ||--o{ LISTING : owns
    USER }o--|| ROLE : has

    PROPERTY ||--o{ LISTING : contains
    LISTING ||--o{ ROOM : has
    LISTING ||--o{ AMENITY : provides
    LISTING ||--o{ REVIEW : receives

    BOOKING }o--|| LISTING : reserves
    BOOKING }o--|| ROOM : books
    BOOKING ||--o| PAYMENT : requires

    LISTING ||--o{ AVAILABILITY : has
    AVAILABILITY }o--|| DATE : specifies

    USER {
        uuid id PK
        string email UK
        string password
        enum role
        enum status
        datetime createdAt
    }

    LISTING {
        uuid id PK
        uuid propertyId FK
        string title
        text description
        decimal basePrice
        enum status
        datetime createdAt
    }

    BOOKING {
        uuid id PK
        uuid listingId FK
        uuid guestId FK
        date checkIn
        date checkOut
        enum status
        decimal totalPrice
        datetime createdAt
    }

    PROPERTY {
        uuid id PK
        uuid ownerId FK
        string name
        string address
        enum status
    }

    REVIEW {
        uuid id PK
        uuid listingId FK
        uuid userId FK
        int rating
        text comment
        datetime createdAt
    }
```

---

## Contents

### Actor-Specific Use Cases

- **[Admin Use Cases](./admin-use-cases.md)**
  - [UC-A02: Manage Users](./admin-use-cases.md#uc-a02-manage-users) - User management, suspension, banning, verification

- **[Guest Use Cases](./guest-use-cases.md)**
  - [UC-G01: Search Hostels](./guest-use-cases.md#uc-g01-search-hostels) - Search with filters and availability checking
  - [UC-G02: View Listing Details](./guest-use-cases.md#uc-g02-view-listing-details) - Comprehensive listing information display
  - [UC-G03: Create Booking](./guest-use-cases.md#uc-g03-create-booking) - Booking initiation with availability reservation

- **[Owner Use Cases](./owner-use-cases.md)**
  - [UC-O02: Manage Listings](./owner-use-cases.md#uc-o02-manage-listings) - Listing creation, updates, and management

### Cross-Use Case Dependencies

```mermaid
graph TD
    A[UC-A02: Manage Users] -.->|User status affects| G3[UC-G03: Create Booking]

    G1[UC-G01: Search Hostels] --> G2[UC-G02: View Listing Details]
    G2 --> G3[UC-G03: Create Booking]

    O2[UC-O02: Manage Listings] -.->|Provides listings| G1
    O2 -.->|Details viewed| G2

    style A fill:#ff6b6b
    style G1 fill:#4ecdc4
    style G2 fill:#4ecdc4
    style G3 fill:#4ecdc4
    style O2 fill:#ffe66d
```

### Component Interaction Overview

```mermaid
graph TB
    subgraph "Guest Interactions"
        G1[Search]
        G2[View Details]
        G3[Book]
    end

    subgraph "Owner Interactions"
        O2[Manage Listings]
    end

    subgraph "Admin Interactions"
        A2[Manage Users]
    end

    subgraph "Shared Services"
        AUTH[Authentication]
        NOTIF[Notifications]
        CACHE[Caching]
    end

    G1 --> CACHE
    G2 --> CACHE
    G3 --> AUTH
    G3 --> NOTIF

    O2 --> AUTH
    O2 --> NOTIF

    A2 --> AUTH
    A2 --> NOTIF

    style G1 fill:#e1f5fe
    style G2 fill:#e1f5fe
    style G3 fill:#e1f5fe
    style O2 fill:#fff3e0
    style A2 fill:#ffebee
    style AUTH fill:#f3e5f5
    style NOTIF fill:#f3e5f5
    style CACHE fill:#f3e5f5
```

---

## Data Flow Architecture

```mermaid
flowchart LR
    subgraph "Search Flow"
        A1[Guest Search] --> A2[Validate]
        A2 --> A3[ES Query]
        A3 --> A4[Availability Check]
        A4 --> A5[Price Calc]
        A5 --> A6[Cache Results]
    end

    subgraph "Booking Flow"
        B1[Book Now] --> B2[Auth Check]
        B2 --> B3[Reserve Lock]
        B3 --> B4[Create Booking]
        B4 --> B5[Payment Init]
        B5 --> B6[Notify Parties]
    end

    subgraph "Management Flow"
        C1[Owner Action] --> C2[Validate]
        C2 --> C3[Update DB]
        C3 --> C4[Sync Search Index]
        C4 --> C5[Broadcast Update]
    end

    A6 --> GUEST_OUTPUT[Results Display]
    B6 --> BOOKING_OUTPUT[Booking Confirmed]
    C5 --> WS_UPDATE[Real-time Update]

    style A6 fill:#e1f5fe
    style B6 fill:#e8f5e9
    style C5 fill:#fff3e0
```

---

## Document Information

- **Document Version**: 2.0 (Enhanced)
- **Last Updated**: 2026-01-29
- **Author**: Product Team
- **Status**: Comprehensive Use Cases Documentation with Architecture Patterns

---

## References

- [System Architecture](../system-architecture.md)
- [Code Standards](../code-standards.md)
- [Project Overview](../project-overview-pdr.md)
- [Codebase Summary](../codebase-summary.md)

---

**Document Purpose**: This document provides comprehensive architectural and implementation specifications for all core use cases, including detailed sequence diagrams with error handling, state machines for entity lifecycle management, entity relationships, and component interaction patterns to support full system implementation and testing.
