# UC-A02: Manage Users

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

---

## Sequence Diagram

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

## Black Box Compliance

✅ **COMPLIANT** - All steps describe external interactions only.