# UC-A03: Configure Payments - Object Structuring

**Use Case:** Configure Payments
**Date:** 2026-01-26

---

## 5-Step Workflow Analysis

### Step 1: Boundary Objects (Input)
- Actor: Admin
- Phase 1 External Class: `«external user» Admin`, `«external system» PolarGateway`
- **Boundary Objects:**
  - `«user interaction» PaymentConfigInteraction` (admin interface)
  - `«proxy» PolarProxy` (Polar gateway communication)

---

### Step 2: Entity Objects (Data)
From use case: "System validates and saves configuration"
- **Entity Objects:** None (configuration data, not entities - stored in system settings)

---

### Step 3: Boundary Objects (Output)
- "System validates and saves configuration", "System displays configured payment gateways"
- **Reuse:** `PaymentConfigInteraction` (bidirectional)

---

### Step 4: Control Objects
**State-dependent:** Configuration states (displaying gateways, configuring, testing, saving, error)
- **Control Object:** `«state-dependent control» PaymentConfigControl`
- **Phase 4 Flag:** ⚠️ Requires statechart

---

### Step 5: Application Logic
**Identified Logic:** API credential validation, connection testing, encrypted credential storage, configuration audit logging, test transaction
- **Application Logic Objects:**
  - `«business logic» CredentialValidator` (API key format validation)
  - `«service» ConnectionTester` (gateway connectivity test)
  - `«service» SecureStorage` (encrypted credential storage)
  - `«service» ConfigAuditLogger` (configuration change audit)

---

## Object Summary

| Type | Object | Stereotype | Notes |
|------|--------|------------|-------|
| Boundary | PaymentConfigInteraction | «user interaction» | Admin config UI |
| Boundary | PolarProxy | «proxy» | Polar gateway |
| Control | PaymentConfigControl | «state-dependent control» | ⚠️ Flag for Phase 4 |
| Logic | CredentialValidator | «business logic» | API validation |
| Logic | ConnectionTester | «service» | Connectivity test |
| Logic | SecureStorage | «service» | Encrypted storage |
| Logic | ConfigAuditLogger | «service» | BR-030 |

---

## Phase 4 Statechart Required

**Control Object:** `PaymentConfigControl`

**States:** Idle, Displaying Gateways, Selecting Gateway, Entering Credentials, Configuring Webhooks, Testing Connection, Saving, Error

**Events:** View Payment Settings, Select Gateway, Enter API Credentials, Configure Webhooks, Test Connection, Save Configuration

---

## Notes

- BR-029: Payment credentials must be encrypted
- BR-030: Configuration changes require audit log
- Connection test before save
- Test mode support
- Credential rotation support
- Platform commission rate (%)
