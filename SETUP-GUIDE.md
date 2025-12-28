# 🚀 Quick Setup Guide - Elite Detailing Website

**Good news!** Your Supabase credentials are already configured in the `.env` file. You just need to set up the database table.

---

## ✅ Step 1: Create the Database Table (5 minutes)

### 1. Go to Your Supabase Project
- Visit: https://supabase.com/dashboard/projects
- Click on your "elite-detailing" project

### 2. Open the SQL Editor
- In the left sidebar, click **"SQL Editor"**
- Click **"New Query"** button

### 3. Copy and Paste This SQL
Copy the ENTIRE SQL code below and paste it into the query editor:

```sql
-- Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  service_category VARCHAR(10) NOT NULL,
  package_id VARCHAR(50) NOT NULL,
  package_name VARCHAR(100) NOT NULL,
  vehicle_size VARCHAR(20) NOT NULL,

  base_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  addons JSONB DEFAULT '[]'::jsonb,

  appointment_date DATE NOT NULL,
  appointment_time VARCHAR(20) NOT NULL,

  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  vehicle_info TEXT,

  status VARCHAR(20) DEFAULT 'pending',
  notes TEXT
);

CREATE INDEX idx_bookings_appointment_date ON bookings(appointment_date);
CREATE INDEX idx_bookings_customer_email ON bookings(customer_email);
CREATE INDEX idx_bookings_status ON bookings(status);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for all users" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users" ON bookings
  FOR SELECT USING (auth.role() = 'authenticated');
```

### 4. Run the SQL
- Click the **"RUN"** button (or press Cmd+Enter on Mac, Ctrl+Enter on Windows)
- You should see: ✅ **"Success. No rows returned"**

### 5. Verify It Worked
- In the left sidebar, click **"Table Editor"**
- You should now see a **"bookings"** table
- Click on it to see the empty table with all the columns

---

## ✅ Step 2: Test the Booking System

### 1. Restart Your Development Server
If your dev server is running, stop it (Ctrl+C) and restart:

```bash
npm run dev
```

**Important:** You MUST restart after creating the `.env` file!

### 2. Test a Booking
1. Open your website: http://localhost:5174
2. Click **"Book Now"**
3. Fill out the booking form completely
4. Submit the booking

### 3. Check Supabase
1. Go back to Supabase → **Table Editor** → **bookings**
2. You should see your test booking in the table! 🎉

---

## ✅ Step 3: Deploy to Vercel (Optional but Recommended)

### 1. Add Environment Variables in Vercel
1. Go to https://vercel.com/dashboard
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Add these two variables:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://eagagcnqzdbztxexrjqt.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhZ2FnY25xemRienR4ZXhyanF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5NTEzMjgsImV4cCI6MjA4MjUyNzMyOH0.LjxQ6lJVBUa2Ha2aELY_-fVIi4jQVlSLWh0IiTuBEJY` |

5. Click **Save**

### 2. Redeploy
1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Click **"Redeploy"**
4. Wait ~1 minute for deployment to complete

### 3. Test Live Website
- Visit your Vercel URL (e.g., elite-detailing-website.vercel.app)
- Submit a test booking
- Check Supabase to confirm it was saved ✅

---

## 🎯 What You Get

### ✅ Working Features
- **Real booking storage** - All bookings saved to Supabase database
- **Booking management** - View all bookings in Supabase dashboard
- **Data persistence** - Bookings never lost
- **Scalable** - Can handle unlimited bookings

### ⏳ Email Confirmations (Optional - Can Add Later)
To enable email confirmations:
1. Sign up at https://resend.com (free account)
2. Get your API key
3. Add to `.env` file: `VITE_RESEND_API_KEY=re_your_key_here`
4. Restart dev server

**Note:** The website works perfectly without emails. You can add them later!

---

## 🔍 Viewing Your Bookings

### In Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **Table Editor** → **bookings**
4. See all bookings with full details

### Columns You'll See
- **Customer Info:** Name, email, phone
- **Service Details:** Package, category, size
- **Pricing:** Base price, add-ons, total
- **Appointment:** Date and time
- **Status:** pending/confirmed/completed/cancelled
- **Vehicle Info:** Customer notes about their vehicle

---

## 🆘 Troubleshooting

### "Cannot connect to Supabase"
- Make sure you ran the SQL code in Step 1
- Check that you restarted your dev server after creating `.env`
- Verify the `.env` file exists in your project root

### "Table doesn't exist"
- Go to Supabase → SQL Editor
- Run the SQL code from Step 1 again
- Refresh the Table Editor

### Bookings not showing in Supabase
- Check your internet connection
- Verify you're looking at the correct project
- Try refreshing the Table Editor page

### Still having issues?
- Check the browser console for errors (F12 → Console tab)
- Make sure the `.env` file is in the root folder (same level as `package.json`)
- Verify you're not in incognito/private mode

---

## 📊 Next Steps

### Recommended Actions
1. ✅ **Test the booking system thoroughly**
2. ✅ **Add your photos** to `src/assets/images/` folders
3. ✅ **Update the phone number** in the booking confirmation
4. ⏳ **Set up email confirmations** (optional, see above)
5. ⏳ **Build an admin dashboard** to manage bookings (future feature)

### You're All Set! 🎉
Your booking system is now live and storing real data!

---

## 💡 Pro Tips

### Managing Bookings
- Export data: Table Editor → Select rows → Export as CSV
- Update status: Click any row → Change status → Save
- Add notes: Use the "notes" field for internal comments
- Filter by date: Use the filter icon to find specific bookings

### Security
- Your anon key is safe to use in the frontend
- RLS policies prevent unauthorized data access
- Never commit `.env` to git (already in .gitignore)

### Performance
- Supabase auto-scales with your traffic
- Database queries are fast (indexed columns)
- Free tier includes 500MB database + 2GB bandwidth

---

**Questions?** Check the detailed `supabase-setup.md` file or the Supabase documentation at https://supabase.com/docs
