# Non-Functional Requirements (NFRs)
## Hostel Management System

**Version:** 1.1
**Date:** 2026-01-25
**Notation:** Planguage

---

## Table of Contents

1. [Planguage Reference](#1-planguage-reference)
2. [Performance Requirements](#2-performance-requirements)
3. [Security Requirements](#3-security-requirements)
4. [Availability Requirements](#4-availability-requirements)
5. [Usability Requirements](#5-usability-requirements)
6. [Reliability Requirements](#6-reliability-requirements)
7. [Scalability Requirements](#7-scalability-requirements)
8. [Maintainability Requirements](#8-maintainability-requirements)
9. [Data Integrity Requirements](#9-data-integrity-requirements)

---

## 1. Planguage Reference

### 1.1 Planguage Keywords

| Keyword | Usage | Example |
|---------|-------|---------|
| **TAG** | NFR identifier | NFR-P01: Search latency |
| **SCALE** | Measurement unit | milliseconds, percentage |
| **METER** | Measurement method | p95 latency, monthly uptime |
| **TARGET** | Desired value | < 500ms, 99.9% |
| **MIN** | Acceptable minimum | 95% |
| **MAX** | Acceptable maximum | 5s |

### 1.2 NFR Template

```
TAG: NFR-XX-YY
NAME: [Descriptive Name]
SCALE: [Measurement unit]
METER: [Measurement method]
TARGET: [Desired value]
MIN: [Acceptable minimum]
MAX: [Acceptable maximum]
REASON: [Business justification]
DERIVATION: [How value was determined]
```

---

## 2. Performance Requirements

### 2.1 Response Time Requirements

```
TAG: NFR-P01
NAME: Search response time
SCALE: Time in milliseconds (p95 latency)
METER: Backend API response time for search endpoint
TARGET: < 500ms
MIN: -
MAX: 2000ms
REASON: User experience standard for search
DERIVATION: Industry benchmark (Google: 400ms target)

---

TAG: NFR-P02
NAME: Listing page load time
SCALE: Time in seconds (p95 latency)
METER: Full page load including images
TARGET: < 2s
MIN: -
MAX: 5s
REASON: Image-heavy page, CDN optimization
DERIVATION: Web Vitals "Good" threshold

---

TAG: NFR-P03
NAME: Booking creation latency
SCALE: Time in seconds (p95 latency)
METER: API response time for booking creation
TARGET: < 1s
MIN: -
MAX: 3s
REASON: Critical transaction path
DERIVATION: E-commerce standard

---

TAG: NFR-P04
NAME: Calendar update propagation
SCALE: Time in milliseconds
METER: WebSocket broadcast delay
TARGET: < 500ms
MIN: -
MAX: 2s
REASON: Real-time expectation for calendar
DERIVATION: WebSocket performance best practice

---

TAG: NFR-P05
NAME: Payment webhook processing
SCALE: Time in seconds
METER: Webhook handler response time
TARGET: < 5s
MIN: -
MAX: 10s
REASON: Payment gateway timeout limit
DERIVATION: VNPAY API specification

---

TAG: NFR-P06
NAME: API response time (p50)
SCALE: Time in milliseconds
METER: Median API response time across all endpoints
TARGET: < 200ms
MIN: -
MAX: 500ms
REASON: General API performance
DERIVATION: REST API best practices
```

### 2.2 Throughput Requirements

```
TAG: NFR-P07
NAME: Concurrent search users
SCALE: Number of simultaneous users
METER: Active search sessions
TARGET: 1000 users
MIN: 500 users
MAX: -
REASON: Peak usage scenario
DERIVATION: 10x daily active users (DAU)

---

TAG: NFR-P08
NAME: Booking throughput
SCALE: Bookings per minute
METER: Successful booking creations
TARGET: 100/min
MIN: 50/min
MAX: -
REASON: Peak booking hour capacity
DERIVATION: 5000 bookings/day / 8 peak hours

---

TAG: NFR-P09
NAME: API rate limit
SCALE: Requests per minute per user
METER: Rate limiter configuration
TARGET: 60 req/min
MIN: 30 req/min
MAX: -
REASON: Prevent abuse, ensure fairness
DERIVATION: Industry standard (1 req/sec)
```

### 2.3 Resource Utilization

```
TAG: NFR-P10
NAME: Memory per request
SCALE: Megabytes
METER: Node.js heap usage per API request
TARGET: < 5 MB
MIN: -
MAX: 20 MB
REASON: Efficient resource usage
DERIVATION: Node.js best practices

---

TAG: NFR-P11
NAME: Database connection pool
SCALE: Number of connections
METER: MySQL pool size configuration
TARGET: 20 connections
MIN: 10 connections
MAX: 50 connections
REASON: Balance concurrency vs resource usage
DERIVATION: MySQL connection formula
```

### 2.4 Performance Summary

| Requirement | Scale | Target | Max | Priority |
|-------------|-------|--------|-----|----------|
| Search latency | p95 ms | < 500 | 2000 | High |
| Listing page load | p95 s | < 2 | 5 | High |
| Booking creation | p95 s | < 1 | 3 | High |
| Calendar propagation | ms | < 500 | 2000 | High |
| Webhook processing | s | < 5 | 10 | Critical |
| API p50 response | ms | < 200 | 500 | Medium |
| Concurrent searches | users | 1000 | - | Medium |
| Booking throughput | /min | 100 | - | High |

---

## 3. Security Requirements

### 3.1 Authentication & Authorization

```
TAG: NFR-S01
NAME: Password storage
SCALE: Encryption strength
METER: Hashing algorithm used
TARGET: bcrypt with cost factor 12
MIN: bcrypt with cost factor 10
MAX: -
REASON: Industry standard for password hashing
DERIVATION: OWASP recommendations

---

TAG: NFR-S02
NAME: JWT access token expiry
SCALE: Time in minutes
METER: JWT exp claim value
TARGET: 15 minutes
MIN: 5 minutes
MAX: 30 minutes
REASON: Balance security vs UX
DERIVATION: OAuth 2.0 best practices

---

TAG: NFR-S03
NAME: JWT refresh token expiry
SCALE: Time in days
METER: JWT exp claim value
TARGET: 7 days
MIN: 3 days
MAX: 14 days
REASON: Persistent sessions without indefinite access
DERIVATION: Industry standard

---

TAG: NFR-S04
NAME: Token storage
SCALE: Storage location
METER: Where tokens are stored
TARGET: Access token: Memory (httpOnly cookie)
TARGET: Refresh token: Redis
MIN: -
MAX: -
REASON: Prevent XSS token theft
DERIVATION: OWASP security guidelines
```

### 3.2 Data Protection

```
TAG: NFR-S05
NAME: Data at rest encryption
SCALE: Encryption algorithm
METER: AES key size
TARGET: AES-256
MIN: AES-128
MAX: -
REASON: Protect sensitive data from disk theft
DERIVATION: NIST standard

---

TAG: NFR-S06
NAME: Data in transit encryption
SCALE: Protocol version
METER: TLS version
TARGET: TLS 1.3
MIN: TLS 1.2
MAX: -
REASON: Secure communication
DERIVATION: PCI DSS requirement

---

TAG: NFR-S07
NAME: API key encryption
SCALE: Encryption at rest
METER: Payment gateway credentials storage
TARGET: AWS KMS or equivalent
MIN: AES-256
MAX: -
REASON: Protect payment integration credentials
DERIVATION: PCI DSS requirement

---

TAG: NFR-S08
NAME: PII data masking
SCALE: Data visibility
METER: Display format for sensitive data
TARGET: Email: u***@gmail.com
TARGET: Phone: ***-***-1234
MIN: Partial masking
MAX: -
REASON: Privacy protection in logs/UI
DERIVATION: GDPR best practice
```

### 3.3 Input Validation & Sanitization

```
TAG: NFR-S09
NAME: SQL injection prevention
SCALE: Implementation method
METER: Code review checklist
TARGET: 100% parameterized queries
MIN: -
MAX: -
REASON: Prevent database attacks
DERIVATION: OWASP Top 10

---

TAG: NFR-S10
NAME: XSS prevention
SCALE: Headers enabled
METER: Content-Security-Policy header
TARGET: Strict CSP with nonce
MIN: Default CSP
MAX: -
REASON: Prevent cross-site scripting
DERIVATION: OWASP recommendations

---

TAG: NFR-S11
NAME: CSRF protection
SCALE: Token validation
METER: CSRF middleware enabled
TARGET: 100% of state-changing endpoints
MIN: Critical endpoints only
MAX: -
REASON: Prevent cross-site request forgery
DERIVATION: OWASP recommendations
```

### 3.4 Payment Security

```
TAG: NFR-S12
NAME: Card data storage
SCALE: Data retention
METER: Card data in database
TARGET: 0 bytes (no storage)
MIN: -
MAX: -
REASON: PCI DSS compliance
DERIVATION: PCI DSS Level 4

---

TAG: NFR-S13
NAME: Webhook signature verification
SCALE: Verification percentage
METER: Webhooks validated before processing
TARGET: 100%
MIN: 100%
MAX: -
REASON: Prevent fraudulent payment notifications
DERIVATION: Payment gateway requirements

---

TAG: NFR-S14
NAME: Payment idempotency
SCALE: Duplicate prevention
METER: Idempotency key usage
TARGET: 100% of payment requests
MIN: Critical operations only
MAX: -
REASON: Prevent duplicate charges
DERIVATION: Payment best practices
```

### 3.5 Multi-Tenant Security

```
TAG: NFR-S15
NAME: Tenant isolation
SCALE: Data leakage
METER: Cross-tenant data access attempts
TARGET: 0 (complete isolation)
MIN: -
MAX: -
REASON: Prevent data breach between tenants
DERIVATION: Multi-tenancy best practices

---

TAG: NFR-S16
NAME: Tenant rate limiting
SCALE: Per-tenant limits
METER: Rate limit by tenant_id
TARGET: Individual per-tenant quotas
MIN: Platform-wide limit only
MAX: -
REASON: Noisy neighbor prevention
DERIVATION: Multi-tenant SaaS best practice
```

### 3.6 Security Summary

| Requirement | Target | Priority | Standard |
|-------------|--------|----------|----------|
| Password hashing | bcrypt-12 | Critical | OWASP |
| Access token expiry | 15 min | High | OAuth 2.0 |
| Refresh token expiry | 7 days | High | OAuth 2.0 |
| Data encryption | AES-256 | Critical | PCI DSS |
| TLS version | 1.3 | Critical | PCI DSS |
| SQL injection prevention | 100% param queries | Critical | OWASP |
| XSS prevention | Strict CSP | High | OWASP |
| CSRF protection | 100% state changes | High | OWASP |
| Card data storage | 0 bytes | Critical | PCI DSS |
| Webhook verification | 100% | Critical | Payment gw |
| Idempotency | 100% payments | High | Best practice |
| Tenant isolation | Complete | Critical | Multi-tenant |

---

## 4. Availability Requirements

### 4.1 Uptime Targets

```
TAG: NFR-A01
NAME: Platform uptime
SCALE: Monthly percentage
METER: Actual uptime / scheduled uptime * 100
TARGET: 99.9%
MIN: 99.5%
MAX: -
REASON: 43 minutes/month downtime max
DERIVATION: SaaS industry standard

---

TAG: NFR-A02
NAME: API uptime
SCALE: Monthly percentage
METER: API endpoint availability
TARGET: 99.9%
MIN: 99%
MAX: -
REASON: Critical booking path
DERIVATION: E-commerce standard

---

TAG: NFR-A03
NAME: Database uptime
SCALE: Monthly percentage
METER: MySQL service availability
TARGET: 99.95%
MIN: 99.9%
MAX: -
REASON: Data layer reliability
DERIVATION: Database SLA best practice

---

TAG: NFR-A04
NAME: Payment gateway availability
SCALE: Monthly percentage
METER: External gateway uptime
TARGET: 99.9%
MIN: -
MAX: -
REASON: Payment processing dependency
DERIVATION: Gateway SLA (typical)
```

### 4.2 Recovery Requirements

```
TAG: NFR-A05
NAME: Maximum recovery time
SCALE: Time in hours
METER: Time from outage to full restoration
TARGET: 1 hour
MIN: -
MAX: 4 hours
REASON: Minimize business impact
DERIVATION: Business continuity planning

---

TAG: NFR-A06
NAME: Data recovery point
SCALE: Time in minutes
METER: Maximum acceptable data loss
TARGET: 5 minutes (RPO)
MIN: -
MAX: 15 minutes
REASON: Recovery Point Objective
DERIVATION: Database backup frequency

---

TAG: NFR-A07
NAME: Backup retention
SCALE: Time in days
METER: Backup data retention period
TARGET: 30 days
MIN: 7 days
MAX: -
REASON: Audit and recovery needs
DERIVATION: Business requirement
```

### 4.3 Availability Summary

| Requirement | Target | Min | Priority | SLA |
|-------------|--------|-----|----------|-----|
| Platform uptime | 99.9% | 99.5% | Critical | 43min/month |
| API uptime | 99.9% | 99% | Critical | 43min/month |
| Database uptime | 99.95% | 99.9% | Critical | 22min/month |
| Payment gateway | 99.9% | - | High | External |
| Recovery time | 1 hour | - | Medium | RTO |
| Data loss | 5 min | - | High | RPO |
| Backup retention | 30 days | 7 days | Medium | Audit |

---

## 5. Usability Requirements

### 5.1 Accessibility

```
TAG: NFR-U01
NAME: WCAG compliance level
SCALE: WCAG version
METER: Accessibility audit score
TARGET: WCAG 2.1 AA
MIN: WCAG 2.0 A
MAX: -
REASON: Legal compliance, inclusive design
DERIVATION: Vietnam accessibility guidelines

---

TAG: NFR-U02
NAME: Color contrast ratio
SCALE: Contrast ratio
METER: Normal text contrast
TARGET: 4.5:1 minimum
MIN: -
MAX: -
REASON: Readability for visually impaired
DERIVATION: WCAG 2.1 AA standard

---

TAG: NFR-U03
NAME: Keyboard navigation
SCALE: Functionality coverage
METER: Interactive elements accessible via keyboard
TARGET: 100%
MIN: Critical paths only
MAX: -
REASON: Accessibility requirement
DERIVATION: WCAG 2.1 Guideline 2.1
```

### 5.2 Internationalization

```
TAG: NFR-U04
NAME: Language support
SCALE: Number of languages
METER: Supported locales
TARGET: 2 (English, Vietnamese)
MIN: 1 (Vietnamese)
MAX: -
REASON: Vietnam market focus
DERIVATION: Business requirement

---

TAG: NFR-U05
NAME: Vietnamese character support
SCALE: Character encoding
METER: Diacritic rendering
TARGET: 100% Vietnamese characters
MIN: -
MAX: -
REASON: Native language support
DERIVATION: UTF-8 standard

---

TAG: NFR-U06
NAME: Number/date formatting
SCALE: Locale-specific
METER: Format by user preference
TARGET: User's locale format
MIN: Vietnam locale (dd/mm/yyyy)
MAX: -
REASON: Localization best practice
DERIVATION: i18n standard
```

### 5.3 Responsive Design

```
TAG: NFR-U07
NAME: Mobile responsiveness
SCALE: Screen width support
METER: Breakpoint coverage
TARGET: 320px - 2560px
MIN: 375px - 1920px
MAX: -
REASON: Mobile-first usage
DERIVATION: Device market share

---

TAG: NFR-U08
NAME: Touch target size
SCALE: Pixels
METER: Minimum interactive element size
TARGET: 44x44px
MIN: 40x40px
MAX: -
REASON: Touch-friendly interface
DERIVATION: iOS Human Interface Guidelines

---

TAG: NFR-U09
NAME: Font scaling
SCALE: Percentage
METER: Browser zoom support
TARGET: Up to 200% without breaking
MIN: 150%
MAX: -
REASON: Accessibility for low vision
DERIVATION: WCAG 2.1 Reflow
```

### 5.4 User Experience

```
TAG: NFR-U10
NAME: Optimistic UI updates
SCALE: Percentage of actions
METER: Actions with optimistic feedback
TARGET: 90% (all safe actions)
MIN: 80%
MAX: -
REASON: Perceived performance
DERIVATION: UX best practice

---

TAG: NFR-U11
NAME: Loading indicators
SCALE: Threshold in milliseconds
METER: Show loader after X ms
TARGET: 300ms
MIN: 200ms
MAX: -
REASON: User feedback for async ops
DERIVATION: Jakob's Law (UX)

---

TAG: NFR-U12
NAME: Form validation feedback
SCALE: Timing
METER: Inline validation trigger
TARGET: On blur or after 500ms of inactivity
MIN: On submit only
MAX: -
REASON: Helpful without annoying
DERIVATION: Form UX best practice
```

### 5.5 Usability Summary

| Requirement | Target | Min | Priority | Standard |
|-------------|--------|-----|----------|----------|
| WCAG level | 2.1 AA | 2.0 A | Critical | Accessibility |
| Color contrast | 4.5:1 | - | Critical | WCAG 2.1 |
| Keyboard nav | 100% | Critical paths | Critical | WCAG 2.1 |
| Languages | 2 (EN, VI) | 1 (VI) | High | Business |
| Vietnamese chars | 100% | - | Critical | UTF-8 |
| Screen support | 320-2560px | 375-1920px | High | Responsive |
| Touch targets | 44x44px | 40x40px | Medium | iOS HIG |
| Font scaling | 200% | 150% | Medium | WCAG 2.1 |
| Optimistic UI | 90% | 80% | Medium | UX |
| Loading threshold | 300ms | 200ms | Low | UX |
| Form validation | On blur/500ms | On submit | Medium | UX |

---

## 6. Reliability Requirements

### 6.1 Error Prevention

```
TAG: NFR-R01
NAME: Zero double-bookings
SCALE: Incidents per year
METER: Confirmed double-bookings
TARGET: 0
MIN: -
MAX: -
REASON: Business-critical guarantee
DERIVATION: Distributed lock requirement

---

TAG: NFR-R02
NAME: Idempotent payment operations
SCALE: Percentage
METER: Idempotency key usage
TARGET: 100%
MIN: 100%
MAX: -
REASON: Prevent duplicate charges
DERIVATION: Payment best practice

---

TAG: NFR-R03
NAME: Elasticsearch sync reliability
SCALE: Percentage
METER: Successful sync operations
TARGET: 99.9%
MIN: 99%
MAX: -
REASON: Search data consistency
DERIVATION: Database reliability standard
```

### 6.2 Failure Handling

```
TAG: NFR-R04
NAME: Graceful degradation
SCALE: Functionality retention
METER: Core features available during partial outage
TARGET: 80% (search, booking, payment work)
MIN: 50% (booking only)
MAX: -
REASON: Business continuity
DERIVATION: Resilience best practice

---

TAG: NFR-R05
NAME: Transaction atomicity
SCALE: Percentage
METER: ACID-compliant transactions
TARGET: 100% (booking, payment)
MIN: 100% critical paths
MAX: -
REASON: Data integrity
DERIVATION: Database standard

---

TAG: NFR-R06
NAME: Distributed lock timeout
SCALE: Time in minutes
METER: Lock expiry before auto-release
TARGET: 15 minutes
MIN: 10 minutes
MAX: 20 minutes
REASON: Balance UX vs availability
DERIVATION: Booking abandonment rate
```

### 6.3 Reliability Summary

| Requirement | Target | Min | Priority | Notes |
|-------------|--------|-----|----------|-------|
| Zero double-bookings | 0/year | - | Critical | Hard requirement |
| Payment idempotency | 100% | 100% | Critical | Financial |
| ES sync success | 99.9% | 99% | High | Eventually consistent |
| Graceful degradation | 80% features | 50% | Medium | Resilience |
| Transaction atomicity | 100% | 100% | Critical | ACID |
| Lock timeout | 15 min | 10 min | High | UX balance |

---

## 7. Scalability Requirements

### 7.1 Capacity Targets

```
TAG: NFR-SC01
NAME: Concurrent users
SCALE: Number of users
METER: Simultaneous active sessions
TARGET: 10,000
MIN: 5,000
MAX: -
REASON: Growth capacity
DERIVATION: 100x initial DAU target

---

TAG: NFR-SC02
NAME: Listings capacity
SCALE: Number of records
METER: Total listings in database
TARGET: 100,000
MIN: 50,000
MAX: -
REASON: Vietnam market coverage
DERIVATION: ~10k hostels × 10 listings each

---

TAG: NFR-SC03
NAME: Daily bookings
SCALE: Number per day
METER: Peak daily booking volume
TARGET: 50,000
MIN: 10,000
MAX: -
REASON: Peak capacity (holidays)
DERIVATION: 10% of listings booked daily

---

TAG: NFR-SC04
NAME: Database storage growth
SCALE: GB per month
METER: Monthly storage increase
TARGET: 50 GB
MIN: -
MAX: 100 GB
REASON: Capacity planning
DERIVATION: avg booking size × volume
```

### 7.2 Horizontal Scaling

```
TAG: NFR-SC05
NAME: Application server scaling
SCALE: Number of instances
METER: Docker containers running
TARGET: Auto-scaling 2-10 instances
MIN: 2 instances
MAX: -
REASON: Handle traffic spikes
DERIVATION: Load testing results

---

TAG: NFR-SC06
NAME: Database read replicas
SCALE: Number of replicas
METER: MySQL read replicas
TARGET: 2 replicas (Phase 2)
MIN: 0 (single instance Phase 1)
MAX: -
REASON: Read-heavy workload scaling
DERIVATION: Architecture roadmap
```

### 7.3 Scalability Summary

| Requirement | Target | Min | Phase | Priority |
|-------------|--------|-----|-------|----------|
| Concurrent users | 10,000 | 5,000 | 1 | High |
| Listings | 100,000 | 50,000 | 1 | Critical |
| Daily bookings | 50,000 | 10,000 | 1 | High |
| Storage growth | 50 GB/mo | - | 1 | Medium |
| App instances | 2-10 | 2 | 1 | High |
| Read replicas | 2 | 0 | 2 | Medium |

---

## 8. Maintainability Requirements

### 8.1 Code Quality

```
TAG: NFR-M01
NAME: Test coverage
SCALE: Percentage
METER: Lines covered / total lines
TARGET: 80%
MIN: 70%
MAX: -
REASON: Confidence in changes
DERIVATION: Industry standard

---

TAG: NFR-M02
NAME: Type safety
SCALE: Strictness level
METER: TypeScript strict mode
TARGET: Enabled (true)
MIN: -
MAX: -
REASON: Catch errors at compile time
DERIVATION: TypeScript best practice

---

TAG: NFR-M03
NAME: Code duplication
SCALE: Percentage
METER: Duplicated code blocks
TARGET: < 5%
MIN: -
MAX: 10%
REASON: Maintainability
DERIVATION: Clean code principles
```

### 8.2 Documentation

```
TAG: NFR-M04
NAME: API documentation
SCALE: OpenAPI version
METER: API spec completeness
TARGET: OpenAPI 3.0, 100% coverage
MIN: 90% endpoints
MAX: -
REASON: Developer experience
DERIVATION: REST API best practice

---

TAG: NFR-M05
NAME: Code comments
SCALE: Percentage
METER: Complex functions with comments
TARGET: 100% (functions > 20 LOC)
MIN: 80%
MAX: -
REASON: Maintainability
DERIVATION: Team standard
```

### 8.3 Observability

```
TAG: NFR-M06
NAME: Error tracking
SCALE: Implementation
METER: Error capture rate
TARGET: 100% errors logged to ELK
MIN: 90%
MAX: -
REASON: Debugging capability
DERIVATION: Observability best practice

---

TAG: NFR-M07
NAME: Metrics collection
SCALE: Coverage
METER: Services with Prometheus metrics
TARGET: 100% (API, DB, Cache, MQ)
MIN: Critical services
MAX: -
REASON: Monitoring and alerting
DERIVATION: SRE best practice

---

TAG: NFR-M08
NAME: Audit logging
SCALE: Event types
METER: Administrative actions logged
TARGET: 100% of admin actions
MIN: Critical actions
MAX: -
REASON: Compliance and security
DERIVATION: Audit requirement
```

### 8.4 Maintainability Summary

| Requirement | Target | Min | Priority | Standard |
|-------------|--------|-----|----------|----------|
| Test coverage | 80% | 70% | High | Quality |
| Type safety | Strict mode | - | High | TypeScript |
| Code duplication | < 5% | - | Medium | Clean code |
| API docs | OpenAPI 3.0, 100% | 90% | High | REST |
| Code comments | 100% (>20 LOC) | 80% | Medium | Team |
| Error tracking | 100% to ELK | 90% | Critical | Observability |
| Metrics | 100% services | Critical | High | SRE |
| Audit logging | 100% admin | Critical | Medium | Compliance |

---

## 9. Data Integrity Requirements

### 9.1 Transactional Integrity

```
TAG: NFR-D01
NAME: ACID compliance
SCALE: Percentage
METER: Transactions satisfying ACID
TARGET: 100%
MIN: 100%
MAX: -
REASON: Financial transaction integrity
DERIVATION: Database standard

---

TAG: NFR-D02
NAME: Referential integrity
SCALE: Implementation
METER: Foreign key constraints
TARGET: 100% of relationships
MIN: Critical relationships
MAX: -
REASON: Prevent orphaned records
DERIVATION: Database design standard

---

TAG: NFR-D03
NAME: Distributed transaction
SCALE: Success rate
METER: Multi-service transaction success
TARGET: 99.9%
MIN: 99%
MAX: -
REASON: Booking + Payment atomicity
DERIVATION: Saga pattern implementation
```

### 9.2 Data Consistency

```
TAG: NFR-D04
NAME: Elasticsearch sync consistency
SCALE: Time in seconds
METER: Max lag between MySQL and ES
TARGET: < 2 seconds
MIN: -
MAX: 5 seconds
REASON: Search data freshness
DERIVATION: User expectation

---

TAG: NFR-D05
NAME: Cache consistency
SCALE: Invalidation strategy
METER: Cache invalidation coverage
TARGET: Write-through invalidation
MIN: Cache TTL expiry only
MAX: -
REASON: Prevent stale data
DERIVATION: Caching best practice
```

### 9.3 Backup & Recovery

```
TAG: NFR-D06
NAME: Backup frequency
SCALE: Time interval
METER: Automated backup schedule
TARGET: Every 6 hours (4x daily)
MIN: Daily
MAX: -
REASON: Data recovery point
DERIVATION: RPO requirement (NFR-A06)

---

TAG: NFR-D07
NAME: Backup verification
SCALE: Percentage
METER: Successful restore tests
TARGET: 100% (monthly test)
MIN: Quarterly test
MAX: -
REASON: Backup integrity
DERIVATION: DR best practice
```

### 9.4 Data Integrity Summary

| Requirement | Target | Min | Priority | Standard |
|-------------|--------|-----|----------|----------|
| ACID compliance | 100% | 100% | Critical | Database |
| Referential integrity | 100% | Critical | High | Database |
| Distributed transactions | 99.9% | 99% | Critical | Saga |
| ES sync lag | < 2s | - | High | Eventual |
| Cache invalidation | Write-through | TTL only | High | Caching |
| Backup frequency | 6 hours | Daily | High | RPO |
| Backup verification | Monthly | Quarterly | Medium | DR |

---

## 10. NFR Priority Matrix

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| **Performance** | Webhook timeout | Search, Booking, Calendar | API p50, Rate limit | - |
| **Security** | All security NFRs | Tenant isolation | - | - |
| **Availability** | All availability NFRs | - | Recovery time | Backup retention |
| **Usability** | WCAG, Keyboard nav | Languages, Responsive | Font scaling, Form validation | Loading indicators |
| **Reliability** | Zero double-booking | Idempotency, ES sync | Lock timeout | - |
| **Scalability** | Listings capacity | Concurrent users, Bookings | Storage, App scaling | Read replicas (Phase 2) |
| **Maintainability** | Error tracking | Test coverage, Type safety, API docs | Code comments, Metrics, Audit | Code duplication |
| **Data Integrity** | ACID, Ref integrity | Distributed tx, ES sync, Backup | Cache consistency, Backup verify | - |

---

## 11. Failure Handling for Hard Requirements

This section documents contingency strategies for "hard" NFRs (absolute targets like 0, 100%).

### 11.1 NFR-R01: Zero Double-Bookings

**Target:** 0 incidents/year
**What if distributed lock fails?**

| Failure Mode | Detection | Mitigation |
|--------------|-----------|------------|
| Redis unavailable | Health check fails | Fallback to database SELECT ... FOR UPDATE (slower but safe) |
| Lock timeout exceeded | Booking status: pending_payment expired | Release lock, allow guest to retry with notification |
| Network partition | Lock not acquired | Fail fast, show "System busy, please try again" |
| Clock skew | Unlikely with Redis | Use Redis time, not application server time |

**Escalation:** If double-booking occurs despite safeguards:
1. Immediately notify support team
2. Offer affected guest: full refund + alternative accommodation + compensation voucher
3. Audit booking flow for root cause
4. Update business logic to prevent recurrence

### 11.2 NFR-R02: Payment Idempotency

**Target:** 100% of payment requests
**What if idempotency check fails?**

| Failure Mode | Detection | Mitigation |
|--------------|-----------|------------|
| Duplicate webhook received | Same transaction_id | Check database before processing, ignore if processed |
| Idempotency key collision | Same key generated | Use UUID v7 (time-ordered) + user_id + timestamp |
| Race condition | Concurrent requests | Database unique constraint on (booking_id, payment_id) |

**Escalation:** If duplicate charge occurs:
1. Immediate refund of duplicate charge
2. Notify affected user with apology
3. Audit payment gateway integration

### 11.3 NFR-S09: SQL Injection Prevention

**Target:** 100% parameterized queries
**What if raw query is detected?**

| Detection | Mitigation |
|-----------|------------|
| Static analysis in CI/CD | Block commit, require code review |
| Runtime query logging (ORM level) | Alert if raw SQL detected |
| Security audit | Annual penetration testing |

**Escalation:** If SQL injection vulnerability found:
1. Immediate deployment of fix
2. Security incident disclosure (if data accessed)
3. Post-mortem with engineering team

### 11.4 NFR-S13: Webhook Signature Verification

**Target:** 100% of webhooks verified
**What if signature verification fails?**

| Failure Mode | Detection | Mitigation |
|--------------|-----------|------------|
| Signature mismatch | Verification fails | Reject webhook, log attempt, alert if repeated |
| Clock skew causing timing issues | HMAC validation fails | Allow 5-minute tolerance window |
| Key rotation issue | All webhooks fail | Fallback to IP whitelist + replay attack prevention |

**Escalation:** If fraudulent webhook processed:
1. Reverse affected transactions
2. Notify payment gateway
3. Implement additional verification layers

### 11.5 NFR-S15: Tenant Isolation

**Target:** 0 cross-tenant data access
**What if isolation breached?**

| Detection | Mitigation |
|-----------|------------|
| Query audit logs | Flag queries missing tenant_id filter | Automated test suite validates tenant isolation |
| User reports seeing wrong data | Investigate immediately | Hotfix + incident response |

**Escalation:** If data breach occurs:
1. Immediate system shutdown if severe
2. Forensic analysis
3. Notify affected users
4. Legal compliance reporting

### 11.6 Graceful Degradation Strategy

When hard requirements cannot be met, system follows this degradation order:

| Priority | Action | User Impact |
|----------|--------|-------------|
| 1 | Maintain data integrity | Booking may fail (better than double-booking) |
| 2 | Maintain security | Login may be required more frequently |
| 3 | Maintain availability | Some features may be disabled |
| 4 | Maintain performance | Show "system busy" message |
| 5 | Full shutdown | Better to be down than corrupt data |

---

## 12. NFR Traceability

### 12.1 Use Case to NFR Mapping

| Use Case | Primary NFRs |
|----------|--------------|
| UC-G01 (Search) | NFR-P01, NFR-P07, NFR-P11, NFR-U07 |
| UC-G02 (View Listing) | NFR-P02, NFR-U02, NFR-U08 |
| UC-G03 (Create Booking) | NFR-P03, NFR-R01, NFR-R05, NFR-R06 |
| UC-G04 (Process Payment) | NFR-P05, NFR-S12, NFR-S13, NFR-S14 |
| UC-G05 (Manage Bookings) | NFR-R02, NFR-U10 |
| UC-G06 (Submit Review) | NFR-S09, NFR-S10 |
| UC-O03 (Update Calendar) | NFR-P04, NFR-D04 |
| UC-A01 (Approve Listings) | NFR-M08, NFR-D07 |

### 12.2 Component to NFR Mapping

| Component | Critical NFRs |
|-----------|--------------|
| **Backend API** | NFR-P01-P06, NFR-S01-S16 |
| **Database** | NFR-D01-D07, NFR-A03 |
| **Elasticsearch** | NFR-P01, NFR-D04 |
| **Payment Gateway** | NFR-P05, NFR-S12-S14 |
| **WebSocket Server** | NFR-P04 |
| **Frontend** | NFR-U01-U12 |

---

**Document Version:** 1.1
**Last Updated:** 2026-01-25 (COMET BA fixes applied)
**Maintained By:** Engineering Team
**Notation:** Planguage