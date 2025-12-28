-- Elite Detailing - Bookings Table Schema
-- Copy this ENTIRE file and paste it into Supabase SQL Editor
-- Then click "RUN" to create the database table

-- Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  -- Service Details
  service_category VARCHAR(10) NOT NULL,
  package_id VARCHAR(50) NOT NULL,
  package_name VARCHAR(100) NOT NULL,
  vehicle_size VARCHAR(20) NOT NULL,

  -- Pricing
  base_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
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
  status VARCHAR(20) DEFAULT 'pending',
  notes TEXT
);

-- Create indexes for faster queries
CREATE INDEX idx_bookings_appointment_date ON bookings(appointment_date);
CREATE INDEX idx_bookings_customer_email ON bookings(customer_email);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create bookings (customers can book)
CREATE POLICY "Enable insert for all users" ON bookings
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can view bookings (for admin dashboard later)
CREATE POLICY "Enable read for authenticated users" ON bookings
  FOR SELECT USING (auth.role() = 'authenticated');
