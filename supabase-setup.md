# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: elite-detailing
   - **Database Password**: (create a strong password and save it)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait 2-3 minutes for setup to complete

---

## Step 2: Create Database Table

1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste this SQL schema:

```sql
-- Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  -- Service Details
  service_category VARCHAR(10) NOT NULL CHECK (service_category IN ('auto', 'jet')),
  package_id VARCHAR(50) NOT NULL,
  package_name VARCHAR(100) NOT NULL,
  vehicle_size VARCHAR(20) NOT NULL,

  -- Pricing
  base_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,

  -- Add-ons (stored as JSONB array)
  addons JSONB DEFAULT '[]'::jsonb,

  -- Appointment Details
  appointment_date DATE NOT NULL,
  appointment_time VARCHAR(20) NOT NULL,

  -- Customer Information
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  vehicle_info TEXT,

  -- Booking Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),

  -- Notes
  notes TEXT,

  -- Indexes for common queries
  CONSTRAINT valid_email CHECK (customer_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create index on appointment_date for faster queries
CREATE INDEX idx_bookings_appointment_date ON bookings(appointment_date);

-- Create index on customer_email for lookups
CREATE INDEX idx_bookings_customer_email ON bookings(customer_email);

-- Create index on status for filtering
CREATE INDEX idx_bookings_status ON bookings(status);

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow insert (anyone can create a booking)
CREATE POLICY "Enable insert for all users" ON bookings
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow read for authenticated users only (for admin dashboard later)
CREATE POLICY "Enable read for authenticated users" ON bookings
  FOR SELECT
  USING (auth.role() = 'authenticated');
```

4. Click **Run** to execute the SQL
5. You should see "Success. No rows returned"

---

## Step 3: Get API Keys

1. In Supabase, go to **Settings** (gear icon) → **API**
2. Find these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (long string)

3. Copy both values

---

## Step 4: Configure Environment Variables

1. In your project root, create a file called `.env` (if it doesn't exist)
2. Add these lines (replace with your actual values):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_RESEND_API_KEY=re_your-resend-key-here
```

3. Save the file

**IMPORTANT:** The `.env` file is already in `.gitignore` and won't be committed to GitHub.

---

## Step 5: Set Up Resend for Emails

1. Go to [https://resend.com](https://resend.com)
2. Sign up with your email
3. Verify your email address
4. Go to **API Keys** in the dashboard
5. Click "Create API Key"
6. Name it "Elite Detailing Production"
7. Copy the API key
8. Add it to your `.env` file as `VITE_RESEND_API_KEY`

**Note:** For testing, Resend allows sending emails from your verified email address. For production, you'll need to verify a domain.

---

## Step 6: Configure Vercel Environment Variables

When deploying to Vercel:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
   - `VITE_RESEND_API_KEY` = your Resend API key
4. Click **Save**
5. Redeploy your project for changes to take effect

---

## Step 7: Test the Integration

1. Start your development server: `npm run dev`
2. Go to the booking page
3. Fill out a test booking
4. Submit the form
5. Check:
   - Supabase dashboard → **Table Editor** → **bookings** (should see new row)
   - Your email inbox (should receive confirmation)

---

## Database Schema Explanation

**bookings table fields:**
- `id`: Unique identifier (auto-generated UUID)
- `created_at`: When booking was created
- `service_category`: "auto" or "jet"
- `package_id`: Package identifier (e.g., "auto-premium")
- `package_name`: Human-readable name
- `vehicle_size`: "small", "medium", "large", "xlarge"
- `base_price`: Package base price
- `total_price`: Final calculated price
- `addons`: Array of selected add-ons (stored as JSON)
- `appointment_date`: Scheduled date
- `appointment_time`: Scheduled time (e.g., "09:00 AM")
- `customer_name`: Customer's full name
- `customer_email`: Email address
- `customer_phone`: Phone number
- `vehicle_info`: Additional vehicle/aircraft details
- `status`: "pending", "confirmed", "completed", or "cancelled"
- `notes`: Optional admin notes

---

## Security Notes

- Row Level Security (RLS) is enabled
- Public can insert bookings (for customer bookings)
- Only authenticated users can read (for admin dashboard later)
- Email validation is enforced at database level
- Status field has check constraint for valid values

---

## Next Steps

After setup is complete:
1. Test booking flow end-to-end
2. Verify data in Supabase dashboard
3. Confirm email delivery
4. Set up admin dashboard (future feature)
5. Add booking management features
