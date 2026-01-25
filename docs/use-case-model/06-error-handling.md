# Error Handling Model

**Project:** Hostel Management System
**Version:** 1.0
**Last Updated:** 2026-01-25

---

[← Back to Model Index](./index.md)

---

## 6.1 Common Error Patterns Across Use Cases

### Pattern 1: Validation Errors

| Use Cases | Error Types | Response Code | Recovery |
|-----------|-------------|---------------|----------|
| G01, G03, O01, O02 | Invalid input data | 400 | Inline error messages |
| All | Missing required fields | 400 | Field highlighting |
| G01, G03 | Invalid date ranges | 400 | Date validation with hints |
| O01 | Invalid Vietnam address | 400 | Province dropdown |

### Pattern 2: Authentication/Authorization Errors

| Use Cases | Error Types | Response Code | Recovery |
|-----------|-------------|---------------|----------|
| G03, G05, G06 | Not authenticated | 401 | Redirect to login |
| All authenticated UCs | Session expired | 401 | Re-authenticate |
| All owner UCs | Not owner | 403 | Access denied |
| All admin UCs | Not admin | 403 | Access denied |

### Pattern 3: Resource Not Found Errors

| Use Cases | Error Types | Response Code | Recovery |
|-----------|-------------|---------------|----------|
| G02, G05, O02 | Listing not found | 404 | Suggest alternatives |
| G05, O04 | Booking not found | 404 | Link to bookings list |
| A01 | No pending items | 404 | Show "all caught up" |

### Pattern 4: Concurrency Errors

| Use Cases | Error Types | Response Code | Recovery |
|-----------|-------------|---------------|----------|
| G03 | Double-booking attempt | 409 | Retry with countdown |
| G01, G02 | Price changed | 409 | Confirm new price |
| O01 | Duplicate property | 409 | Allow with warning |

### Pattern 5: Service Unavailable Errors

| Use Cases | Error Types | Response Code | Recovery |
|-----------|-------------|---------------|----------|
| G01 | Search timeout | 503 | Fallback to MySQL |
| G04 | Payment gateway down | 503 | Queue for retry |
| All | Database connection fail | 503 | Retry with backoff |

## 6.2 Recovery Strategies Catalog

### Strategy 1: Retry with Exponential Backoff

**Use Cases:** G01 (search), G04 (payment), O01 (image upload)

```
Retry configuration:
- Max attempts: 3
- Initial delay: 1s
- Backoff multiplier: 2
- Max delay: 10s
```

### Strategy 2: Graceful Degradation

**Use Cases:** G01 (search), O05 (analytics)

```
Primary: Elasticsearch → Fallback: MySQL
Primary: Real-time analytics → Fallback: Cached data
Primary: Image thumbnails → Fallback: Original images
```

### Strategy 3: Queue for Later Processing

**Use Cases:** G04 (payment), O01 (image processing), All (notifications)

```
Process: Background worker
Timeout: 5 minutes
Retries: 3 attempts
Dead letter queue: Manual review
```

### Strategy 4: User Intervention

**Use Cases:** G03 (booking), A01 (approval), A05 (disputes)

```
Action: Prompt user for decision
Examples:
- "Price changed, confirm or cancel?"
- "Duplicate found, continue anyway?"
- "Payment failed, try again?"
```

## 6.3 Fallback Mechanisms

| Component | Primary | Fallback | Trigger |
|-----------|---------|----------|---------|
| **Search** | Elasticsearch | MySQL query | Timeout > 500ms |
| **Cache** | Redis | In-memory cache | Redis unavailable |
| **Availability** | Real-time lock | Database constraint | Redis down |
| **Images** | S3 | CDN fallback | S3 timeout |
| **Payments** | Stripe | PayPal | Stripe unavailable |
| **Email** | SendGrid | AWS SES | SendGrid failed |
| **Analytics** | Real-time | Batch processing | High load |

## 6.4 SLA Requirements Per Actor Type

### Guest SLA

| Metric | Target | Use Cases |
|--------|--------|-----------|
| Search response time | p95 < 500ms | G01 |
| Booking creation | p95 < 1s | G03 |
| Payment processing | p95 < 5s | G04 |
| Availability lock | 15 minutes | G03 |
| Support response | 24 hours | G05, A05 |

### Owner SLA

| Metric | Target | Use Cases |
|--------|--------|-----------|
| Property approval | 48 hours | O01, A01 |
| Image processing | 5 minutes | O01 |
| Analytics update | 1 hour | O05 |
| Booking notification | Immediate | O04 |

### Admin SLA

| Metric | Target | Use Cases |
|--------|--------|-----------|
| Approval queue load time | < 2s | A01 |
| Analytics report generation | < 10s | A04 |
| Dispute response | 72 hours | A05 |
| System uptime | 99.9% | All |

---

**Next:** [State Machine Models](./07-state-machines.md)
