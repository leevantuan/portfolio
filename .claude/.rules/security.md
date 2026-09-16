# Security Rules

Security has two strictly separate responsibilities:

- **(A) System Security** — how the system MUST be designed and implemented securely.
- **(B) Existing Config/Secret Protection** — what the Agent MUST and MUST NOT do with existing configuration and secrets.

> **Critical Agent Rule:** If a bug fix or feature touches, exposes, weakens, or depends on security, the Agent MUST identify and report the security impact. If the requested change is security-sensitive and was not explicitly authorized, the Agent MUST STOP and ask before implementing it.

---

# A. System Must Be Secure

These rules apply to new code, bug fixes, features, refactoring, APIs, database changes, deployment and infrastructure changes, and explicitly requested security fixes.

## A1. Security Change Gate

Before implementation:

```text
AUDIT
  ↓
LOAD RELEVANT RULES + SKILLS
  ↓
SECURITY IMPACT CHECK
  ↓
ROOT CAUSE / RISK
  ↓
FIX / IMPLEMENTATION PLAN
  ↓
SECOND-PASS REVIEW
  ↓
SECURITY GATE
  ↓
IMPLEMENT
  ↓
SECURITY TEST
  ↓
REGRESSION TEST
  ↓
FINAL QA
```

If security impact is found, do not silently bypass the rule.

## A2. CORS

- Whitelist specific trusted domains.
- Never use `AllowAnyOrigin()`.
- Never use `SetIsOriginAllowed(_ => true)`.
- Never combine unrestricted origins with `AllowCredentials()`.
- Development must still use controlled origins.
- Review every new frontend origin.

## A3. JWT / Authentication

JWT validation MUST include:

- `ValidateIssuer`
- `ValidateAudience`
- `ValidateLifetime`
- `ValidateIssuerSigningKey`

Also:

- Never leave security validation disabled with a production TODO.
- Use short-lived access tokens where appropriate.
- Protect and revoke refresh tokens where applicable.
- Never log tokens or passwords.
- Never put tokens in URLs.
- Protect login, registration and recovery flows against brute force.
- Never store plaintext passwords.
- Use approved password hashing.

## A4. Authorization

- Verify authorization at endpoint, function and object level.
- Do not rely only on route groups.
- Review every `.AllowAnonymous()`.
- Prevent ID-based access to another user's resources.
- Verify admin/privileged operations.
- Verify ownership/tenant/device permissions where applicable.
- Default to deny when authorization is ambiguous.

## A5. EF Core / ORM

- Never enable `EnableSensitiveDataLogging()` unconditionally.
- Never enable `EnableDetailedErrors()` unconditionally.
- Do not expose sensitive EF diagnostics in production.
- Do not use `UseLazyLoadingProxies()` where it hides N+1/performance problems.
- Use explicit loading/projection where appropriate.
- Apply pagination and query limits.
- Use query timeouts.
- Use least-privilege database accounts.

## A6. SQL Injection / Raw SQL

- Always parameterize user-controlled values.
- Never interpolate untrusted input into SQL.
- Never pass raw search/filter values directly into `FromSqlRaw`.
- Dynamic column names must be allowlisted.
- Dynamic sort directions must be validated.
- Never construct SQL from arbitrary user input.

## A7. Swagger / Debug / Diagnostics

- Swagger should be Development-only unless production exposure is explicitly secured.
- Never expose debug endpoints publicly by default.
- Diagnostics require appropriate authorization.
- Seed/reset/test endpoints must not be public accidentally.
- Never expose stack traces, SQL details or internal paths to clients.

## A8. Secrets At Rest

- Sensitive recoverable credentials such as device passwords must be encrypted before DB storage.
- Use ASP.NET Data Protection or an appropriate secure encryption mechanism.
- Protect encryption keys separately.
- Never log decrypted secrets.
- Never return secrets through normal API responses unless explicitly required.

## A9. Logging / PII

Never log:

- passwords
- API keys
- access/refresh tokens
- connection strings
- device credentials
- encryption keys
- raw biometric data
- unnecessary sensitive PII

Log field/state instead of the value.

## A10. Rate Limiting / Brute Force

Apply rate limits to:

- login
- registration
- password reset
- OTP/email verification
- seed operations
- uploads
- biometric uploads
- expensive reports
- import/export
- notification sending
- expensive searches
- external API proxy endpoints

