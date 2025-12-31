// Vercel Serverless Function for Creating Bookings
// This runs server-side only - API keys never exposed to browser

import { createClient } from '@supabase/supabase-js';
import { bookingRateLimit } from '../lib/rateLimit.js';
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePrice,
  validateDate,
  validateTime,
  validateServiceCategory,
  validateVehicleSize,
  sanitizeOptionalText
} from '../lib/validation.js';

// Server-side environment variables (not prefixed with VITE_)
/* eslint-disable no-undef */
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
/* eslint-enable no-undef */

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).json({});
  }

  // Set CORS headers for actual request
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    });
  }

  try {
    // Apply rate limiting
    const rateLimitResult = bookingRateLimit(req, res);
    if (!rateLimitResult.allowed) {
      return res.status(429).json({
        success: false,
        error: rateLimitResult.error,
        retryAfter: rateLimitResult.retryAfter
      });
    }

    // Validate environment variables
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase configuration');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error. Please contact support.'
      });
    }

    // Create Supabase client with service role key (server-side only)
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Extract booking data from request
    const bookingData = req.body;

    // Validate required fields exist
    const requiredFields = [
      'customer_name',
      'customer_email',
      'customer_phone',
      'package_name',
      'service_category',
      'vehicle_size',
      'appointment_date',
      'appointment_time',
      'total_price'
    ];

    const missingFields = requiredFields.filter(field => !bookingData[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Comprehensive validation with XSS protection
    const validations = {
      name: validateName(bookingData.customer_name),
      email: validateEmail(bookingData.customer_email),
      phone: validatePhone(bookingData.customer_phone),
      price: validatePrice(bookingData.total_price),
      date: validateDate(bookingData.appointment_date),
      time: validateTime(bookingData.appointment_time),
      category: validateServiceCategory(bookingData.service_category),
      size: validateVehicleSize(bookingData.vehicle_size)
    };

    // Check for validation errors
    const errors = {};
    for (const [field, result] of Object.entries(validations)) {
      if (!result.valid) {
        errors[field] = result.error;
      }
    }

    if (Object.keys(errors).length > 0) {
      console.error('Validation errors:', errors);
      console.error('Received data:', {
        customer_name: bookingData.customer_name,
        customer_email: bookingData.customer_email,
        customer_phone: bookingData.customer_phone,
        appointment_date: bookingData.appointment_date,
        appointment_time: bookingData.appointment_time,
        total_price: bookingData.total_price
      });
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }

    // Sanitize package name (prevent XSS)
    const allowedPackages = [
      'Basic Detail',
      'Premium Detail',
      'Elite Detail',
      'Ultimate Detail',
      'Express Detail',
      'Maintenance Detail'
    ];

    if (!allowedPackages.includes(bookingData.package_name)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid package name'
      });
    }

    // Sanitize optional fields
    const vehicleInfo = sanitizeOptionalText(bookingData.vehicle_info, 500);

    // Validate and sanitize addons array
    let sanitizedAddons = [];
    if (Array.isArray(bookingData.addons)) {
      sanitizedAddons = bookingData.addons
        .filter(addon => addon && typeof addon === 'object')
        .map(addon => ({
          name: sanitizeOptionalText(addon.name, 100) || 'Unknown',
          price: validatePrice(addon.price || 0).sanitized || 0
        }))
        .slice(0, 10); // Max 10 addons
    }

    // Prepare sanitized booking object
    const booking = {
      customer_name: validations.name.sanitized,
      customer_email: validations.email.sanitized,
      customer_phone: validations.phone.sanitized,
      package_name: bookingData.package_name, // Already validated against whitelist
      service_category: validations.category.sanitized,
      vehicle_size: validations.size.sanitized,
      appointment_date: validations.date.sanitized,
      appointment_time: validations.time.sanitized,
      total_price: validations.price.sanitized,
      vehicle_info: vehicleInfo,
      addons: JSON.stringify(sanitizedAddons),
      status: 'pending',
      created_at: new Date().toISOString()
    };

    // Insert into Supabase with error handling
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);

      // Don't expose internal error details to client
      return res.status(500).json({
        success: false,
        error: 'Failed to create booking. Please try again.'
      });
    }

    // Log successful booking (for monitoring)
    console.log('✅ Booking created:', {
      id: data.id,
      customer: booking.customer_name,
      date: booking.appointment_date,
      ip: req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'unknown'
    });

    // Return success with minimal data (don't expose full booking object)
    return res.status(200).json({
      success: true,
      data: {
        id: data.id,
        customer_name: data.customer_name,
        appointment_date: data.appointment_date,
        appointment_time: data.appointment_time,
        total_price: data.total_price
      },
      message: 'Booking created successfully'
    });

  } catch (error) {
    console.error('Unexpected error:', error);

    // Don't expose error details to client
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again or contact support at 603-275-7513.'
    });
  }
}

// Vercel configuration
export const config = {
  api: {
    bodyParser: true,
  },
};
