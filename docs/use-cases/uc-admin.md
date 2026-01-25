# Admin Use Cases - Detailed Specifications
## Hostel Management System

**Version:** 1.2 (Critical & high priority fixes applied)
**Date:** 2026-01-25
**Methodology:** COMET

---

## Use Case Acceptance Criteria Validation

All use cases pass ALL three COMET criteria:
- **C1:** Provides a useful result to the actor
- **C2:** Is a sequence (multiple steps), not a single action
- **C3:** Treats system as black box (external behavior only)

---

## UC-A01: Approve Property Listing

**C1 (Useful Result):** Property/listing becomes visible to guests, owner notified
**C2 (Sequence):** View pending → Review details → Approve/Reject → System updates → Notify owner
**C3 (Black Box):** Admin reviews, makes decision; search sync internal

| Section | Content |
|---------|---------|
| **Use Case ID** | UC-A01 |
| **Name** | Approve Property Listing |
| **Priority** | High |
| **Complexity** | Low |
| **Summary** | Admin reviews pending property/listing submissions for compliance and quality, then approves or rejects. Owner receives notification of decision. |
| **Primary Actor** | Admin |
| **Preconditions** | Admin is authenticated, Has approval permissions, Pending items exist |
| **Main Sequence** | 1. Admin navigates to "Pending Approvals"<br>2. System displays queue of pending items<br>3. Admin selects an item to review<br>4. System displays property/listing details and images<br>5. Admin reviews for compliance and quality<br>6. Admin approves or rejects<br>7. System updates status<br>8. Owner receives notification<br>9. If approved, listing appears in search |
| **Alternative Sequences** | **2a. Queue empty:** System shows "All caught up!"<br>**6a. Reject:** Admin selects rejection reason, system notifies owner with feedback<br>**9a. Sync fails:** System queues for retry |
| **Business Rules** | SLA: Review within 48 hours, Rejection requires reason |
| **NFR References** | NFR-M08: Audit logging, NFR-D04: ES sync <2s |
| **Post Conditions** | Status updated, Owner notified, Search updated (if approved) |

```mermaid
flowchart TD
    A[Admin: Pending Approvals] --> B{Pending items?}
    B -->|No| C[All caught up]
    B -->|Yes| D[Display queue]
    D --> E[Select item to review]
    E --> F[View details + images]
    F --> G{Compliant?}
    G -->|Yes| H[Approve]
    G -->|No| I[Select rejection reason]
    H --> J[Status: Active]
    I --> K[Status: Rejected]
    J --> L[Sync to search]
    K --> M[Notify owner + feedback]
    L --> N[Notify owner: approved]
```

---

## UC-A02: Suspend User Account

**C1 (Useful Result):** User account disabled, user cannot login
**C2 (Sequence):** Search user → Select account → Enter reason → Confirm → System suspends → Notify user
**C3 (Black Box):** Admin suspends, user blocked; database update internal

| Section | Content |
|---------|---------|
| **Use Case ID** | UC-A02 |
| **Name** | Suspend User Account |
| **Priority** | Medium |
| **Complexity** | Low |
| **Summary** | Admin suspends a user account for policy violations, preventing login and disabling all bookings. User receives notification with reason. |
| **Primary Actor** | Admin |
| **Preconditions** | Admin is authenticated, Has user management permissions, User exists |
| **Main Sequence** | 1. Admin navigates to "User Management"<br>2. Admin searches for user by email or name<br>3. Admin selects user from results<br>4. System displays user profile and activity<br>5. Admin clicks "Suspend Account"<br>6. Admin enters suspension reason<br>7. Optionally, admin sets suspension end date<br>8. Admin confirms suspension<br>9. System suspends user account<br>10. User receives email notification |
| **Alternative Sequences** | **2a. User not found:** System shows "No users found"<br>**5a. User already suspended:** System shows current status<br>**7a. No end date:** Suspension is indefinite until admin reactivates<br>**9a. Suspension fails:** System shows error, allows retry |
| **Business Rules** | Suspended users cannot login, Existing bookings are cancelled |
| **NFR References** | NFR-M08: 100% audit logging, NFR-S15: Tenant isolation |
| **Post Conditions** | User status: suspended, User notified, Bookings cancelled |

