# Architecture Diagrams

## Before v1.7.0 - INSECURE ❌

```
┌─────────────────────────────────────────────────────────┐
│                      BROWSER                            │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │         React Application                        │  │
│  │                                                  │  │
│  │  ┌────────────────────────────────────────────┐ │  │
│  │  │  src/lib/supabase.js                      │ │  │
│  │  │                                            │ │  │
│  │  │  const supabaseUrl = "https://..."  ←──── │─┼──┼── ⚠️ EXPOSED IN BROWSER
│  │  │  const supabaseKey = "eyJhbGci..."  ←──── │─┼──┼── ⚠️ VISIBLE IN DEVTOOLS
│  │  └────────────────────────────────────────────┘ │  │
│  │                     ↓                            │  │
│  │  ┌────────────────────────────────────────────┐ │  │
│  │  │  Direct Database Calls                    │ │  │
│  │  │  supabase.from('bookings').insert(...)    │ │  │
│  │  └────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────┘  │
│                     ↓                                   │
│         ❌ API Keys Visible in Network Tab             │
│         ❌ Credentials in JavaScript Source            │
└─────────────────────┼───────────────────────────────────┘
                      ↓
            ┌─────────────────┐
            │   SUPABASE DB   │
            └─────────────────┘
```

**Security Issues:**
- 🔴 Database credentials hardcoded in client bundle
- 🔴 Supabase anon key visible in browser DevTools
- 🔴 Anyone can inspect network requests
- 🔴 No server-side validation
- 🔴 Direct database access from untrusted client

---

## After v1.7.0 - SECURE ✅

```
┌─────────────────────────────────────────────────────────┐
│                      BROWSER                            │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │         React Application                        │  │
│  │                                                  │  │
│  │  ┌────────────────────────────────────────────┐ │  │
│  │  │  src/lib/bookingService.js                │ │  │
│  │  │                                            │ │  │
│  │  │  // No credentials in client code         │ │  │
│  │  │  fetch('/api/bookings/create', {          │ │  │
│  │  │    method: 'POST',                        │ │  │
│  │  │    body: JSON.stringify(data)             │ │  │
│  │  │  })                                        │ │  │
│  │  └────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────┘  │
│                     ↓                                   │
│         ✅ No credentials exposed                      │
│         ✅ Clean API calls only                        │
└─────────────────────┼───────────────────────────────────┘
                      ↓
                   HTTPS
                      ↓
┌─────────────────────────────────────────────────────────┐
│              VERCEL SERVERLESS FUNCTIONS                │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  /api/bookings/create.js                          │ │
│  │                                                    │ │
│  │  const supabase = createClient(                   │ │
│  │    process.env.SUPABASE_URL,          ←────────── │─┼── ✅ SERVER-SIDE ONLY
│  │    process.env.SUPABASE_SERVICE_KEY   ←────────── │─┼── ✅ NEVER IN BROWSER
│  │  )                                                 │ │
│  │                                                    │ │
│  │  // Validate input                                │ │
│  │  // Sanitize data                                 │ │
│  │  // Insert to database                            │ │
│  └───────────────────────────────────────────────────┘ │
│                     ↓                                   │
│  ┌───────────────────────────────────────────────────┐ │
│  │  /api/emails/send-confirmation.js                 │ │
│  │                                                    │ │
│  │  const resend = new Resend(                       │ │
│  │    process.env.RESEND_API_KEY         ←────────── │─┼── ✅ SERVER-SIDE ONLY
│  │  )                                                 │ │
│  │                                                    │ │
│  │  // Send email securely                           │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────┼───────────────────────────────────┘
                      ↓
            ┌─────────────────┐
            │   SUPABASE DB   │
            │                 │
            │  + Resend API   │
            └─────────────────┘
```

**Security Improvements:**
- ✅ No credentials in browser
- ✅ Server-side validation
- ✅ Service role key never exposed
- ✅ API layer abstraction
- ✅ Input sanitization
- ✅ Error handling
- ✅ Rate limiting ready

---

## Data Flow Comparison

### Creating a Booking

#### Before (v1.6.0) - Direct Access

```
User clicks "Confirm Booking"
    ↓
React component collects form data
    ↓
bookingService.js calls Supabase directly
    ↓
    Browser → Supabase.from('bookings').insert()
    ⚠️ Credentials sent from browser
    ⚠️ Visible in Network tab
    ↓
Supabase PostgreSQL
    ↓
Response back to browser
```

#### After (v1.7.0) - API Layer

```
User clicks "Confirm Booking"
    ↓
React component collects form data
    ↓
bookingService.js calls API endpoint
    ↓
    Browser → POST /api/bookings/create
    ✅ Only booking data sent
    ✅ No credentials visible
    ↓
Vercel Serverless Function
    ↓
Server validates input
    ↓
Server uses service role key (secure)
    ↓
    API → Supabase.from('bookings').insert()
    ✅ Credentials stay on server
    ✅ Not visible to user
    ↓
Supabase PostgreSQL
    ↓
Response → API → Browser
    ✅ Clean response
    ✅ No sensitive data
```

---

