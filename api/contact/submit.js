// Vercel Serverless Function for Contact Form Submission
// This runs server-side only - API keys never exposed to browser

import { createClient } from '@supabase/supabase-js';
import { contactRateLimit } from '../lib/rateLimit.js';
import {
  validateName,
  validateEmail,
  validatePhone,
  validateMessage
} from '../lib/validation.js';

// Server-side environment variables
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
    const rateLimitResult = contactRateLimit(req, res);
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

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Extract contact data from request
    const { name, email, phone, message } = req.body;

    // Validate required fields exist
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and message are required.'
      });
    }

    // Comprehensive validation with XSS protection
    const validations = {
      name: validateName(name),
      email: validateEmail(email),
      message: validateMessage(message, { minLength: 10, maxLength: 5000 })
    };

    // Validate phone if provided
    if (phone && phone.trim().length > 0) {
      validations.phone = validatePhone(phone);
    }

    // Check for validation errors
    const errors = {};
    for (const [field, result] of Object.entries(validations)) {
      if (!result.valid) {
        errors[field] = result.error;
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }

    // Prepare sanitized contact submission object
    const contactSubmission = {
      name: validations.name.sanitized,
      email: validations.email.sanitized,
      phone: validations.phone?.sanitized || null,
      message: validations.message.sanitized,
      status: 'new',
      created_at: new Date().toISOString(),
      ip_address: req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'unknown'
    };

    // Insert into Supabase (you'll need to create a 'contact_submissions' table)
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([contactSubmission])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);

      // If table doesn't exist, provide helpful error
      if (error.code === '42P01') {
        console.error('Table contact_submissions does not exist. Please create it in Supabase.');
        // For now, just log to console instead of failing
        console.log('📧 Contact form submission (would be saved to DB):', contactSubmission);

        return res.status(200).json({
          success: true,
          message: 'Thank you for your message! We will get back to you soon.',
          demo: true
        });
      }

      // Don't expose internal error details to client
      return res.status(500).json({
        success: false,
        error: 'Failed to submit contact form. Please try again or call us at 603-275-7513.'
      });
    }

    // Log successful submission
    console.log('✅ Contact form submitted:', {
      id: data.id,
      name: contactSubmission.name,
      email: contactSubmission.email,
      ip: contactSubmission.ip_address
    });

    // TODO: Send email notification to admin
    // This would require Resend API integration (see send-email.js)

    // Return success
    return res.status(200).json({
      success: true,
      data: {
        id: data.id,
        name: data.name
      },
      message: 'Thank you for your message! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Unexpected error:', error);

    // Don't expose error details to client
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again or contact us at 603-275-7513.'
    });
  }
}

// Vercel configuration
export const config = {
  api: {
    bodyParser: true,
  },
};
