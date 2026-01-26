# UC-O05: View Analytics - Object Structuring

**Use Case:** View Analytics
**Date:** 2026-01-26

---

## 5-Step Workflow Analysis

### Step 1: Boundary Objects (Input)
- Actor: Owner
- Phase 1 External Class: `«external user» Owner`, `«external I/O device» WebBrowser`, `«external I/O device» MobileApp`
- **Boundary Object:** `«user interaction» AnalyticsInteraction`

---

### Step 2: Entity Objects (Data)
From use case: "System displays dashboard with key metrics", "revenue, occupancy, booking sources"
- **Entity Objects:** `Booking` (read - aggregated), `Review` (read - ratings), `Payment` (read - revenue), `Listing` (read - performance)

---

### Step 3: Boundary Objects (Output)
- "System displays dashboard", "System generates CSV/PDF report"
- **Reuse:** `AnalyticsInteraction` (bidirectional)

---

### Step 4: Control Objects
**State-dependent:** Analytics states (displaying, filtering, drilling down, exporting)
- **Control Object:** `«coordinator» AnalyticsCoordinator`
- **Note:** No statechart - coordinator sufficient (read-only dashboard)

---

### Step 5: Application Logic
**Identified Logic:** Data aggregation (occupancy rate, revenue trends), chart rendering, export generation (CSV/PDF), date range filtering
- **Application Logic Objects:**
  - `«algorithm» MetricsAggregator` (occupancy, revenue, trends)
  - `«service» ChartRenderer` (visualization < 2s)
  - `«service» ReportGenerator` (CSV/PDF export)

---

## Object Summary

| Type | Object | Stereotype | Notes |
|------|--------|------------|-------|
| Boundary | AnalyticsInteraction | «user interaction» | Analytics dashboard |
| Entity | Booking | «entity» | Aggregated data |
| Entity | Review | «entity» | Rating metrics |
| Entity | Payment | «entity» | Revenue data |
| Entity | Listing | «entity» | Performance data |
| Control | AnalyticsCoordinator | «coordinator» | No statechart |
| Logic | MetricsAggregator | «algorithm» | Data aggregation |
| Logic | ChartRenderer | «service» | Visualization |
| Logic | ReportGenerator | «service» | Export |

---

## Phase 4 Statechart Required

**None** - Coordinator sufficient (read-only analytics)

---

## Notes

- BR-025: Analytics data updated daily
- BR-026: Export limited to owner's own data
- Chart rendering < 2s
- Mobile-responsive dashboard
- Revenue, occupancy, trends, ratings
