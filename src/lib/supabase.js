import { createClient } from '@supabase/supabase-js';

// Get environment variables - these are injected by Vite during build
// Fallback to hardcoded values if environment variables are not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eagagcnqzdbztxexrjqt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhZ2FnY25xemRienR4ZXhyanF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5NTEzMjgsImV4cCI6MjA4MjUyNzMyOH0.LjxQ6lJVBUa2Ha2aELY_-fVIi4jQVlSLWh0IiTuBEJY';

// Debug: Log environment variable status (only in development)
if (import.meta.env.DEV) {
  console.log('Supabase URL configured:', Boolean(supabaseUrl));
  console.log('Supabase Key configured:', Boolean(supabaseAnonKey));
}

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.error('Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
  console.error('In production, ensure these are set in Vercel environment variables.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};