```mermaid
flowchart TD
    A[Admin: User Management] --> B[Search user]
    B --> C{User found?}
    C -->|No| D[Show: No users found]
    C -->|Yes| E[Select user]
    E --> F[View user profile]
    F --> G[Click Suspend Account]
    G --> H[Enter reason]
    H --> I[Set end date optional]
    I --> J[Confirm suspension]
    J --> K[User suspended]
    K --> L[Send notification email]
```

---

## UC-A03: Configure Payment Gateway

**C1 (Useful Result):** Payment gateway active, system can process payments
**C2 (Sequence):** Select gateway → Enter credentials → Configure webhooks → Test → Save → Active
**C3 (Black Box):** Admin enters config, system stores; encryption internal

| Section | Content |
|---------|---------|
| **Use Case ID** | UC-A03 |
| **Name** | Configure Payment Gateway |
| **Priority** | High |
| **Complexity** | Medium |
| **Summary** | Admin configures payment gateway settings (VNPAY, Ngân Lượng, MoMo) including API credentials, webhook URLs, and commission rates. |
| **Primary Actor** | Admin |
| **Preconditions** | Admin is authenticated, Has payment configuration permissions, Gateway account obtained |
| **Main Sequence** | 1. Admin navigates to "Payment Settings"<br>2. System displays configured gateways<br>3. Admin selects a gateway to configure<br>4. Admin enters API credentials (merchant ID, secret key)<br>5. Admin configures webhook URLs<br>6. Admin sets platform commission rate<br>7. Admin tests connection<br>8. System validates credentials<br>9. Admin saves configuration<br>10. Gateway becomes active |
| **Alternative Sequences** | **4a. Invalid credentials:** System shows error, doesn't save<br>**7a. Test fails:** System shows error details, allows retest<br>**9a. Save fails:** System shows error, keeps values for retry |
| **Business Rules** | API credentials encrypted at rest, Commission rate 5-20%, Test mode supported |
| **NFR References** | NFR-S07: AES-256 encryption, NFR-M08: Audit logging |
| **Post Conditions** | Gateway configured, Credentials encrypted, Test transaction recorded |

```mermaid
flowchart LR
    A[Admin: Payment Settings] --> B[View gateways]
    B --> C[Select gateway]
    C --> D[Enter API credentials]
    D --> E[Configure webhooks]
    E --> F[Set commission rate]
    F --> G[Test connection]
    G --> H{Test successful?}
    H -->|No| I[Show error]
    I --> D
    H -->|Yes| J[Save configuration]
    J --> K[Encrypt credentials]
    K --> L[Gateway active]
```

---

## UC-A04: View System Analytics

**C1 (Useful Result):** Admin sees platform-wide metrics for decision making
**C2 (Sequence):** Open dashboard → View KPIs → Filter by criteria → Drill down
**C3 (Black Box):** Admin views charts; aggregation/querying internal

| Section | Content |
|---------|---------|
| **Use Case ID** | UC-A04 |
| **Name** | View System Analytics |
| **Priority** | Medium |
| **Complexity** | Medium |
| **Summary** | Admin accesses platform-wide analytics dashboard showing total bookings, revenue, user growth, search trends, and system performance metrics. |
| **Primary Actor** | Admin |
| **Preconditions** | Admin is authenticated, Has analytics permissions, Analytics data available |
| **Main Sequence** | 1. Admin navigates to "System Analytics"<br>2. System displays executive dashboard with KPIs<br>3. Admin views sections: Business metrics, User metrics, Technical metrics<br>4. Admin selects date range filter<br>5. Admin selects region filter<br>6. System updates charts with filtered data<br>7. Admin optionally drills down into specific metric<br>8. Admin optionally exports report |
| **Alternative Sequences** | **8a. Export requested:** System generates PDF/Excel report<br>**8b. Real-time mode:** System switches to live metrics view |
| **Business Rules** | Data aggregation: hourly/daily/monthly, Admin sees all data |
| **NFR References** | NFR-P11: Chart rendering <2s, NFR-U02: Color contrast |
| **Post Conditions** | Analytics viewed, Export generated (if requested) |

```mermaid
flowchart TD
    A[Admin: System Analytics] --> B[Executive Dashboard]
    B --> C[Business Metrics]
    B --> D[User Metrics]
    B --> E[Technical Metrics]

    C --> C1[Total Bookings]
    C --> C2[Revenue]
    C --> C3[Commission]

    D --> D1[Total Users]
    D --> D2[Active Users]
    D --> D3[User Growth]

    E --> E1[Response Times]
    E --> E2[Error Rates]
    E --> E3[Payment Success]

    C1 --> F[Apply filters]
    C2 --> F
    C3 --> F
    D1 --> F
    D2 --> F
    D3 --> F
    E1 --> F
    E2 --> F
    E3 --> F

    F --> G[Update charts]
    G --> H[Drill down OR export]
```