Use appropriate combinations of IP/account/endpoint limits, concurrency limits, quotas, backoff, lockout and challenges where justified.

Do not rely only on IP.

## A11. DDoS / Resource Exhaustion

Application rate limiting is NOT equivalent to DDoS protection.

For Internet-facing production systems, use defense in depth:

```text
Internet
   ↓
CDN / DDoS Protection
   ↓
WAF
   ↓
Reverse Proxy / Load Balancer
   ↓
Application Rate Limit
   ↓
Application
   ↓
Database / Internal Services
```

Protect against exhaustion of:

- CPU
- memory
- database connections
- storage
- bandwidth
- background jobs
- external API quotas
- file uploads
- expensive queries
- report/export generation

Use:

- request/body/upload size limits
- connection limits
- concurrency limits
- query timeouts
- pagination
- job quotas
- CPU/memory limits
- firewall/network restrictions

If infrastructure-level DDoS protection is missing, report it as a production security risk; do not claim application code alone solves DDoS.

## A12. Spam / Bot / Abuse

Protect abuse-prone flows:

- login
- registration
- comments/posts
- contact forms
- password reset
- OTP
- uploads
- imports/exports
- notifications
- expensive searches/reports

Possible controls:

- rate limiting
- quotas
- duplicate detection
- idempotency keys
- backoff
- account/device/session throttling
- temporary lockout
- CAPTCHA/challenge when justified

## A13. HTTPS / TLS

- HTTPS is mandatory for sensitive production traffic.
- Prefer modern TLS.
- Disable obsolete TLS versions.
- Never disable certificate validation.
- Never accept invalid/expired/mismatched certificates in production.
- Configure trusted reverse proxies explicitly.
- Protect sensitive service-to-service traffic.
- Consider mTLS for high-trust internal services where appropriate.
- Never put secrets in URLs/query strings.

## A14. MITM / Sniffing Protection

Assume network traffic can be observed or modified.

- Use TLS for sensitive traffic.
- Never send credentials over HTTP.
- Validate server identity/certificates.
- Do not blindly trust `Host`, `Forwarded` or `X-Forwarded-*`.
- Configure trusted proxy addresses.
- Do not expose internal services directly to the Internet.
- Avoid sensitive information in URLs.

## A15. CSRF

For cookie-authenticated applications:

- Protect state-changing requests against CSRF.
- Do not use GET for state-changing operations.
- Use framework-supported CSRF protection.
- Validate Origin/Fetch Metadata where appropriate.
- Configure `SameSite` correctly.

## A16. XSS / Browser Security

- Prefer framework output encoding.
- Never inject untrusted HTML directly.
- Sanitize intentionally rendered HTML.
- Review raw/unsafe HTML rendering.
- Avoid unnecessary dynamic code execution.
- Use Content Security Policy where practical.
- Protect against clickjacking using CSP `frame-ancestors` or equivalent.

## A17. Security Headers

Evaluate appropriate production headers:

