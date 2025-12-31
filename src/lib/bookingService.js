// Booking service now uses serverless API routes
// No direct Supabase access from browser - all operations go through secure backend

/**
 * Create a new booking via serverless API
 * @param {Object} bookingData - Complete booking information
 * @returns {Promise<Object>} - Result with booking ID and status
 */
export const createBooking = async (bookingData) => {
  try {
    // Prepare data for API
    const apiData = {
      service_category: bookingData.service.category,
      package_name: bookingData.service.package.name,
      vehicle_size: bookingData.service.vehicleSize,
      total_price: bookingData.totalPrice,
      addons: bookingData.service.addons || [],
      appointment_date: bookingData.date.toISOString().split('T')[0],
      appointment_time: bookingData.time,
      customer_name: bookingData.customer.name,
      customer_email: bookingData.customer.email,
      customer_phone: bookingData.customer.phone,
      vehicle_info: bookingData.customer.vehicleInfo || null
    };

    // Call serverless API endpoint
    const response = await fetch('/api/bookings/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData)
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to create booking');
    }

    console.log('✅ Booking created successfully:', result.data.id);

    // Send confirmation email via API
    try {
      const emailResponse = await fetch('/api/emails/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...apiData,
          id: result.data.id
        })
      });

      const emailResult = await emailResponse.json();

      if (emailResult.success) {
        console.log('✅ Confirmation email sent');
      } else if (emailResult.demo) {
        console.log('📧 Email service not configured - demo mode');
      } else {
        console.warn('⚠️ Email sending failed:', emailResult.error);
      }
    } catch (emailError) {
      console.error('Email error (non-critical):', emailError);
      // Don't fail the booking if email fails
    }

    return {
      success: true,
      message: 'Booking created successfully',
      data: result.data
    };

  } catch (error) {
    console.error('Error creating booking:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to create booking. Please try again or call us at 603-275-7513.'
    };
  }
};

/**
 * Get booking by ID
 * @param {string} bookingId - The booking ID
 * @returns {Promise<Object>} - Booking data
 */
export const getBooking = async (bookingId) => {
  try {
    const response = await fetch(`/api/bookings/get?id=${bookingId}`);
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to fetch booking');
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error('Error fetching booking:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get all bookings for a customer email
 * @param {string} email - Customer email
 * @returns {Promise<Object>} - List of bookings
 */
export const getCustomerBookings = async (email) => {
  try {
    const response = await fetch(`/api/bookings/get?email=${encodeURIComponent(email)}`);
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to fetch bookings');
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error('Error fetching customer bookings:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update booking status
 * @param {string} bookingId - The booking ID
 * @param {string} status - New status ('pending', 'confirmed', 'completed', 'cancelled')
 * @returns {Promise<Object>} - Updated booking data
 */
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await fetch('/api/bookings/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: bookingId, status })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to update booking');
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error('Error updating booking status:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get available time slots for a specific date
 * This checks existing bookings and returns available slots
 * @param {Date} date - The date to check
 * @returns {Promise<Array>} - Available time slots
 */
export const getAvailableTimeSlots = async (date) => {
  try {
    const dateString = date.toISOString().split('T')[0];

    const response = await fetch(`/api/bookings/availability?date=${dateString}`);
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to fetch availability');
    }

    return result.data.slots;
  } catch (error) {
    console.error('Error fetching available slots:', error);

    // Return default slots on error
    const allSlots = [
      '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
      '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
      '04:00 PM', '05:00 PM'
    ];

    return allSlots.map(time => ({ time, available: true }));
  }
};

/**
 * Submit contact form via serverless API
 * @param {Object} formData - Contact form data
 * @returns {Promise<Object>} - Submission result
 */
export const submitContactForm = async (formData) => {
  try {
    const response = await fetch('/api/contact/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to submit contact form');
    }

    return {
      success: true,
      message: result.message || 'Thank you for your message! We will get back to you soon.'
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to submit form. Please try again or call us at 603-275-7513.'
    };
  }
};
