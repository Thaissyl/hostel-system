# UC-A05: Handle Disputes

| Field | Description |
|-------|-------------|
| **Use Case Name** | Handle Disputes |
| **Created By** | Product Team |
| **Created Date** | 2026-01-25 |
| **Last Updated By** | Product Team |
| **Last Updated Date** | 2026-01-25 |
| **Summary** | Admin manages disputes between guests and owners, reviews evidence, makes rulings, and processes refunds if necessary. |
| **Dependency** | Dispute submitted by guest or owner |
| **Actors** | Primary: Admin<br>Secondary: Guest, Owner |
| **Preconditions** | Admin authenticated. Has dispute resolution permissions. Dispute submitted. |
| **Trigger** | Admin navigates to "Disputes" and selects a dispute |
| **Main Sequence** | 1. Admin navigates to "Disputes"<br>2. System displays list of open disputes with priority markers<br>3. Admin selects a dispute<br>4. System displays dispute details, messages, evidence<br>5. Admin reviews booking details, messages, evidence<br>6. Admin may request additional information<br>7. Admin makes ruling: refund guest, refund owner, or split<br>8. System processes refund according to ruling<br>9. System notifies both parties of decision |
| **Alternative Sequences** | Step 2: If no open disputes, System displays "No open disputes"<br>Step 5: If evidence insufficient, System requests more info from parties<br>Step 6: If escalation needed, System flags for legal team review<br>Step 7: If split refund, System calculates partial amounts<br>Step 8: If refund fails, System logs for manual processing |
| **Postconditions** | Dispute resolved. Refund processed. Parties notified. Analytics updated. |
| **Nonfunctional Requirements** | Dispute SLA: respond within 24h, resolve within 72h. Evidence file upload support. Secure messaging. Decision audit trail. |
| **Business Requirements** | BR-033: Dispute response within 24 hours<br>BR-034: Resolution within 72 hours<br>BR-035: All decisions must be auditable |
| **Frequency of Use** | Low |
| **Priority** | High |
| **Outstanding Questions** | Appeal process? Partial refund calculations? Dispute categories? |

---

## Sequence Diagram

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

## Black Box Compliance

✅ **COMPLIANT** - All steps describe external interactions only.