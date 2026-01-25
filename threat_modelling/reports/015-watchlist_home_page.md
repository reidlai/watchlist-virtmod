# Threat Model: Watchlist Home Page

**Feature**: Watchlist Home Page Data Table
**Date**: 2026-01-25

## Assets
- Use Ticker Data (Price, Volume, etc.)
- Watchlist Configuration (List of tracked symbols)

## Threats
- **Spoofing**: Malicious service emitting fake ticker data.
  - *Mitigation*: Verify TLS connection to backend; validation schema in RxJS service (Zod).
- **Tampering**: Modification of ticker data in transit.
  - *Mitigation*: HTTPS/TLS.
- **Information Disclosure**: Leaking watchlist contents to unauthorized users.
  - *Mitigation*: Backend authentication/authorization (out of scope for frontend widget, but assumed).
- **Denial of Service**: flood of socket updates crashing the browser.
  - *Mitigation*: RxJS `throttleTime` or `auditTime` in the service layer (as per Service definition). `max-h` scrolling limits rendering impact.

## Security Controls
- Standard ShadCN components (accessible, no unsafe HTML injection).
- Svelte automatic escaping.
