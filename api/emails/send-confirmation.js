// Vercel Serverless Function for Sending Booking Confirmation Emails
// This runs server-side only - Resend API key never exposed to browser

import { Resend } from 'resend';
import { emailRateLimit } from '../lib/rateLimit.js';
import {
  validateName,
  validateEmail,
  validatePrice,
  validateDate,
  validateTime,
  validateServiceCategory,
  validateVehicleSize,
  sanitizeOptionalText
} from '../lib/validation.js';

// Server-side environment variable
/* eslint-disable no-undef */
const resendApiKey = process.env.RESEND_API_KEY;
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
    // Apply rate limiting (3 emails per 5 minutes)
    const rateLimitResult = emailRateLimit(req, res);
    if (!rateLimitResult.allowed) {
      return res.status(429).json({
        success: false,
        error: rateLimitResult.error,
        retryAfter: rateLimitResult.retryAfter
      });
    }

    // Check if Resend is configured
    if (!resendApiKey) {
      console.warn('Resend API key not configured. Email will not be sent.');
      return res.status(200).json({
        success: true,
        demo: true,
        message: 'Email service not configured. Booking confirmed but no email sent.'
      });
    }

    // Initialize Resend client
    const resend = new Resend(resendApiKey);

    // Extract booking data from request
    const bookingData = req.body;

    // Validate required fields exist
    const requiredFields = [
      'customer_name',
      'customer_email',
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
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }

    // Sanitize package name (prevent XSS in email)
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

    // Create sanitized booking object for email
    const sanitizedBookingData = {
      customer_name: validations.name.sanitized,
      customer_email: validations.email.sanitized,
      package_name: bookingData.package_name, // Already validated against whitelist
      service_category: validations.category.sanitized,
      vehicle_size: validations.size.sanitized,
      appointment_date: validations.date.sanitized,
      appointment_time: validations.time.sanitized,
      total_price: validations.price.sanitized,
      vehicle_info: vehicleInfo,
      addons: sanitizedAddons
    };

    // Format the appointment date (using sanitized data)
    const appointmentDate = new Date(sanitizedBookingData.appointment_date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Create email HTML content using ONLY sanitized data
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%);
      color: #D4AF37;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e0e0e0;
    }
    .booking-details {
      background: #f9f9f9;
      border-left: 4px solid #D4AF37;
      padding: 20px;
      margin: 20px 0;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #e0e0e0;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .label {
      font-weight: 600;
      color: #666;
    }
    .value {
      color: #333;
      text-align: right;
    }
    .price {
      font-size: 24px;
      font-weight: 700;
      color: #D4AF37;
    }
    .footer {
      background: #f5f5f5;
      padding: 20px;
      text-align: center;
      border-radius: 0 0 8px 8px;
      font-size: 14px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>ELITE DETAILING</h1>
    <p style="margin: 5px 0 0 0;">Booking Confirmation</p>
  </div>

  <div class="content">
    <h2 style="color: #D4AF37; margin-top: 0;">Thank You, ${sanitizedBookingData.customer_name}!</h2>

    <p>Your detailing appointment has been successfully scheduled. We're excited to provide you with exceptional service.</p>

    <div class="booking-details">
      <h3 style="margin-top: 0; color: #333;">Appointment Details</h3>

      <div class="detail-row">
        <span class="label">Date:</span>
        <span class="value">${appointmentDate}</span>
      </div>

      <div class="detail-row">
        <span class="label">Time:</span>
        <span class="value">${sanitizedBookingData.appointment_time}</span>
      </div>

      <div class="detail-row">
        <span class="label">Service:</span>
        <span class="value">${sanitizedBookingData.package_name}</span>
      </div>

      <div class="detail-row">
        <span class="label">Category:</span>
        <span class="value">${sanitizedBookingData.service_category === 'auto' ? 'Luxury Auto Detailing' : 'Private Jet Detailing'}</span>
      </div>

      <div class="detail-row">
        <span class="label">Size:</span>
        <span class="value">${sanitizedBookingData.vehicle_size}</span>
      </div>

      ${sanitizedBookingData.addons && sanitizedBookingData.addons.length > 0 ? `
      <div class="detail-row">
        <span class="label">Add-ons:</span>
        <span class="value">${sanitizedBookingData.addons.map(a => a.name).join(', ')}</span>
      </div>
      ` : ''}

      ${sanitizedBookingData.vehicle_info ? `
      <div class="detail-row">
        <span class="label">Vehicle Details:</span>
        <span class="value">${sanitizedBookingData.vehicle_info}</span>
      </div>
      ` : ''}

      <div class="detail-row" style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #D4AF37;">
        <span class="label" style="font-size: 18px;">Estimated Total:</span>
        <span class="value price">$${sanitizedBookingData.total_price.toLocaleString()}</span>
      </div>
    </div>

    <h3 style="color: #333;">What's Next?</h3>
    <ul style="color: #666;">
      <li>We'll send you a reminder 24 hours before your appointment</li>
      <li>Please arrive 5-10 minutes early</li>
      <li>Our team will inspect your ${sanitizedBookingData.service_category === 'auto' ? 'vehicle' : 'aircraft'} and confirm the final price</li>
      <li>Feel free to contact us if you have any questions or need to reschedule</li>
    </ul>

    <p style="margin-top: 30px; color: #666;">
      <strong>Contact Us:</strong><br>
      Phone: 603-275-7513<br>
      Email: louissader42@gmail.com<br>
      Hours: Monday - Saturday, 8:00 AM - 6:00 PM
    </p>
  </div>

  <div class="footer">
    <p style="margin: 0;">Elite Detailing - Precision Detailing for Elite Vehicles</p>
    <p style="margin: 5px 0 0 0; font-size: 12px;">
      This is an automated confirmation email. Please do not reply directly to this message.
    </p>
  </div>
</body>
</html>
    `;

    // Send email via Resend (using sanitized email)
    const emailResponse = await resend.emails.send({
      from: 'Elite Detailing <bookings@elitedetailing.com>', // Change to your verified domain
      to: [sanitizedBookingData.customer_email],
      subject: `Booking Confirmed - ${appointmentDate} at ${sanitizedBookingData.appointment_time}`,
      html: emailHtml
    });

    // Log success (using sanitized data)
    console.log('✅ Email sent:', {
      to: sanitizedBookingData.customer_email,
      emailId: emailResponse.id,
      ip: req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'unknown'
    });

    // Return success
    return res.status(200).json({
      success: true,
      data: {
        emailId: emailResponse.id
      },
      message: 'Confirmation email sent successfully'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send confirmation email',
      details: error.message
    });
  }
}

// Vercel configuration
export const config = {
  api: {
    bodyParser: true,
  },
};
