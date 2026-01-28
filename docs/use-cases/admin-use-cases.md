# Admin Use Cases

## UC-A02: Manage Users

| Field | Description |
|-------|-------------|
| **Use Case Name** | Manage Users |
| **Created By** | Product Team |
| **Created Date** | 2026-01-25 |
| **Last Updated By** | Product Team |
| **Last Updated Date** | 2026-01-25 |
| **Summary** | Admin views, searches, and manages user accounts. Can suspend/ban users, verify accounts, and view user activity. |
| **Dependency** | None (independent admin function) |
| **Actors** | Primary: Admin<br>Secondary: Users (affected by actions) |
| **Preconditions** | Admin authenticated. Has user management permissions. |
| **Trigger** | Admin navigates to "User Management" |
| **Main Sequence** | 1. Admin navigates to "User Management"<br>2. System displays user table with search and filters<br>3. Admin searches by email, name, phone<br>4. Admin filters by role, status, verification level<br>5. Admin selects a user to view details<br>6. System displays user profile, bookings, reviews, activity log<br>7. Admin may suspend, ban, verify, or unverify user |
| **Alternative Sequences** | Step 3: If user not found, System displays "No users found" message<br>Step 5: If user has bookings, System shows booking summary with links<br>Step 7: If suspend user, Admin must enter reason and duration<br>Step 7: If ban user, Admin must provide justification, System disables all bookings |
| **Postconditions** | User status updated. User notified via email. Audit log created. |
| **Nonfunctional Requirements** | Paginated user list (50 per page). Quick search < 1s. Action confirmation dialogs. Email notifications to users. |
| **Business Requirements** | BR-027: Suspended users cannot create new bookings<br>BR-028: Banned users lose access to platform |
| **Frequency of Use** | Medium |
| **Priority** | High |
| **Outstanding Questions** | Appeal process for banned users? Data retention for banned users? |

### Sequence Diagram

```mermaid
sequenceDiagram
    participant A as Admin
    participant UI as Admin UI
    participant API as API Gateway
    participant US as UserService
    participant BS as BookingService
    participant NS as NotificationService
    participant DB as Database

    A->>UI: Navigate to User Management
    UI->>API: GET /api/admin/users
    API->>US: Fetch users with pagination
    US->>DB: Query users
    DB-->>US: User list
    US-->>API: UserList DTO
    API-->>UI: Display user table

    A->>UI: Search user by email
    UI->>API: POST /api/admin/users/search
    API->>US: Search users
    US->>DB: Query with filters
    DB-->>US: Filtered users
    US-->>API: SearchResults
    API-->>UI: Display results

    A->>UI: Select user to suspend
    UI->>API: GET /api/admin/users/:id
    API->>US: Get user details
    US->>DB: Fetch full profile
    DB-->>US: UserDetails
    US-->>API: User details
    API-->>UI: Display profile

    A->>UI: Click Suspend
    UI->>API: POST /api/admin/users/:id/suspend
    API->>US: Process suspension
    US->>DB: Update status to 'suspended'
    DB-->>US: Updated
    US->>BS: Cancel upcoming bookings
    BS->>DB: Cancel bookings
    DB-->>BS: Cancelled
    BS-->>US: Cancellation result
    US->>NS: Queue notification
    NS-->>US: Queued
    US->>DB: Log audit entry
    DB-->>US: Logged
    US-->>API: ActionConfirmation
    API-->>UI: Success message
```

### Boundary Objects

| Boundary Object | Description | Data Elements |
|----------------|-------------|---------------|
| **UserList** | Paginated user list | users[], totalCount, page, filters |
| **UserDetails** | Complete user profile | userId, email, name, role, status, verificationLevel, bookings[], reviews[], activityLog[] |
| **UserAction** | Admin action on user | actionType (suspend/ban/verify/unverify), reason, duration, notes |
| **UserSearchRequest** | Search criteria | searchTerm, filters (role, status, verificationLevel) |
| **ActionConfirmation** | Action result | userId, newStatus, effectiveAt, expiresAt |

### Internal Software Objects

| Internal Object | Responsibility |
|-----------------|---------------|
| **UserService** | Manages user CRUD operations |
| **UserSearchService** | Handles user search and filtering |
| **UserActionService** | Processes suspend/ban/verify actions |
| **BookingService** | Fetches user booking history |
| **ReviewService** | Fetches user review history |
| **ActivityLogService** | Retrieves user activity |
| **NotificationService** | Sends action notifications to users |
| **UserRepository** | Queries user data |
| **AuditLogService** | Logs all admin actions |
| **AuthService** | Handles auth token invalidation |

