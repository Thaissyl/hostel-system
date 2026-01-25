# 5. Other Requirements

**Project:** Hostel Management System
**Version:** 1.0
**Last Updated:** 2026-01-25

---

## 5.1 Business Rules

### 5.1.1 Booking Rules

| Rule ID | Rule | Description | Priority |
|---------|------|-------------|----------|
| **BR-001** | Location Requirement | All properties must be located in Vietnam | High |
| **BR-002** | Date Validation | Check-out date must be after check-in date | High |
| **BR-003** | Contact Information | Guest must provide valid contact information for booking | High |
| **BR-004** | Reservation Timeout | Availability reservation expires after 15 minutes if payment not completed | High |
| **BR-005** | Payment Required | Booking must be paid within 15 minutes of initiation | High |
| **BR-006** | Confirmation SLA | Confirmed bookings must receive email confirmation within 1 minute | High |
| **BR-013** | Full Refund Period | Full refund if cancelled 24 hours before check-in | High |
| **BR-014** | Partial Refund Period | 50% refund if cancelled 48 hours before check-in | Medium |
| **BR-015** | No Refund Period | No refund if cancelled less than 48 hours before check-in | Medium |
| **BR-016** | Review Eligibility | Only guests who completed stays can submit reviews | High |
| **BR-017** | One Review Per Booking | One review per booking allowed | Medium |

---

### 5.1.2 Property and Listing Rules

| Rule ID | Rule | Description | Priority |
|---------|------|-------------|----------|
| **BR-007** | Property Location | Property must be located in Vietnam | High |
| **BR-008** | Property Information | Property requires valid address and contact information | High |
| **BR-011** | Listing Visibility | Only approved listings are visible to guests | High |
| **BR-012** | View Count Tracking | View count must be tracked for analytics | Medium |
| **BR-019** | Room Type Compliance | Room type must match property type | Medium |
| **BR-020** | Price Limits | Pricing must be within platform-defined minimum/maximum limits | Medium |
| **BR-021** | Booking Date Lock | Dates with confirmed bookings cannot be modified by owner | High |
| **BR-022** | Minimum Price | Minimum price enforced by platform for all listings | High |

---

### 5.1.3 User Management Rules

| Rule ID | Rule | Description | Priority |
|---------|------|-------------|----------|
| **BR-023** | Owner Cancellation | Owner cancellations require reason and penalty explanation | High |
| **BR-024** | Message Delivery | Guest messages must be delivered within 1 minute | Medium |
| **BR-027** | Suspended User Restrictions | Suspended users cannot create new bookings | High |
| **BR-028** | Banned User Access | Banned users lose access to platform | High |

---

### 5.1.4 Payment Rules

| Rule ID | Rule | Description | Priority |
|---------|------|-------------|----------|
| **BR-029** | Credential Encryption | Payment credentials must be encrypted at rest | High |
| **BR-030** | Configuration Audit | Payment configuration changes must be logged | High |

---

### 5.1.5 Analytics Rules

| Rule ID | Rule | Description | Priority |
|---------|------|-------------|----------|
| **BR-025** | Analytics Update Frequency | Analytics data updated daily | Medium |
| **BR-026** | Data Access Limits | Export limited to owner's own data (for owners) | Medium |
| **BR-031** | System Analytics Frequency | System analytics updated hourly | Low |
| **BR-032** | Platform Data Scope | Admin analytics limited to platform-wide data only | Medium |

---

### 5.1.6 Dispute Resolution Rules

| Rule ID | Rule | Description | Priority |
|---------|------|-------------|----------|
| **BR-033** | Response SLA | Dispute response within 24 hours | High |
| **BR-034** | Resolution SLA | Dispute resolution within 72 hours | High |
| **BR-035** | Decision Audit Trail | All dispute decisions must be auditable | High |

---

### 5.1.7 Review Rules

| Rule ID | Rule | Description | Priority |
|---------|------|-------------|----------|
| **BR-018** | Wishlist Limit | Wishlist limited to 100 items per guest | Low |

---

### 5.1.8 Platform Administration Rules

| Rule ID | Rule | Description | Priority |
|---------|------|-------------|----------|
| **BR-009** | Quality Standards | Properties must meet quality standards before approval | High |
| **BR-010** | Rejection Feedback | Rejected properties must receive feedback for improvement | Medium |

---

## 5.2 Legal/Regulatory Requirements

### 5.2.1 Data Privacy

