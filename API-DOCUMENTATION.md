# API Documentation - Elite Detailing Website

## Overview

The Elite Detailing website uses **serverless API routes** hosted on Vercel to handle all backend operations securely. This architecture ensures that sensitive operations (database access, email sending) never expose API keys or credentials to the browser.

---

## Architecture

```
Browser (Client)
    ↓
    → Fetch API calls to /api/* endpoints
    ↓
Vercel Serverless Functions (/api directory)
    ↓
    → Supabase (PostgreSQL database)
    → Resend (Email service)
    ↓
Response back to Browser
```

### Key Security Features

✅ **No direct database access from browser** - All Supabase operations go through server-side API
✅ **Service role key never exposed** - Only server functions access sensitive credentials
✅ **Server-side validation** - All input validated before database insertion
✅ **CORS protection** - Can be configured for specific domain only
✅ **Rate limiting ready** - Can be added at API route level

---

## API Endpoints

### 1. Create Booking

**Endpoint:** `POST /api/bookings/create`

**Purpose:** Create a new booking in the database

**Request Body:**
```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "603-275-7513",
  "package_name": "Premium Detail",
  "service_category": "auto",
  "vehicle_size": "sedan",
  "appointment_date": "2025-12-15",
  "appointment_time": "10:00 AM",
  "total_price": 350,
  "vehicle_info": "2023 Tesla Model S, Black",
  "addons": [
    { "name": "Ceramic Coating", "price": 150 }
  ]
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "customer_name": "John Doe",
    "appointment_date": "2025-12-15",
    "appointment_time": "10:00 AM",
    "total_price": 350
  },
  "message": "Booking created successfully"
}
```

**Response (Error - 400/500):**
```json
{
  "success": false,
  "error": "Missing required fields: customer_email"
}
```

**Validation Rules:**
- Email must be valid format
- Phone must contain only digits, spaces, hyphens, parentheses
- Total price must be a positive number
- All required fields must be present

---

### 2. Send Confirmation Email

**Endpoint:** `POST /api/emails/send-confirmation`

**Purpose:** Send booking confirmation email to customer

**Request Body:**
```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "package_name": "Premium Detail",
  "service_category": "auto",
  "vehicle_size": "sedan",
  "appointment_date": "2025-12-15",
  "appointment_time": "10:00 AM",
  "total_price": 350,
  "vehicle_info": "2023 Tesla Model S, Black",
  "addons": [
    { "name": "Ceramic Coating", "price": 150 }
  ]
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "emailId": "resend-email-id-here"
  },
  "message": "Confirmation email sent successfully"
}
```

**Response (Demo Mode - 200):**
```json
{
  "success": true,
  "demo": true,
  "message": "Email service not configured. Booking confirmed but no email sent."
}
```

**Response (Error - 500):**
```json
{
  "success": false,
  "error": "Failed to send confirmation email",
  "details": "API key not configured"
}
```

---

### 3. Submit Contact Form

**Endpoint:** `POST /api/contact/submit`

**Purpose:** Submit contact form inquiry

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "603-275-7513",
  "message": "I'm interested in detailing services for my private jet. Can you provide more information?"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "name": "John Doe"
  },
  "message": "Thank you for your message! We will get back to you soon."
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "error": "Message is too short. Please provide more details."
}
```

**Validation Rules:**
- Name, email, and message are required
- Email must be valid format
- Message must be 10-5000 characters
- Phone is optional

---

### 4. Get Booking (Planned)

**Endpoint:** `GET /api/bookings/get?id={bookingId}`

**Purpose:** Retrieve booking by ID

**Status:** Not yet implemented

---

### 5. Get Customer Bookings (Planned)

**Endpoint:** `GET /api/bookings/get?email={customerEmail}`

**Purpose:** Retrieve all bookings for a customer

**Status:** Not yet implemented

---

### 6. Update Booking (Planned)

**Endpoint:** `PUT /api/bookings/update`

**Purpose:** Update booking status or details

**Status:** Not yet implemented

---

### 7. Get Availability (Planned)

**Endpoint:** `GET /api/bookings/availability?date={YYYY-MM-DD}`

**Purpose:** Get available time slots for a specific date

**Status:** Not yet implemented

---

## Environment Variables

### Client-Side (Browser)
These are exposed to the browser (safe for public keys only):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### Server-Side (API Routes Only)
These are NEVER exposed to the browser:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_your-resend-key
```

**CRITICAL:** Service role key and Resend API key must ONLY be in server-side environment variables.

---

## Local Development Setup

1. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

2. **Add your credentials:**
   Edit `.env` with your actual Supabase and Resend keys

