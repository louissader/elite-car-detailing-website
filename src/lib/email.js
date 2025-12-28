// Email service using Resend
// Note: In production, email sending should be done from a backend API route
// This is a client-side implementation for demonstration

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

/**
 * Send booking confirmation email
 * @param {Object} bookingData - The booking details
 * @returns {Promise<Object>} - Response from email service
 */
export const sendBookingConfirmation = async (bookingData) => {
  // Check if Resend is configured
  if (!RESEND_API_KEY) {
    console.warn('Resend API key not configured. Email will not be sent.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    // Format the appointment date
    const appointmentDate = new Date(bookingData.appointment_date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Create email HTML content
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
    .button {
      display: inline-block;
      background: #D4AF37;
      color: #0A0A0A;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 600;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>ELITE DETAILING</h1>
    <p style="margin: 5px 0 0 0;">Booking Confirmation</p>
  </div>

  <div class="content">
    <h2 style="color: #D4AF37; margin-top: 0;">Thank You, ${bookingData.customer_name}!</h2>

    <p>Your detailing appointment has been successfully scheduled. We're excited to provide you with exceptional service.</p>

    <div class="booking-details">
      <h3 style="margin-top: 0; color: #333;">Appointment Details</h3>

      <div class="detail-row">
        <span class="label">Date:</span>
        <span class="value">${appointmentDate}</span>
      </div>

      <div class="detail-row">
        <span class="label">Time:</span>
        <span class="value">${bookingData.appointment_time}</span>
      </div>

      <div class="detail-row">
        <span class="label">Service:</span>
        <span class="value">${bookingData.package_name}</span>
      </div>

      <div class="detail-row">
        <span class="label">Category:</span>
        <span class="value">${bookingData.service_category === 'auto' ? 'Luxury Auto Detailing' : 'Private Jet Detailing'}</span>
      </div>

      <div class="detail-row">
        <span class="label">Size:</span>
        <span class="value">${bookingData.vehicle_size}</span>
      </div>

      ${bookingData.addons && bookingData.addons.length > 0 ? `
      <div class="detail-row">
        <span class="label">Add-ons:</span>
        <span class="value">${bookingData.addons.map(a => a.name).join(', ')}</span>
      </div>
      ` : ''}

      ${bookingData.vehicle_info ? `
      <div class="detail-row">
        <span class="label">Vehicle Details:</span>
        <span class="value">${bookingData.vehicle_info}</span>
      </div>
      ` : ''}

      <div class="detail-row" style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #D4AF37;">
        <span class="label" style="font-size: 18px;">Estimated Total:</span>
        <span class="value price">$${bookingData.total_price.toLocaleString()}</span>
      </div>
    </div>

    <h3 style="color: #333;">What's Next?</h3>
    <ul style="color: #666;">
      <li>We'll send you a reminder 24 hours before your appointment</li>
      <li>Please arrive 5-10 minutes early</li>
      <li>Our team will inspect your ${bookingData.service_category === 'auto' ? 'vehicle' : 'aircraft'} and confirm the final price</li>
      <li>Feel free to contact us if you have any questions or need to reschedule</li>
    </ul>

    <p style="margin-top: 30px; color: #666;">
      <strong>Contact Us:</strong><br>
      Phone: (555) 123-4567<br>
      Email: info@elitedetailing.com<br>
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

    // Send email via Resend API
    // Note: In production, this should be done from a backend API route
    // For now, we'll simulate the email sending

    console.log('📧 Email would be sent to:', bookingData.customer_email);
    console.log('📋 Email content:', emailHtml);

    // In a real implementation with a backend API:
    /*
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Elite Detailing <bookings@elitedetailing.com>',
        to: [bookingData.customer_email],
        subject: `Booking Confirmed - ${appointmentDate} at ${bookingData.appointment_time}`,
        html: emailHtml
      })
    });

    const data = await response.json();
    return { success: true, data };
    */

    // For now, return success with mock data
    return {
      success: true,
      message: 'Email notification prepared',
      emailPreview: emailHtml
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send admin notification email
 * @param {Object} bookingData - The booking details
 */
export const sendAdminNotification = async (bookingData) => {
  // Similar implementation for admin notifications
  console.log('📧 Admin notification for booking:', bookingData.id);
  return { success: true };
};