| Requirement ID | Requirement | Description |
|----------------|------------|-------------|
| **LR-001** | Personal Data Protection | Compliance with Vietnamese Personal Data Protection Law |
| **LR-002** | Data Retention | User data retention period: 3 years after account closure |
| **LR-003** | Data Deletion | Right to erasure upon user request (within 30 days) |
| **LR-004** | Consent Management | Explicit consent for data collection and processing |

### 5.2.2 E-Commerce Regulations

| Requirement ID | Requirement | Description |
|----------------|------------|-------------|
| **LR-005** | E-Commerce License | Valid e-commerce license for Vietnam operations |
| **LR-006** | Consumer Protection | Compliance with Vietnamese Consumer Protection Law |
| **LR-007** | Price Transparency | All fees and taxes must be clearly displayed |
| **LR-008** | Cancellation Rights | Clear disclosure of cancellation policies |

### 5.2.3 Payment Regulations

| Requirement ID | Requirement | Description |
|----------------|------------|-------------|
| **LR-009** | Payment License | Valid payment intermediary license (if applicable) |
| **LR-010** | PCI DSS Compliance | Payment Card Industry Data Security Standard compliance |
| **LR-011** | VietQR Compliance | Compliance with VietQR payment standards |
| **LR-012** | Transaction Records | Payment transaction records retained for 5 years |

### 5.2.4 Content Regulations

| Requirement ID | Requirement | Description |
|----------------|------------|-------------|
| **LR-013** | Content Moderation | Illegal/prohibited content filtering and removal |
| **LR-014** | Intellectual Property | Respect for copyright and trademark laws |
| **LR-015** | User Generated Content | Liability protection for platform with proper DMCA-like process |

---

## 5.3 Other Constraints

### 5.3.1 Operational Constraints

| Constraint ID | Constraint | Description |
|----------------|-----------|-------------|
| **OC-005** | Business Hours | Admin support available 8:00-20:00 ICT |
| **OC-006** | Approval SLA | Property/listing approval within 48 hours |
| **OC-007** | Support Channels | Email and in-app messaging support only |
| **OC-008** | Language Support | Vietnamese and English only (initially) |

### 5.3.2 Technical Constraints

| Constraint ID | Constraint | Description |
|----------------|-----------|-------------|
| **TC-007** | Browser Compatibility | Last 2 versions of major browsers only |
| **TC-008** | Device Support | No native mobile apps (responsive web only) |
| **TC-009** | Internet Connectivity | Requires active internet connection (no offline mode) |
| **TC-010** | File Upload Limits | Images: 5MB max, 10 images per listing, 5 per review |

### 5.3.3 Business Constraints

| Constraint ID | Constraint | Description |
|----------------|-----------|-------------|
| **BC-004** | Platform Commission | Commission rate: 10-15% per booking (configurable by admin) |
| **BC-005** | Geographic Scope | Vietnam market only for MVP launch |
| **BC-006** | Payment Methods | VietQR and bank transfer only (no credit cards initially) |
| **BC-007** | Currency | Vietnamese Dong (VND) only |
| **BC-008** | Listing Limits | Maximum 10 properties per owner (soft limit for MVP) |

### 5.3.4 Data Constraints

| Constraint ID | Constraint | Description |
|----------------|-----------|-------------|
| **DC-001** | Data Isolation | Complete multi-tenant data isolation between owners |
| **DC-002** | Backup Frequency | Automated daily backups, retained for 30 days |
| **DC-003** | Geographic Data | Vietnam provinces and cities only |
| **DC-004** | Currency Precision | All amounts in VND, no decimal places for nightly rates |

---

## 5.4 Requirements Summary

**Total Business Rules:** 37 rules across 8 categories

| Category | Rule Count |
|----------|------------|
| Booking Rules | 10 |
| Property/Listing Rules | 8 |
| User Management Rules | 4 |
| Payment Rules | 2 |
| Analytics Rules | 4 |
| Dispute Rules | 3 |
| Review Rules | 1 |
| Platform Admin Rules | 2 |
| Wishlist Rules | 1 |
| Other Rules | 2 |

**Total Legal/Regulatory:** 15 requirements

| Category | Requirement Count |
|----------|-------------------|
| Data Privacy | 4 |
| E-Commerce | 4 |
| Payment | 4 |
| Content | 3 |

**Total Other Constraints:** 12 constraints

| Category | Constraint Count |
|----------|------------------|
| Operational | 4 |
| Technical | 4 |
| Business | 4 |
| Data | 4 |

**All requirements reference specific use cases and functional requirements.**