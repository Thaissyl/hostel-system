# UC-A01: Approve Listings - Object Structuring

**Use Case:** Approve Listings
**Date:** 2026-01-26

---

## 5-Step Workflow Analysis

### Step 1: Boundary Objects (Input)
- Actor: Admin
- Phase 1 External Class: `«external user» Admin`, `«external I/O device» WebBrowser`
- **Boundary Object:** `«user interaction» ListingApprovalInteraction`

---

### Step 2: Entity Objects (Data)
From use case: "System updates property/listing status", "System notifies owner of decision"
- **Entity Objects:** `Property` (update - status), `Listing` (update - status), `User` (read - owner info)

---

### Step 3: Boundary Objects (Output)
- "System displays queue of pending items", "System notifies owner of decision"
- **Reuse:** `ListingApprovalInteraction` (bidirectional)

---

### Step 4: Control Objects
**State-dependent:** Approval states (displaying queue, reviewing, approving, rejecting, notifying)
- **Control Object:** `«state-dependent control» ListingApprovalControl`
- **Phase 4 Flag:** ⚠️ Requires statechart

---

### Step 5: Application Logic
**Identified Logic:** Compliance review (business license, quality standards), rejection reason templates, search index update, audit trail
- **Application Logic Objects:**
  - `«business logic» ComplianceChecker` (quality standards validation)
  - `«service» ApprovalNotifier` (owner notification)
  - `«service» SearchIndexUpdater` (make visible on approval)

---

## Object Summary

| Type | Object | Stereotype | Notes |
|------|--------|------------|-------|
| Boundary | ListingApprovalInteraction | «user interaction» | Admin approvals |
| Entity | Property | «entity» | Update status |
| Entity | Listing | «entity» | Update status |
| Entity | User | «entity» | Owner info |
| Control | ListingApprovalControl | «state-dependent control» | ⚠️ Flag for Phase 4 |
| Logic | ComplianceChecker | «business logic» | BR-009/010 |
| Logic | ApprovalNotifier | «service» | Owner notify |
| Logic | SearchIndexUpdater | «service» | Index update |

---

## Phase 4 Statechart Required

**Control Object:** `ListingApprovalControl`

**States:** Idle, Displaying Queue, Reviewing, Approving, Rejecting, Notifying, Error

**Events:** View Pending Approvals, Select Item, Review Compliance, Approve/Reject, Status Updated, Owner Notified

---

## Notes

- BR-009: Properties must meet quality standards
- BR-010: Rejected properties receive feedback
- SLA: Review within 48 hours
- Bulk action support
- Decision audit trail
- Rejection reason templates
