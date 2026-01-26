# UC-A02: Manage Users - Object Structuring

**Use Case:** Manage Users
**Date:** 2026-01-26

---

## 5-Step Workflow Analysis

### Step 1: Boundary Objects (Input)
- Actor: Admin
- Phase 1 External Class: `«external user» Admin`, `«external I/O device» WebBrowser`
- **Boundary Object:** `«user interaction» UserManagementInteraction`

---

### Step 2: Entity Objects (Data)
From use case: "System displays user table", "Admin may suspend, ban, verify users"
- **Entity Objects:** `User` (read/update), `Booking` (read - user's bookings), `Review` (read - user's reviews)

---

### Step 3: Boundary Objects (Output)
- "System displays user profile, bookings, reviews, activity log"
- **Reuse:** `UserManagementInteraction` (bidirectional)

---

### Step 4: Control Objects
**State-dependent:** User management states (displaying list, viewing profile, suspending, banning, verifying)
- **Control Object:** `«state-dependent control» UserManagementControl`
- **Phase 4 Flag:** ⚠️ Requires statechart

---

### Step 5: Application Logic
**Identified Logic:** User status management (suspend/ban/verify), email notifications, action confirmation dialogs, audit logging
- **Application Logic Objects:**
  - `«business logic» UserStatusValidator` (status change rules)
  - `«service» UserNotificationService` (email to affected users)
  - `«service» AuditLogger` (status change audit)

---

## Object Summary

| Type | Object | Stereotype | Notes |
|------|--------|------------|-------|
| Boundary | UserManagementInteraction | «user interaction» | User management |
| Entity | User | «entity» | Read/update status |
| Entity | Booking | «entity» | User's bookings |
| Entity | Review | «entity» | User's reviews |
| Control | UserManagementControl | «state-dependent control» | ⚠️ Flag for Phase 4 |
| Logic | UserStatusValidator | «business logic» | BR-027/028 |
| Logic | UserNotificationService | «service» | Email notify |
| Logic | AuditLogger | «service» | Audit trail |

---

## Phase 4 Statechart Required

**Control Object:** `UserManagementControl`

**States:** Idle, Displaying Users, Searching, Viewing Profile, Suspending, Banning, Verifying, Confirming Action

**Events:** View User Management, Search User, Select User, Suspend/Ban/Verify, Confirm Action, Status Updated

---

## Notes

- BR-027: Suspended users cannot create new bookings
- BR-028: Banned users lose access to platform
- Paginated list (50 per page)
- Quick search < 1s
- Action confirmation dialogs
- Email notifications to users
