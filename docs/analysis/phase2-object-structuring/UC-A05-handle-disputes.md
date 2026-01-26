# UC-A05: Handle Disputes - Object Structuring

**Use Case:** Handle Disputes
**Date:** 2026-01-26

---

## 5-Step Workflow Analysis

### Step 1: Boundary Objects (Input)
- Actor: Admin
- Phase 1 External Class: `«external user» Admin`, `«external I/O device» WebBrowser`
- **Boundary Object:** `«user interaction» DisputeManagementInteraction`

---

### Step 2: Entity Objects (Data)
From use case: "System processes refund according to ruling", "Admin reviews booking details, messages, evidence"
- **Entity Objects:** `Dispute` (update - status/ruling), `Booking` (read - details), `Message` (read - evidence), `Payment` (update - refund)

---

### Step 3: Boundary Objects (Output)
- "System displays dispute details", "System notifies both parties of decision"
- **Reuse:** `DisputeManagementInteraction` (bidirectional)

---

### Step 4: Control Objects
**State-dependent:** Dispute states (open, reviewing, requesting info, making ruling, refunding, escalating)
- **Control Object:** `«state-dependent control» DisputeResolutionControl`
- **Phase 4 Flag:** ⚠️ Requires statechart

---

### Step 5: Application Logic
**Identified Logic:** Evidence validation, refund processing (full/partial/split), escalation to legal, SLA enforcement (24h response, 72h resolution), party notifications
- **Application Logic Objects:**
  - `«business logic» DisputeValidator` (evidence sufficiency check)
  - `«service» RefundProcessor` (execute ruling refund)
  - `«service» DisputeNotifier` (notify both parties)
  - `«service» SLAMonitor` (24h/72h tracking)

---

## Object Summary

| Type | Object | Stereotype | Notes |
|------|--------|------------|-------|
| Boundary | DisputeManagementInteraction | «user interaction» | Dispute resolution |
| Entity | Dispute | «entity» | Update status/ruling |
| Entity | Booking | «entity» | Review details |
| Entity | Message | «entity» | Evidence |
| Entity | Payment | «entity» | Refund processing |
| Control | DisputeResolutionControl | «state-dependent control» | ⚠️ Flag for Phase 4 |
| Logic | DisputeValidator | «business logic» | Evidence check |
| Logic | RefundProcessor | «service» | Execute refund |
| Logic | DisputeNotifier | «service» | Party notify |
| Logic | SLAMonitor | «service» | BR-033/034 |

---

## Phase 4 Statechart Required

**Control Object:** `DisputeResolutionControl`

**States:** Idle, Displaying Open Disputes, Reviewing, Requesting Info, Making Ruling, Processing Refund, Escalating, Resolved

**Events:** View Disputes, Select Dispute, Review Evidence, Request More Info, Make Ruling, Refund Guest/Owner/Split, Escalate, Notify Parties

---

## Notes

- BR-033: Dispute response within 24 hours
- BR-034: Resolution within 72 hours
- BR-035: All decisions must be auditable
- Ruling options: refund guest, refund owner, split
- Escalation to legal team
- Evidence file upload support
- Secure messaging
