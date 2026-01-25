# 4. Non-Functional Requirements

**Project:** Hostel Management System
**Version:** 1.0
**Last Updated:** 2026-01-25

---

## 4.1 External Interface

### 4.1.1 User Interface

**UI Standards:**
- Web-based responsive design supporting desktop (1024px+) and mobile (320px+)
- Bilingual support: Vietnamese (Tiếng Việt) and English
- WCAG 2.1 AA accessibility compliance
- Modern browsers: Chrome, Firefox, Safari, Edge (last 2 versions)

### 4.1.2 Software Interface

**External System Integrations:**

| System | Purpose | Protocol |
|--------|---------|----------|
| **SePay** | Payment processing (VietQR, Bank Transfer) | REST API |
| **Polar** | SaaS subscription payments | REST API |
| **Email Service** | Transactional emails | SMTP/REST API |

### 4.1.3 Hardware Interface

None (web-based system, no specialized hardware)

### 4.1.4 Communication Interface

**Network Requirements:**
- HTTPS/TLS 1.3 for all encrypted communication
- WebSocket for real-time updates
- RESTful API for all client-server communication

---

## 4.2 Quality Attributes (Planguage Format)

### 4.2.1 Performance

#### Response Time - Search

| Aspect | Description |
|--------|-------------|
| **Gist** | Search query response time |
| **Scale** | Seconds from user submits search to results displayed |
| **Meter** | Automated performance testing measuring 95th percentile |
| **Must** | ≤ 1.0 second for 95% of search queries |
| **Plan** | ≤ 0.5 second for 95% of search queries |
| **Wish** | ≤ 0.3 second for 95% of search queries |

#### Response Time - Page Load

| Aspect | Description |
|--------|-------------|
| **Gist** | Page load time for listing details |
| **Scale** | Seconds from URL request to page fully rendered |
| **Meter** | Automated performance testing (Lighthouse) |
| **Must** | ≤ 3.0 seconds for 95% of page loads |
| **Plan** | ≤ 2.0 seconds for 95% of page loads |
| **Wish** | ≤ 1.5 seconds for 95% of page loads |

#### Throughput - Concurrent Users

| Aspect | Description |
|--------|-------------|
| **Gist** | System concurrent user capacity |
| **Scale** | Number of simultaneous active users |
| **Meter** | Load testing with simulated users |
| **Must** | Support 500 concurrent users |
| **Plan** | Support 1,000 concurrent users |
| **Wish** | Support 5,000 concurrent users |

#### Throughput - Search Queries

| Aspect | Description |
|--------|-------------|
| **Gist** | Search queries per second |
| **Scale** | Queries processed per second |
| **Meter** | Load testing measurement |
| **Must** | 100 queries/second |
| **Plan** | 250 queries/second |
| **Wish** | 500 queries/second |

---

### 4.2.2 Security

#### Authentication - Password Strength

| Aspect | Description |
|--------|-------------|
| **Gist** | User password security requirements |
| **Scale** | Password complexity level |
| **Meter** | Automated password validation |
| **Must** | Minimum 8 characters, letters + numbers |
| **Plan** | Minimum 10 characters, letters + numbers + symbols |
| **Wish** | Minimum 12 characters with entropy scoring |

#### Authentication - Session Timeout

| Aspect | Description |
|--------|-------------|
| **Gist** | User session inactivity timeout |
| **Scale** | Minutes of inactivity before logout |
| **Meter** | System configuration |
| **Must** | 24 hours timeout |
| **Plan** | 12 hours timeout with "remember me" option |
| **Wish** | Configurable timeout per user preference |

#### Data Encryption - At Rest

| Aspect | Description |
|--------|-------------|
| **Gist** | Data storage encryption |
| **Scale** | Encryption algorithm and key length |
| **Meter** | Security audit and code review |
| **Must** | AES-128 encryption for sensitive data |
| **Plan** | AES-256 encryption for all data |
| **Wish** | AES-256 with key rotation every 90 days |

#### Data Encryption - In Transit

| Aspect | Description |
|--------|-------------|
| **Gist** | Network communication encryption |
| **Scale** | TLS protocol version |
| **Meter** | Security scan and penetration testing |
| **Must** | TLS 1.2 minimum |
| **Plan** | TLS 1.3 for all connections |
| **Wish** | TLS 1.3 with HSTS and certificate pinning |

#### Authorization - Access Control