### Message Communication Sequence

#### View Users Flow
```
Admin → System: ViewUsers (HTTP GET /api/admin/users)
    ↓
System → UserRepository: Query users with pagination
    ← users[]
System → UserSearchService: Apply search/filters
    ← filteredUsers
System → Admin: UserList (HTTP 200)
```

#### Search Users Flow
```
Admin → System: SearchUsers (HTTP POST /api/admin/users/search)
    ↓
System → UserSearchService: Search by email/name/phone
    ← matchingUsers
System → Admin: UserList (HTTP 200)
```

#### Suspend User Flow
```
Admin → System: SuspendUser (HTTP POST /api/admin/users/:id/suspend)
    ↓
System → UserActionService: Process suspension
    ↓
System → UserRepository: Update status (suspended)
    ← Updated
System → BookingService: Cancel upcoming bookings
    ← Cancelled
System → AuthService: Invalidate all tokens
    ← Invalidated
System → NotificationService: Notify user
    ← Queued
System → AuditLogService: Log suspension with reason
    ← Logged
System → Admin: ActionConfirmation (HTTP 200)
```

#### Ban User Flow
```
Admin → System: BanUser (HTTP POST /api/admin/users/:id/ban)
    ↓
System → UserActionService: Process ban
    ↓
System → UserRepository: Update status (banned)
    ← Updated
System → BookingService: Cancel all bookings
    ← Cancelled
System → AuthService: Invalidate all tokens
    ← Invalidated
System → NotificationService: Notify user
    ← Queued
System → AuditLogService: Log ban with justification
    ← Logged
System → Admin: ActionConfirmation (HTTP 200)
```

#### Verify User Flow
```
Admin → System: VerifyUser (HTTP POST /api/admin/users/:id/verify)
    ↓
System → UserRepository: Update verification level
    ← Verified
System → NotificationService: Notify user
    ← Queued
System → Admin: ActionConfirmation (HTTP 200)
```

### Communication Sequence Diagram

**Scenario**: Admin views user and suspends account

```mermaid
graph LR
    Admin((Admin))
    UserInt[": UserManagementInteraction"]
    Control[": UserManagementControl"]
    Validator[": UserStatusValidator"]
    Notifier[": UserNotificationService"]
    Audit[": AuditLogger"]
    User[": User"]
    Booking[": Booking"]
    Review[": Review"]

    Admin -->|1: User Management| UserInt
    UserInt -->|1.1: List Request| Control
    Control -->|1.2: Get Users| User
    User -->|1.3: User List| Control
    Control -->|1.4: Display Table| UserInt
    UserInt -->|1.5: Show Users| Admin

    Admin -->|2: Search User| UserInt
    UserInt -->|2.1: Search Query| Control
    Control -->|2.2: Search Users| User
    User -->|2.3: Search Results| Control
    Control -->|2.4: Display Results| UserInt
    UserInt -->|2.5: Show Results| Admin

    Admin -->|3: Select User| UserInt
    UserInt -->|3.1: User Details| Control
    Control -->|3.2: Get User| User
    User -->|3.3: User Data| Control
    Control -->|3.4: Get Bookings| Booking
    Booking -->|3.5: User Bookings| Control
    Control -->|3.6: Get Reviews| Review
    Review -->|3.7: User Reviews| Control
    Control -->|3.8: Display Profile| UserInt
    UserInt -->|3.9: Show Profile| Admin

    Admin -->|4: Suspend User| UserInt
    UserInt -->|4.1: Suspend Request| Control
    Control -->|4.2: Validate Suspend| Validator
    Validator -->|4.3: Can Suspend| Control
    Control -->|4.4: Request Reason| UserInt
    UserInt -->|4.5: Show Reason Prompt| Admin
    Admin -->|5: Enter Reason| UserInt
    UserInt -->|5.1: Suspend Reason| Control
    Control -->|5.2: Update Status| User
    User -->|5.3: Status Suspended| Control
    Control -->|5.4: Log Action| Audit
    Audit -->|5.5: Action Logged| Control
    Control -->|5.6: Notify User| Notifier
    Notifier -->|5.7: Notification Sent| Control
    Control -->|5.8: Suspend Complete| UserInt
    UserInt -->|5.9: Show Suspended| Admin
```

**Message Flow Description**