---

## UC-A05: Resolve Dispute

**C1 (Useful Result):** Dispute settled, refund processed (if applicable), parties notified
**C2 (Sequence):** View dispute → Review evidence → Make ruling → Process refund → Notify parties
**C3 (Black Box):** Admin reviews, decides; refund processing internal

| Section | Content |
|---------|---------|
| **Use Case ID** | UC-A05 |
| **Name** | Resolve Dispute |
| **Priority** | High |
| **Complexity** | High |
| **Summary** | Admin manages disputes between guests and owners by reviewing evidence, making a ruling on refunds, and processing the decision. Both parties are notified. |
| **Primary Actor** | Admin |
| **Preconditions** | Admin is authenticated, Has dispute resolution permissions, Dispute submitted |
| **Main Sequence** | 1. Admin navigates to "Disputes"<br>2. System displays list of open disputes with priority<br>3. Admin selects a dispute<br>4. System displays dispute details, messages, evidence<br>5. Admin reviews booking details and evidence<br>6. Optionally, admin requests more information<br>7. Admin makes ruling: refund to guest, payment to owner, or split<br>8. Admin enters ruling justification<br>9. Admin confirms ruling<br>10. System processes refund (if applicable)<br>11. Both parties notified of decision |
| **Alternative Sequences** | **2a. No disputes:** System shows "No open disputes"<br>**6a. Evidence insufficient:** Admin selects "Request More Information", enters specific evidence needed, system notifies parties, admin waits for response<br>**7a. Escalate:** Admin flags for legal team review<br>**10a. Refund fails:** System logs for manual processing, notifies admin |
| **Business Rules** | SLA: Respond within 24h, resolve within 72h, Ruling options: full refund to guest, payment to owner, split refund |
| **NFR References** | NFR-M08: Audit logging, NFR-A05: 4h max recovery |
| **Post Conditions** | Dispute resolved, Refund processed, Parties notified, Analytics updated |

```mermaid
stateDiagram-v2
    [*] --> OpenDisputes: Admin views disputes
    OpenDisputes --> ReviewDispute: Select dispute
    ReviewDispute --> RequestInfo: Need more evidence
    RequestInfo --> ReviewDispute: Evidence received
    ReviewDispute --> MakeRuling: Ready to decide

    MakeRuling --> RefundGuest: Full refund to guest
    MakeRuling --> RefundOwner: Payment to owner
    MakeRuling --> SplitRefund: Split refund
    MakeRuling --> Escalate: Legal review needed

    RefundGuest --> NotifyParties: Decision sent
    RefundOwner --> NotifyParties
    SplitRefund --> NotifyParties
    Escalate --> LegalReview: External review

    NotifyParties --> Resolved: Dispute closed
    LegalReview --> Resolved
    Resolved --> [*]
```

---

## Admin Use Case Summary

| ID | Name | C1 (Useful) | C2 (Sequence) | C3 (Black Box) | Priority |
|----|------|-------------|---------------|----------------|----------|
| UC-A01 | Approve Property Listing | ✓ | ✓ | ✓ | High |
| UC-A02 | Suspend User Account | ✓ | ✓ | ✓ | Medium |
| UC-A03 | Configure Payment Gateway | ✓ | ✓ | ✓ | High |
| UC-A04 | View System Analytics | ✓ | ✓ | ✓ | Medium |
| UC-A05 | Resolve Dispute | ✓ | ✓ | ✓ | High |

**Total: 5 Use Cases**

---

## Complete Use Case Registry

| Category | Count | Use Cases |
|----------|-------|-----------|
| **Guest** | 6 | Search, View Details, Book, Cancel, Review, Wishlist |
| **Owner** | 5 | Register Property, Create Listing, Update Calendar, View Bookings, Analytics |
| **Admin** | 5 | Approve Listing, Suspend User, Configure Payments, Analytics, Resolve Dispute |
| **Grand Total** | **16** | |

---

## Outstanding Questions

No unresolved questions identified at this time. All use cases are fully specified with clear preconditions, postconditions, and alternative sequences.

---

**Document Version:** 1.0 (Revised)
**Last Updated:** 2026-01-25
**Methodology:** COMET