# 1. Overall Description

**Project:** Hostel Management System
**Version:** 1.0
**Last Updated:** 2026-01-25
**Target Market:** Vietnam

---

## 1.1 Product Perspective

The Hostel Management System is a multi-tenant web platform connecting hostel owners with guests seeking budget accommodation in Vietnam.

**System Type:** B2C multi-sided marketplace platform

**External Systems:**
- **Payment Gateway:** SePay (VietQR/Bank Transfer), Polar (SaaS subscriptions)
- **Mapping Service:** Location-based search and directions
- **Email/SMS Service:** Booking confirmations and notifications

**Platform Architecture:**
- Web-based application accessible via browsers (desktop and mobile)
- RESTful API backend serving frontend clients
- Multi-tenant architecture supporting multiple hostel owners

---

## 1.2 Product Functions

High-level capabilities provided by the system:

| Function | Description |
|----------|-------------|
| **Search & Discovery** | Guests search hostels by location, dates, price, amenities, room type |
| **Booking Management** | Guests create, view, modify, cancel bookings with real-time availability |
| **Payment Processing** | Secure payment processing via multiple payment methods |
| **Property Management** | Owners register hostels, manage listings, update pricing and availability |
| **Booking Administration** | Owners accept/reject booking requests, manage check-in/check-out |
| **Review & Rating** | Guests submit reviews and ratings after completed stays |
| **Wishlist** | Guests save favorite hostels for future reference |
| **Analytics Dashboard** | Owners view occupancy rates, revenue, booking trends |
| **User Management** | Registration, authentication, profile management for all user types |
| **Platform Administration** | Admins approve listings, manage users, configure payments, handle disputes |

---

## 1.3 User Characteristics

### Primary Actors

| Actor | Description | Technical Proficiency | Goals |
|-------|-------------|----------------------|-------|
| **Guest** | Travelers seeking accommodation in Vietnam | Basic to intermediate | Find, compare, book affordable hostels; manage bookings; leave reviews |
| **Owner** | Hostel operators listing properties | Intermediate | Manage property listings; accept bookings; maximize occupancy and revenue |
| **Admin** | Platform administrators | Advanced | Moderate content; resolve disputes; configure system settings |

### Guest Characteristics
- Domestic and international travelers visiting Vietnam
- Budget-conscious (backpackers, students, budget travelers)
- Mobile-heavy usage (searching while traveling)
- Expect bilingual support (Vietnamese and English)
- Need real-time availability and instant booking confirmation

### Owner Characteristics
- Small to medium hostel operators
- May have limited technical expertise
- Need intuitive dashboard for daily operations
- Require analytics for business decisions
- Need mobile access for on-the-go management

### Admin Characteristics
- Platform staff with technical background
- Require comprehensive oversight tools
- Need efficient workflow for content moderation
- Require access to detailed system analytics

---

## 1.4 Constraints

### Technical Constraints
- **Web Platform Only:** No native mobile apps (responsive web design required)
- **Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge) - last 2 versions
- **Response Time:** Search queries <500ms (p95), page loads <2s
- **Concurrent Users:** Support 1000+ concurrent users

### Regulatory Constraints
- **Vietnam Regulations:** Compliance with Vietnamese e-commerce and hospitality regulations
- **Data Protection:** User data privacy per Vietnamese law
- **Payment Regulations:** Compliance with local payment processing requirements

### Organizational Constraints
- **Multi-tenant:** Data isolation between hostel owners required
- **Bilingual:** All UI and communications in Vietnamese and English
- **Budget:** Cost-effective infrastructure using open-source technologies

### Business Constraints
- **Market Focus:** Vietnam market only (initial launch)
- **Payment Methods:** Must support local payment methods (VietQR, bank transfer)

---

## 1.5 Assumptions and Dependencies

### Assumptions
- Guests have internet access and modern web browsers
- Hostel owners have basic computer literacy
- Payment gateway APIs remain stable and available
- Users provide accurate information during registration and booking
- Hostel owners maintain accurate availability calendars
- Email delivery for notifications is reliable

### External Dependencies
- **Infrastructure Services:**
  - MySQL 8.0 database
  - Elasticsearch search engine
  - Redis cache
  - RabbitMQ message queue
  - ELK Stack for logging

- **Third-Party Services:**
  - SePay payment gateway (VietQR, bank transfers)
  - Polar payment gateway (SaaS subscriptions)
  - Email service provider (transactional emails)
  - Mapping service (location features)

- **Development Tools:**
  - Docker/Docker Compose for containerization
  - Node.js 20+ runtime
  - npm package manager

### Critical Dependencies
- **Payment Gateways:** Core business functionality depends on payment processing availability
- **Database:** MySQL downtime prevents all booking operations
- **Search:** Elasticsearch downtime degrades search experience (fallback to MySQL)
- **Email:** Notifications required for booking confirmations

### Mitigation Strategies
- Redis caching reduces database load
- Fallback search to MySQL if Elasticsearch unavailable
- Queue-based processing for resilience against temporary failures
- Graceful degradation for non-critical features during outages