| Seq# | From | To | Message | Description |
|------|------|-----|---------|-------------|
| 1 | Admin | UserManagementInteraction | User Management | Navigate to user management |
| 1.1 | UserManagementInteraction | UserManagementControl | List Request | Get all users |
| 1.2 | UserManagementControl | User | Get Users | Query user list |
| 1.3 | User | UserManagementControl | User List | Return users |
| 1.4 | UserManagementControl | UserManagementInteraction | Display Table | Show user table |
| 1.5 | UserManagementInteraction | Admin | Show Users | Display users |
| 2 | Admin | UserManagementInteraction | Search User | Search by email/name |
| 2.1 | UserManagementInteraction | UserManagementControl | Search Query | Search criteria |
| 2.2 | UserManagementControl | User | Search Users | Search users |
| 2.3 | User | UserManagementControl | Search Results | Matching users |
| 2.4 | UserManagementControl | UserManagementInteraction | Display Results | Show results |
| 2.5 | UserManagementInteraction | Admin | Show Results | Display search results |
| 3 | Admin | UserManagementInteraction | Select User | Click on user |
| 3.1 | UserManagementInteraction | UserManagementControl | User Details | Request user details |
| 3.2 | UserManagementControl | User | Get User | Get user data |
| 3.3 | User | UserManagementControl | User Data | User details |
| 3.4 | UserManagementControl | Booking | Get Bookings | Get user's bookings |
| 3.5 | Booking | UserManagementControl | User Bookings | Booking list |
| 3.6 | UserManagementControl | Review | Get Reviews | Get user's reviews |
| 3.7 | Review | UserManagementControl | User Reviews | Review list |
| 3.8 | UserManagementControl | UserManagementInteraction | Display Profile | Show full profile |
| 3.9 | UserManagementInteraction | Admin | Show Profile | Display profile |
| 4 | Admin | UserManagementInteraction | Suspend User | Click suspend |
| 4.1 | UserManagementInteraction | UserManagementControl | Suspend Request | Suspend request |
| 4.2 | UserManagementControl | UserStatusValidator | Validate Suspend | Validate suspension |
| 4.3 | UserStatusValidator | UserManagementControl | Can Suspend | Can suspend user |
| 4.4 | UserManagementControl | UserManagementInteraction | Request Reason | Ask for reason |
| 4.5 | UserManagementInteraction | Admin | Show Reason Prompt | Display reason input |
| 5 | Admin | UserManagementInteraction | Enter Reason | Enter suspension reason |
| 5.1 | UserManagementInteraction | UserManagementControl | Suspend Reason | Reason + duration |
| 5.2 | UserManagementControl | User | Update Status | Set status to suspended |
| 5.3 | User | UserManagementControl | Status Suspended | Status updated |
| 5.4 | UserManagementControl | AuditLogger | Log Action | Log status change |
| 5.5 | AuditLogger | UserManagementControl | Action Logged | Action logged |
| 5.6 | UserManagementControl | UserNotificationService | Notify User | Email user |
| 5.7 | UserNotificationService | UserManagementControl | Notification Sent | Email sent |
| 5.8 | UserManagementControl | UserManagementInteraction | Suspend Complete | Suspension done |
| 5.9 | UserManagementInteraction | Admin | Show Suspended | Display confirmation |

### Expanded Alternative Sequences

#### Step 3: User Search Results
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| No users found | "No users found" message | Suggest broader search |
| Multiple matches | Show all matches | Refine filters |
| Exact email match | Direct to user profile | Single result |
| Suspended user found | Show "Suspended" badge | Action history available |

#### Step 5: Action Confirmations
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| Suspend - no duration | Require duration input | Minimum/max duration hints |
| Ban - insufficient justification | Require detailed reason | Policy link provided |
| Verify - pending flags | Show unresolved flags | Resolve before verifying |
| Bulk action | Show affected user count | Confirm batch operation |

#### Step 7: Action Failures
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| Database constraint violation | Retry with fresh data | Concurrent modification handling |
| Token invalidation failed | Log for manual cleanup | Cron job retry |
| Booking cancellation failed | Partial success report | Manual follow-up required |
| User already in target state | No-op with notice | "Already suspended" message |

#### User State Conflicts
| Condition | System Response | Recovery |
|-----------|-----------------|----------|
| Active bookings during ban | Warning: "Will cancel X bookings" | Force confirmation |
| Pending reviews during ban | Reviews preserved | Reviews stay visible |
| Refund due to ban | Queue refund processing | Payment gateway retry |
| Appeal submitted | Show appeal status | Override option for admins |

**Related Use Cases**: [UC-G03: Create Booking](./guest-use-cases.md#uc-g03-create-booking) (booking cancellation impact)

---

[← Back to Use Cases Index](./index.md)
