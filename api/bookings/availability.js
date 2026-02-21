// Vercel Serverless Function for Checking Booking Availability
// Returns which time slots are booked for a given date

import { createClient } from '@supabase/supabase-js';
import { generalRateLimit } from '../lib/rateLimit.js';
import {
  handlePreflight,
  setCorsHeaders,
  setSecurityHeaders,
  validateOrigin,
  getClientIP
} from '../lib/security.js';

/* eslint-disable no-undef */
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
/* eslint-enable no-undef */

export default async function handler(req, res) {
  setSecurityHeaders(res);

  if (handlePreflight(req, res)) {
    return;
  }

  setCorsHeaders(req, res);

  const originCheck = validateOrigin(req);
  if (!originCheck.valid) {
    console.warn('CSRF: Invalid origin', { origin: originCheck.origin, ip: getClientIP(req) });
    return res.status(403).json({ success: false, error: 'Forbidden' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use GET.' });
  }

  try {
    const rateLimitResult = generalRateLimit(req, res);
    if (!rateLimitResult.allowed) {
      return res.status(429).json({
        success: false,
        error: rateLimitResult.error,
        retryAfter: rateLimitResult.retryAfter
      });
    }

    const { date } = req.query;

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ success: false, error: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase configuration');
      return res.status(500).json({ success: false, error: 'Server configuration error.' });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get all bookings for the requested date
    const { data, error } = await supabase
      .from('bookings')
      .select('appointment_time')
      .eq('appointment_date', date)
      .neq('status', 'cancelled');

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ success: false, error: 'Failed to check availability.' });
    }

    const bookedTimes = new Set(data.map(b => b.appointment_time));

    const allSlots = [
      '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
      '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
      '04:00 PM', '05:00 PM'
    ];

    const slots = allSlots.map(time => ({
      time,
      available: !bookedTimes.has(time)
    }));

    return res.status(200).json({ success: true, data: { slots } });

  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ success: false, error: 'An unexpected error occurred.' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
