// Quick test to verify Supabase connection
// Run this with: node test-supabase.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eagagcnqzdbztxexrjqt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhZ2FnY25xemRienR4ZXhyanF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5NTEzMjgsImV4cCI6MjA4MjUyNzMyOH0.LjxQ6lJVBUa2Ha2aELY_-fVIi4jQVlSLWh0IiTuBEJY';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Testing Supabase connection...\n');

// Test database connection
async function testConnection() {
  try {
    // Try to select from bookings table
    const { data, error, count } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true });

    if (error) {
      if (error.message.includes('relation "public.bookings" does not exist')) {
        console.log('⚠️  Bookings table does NOT exist yet.');
        console.log('📝 You need to run the SQL from database-schema.sql in Supabase SQL Editor');
        console.log('\nSteps:');
        console.log('1. Go to https://supabase.com/dashboard');
        console.log('2. Click SQL Editor → New Query');
        console.log('3. Copy/paste from database-schema.sql');
        console.log('4. Click RUN\n');
      } else {
        console.log('❌ Error:', error.message);
      }
      return false;
    }

    console.log('✅ Successfully connected to Supabase!');
    console.log(`📊 Bookings table exists with ${count || 0} bookings`);
    console.log('\n🎉 Your database is ready to use!\n');
    return true;

  } catch (err) {
    console.log('❌ Connection failed:', err.message);
    return false;
  }
}

testConnection();
