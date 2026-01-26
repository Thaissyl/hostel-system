# UC-O01: Register Property - Object Structuring

**Use Case:** Register Property
**Date:** 2026-01-26

---

## 5-Step Workflow Analysis

### Step 1: Boundary Objects (Input)
- Actor: Owner
- Phase 1 External Class: `«external user» Owner`, `«external I/O device» WebBrowser`, `«external I/O device» MobileApp`
- **Boundary Object:** `«user interaction» PropertyRegistrationInteraction`

---

### Step 2: Entity Objects (Data)
From use case: "System creates property", "Owner uploads property images"
- **Entity Objects:** `Property` (create), `Image` (create - property photos), `User` (read - owner info)

---

### Step 3: Boundary Objects (Output)
- "System displays property registration form", "System notifies admin of pending approval"
- **Reuse:** `PropertyRegistrationInteraction` (bidirectional)

---

### Step 4: Control Objects
**State-dependent:** Registration states (form displayed, uploading, validating, submitted, pending approval, active)
- **Control Object:** `«state-dependent control» PropertyRegistrationControl`
- **Phase 4 Flag:** ⚠️ Requires statechart

---

### Step 5: Application Logic
**Identified Logic:** Image upload handling (max 10, 5MB each), address validation (Vietnam provinces), duplicate detection, admin notification
- **Application Logic Objects:**
  - `«business logic» PropertyValidator` (address format, Vietnam validation)
  - `«service» ImageUploadHandler` (resize, storage, cover image)
  - `«algorithm» DuplicateDetector` (similar property detection)

---

## Object Summary

| Type | Object | Stereotype | Notes |
|------|--------|------------|-------|
| Boundary | PropertyRegistrationInteraction | «user interaction» | Property registration |
| Entity | Property | «entity» | Create property |
| Entity | Image | «entity» | Property photos |
| Entity | User | «entity» | Owner info |
| Control | PropertyRegistrationControl | «state-dependent control» | ⚠️ Flag for Phase 4 |
| Logic | PropertyValidator | «business logic» | Address/validation |
| Logic | ImageUploadHandler | «service» | Image processing |
| Logic | DuplicateDetector | «algorithm» | Duplicate check |

---

## Phase 4 Statechart Required

**Control Object:** `PropertyRegistrationControl`

**States:** Idle, Displaying Form, Uploading Images, Validating, Submitted, Pending Approval, Active, Error

**Events:** Add Property Clicked, Details Entered, Images Uploaded, Submitted, Validation Passed/Failed, Admin Approved

---

## Notes

- BR-007: Property must be in Vietnam
- BR-008: Valid address and contact required
- Max 10 images, 5MB each
- Status: pending_approval → active
- Admin notified on submission