- `Strict-Transport-Security`
- `Content-Security-Policy`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`

Do not blindly copy a configuration without checking compatibility.

## A18. SSRF

Any server-side request based on user-controlled URLs is SSRF-sensitive.

Examples:

- webhook
- image fetch
- URL import
- download
- proxy
- device connection
- external API integration

Rules:

- Do not fetch arbitrary URLs.
- Validate schemes.
- Prefer host/domain allowlists.
- Block localhost/private/link-local ranges unless explicitly required.
- Block cloud metadata endpoints.
- Consider DNS rebinding.
- Restrict outbound network access.
- Apply connection and response-size limits.

## A19. File Upload

- Validate size.
- Validate extension and MIME type.
- Inspect file signature where appropriate.
- Generate server-side filenames.
- Prevent path traversal.
- Never use user filename directly as a storage path.
- Store uploads outside executable web roots.
- Disable execution of uploaded files.
- Scan files where appropriate.
- Apply quotas.

## A20. Path Traversal

- Never concatenate untrusted path components directly.
- Normalize and validate paths.
- Ensure resolved paths remain inside the intended directory.
- Block traversal and encoded traversal.
- Never expose arbitrary server files.
- Do not reveal internal filesystem paths.

## A21. Database / Internal Network

- Database ports must not be public by default.
- Prefer private networking.
- Use least-privilege DB accounts.
- Never use DB administrator/root accounts for normal application access.
- Encrypt DB connections where required.
- Validate DB certificates.
- Restrict DB network access.
- Limit connection pools.
- Apply query timeouts.

## A22. API Security

Review every API for:

- authentication
- authorization
- object-level authorization
- function-level authorization
- input validation
- output exposure
- rate limiting
- pagination
- resource limits
- error handling
- sensitive-data exposure
- endpoint inventory

Return only required fields; do not expose database models blindly.

## A23. Error Handling

Production responses must not reveal:

- stack traces
- SQL
- connection strings
- internal paths
- credentials
- tokens
- infrastructure details

Keep useful diagnostics in protected logs.

## A24. Dependency / Supply Chain

- Keep dependencies patched.
- Review vulnerability reports.
- Review third-party packages before adoption.
- Avoid unnecessary dependencies.
- Protect CI/CD credentials.
- Use least-privilege CI/CD permissions.
- Never expose secrets in build logs.
- Scan container images where applicable.
- Do not execute untrusted build scripts.

## A25. Docker / Container

Production containers should:

- run non-root where possible
- use minimal images
- avoid unnecessary packages
- avoid privileged mode
- avoid host networking unless required
- avoid Docker socket mounts unless explicitly required
- use read-only filesystem where practical
- drop unnecessary capabilities
- apply CPU/memory limits
- never bake secrets into images
- never put secrets in Dockerfiles
- scan images for vulnerabilities

## A26. Monitoring / Detection

Monitor where applicable:

- failed-login spikes
- brute-force attempts
- rate-limit violations
- suspicious IP activity
- abnormal request volume
- upload abuse
- repeated password resets
- authorization failures
- admin access
- 4xx/5xx spikes
- DB connection exhaustion
- CPU/memory exhaustion
- unusual outbound traffic
- WAF/DDoS events

Never expose secrets in security logs.

## A27. Backup / Recovery

- Protect backups.
- Encrypt sensitive backups.
- Protect backup credentials.
- Test restoration.
- Do not allow normal application users to arbitrarily delete production backups.
- Treat backup storage as sensitive data.

## A28. Production Exposure

Before publishing:

- no debug mode
- no unsecured Swagger
- no public diagnostics
- no public seed/reset endpoints
- no public admin endpoints
- no public DB
- no unnecessary ports
- no development credentials
- no default passwords
- no privileged test accounts
- no test/mock endpoints accidentally enabled
- no development CORS policy
- no internal services directly exposed

---

# B. Agent MUST NOT Modify Existing Config/Secrets

This is an **absolute Agent behavior rule**.

It applies even when the Agent believes the configuration is insecure, outdated, dangerous, incorrectly formatted or "obviously wrong".

## B1. Never Automatically Modify Existing Secrets

Without explicit user approval for that specific change, the Agent MUST NOT:

- delete
- empty
- overwrite
- restore
- sanitize
- replace
- encrypt/transform
- decrypt
- move
- migrate to environment variables
- migrate to User Secrets
- migrate to a secret provider
- rotate
- rename keys
- reformat a config file containing real values
- replace a real config with an Example config

Even if the change appears safer.

## B2. Never Restore Example Config Over Real Config

Never:

```text
appsettings.Example.json
        ↓
overwrite
        ↓
appsettings.json
```

Also never restore/reset/checkout an older config version without explicit approval.

## B3. Existing Tracked Secrets

If a real secret is found:

**DO NOT** delete, mask, replace, rotate, print, copy, or expose it.

Report only:

```text
File:
Key:
Status: Configured / Missing
Risk:
Recommended remediation:
Requires user approval: YES
```

Never include the secret value.

## B4. Existing Credential Does Not Mean Permission To Use It

Existing credentials do not authorize real-world access.

Examples:

- DingTalk API
- Hikvision/ZKTeco devices
- production DB
- production notification channels
- external SaaS/API
- internal infrastructure

Default:

```text
Existing credential
      ↓
DO NOT USE
      ↓
Mock / isolated test
```

Use a real credential only when the user explicitly requests a real integration test for that specific task.

---

# C. Security-Aware Bug Fix / Feature Implementation

When `/bug-fix` or `/feature-implementation` touches security:

```text
REQUEST
   ↓
AUDIT
   ↓
LOAD RULES + SKILLS
   ↓
SECURITY IMPACT CHECK
   ↓
ROOT CAUSE / IMPACT
   ↓