3. **Test API routes locally:**
   ```bash
   npm run dev
   ```

   API routes available at:
   - `http://localhost:5173/api/bookings/create`
   - `http://localhost:5173/api/emails/send-confirmation`
   - `http://localhost:5173/api/contact/submit`

4. **Test with curl:**
   ```bash
   curl -X POST http://localhost:5173/api/bookings/create \
     -H "Content-Type: application/json" \
     -d '{
       "customer_name": "Test User",
       "customer_email": "test@example.com",
       "customer_phone": "555-0123",
       "package_name": "Basic Detail",
       "service_category": "auto",
       "vehicle_size": "sedan",
       "appointment_date": "2025-12-20",
       "appointment_time": "10:00 AM",
       "total_price": 150
     }'
   ```

---

## Production Deployment (Vercel)

### 1. Set Environment Variables in Vercel

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add the following variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | Your anon key | Production, Preview, Development |
| `SUPABASE_URL` | `https://your-project.supabase.co` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key | Production, Preview, Development |
| `RESEND_API_KEY` | `re_your_key` | Production, Preview, Development |

### 2. Deploy

```bash
git push
```

Vercel will automatically deploy with environment variables configured.

### 3. Verify

Test your production API:
```bash
curl -X POST https://your-domain.vercel.app/api/bookings/create \
  -H "Content-Type: application/json" \
  -d '{ ... }'
```

---

## Error Handling

All API endpoints follow consistent error response format:

```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

### Common HTTP Status Codes

- `200` - Success
- `400` - Bad Request (validation error)
- `405` - Method Not Allowed (e.g., GET on POST-only endpoint)
- `500` - Internal Server Error

---

## Security Best Practices

### ✅ Implemented

1. **Server-side validation** - All input validated before database operations
2. **No credentials in client** - API keys never exposed to browser
3. **CORS headers** - Cross-origin requests handled
4. **Error logging** - Server-side console logs for debugging

### 🔄 Recommended Additions

1. **Rate limiting** - Add rate limiter middleware to prevent abuse
2. **Authentication** - Add API key or JWT authentication for admin endpoints
3. **Input sanitization** - Add SQL injection prevention (Supabase has built-in protection)
4. **Request validation** - Use Zod or similar library for schema validation
5. **Domain-specific CORS** - Lock CORS to your production domain only

### Example Rate Limiting

```javascript
// Add to API route
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many requests, please try again later.'
});

export default limiter(async function handler(req, res) {
  // Your API logic
});
```

---

## Database Schema

### `bookings` Table

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  package_name VARCHAR(255) NOT NULL,
  service_category VARCHAR(50) NOT NULL,
  vehicle_size VARCHAR(50) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time VARCHAR(20) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  vehicle_info TEXT,
  addons JSONB DEFAULT '[]',
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### `contact_submissions` Table (Optional)

```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Testing

### Manual Testing Checklist

- [ ] Create booking with valid data
- [ ] Create booking with missing fields (should fail)
- [ ] Create booking with invalid email (should fail)
- [ ] Create booking with negative price (should fail)
- [ ] Send confirmation email (should succeed or demo mode)
- [ ] Submit contact form with valid data
- [ ] Submit contact form with short message (should fail)
- [ ] Submit contact form with no email (should fail)

### Automated Testing (Future)

```javascript
// Example test with Vitest
import { describe, it, expect } from 'vitest';

describe('POST /api/bookings/create', () => {
  it('should create booking with valid data', async () => {
    const response = await fetch('/api/bookings/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validBookingData)
    });

    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data.id).toBeDefined();
  });
});
```

---

## Monitoring

### Logs

Check Vercel deployment logs:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on deployment → Functions tab
3. View logs for each API route

### Supabase Logs

Check database queries:
1. Go to Supabase Dashboard → Your Project → Logs
2. Filter by API endpoint or time range

---

## Support

For API issues or questions:
- **Email:** louissader42@gmail.com
- **Phone:** 603-275-7513
- **GitHub Issues:** [Create an issue](https://github.com/louissader/elite-detailing-website/issues)

---

## Changelog

### v1.7.0 (Current)
- ✅ Created serverless API architecture
- ✅ Implemented `/api/bookings/create` endpoint
- ✅ Implemented `/api/emails/send-confirmation` endpoint
- ✅ Implemented `/api/contact/submit` endpoint
- ✅ Removed direct Supabase access from client
- ✅ Added server-side validation
- ✅ Updated client-side services to use API routes

### v1.6.0
- ✅ Removed hardcoded credentials from client bundle
- ✅ Added environment variable requirements

### v1.5.3
- ✅ Updated contact information
- ✅ Fixed phone/email across website

---

*Last Updated: 2025-12-30*