| Aspect | Description |
|--------|-------------|
| **Gist** | Role-based access control enforcement |
| **Scale** | Percentage of unauthorized access attempts blocked |
| **Meter** | Security logging and monitoring |
| **Must** | 100% of unauthorized attempts blocked |
| **Plan** | 100% blocked with audit logging |
| **Wish** | Real-time threat detection and auto-banning |

---

### 4.2.3 Usability

#### Learning Time - First Booking

| Aspect | Description |
|--------|-------------|
| **Gist** | Time for new guest to complete first booking |
| **Scale** | Minutes from registration to confirmed booking |
| **Meter** | User testing with 10 new users |
| **Must** | ≤ 10 minutes for 80% of new users |
| **Plan** | ≤ 7 minutes for 80% of new users |
| **Wish** | ≤ 5 minutes for 90% of new users |

#### Task Success Rate - Booking

| Aspect | Description |
|--------|-------------|
| **Gist** | Successful booking completion rate |
| **Scale** | Percentage of bookings completed without errors |
| **Meter** | Analytics tracking booking funnel |
| **Must** | ≥ 85% completion rate |
| **Plan** | ≥ 92% completion rate |
| **Wish** | ≥ 97% completion rate |

#### User Satisfaction - NPS

| Aspect | Description |
|--------|-------------|
| **Gist** | User satisfaction score |
| **Scale** | Net Promoter Score (-100 to +100) |
| **Meter** | Quarterly user surveys |
| **Must** | ≥ 20 NPS |
| **Plan** | ≥ 40 NPS |
| **Wish** | ≥ 60 NPS |

#### Accessibility - WCAG Compliance

| Aspect | Description |
|--------|-------------|
| **Gist** | Web content accessibility compliance |
| **Scale** | WCAG 2.1 compliance level |
| **Meter** | Automated accessibility testing (axe-core) |
| **Must** | WCAG 2.1 A compliance |
| **Plan** | WCAG 2.1 AA compliance |
| **Wish** | WCAG 2.1 AAA compliance |

---

### 4.2.4 Reliability

#### System Availability

| Aspect | Description |
|--------|-------------|
| **Gist** | System uptime percentage |
| **Scale** | Percentage uptime per month |
| **Meter** | Infrastructure monitoring |
| **Must** | ≥ 99.0% uptime (7.2 hours downtime/month) |
| **Plan** | ≥ 99.5% uptime (3.6 hours downtime/month) |
| **Wish** | ≥ 99.9% uptime (43 minutes downtime/month) |

#### Mean Time Between Failures - MTBF

| Aspect | Description |
|--------|-------------|
| **Gist** | Average time between system failures |
| **Scale** | Hours between critical failures |
| **Meter** | Incident tracking and analysis |
| **Must** | ≥ 720 hours MTBF (30 days) |
| **Plan** | ≥ 2,160 hours MTBF (90 days) |
| **Wish** | ≥ 8,760 hours MTBF (1 year) |

#### Mean Time To Recovery - MTTR

| Aspect | Description |
|--------|-------------|
| **Gist** | Average recovery time from failures |
| **Scale** | Minutes to restore service |
| **Meter** | Incident tracking and analysis |
| **Must** | ≤ 60 minutes MTTR |
| **Plan** | ≤ 30 minutes MTTR |
| **Wish** | ≤ 15 minutes MTTR |

#### Data Integrity

| Aspect | Description |
|--------|-------------|
| **Gist** | Data corruption prevention |
| **Scale** | Percentage of transactions without data loss |
| **Meter** | System monitoring and data validation |
| **Must** | 99.9% data integrity (1 error per 1,000) |
| **Plan** | 99.99% data integrity (1 error per 10,000) |
| **Wish** | 99.999% data integrity (1 error per 100,000) |

---

### 4.2.5 Scalability

#### User Growth Capacity

| Aspect | Description |
|--------|-------------|
| **Gist** | Maximum registered users supported |
| **Scale** | Number of user accounts |
| **Meter** | Capacity planning and load testing |
| **Must** | 10,000 users |
| **Plan** | 50,000 users |
| **Wish** | 500,000 users |

#### Listing Growth Capacity

| Aspect | Description |
|--------|-------------|
| **Gist** | Maximum listings supported |
| **Scale** | Number of active listings |
| **Meter** | Capacity planning and load testing |
| **Must** | 1,000 listings |
| **Plan** | 10,000 listings |
| **Wish** | 100,000 listings |

#### Concurrent Booking Capacity

