# Communication Diagrams - Hostel Management System

This directory contains PlantUML communication diagrams for the Hostel Management System use cases.

## 📁 Diagram Files

| File | Description | Diagrams Included |
|------|-------------|-------------------|
| `admin-user-management-communication.puml` | Admin user management flows | View Users, Search Users, Suspend User, Ban User, Verify User |
| `guest-booking-communication.puml` | Guest booking flows | Search Hostels, View Listing Details, Create Booking, WebSocket updates |
| `owner-listing-management-communication.puml` | Owner listing management | View Listings, Create Listing, Update Listing, Deactivate Listing, Search Index Sync |
| `system-architecture-overview.puml` | Complete system architecture | All components, services, data layer, external integrations |

## 🎨 How to View Diagrams

### Online Options (No Installation Required)

1. **PlantUML Online Editor**
   - Visit: http://www.plantuml.com/plantuml/uml/
   - Copy the `.puml` file content
   - Paste into the editor
   - View/export as PNG/SVG

2. **PlantText**
   - Visit: https://www.planttext.com/
   - Copy/paste the `.puml` content
   - Real-time preview with auto-refresh

3. **VS Code Extension**
   - Install "PlantUML" extension by jebbs
   - Open `.puml` file in VS Code
   - Press `Alt+D` to preview
   - Right-click → "Export Current Diagram"

### Command Line Options

1. **Install PlantUML**
   ```bash
   # Download plantuml.jar from https://plantuml.com/download
   # Requires Java 8+

   # Generate PNG
   java -jar plantuml.jar admin-user-management-communication.puml

   # Generate SVG
   java -jar plantuml.jar -tsvg admin-user-management-communication.puml

   # Generate all diagrams in directory
   java -jar plantuml.jar *.puml
   ```

2. **Using Docker**
   ```bash
   # Generate PNG
   docker run --rm -v %cd%:/data plantuml/plantuml admin-user-management-communication.puml

   # Generate SVG
   docker run --rm -v %cd%:/data plantuml/plantuml -tsvg *.puml
   ```

3. **Using Node.js**
   ```bash
   npm install -g node-plantuml

   # Generate PNG
   puml generate admin-user-management-communication.puml

   # Generate all
   puml generate *.puml
   ```

## 📊 Diagram Types

### 1. Communication Diagrams (Sequence Diagrams)

Show the flow of messages between actors and components over time:

**Elements:**
- **Actors**: Admin, Guest, Owner (external entities)
- **Participants**: API Gateway, Controllers, Services (internal components)
- **Messages**: Synchronous requests and responses
- **Parallel Actions**: Multiple concurrent operations
- **Notes**: Additional context and explanations

**Color Coding:**
- 🟢 Green: Successful flow
- 🔴 Red: Error handling
- 🔵 Blue: Async operations
- 🟡 Yellow: Notes/annotations

### 2. Component Architecture Diagram

Shows the static structure of the system:

**Layers:**
- **Actors**: External users (Admin, Guest, Owner)
- **API Gateway Layer**: HTTP/REST, WebSocket, Authentication
- **Core Services Layer**: Business logic services
- **Data Layer**: Databases, Cache, Search Index
- **Message Queue**: Async communication (RabbitMQ)
- **External Services**: Third-party integrations

## 🔍 Diagram Details

### Admin User Management Flows

**View Users Flow**
- Paginated user list retrieval
- Filter application (role, status, verification)
- Response time: < 1s

**Search Users Flow**
- Search by email, name, phone
- Return matching users
- Support complex queries

**Suspend User Flow**
- Update user status to "suspended"
- Cancel upcoming bookings
- Invalidate auth tokens
- Send notification email
- Log audit trail

**Ban User Flow**
- Update user status to "banned"
- Cancel ALL bookings
- Invalidate auth tokens
- Send notification email
- Log audit trail with justification

**Verify User Flow**
- Update verification level
- Send confirmation email
- Update access permissions

### Guest Booking Flows

**Search Hostels Flow**
- Validate search criteria
- Check cache (5min TTL)
- Query Elasticsearch
- Check availability
- Calculate pricing
- Score and sort results
- Log analytics