WRITE FIX / IMPLEMENTATION PLAN
   ↓
SECOND-PASS REVIEW
   ↓
SECURITY GATE
   ↓
IMPLEMENT
   ↓
SECURITY TEST
   ↓
REGRESSION TEST
   ↓
FINAL QA
```

## C1. Mandatory Stop / Ask Conditions

The Agent MUST report and ask before implementation if the task involves:

- weakening authentication
- weakening authorization
- making an endpoint public
- changing CORS
- changing JWT validation
- disabling TLS/certificate validation
- changing existing secrets
- changing production credentials
- exposing diagnostics
- exposing Swagger
- changing firewall/network exposure
- exposing DB ports
- disabling rate limits
- changing encryption
- changing security headers
- changing password/security policies
- using real production credentials

If the user has explicitly requested the security change, the Agent may proceed through the security review and implementation workflow.

## C2. Security Impact Report

Use:

```text
SECURITY IMPACT DETECTED

Area:
Current behavior:
Requested change:
Security risk:
Recommended approach:
User approval required:
```

Do not expose secret values.

---

# D. Security Audit Output

Classify findings:

```text
CRITICAL
HIGH
MEDIUM
LOW
INFO
```

Each finding:

```text
ID:
Severity:
Category:
Location:
Current behavior:
Evidence:
Security impact:
Recommended remediation:
Can Agent auto-fix? YES / NO
User approval required? YES / NO
```

Never include secret values.

---

# E. Security Release Gate

## Network

- [ ] HTTPS
- [ ] TLS reviewed
- [ ] HSTS evaluated
- [ ] Firewall configured
- [ ] Only required ports exposed
- [ ] DB not publicly exposed
- [ ] Reverse proxy configured
- [ ] WAF/CDN evaluated
- [ ] DDoS protection evaluated

## Authentication

- [ ] JWT validation complete
- [ ] Password hashing secure
- [ ] Token/session security reviewed
- [ ] Brute-force protection
- [ ] Password reset protection
- [ ] MFA evaluated where required

## Authorization

- [ ] Route authorization
- [ ] Object-level authorization
- [ ] Function-level authorization
- [ ] Admin protection
- [ ] No accidental `.AllowAnonymous()`

## Application

- [ ] Input validation
- [ ] SQL injection protection
- [ ] XSS protection
- [ ] CSRF protection where applicable
- [ ] SSRF protection
- [ ] File upload protection
- [ ] Path traversal protection
- [ ] Rate limiting
- [ ] Resource limits
- [ ] Safe error handling

## Data

- [ ] Encryption in transit
- [ ] Encryption at rest where required
- [ ] Secrets protected
- [ ] No secrets in logs
- [ ] Least-privilege DB access
- [ ] Sensitive API responses minimized

## Infrastructure

- [ ] Container hardening
- [ ] Dependency review
- [ ] Image vulnerability scan
- [ ] CI/CD secrets protected
- [ ] Backup/recovery reviewed
- [ ] Security monitoring

## Production Exposure

- [ ] Swagger/debug reviewed
- [ ] Diagnostics protected
- [ ] Seed/reset protected
- [ ] Internal endpoints not public
- [ ] Test endpoints disabled
- [ ] Default credentials removed
- [ ] Public API inventory reviewed

---

# F. Final Security Decision

The Agent MUST NOT report `SECURITY PASS` merely because the code compiles or tests pass.

`SECURITY PASS` requires:

- applicable security rules reviewed
- security-sensitive changes approved where required
- no known security regression introduced
- security tests/checks pass
- production exposure reviewed where applicable

If unresolved:

```text
SECURITY BLOCKED
```

with the exact reason and required user decision.

---

# G. Reference Rule

When a known project contains a verified secure implementation pattern, use that project as the reference for how the rule should look in real code.

**Face** is the current reference for the corrected security pattern.

Do not use **ZKTime** as the reference implementation merely because its documentation claims a control exists; its actual code may not implement the rule correctly.

---

# H. Core Principle

Security is not a final step added after implementation.

```text
Security
   ↓
Research
   ↓
Plan
   ↓
Review
   ↓
Implement
   ↓
Test
   ↓
QA
   ↓
Production
```

**If a security rule conflicts with "just make it work", security wins.**

**If an existing real secret/config must be changed, the Agent must ask first unless the user explicitly authorized that exact security/configuration change.**