| Aspect | Description |
|--------|-------------|
| **Gist** | Simultaneous booking transactions |
| **Scale** | Concurrent booking transactions processed |
| **Meter** | Load testing with simulated bookings |
| **Must** | 50 concurrent bookings |
| **Plan** | 200 concurrent bookings |
| **Wish** | 1,000 concurrent bookings |

---

### 4.2.6 Maintainability

#### Code Coverage - Unit Tests

| Aspect | Description |
|--------|-------------|
| **Gist** | Unit test code coverage percentage |
| **Scale** | Percentage of code covered by unit tests |
| **Meter** | Automated test coverage tools (Istanbul/nyc) |
| **Must** | ≥ 70% code coverage |
| **Plan** | ≥ 85% code coverage |
| **Wish** | ≥ 95% code coverage |

#### Code Complexity - Cyclomatic Complexity

| Aspect | Description |
|--------|-------------|
| **Gist** | Code complexity per function |
| **Scale** | Maximum cyclomatic complexity number |
| **Meter** | Static analysis tools (ESLint) |
| **Must** | ≤ 15 complexity per function |
| **Plan** | ≤ 10 complexity per function |
| **Wish** | ≤ 5 complexity per function |

#### Documentation Completeness

| Aspect | Description |
|--------|-------------|
| **Gist** | API documentation coverage |
| **Scale** | Percentage of endpoints documented |
| **Meter** | Automated documentation generation (Swagger) |
| **Must** | 100% of public APIs documented |
| **Plan** | 100% with examples and use cases |
| **Wish** | 100% with interactive API explorer |

---

### 4.2.7 Internationalization

#### Language Support

| Aspect | Description |
|--------|-------------|
| **Gist** | Supported languages |
| **Scale** | Number of languages |
| **Meter** | Feature tracking |
| **Must** | 2 languages (Vietnamese, English) |
| **Plan** | 2 languages with full localization |
| **Wish** | 4 languages (add Chinese, Korean) |

#### Vietnamese Character Support

| Aspect | Description |
|--------|-------------|
| **Gist** | Vietnamese diacritic support |
| **Scale** | Percentage of Vietnamese characters rendered correctly |
| **Meter** | Visual testing and character encoding validation |
| **Must** | 100% support for all Vietnamese characters |
| **Plan** | 100% with proper font rendering |
| **Wish** | 100% with locale-specific formatting (currency, dates) |

---

## 4.3 Constraints

### Technical Constraints

| Constraint | Description |
|------------|-------------|
| **TC-001** | Web-only platform (no native mobile apps) |
| **TC-002** | Browser support: last 2 versions of Chrome, Firefox, Safari, Edge |
| **TC-003** | Node.js 20+ runtime required |
| **TC-004** | Docker containerization required |
| **TC-005** | MySQL 8.0 as primary database |
| **TC-006** | Payment gateway integration with SePay and Polar |

### Regulatory Constraints

| Constraint | Description |
|------------|-------------|
| **RC-001** | Vietnamese e-commerce regulations compliance |
| **RC-002** | Vietnamese data privacy laws compliance |
| **RC-003** | Payment processing regulations (VietQR, bank transfers) |
| **RC-004** | PCI DSS compliance for payment processing |

### Organizational Constraints

| Constraint | Description |
|------------|-------------|
| **OC-001** | Multi-tenant data isolation required |
| **OC-002** | Bilingual UI (Vietnamese/English) mandatory |
| **OC-003** | Open-source technology stack preference |
| **OC-004** | Cost-effective infrastructure (cloud-hosted) |

### Business Constraints

| Constraint | Description |
|------------|-------------|
| **BC-001** | Vietnam market only (initial launch) |
| **BC-002** | Local payment methods required (VietQR, bank transfer) |
| **BC-003** | Platform commission model on bookings |

---

## 4.4 NFR Summary

**Total Quality Attributes:** 7 categories, 25 specific attributes

| Category | Attributes |
|----------|------------|
| **Performance** | 4 (response time, throughput) |
| **Security** | 5 (authentication, encryption, authorization) |
| **Usability** | 4 (learning time, success rate, satisfaction, accessibility) |
| **Reliability** | 4 (availability, MTBF, MTTR, data integrity) |
| **Scalability** | 3 (user growth, listing growth, booking capacity) |
| **Maintainability** | 3 (code coverage, complexity, documentation) |
| **Internationalization** | 2 (languages, Vietnamese support) |

**All NFRs follow Planguage format with Gist, Scale, Meter, Must, Plan, Wish fields.**
