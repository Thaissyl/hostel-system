# UC-G07: Manage Wishlist - Object Structuring

**Use Case:** Manage Wishlist
**Date:** 2026-01-26

---

## 5-Step Workflow Analysis

### Step 1: Boundary Objects (Input)
- Actor: Guest
- Phase 1 External Class: `«external user» Guest`, `«external I/O device» WebBrowser`, `«external I/O device» MobileApp`
- **Boundary Object:** `«user interaction» WishlistInteraction` (heart icon toggle)

---

### Step 2: Entity Objects (Data)
From use case: "System adds/removes from wishlist", "display all saved listings"
- **Entity Objects:** `Wishlist` (create/delete), `Listing` (read - display with current prices)

---

### Step 3: Boundary Objects (Output)
- "System updates UI state immediately", "System displays all saved listings"
- **Reuse:** `WishlistInteraction` (bidirectional)

---

### Step 4: Control Objects
**State-dependent:** Wishlist states (empty, populated, adding, removing, syncing)
- **Control Object:** `«coordinator» WishlistCoordinator`
- **Note:** No statechart needed - coordinator sufficient (simple CRUD with optimistic UI)

---

### Step 5: Application Logic
**Identified Logic:** Optimistic UI updates with rollback, wishlist limit (100 items), price drop notification queue
- **Application Logic Objects:**
  - `«business logic» WishlistValidator` (100 item limit check)
  - `«service» OptimisticUIHandler` (update + rollback on failure)
  - `«service» PriceDropNotifier` (queue alerts if opt-in)

---

## Object Summary

| Type | Object | Stereotype | Notes |
|------|--------|------------|-------|
| Boundary | WishlistInteraction | «user interaction» | Wishlist toggle |
| Entity | Wishlist | «entity» | Create/delete |
| Entity | Listing | «entity» | Display saved items |
| Control | WishlistCoordinator | «coordinator» | No statechart |
| Logic | WishlistValidator | «business logic» | 100 item limit |
| Logic | OptimisticUIHandler | «service» | Optimistic + rollback |
| Logic | PriceDropNotifier | «service» | Price alerts |

---

## Phase 4 Statechart Required

**None** - Coordinator sufficient (simple add/remove with optimistic UI)

---

## Notes

- BR-018: Wishlist limited to 100 items
- Optimistic UI updates with API sync
- Local storage fallback for non-logged-in guests
- Shareable wishlist links
