# UC-O03: Update Calendar

| Field | Description |
|-------|-------------|
| **Use Case Name** | Update Calendar |
| **Created By** | Product Team |
| **Created Date** | 2026-01-25 |
| **Last Updated By** | Product Team |
| **Last Updated Date** | 2026-01-25 |
| **Summary** | Owner manages availability and pricing for specific dates. Bulk update and season pricing supported. Changes sync in real-time to guests. |
| **Dependency** | UC-O02 (Manage Listings) |
| **Actors** | Primary: Owner<br>Secondary: Guests (see real-time updates) |
| **Preconditions** | Owner authenticated. Listing selected. Calendar data loaded. |
| **Trigger** | Owner opens calendar for a listing |
| **Main Sequence** | 1. Owner opens calendar for a listing<br>2. System displays calendar with current bookings and availability<br>3. Owner selects date range to update<br>4. Owner sets availability (available/unavailable) and/or price<br>5. Owner saves changes<br>6. System updates calendar<br>7. System invalidates cached data for affected dates<br>8. System broadcasts update to connected guests |
| **Alternative Sequences** | Step 3: If dates have confirmed bookings, System disables editing and shows "Dates with bookings cannot be modified"<br>Step 4: If price below minimum, System shows error and enforces minimum price<br>Step 6: If update fails, System rolls back changes and shows error<br>Step 7: If broadcast fails, System logs error but cache invalidation ensures consistency |
| **Postconditions** | Calendar updated. Cache invalidated. Real-time updates sent. Audit log created. |
| **Nonfunctional Requirements** | Real-time updates. Calendar view performance (1 year range). Bulk update API. Audit trail for all changes. |
| **Business Requirements** | BR-021: Dates with confirmed bookings cannot be modified<br>BR-022: Minimum price enforced by platform |
| **Frequency of Use** | Medium |
| **Priority** | Medium |
| **Outstanding Questions** | Advance booking limit? Season pricing templates? |

---

## Sequence Diagram

```mermaid
sequenceDiagram
    participant O as Owner
    participant S as System
    participant G as Guest(s)

    O->>S: Open calendar
    S-->>O: Display calendar data

    O->>S: Select dates + update
    S->>S: Update calendar
    S->>S: Invalidate cache
    S->>G: Broadcast update

    S-->>O: Show confirmation
```

---

## Black Box Compliance

✅ **COMPLIANT** - All steps describe external interactions only.