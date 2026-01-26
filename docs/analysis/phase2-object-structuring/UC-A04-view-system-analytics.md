# UC-A04: View System Analytics - Object Structuring

**Use Case:** View System Analytics
**Date:** 2026-01-26

---

## 5-Step Workflow Analysis

### Step 1: Boundary Objects (Input)
- Actor: Admin
- Phase 1 External Class: `«external user» Admin`, `«external I/O device» WebBrowser`
- **Boundary Object:** `«user interaction» SystemAnalyticsInteraction`

---

### Step 2: Entity Objects (Data)
From use case: "Platform-wide analytics including total bookings, revenue, user growth"
- **Entity Objects:** `Booking` (read - platform aggregated), `User` (read - user metrics), `Payment` (read - revenue)

---

### Step 3: Boundary Objects (Output)
- "System displays executive dashboard with KPIs"
- **Reuse:** `SystemAnalyticsInteraction` (bidirectional)

---

### Step 4: Control Objects
**State-dependent:** Analytics states (displaying dashboard, filtering, drilling down, exporting, real-time mode)
- **Control Object:** `«coordinator» SystemAnalyticsCoordinator`
- **Note:** No statechart - coordinator sufficient (read-only dashboard)

---

### Step 5: Application Logic
**Identified Logic:** Platform-wide data aggregation, hourly updates, comprehensive report generation (PDF/Excel), real-time vs aggregated mode switching
- **Application Logic Objects:**
  - `«algorithm» PlatformMetricsAggregator` (bookings, revenue, growth, trends)
  - `«service» SystemChartRenderer` (visualization < 2s)
  - `«service» SystemReportGenerator` (PDF/Excel export)

---

## Object Summary

| Type | Object | Stereotype | Notes |
|------|--------|------------|-------|
| Boundary | SystemAnalyticsInteraction | «user interaction» | Admin analytics |
| Entity | Booking | «entity» | Platform metrics |
| Entity | User | «entity» | User metrics |
| Entity | Payment | «entity» | Revenue metrics |
| Control | SystemAnalyticsCoordinator | «coordinator» | No statechart |
| Logic | PlatformMetricsAggregator | «algorithm» | Aggregation |
| Logic | SystemChartRenderer | «service» | Visualization |
| Logic | SystemReportGenerator | «service» | Export |

---

## Phase 4 Statechart Required

**None** - Coordinator sufficient (read-only platform analytics)

---

## Notes

- BR-031: System analytics updated hourly
- BR-032: Export limited to platform data only
- Business metrics, User metrics, Technical metrics
- Filter by date range, region
- Drill-down capability
- Real-time mode available