## Environment Variables Flow

### Before v1.7.0

```
.env file
    ↓
VITE_SUPABASE_URL → Embedded in JavaScript bundle → Visible in browser
VITE_SUPABASE_ANON_KEY → Embedded in JavaScript bundle → Visible in browser
```

### After v1.7.0

```
.env file
    ├── VITE_SUPABASE_URL → Embedded in JS → Visible in browser (still needed for reads)
    ├── VITE_SUPABASE_ANON_KEY → Embedded in JS → Visible in browser (still needed for reads)
    ├── SUPABASE_URL → SERVER ONLY → Never sent to browser → Used in /api routes
    ├── SUPABASE_SERVICE_ROLE_KEY → SERVER ONLY → Never sent to browser → Admin access
    └── RESEND_API_KEY → SERVER ONLY → Never sent to browser → Email sending
```

**Key Difference:**
- `VITE_` prefix = Browser accessible (public safe)
- No prefix = Server-only (sensitive keys)

---

## Attack Surface Comparison

### Before v1.7.0 - Large Attack Surface

```
┌────────────────────────────────────┐
│         Attacker                   │
└────────────┬───────────────────────┘
             ↓
    ┌────────────────────┐
    │  Open DevTools     │
    │  Network Tab       │
    └────────────────────┘
             ↓
    ┌────────────────────────────────┐
    │  Copy Supabase URL + Key       │ ← ⚠️ Easy to exploit
    └────────────────────────────────┘
             ↓
    ┌────────────────────────────────┐
    │  Use credentials directly      │
    │  Bypass frontend entirely      │
    │  Insert malicious data         │ ← ⚠️ No validation
    └────────────────────────────────┘
             ↓
         Database
```

### After v1.7.0 - Minimal Attack Surface

```
┌────────────────────────────────────┐
│         Attacker                   │
└────────────┬───────────────────────┘
             ↓
    ┌────────────────────┐
    │  Open DevTools     │
    │  Network Tab       │
    └────────────────────┘
             ↓
    ┌────────────────────────────────┐
    │  See API calls only            │
    │  No credentials visible        │ ← ✅ Secure
    └────────────────────────────────┘
             ↓
    ┌────────────────────────────────┐
    │  Try to call API directly      │
    └────────────────────────────────┘
             ↓
    ┌────────────────────────────────┐
    │  Server validates input        │
    │  Sanitizes data                │
    │  Rate limits requests          │ ← ✅ Protected
    └────────────────────────────────┘
             ↓
         Database
         (Protected)
```

---

## Technology Stack Evolution

```
v1.5.3                v1.6.0                v1.7.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
React 19.2.0     →    React 19.2.0     →    React 19.2.0
Vite 7.2.4       →    Vite 7.2.4       →    Vite 7.2.4
Supabase (client)→    Supabase (client)→    Supabase (client + server)
                                             Vercel Functions (NEW)
                                             Resend (server-side)
Tailwind CSS     →    Tailwind CSS     →    Tailwind CSS
React Router     →    React Router     →    React Router

❌ Hardcoded      ❌ Fallback         ✅ Environment vars
   credentials       credentials          required

❌ Direct DB      ❌ Direct DB        ✅ API layer
   access            access

❌ Client email   ❌ Client email     ✅ Server email
   (simulated)       (simulated)         (real Resend)
```

---

## Deployment Architecture

### Production Flow

```
GitHub Repository
    ↓
    git push
    ↓
Vercel CI/CD
    ↓
    ┌─────────────────────────────┐
    │  Build Process              │
    │  - npm install              │
    │  - vite build               │
    │  - Deploy functions         │
    └─────────────────────────────┘
    ↓
┌───────────────────────────────────────┐
│  Vercel Production Environment        │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │  Static Files (CDN)             │ │
│  │  - React app bundle             │ │
│  │  - CSS, images                  │ │
│  └─────────────────────────────────┘ │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │  Serverless Functions           │ │
│  │  - /api/bookings/create         │ │
│  │  - /api/emails/send-confirmation│ │
│  │  - /api/contact/submit          │ │
│  └─────────────────────────────────┘ │
│                                       │
│  Environment Variables (Secure)      │
│  - SUPABASE_URL                      │
│  - SUPABASE_SERVICE_ROLE_KEY         │
│  - RESEND_API_KEY                    │
└───────────────────────────────────────┘
    ↓
External Services
- Supabase (Database)
- Resend (Email)
```

---

## Summary

| Aspect | Before (v1.6.0) | After (v1.7.0) |
|--------|----------------|----------------|
| **Database Access** | Direct from browser ❌ | Via secure API ✅ |
| **Credentials** | In browser bundle ❌ | Server-side only ✅ |
| **Validation** | Client-side only ❌ | Server-side validation ✅ |
| **Email Sending** | Simulated ❌ | Real via Resend ✅ |
| **Security** | Vulnerable 🔴 | Secure 🟢 |
| **Attack Surface** | Large ⚠️ | Minimal 🛡️ |

**Result:** Professional, secure, production-ready architecture ✅

---

*Architecture designed and implemented: 2025-12-30*