**View Listing Details Flow**
- Check cache (15min TTL)
- Parallel fetch: listing, reviews, calendar, pricing, media, location
- Increment view count (async)
- Update recently viewed (if logged in)

**Create Booking Flow**
- Authentication check
- Validate constraints
- Acquire distributed lock (15min TTL)
- Calculate pricing
- Create booking (pending_payment)
- Queue notifications
- Redirect to payment

**WebSocket Real-time Updates**
- Owner updates calendar
- System broadcasts to connected guests
- Guests viewing listing receive update
- Calendar auto-refreshes

### Owner Listing Management Flows

**View Listings Flow**
- Query listings by owner
- Verify property ownership
- Return with status indicators

**Create Listing Flow**
- Validate listing data
- Verify property ownership
- Check price limits
- Upload images
- Create listing record
- Sync to Elasticsearch (async)
- Initialize calendar
- Log audit trail

**Update Listing Flow**
- Validate changes
- Recheck price limits
- Upload new images (if provided)
- Update listing record
- Update search index (async)
- Log audit trail

**Search Index Sync Flow (Background)**
- Worker consumes from RabbitMQ
- Index in Elasticsearch
- Retry on failure (exponential backoff)
- Alert admins on repeated failures

**Deactivate Listing Flow**
- Update status to "inactive"
- Remove from search index
- Mark all dates unavailable
- Preserve existing bookings

## 🎯 Use Cases Covered

| Use Case ID | Use Case Name | Actor | Priority | Diagram |
|-------------|---------------|-------|----------|---------|
| UC-A02 | Manage Users | Admin | High | admin-user-management-communication.puml |
| UC-G01 | Search Hostels | Guest | High | guest-booking-communication.puml |
| UC-G02 | View Listing Details | Guest | High | guest-booking-communication.puml |
| UC-G03 | Create Booking | Guest | High | guest-booking-communication.puml |
| UC-O02 | Manage Listings | Owner | High | owner-listing-management-communication.puml |

## 🔗 Related Documentation

- [Use Cases Index](../use-cases/index.md) - Overview of all use cases
- [Admin Use Cases](../use-cases/admin-use-cases.md) - Detailed admin workflows
- [Guest Use Cases](../use-cases/guest-use-cases.md) - Detailed guest workflows
- [Owner Use Cases](../use-cases/owner-use-cases.md) - Detailed owner workflows
- [System Architecture](../system-architecture.md) - Complete system architecture

## 🛠️ Customization

### Modify Diagram Styling

Edit the PlantUML theme in each file:

```plantuml
!theme plain
!theme bluegray
!theme cerulean
!theme cylindrical
```

### Change Colors

```plantuml
skinparam actorBackgroundColor #FEFECE
skinparam useCaseBackgroundColor #FEFECE
skinparam componentBackgroundColor #FEFECE
```

### Add Notes

```plantuml
note right of Actor
  This is a note
  with multiple lines
end note
```

## 📝 Conventions

### Naming Conventions

- **Participants**: PascalCase (e.g., `UserRepository`, `BookingService`)
- **Messages**: camelCase (e.g., `searchUsers()`, `createBooking()`)
- **Variables**: camelCase (e.g., `listingId`, `userId`)

### Color Usage

- ✅ **Green**: Success paths
- ❌ **Red**: Error paths
- ℹ️ **Blue**: Information
- ⚠️ **Yellow**: Warnings/Notes

### Timing Indicators

- `activate`/`deactivate`: Show activity duration
- `par`/`end`: Parallel operations
- `alt`/`else`/`end`: Alternative flows
- `loop`/`end`: Repetitive operations

## 🚀 Quick Start

1. Choose a diagram file
2. Copy its content
3. Paste into https://www.planttext.com/
4. View/export as PNG/SVG
5. Include in documentation or presentations

## 📧 Support

For issues or questions about these diagrams:
1. Check the related use case documentation
2. Review the system architecture overview
3. Contact the documentation team

---

**Last Updated**: 2026-01-29
**Version**: 1.0
**Maintained By**: Product Team
