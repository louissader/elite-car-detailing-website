import { supabase, isSupabaseConfigured } from './supabase';
import { sendBookingConfirmation } from './email';

/**
 * Create a new booking in the database
 * @param {Object} bookingData - Complete booking information
 * @returns {Promise<Object>} - Result with booking ID and status
 */
export const createBooking = async (bookingData) => {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured. Booking will be stored locally only.');
      // In demo mode, just log the booking
      console.log('📝 Booking Data (Demo Mode):', bookingData);
      return {
        success: true,
        demo: true,
        message: 'Booking stored in demo mode (Supabase not configured)',
        data: {
          id: 'demo-' + Date.now(),
          ...bookingData
        }
      };
    }

    // Prepare data for database
    const dbData = {
      service_category: bookingData.service.category,
      package_id: bookingData.service.package.id,
      package_name: bookingData.service.package.name,
      vehicle_size: bookingData.service.vehicleSize,
      base_price: bookingData.service.package.basePrice,
      total_price: bookingData.totalPrice,
      addons: JSON.stringify(bookingData.service.addons || []),
      appointment_date: bookingData.date.toISOString().split('T')[0],
      appointment_time: bookingData.time,
      customer_name: bookingData.customer.name,
      customer_email: bookingData.customer.email,
      customer_phone: bookingData.customer.phone,
      vehicle_info: bookingData.customer.vehicleInfo || null,
      status: 'pending'
    };

    // Insert booking into database
    const { data, error } = await supabase
      .from('bookings')
      .insert([dbData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log('✅ Booking created successfully:', data.id);

    // Send confirmation email
    try {
      const emailData = {
        ...dbData,
        id: data.id,
        appointment_date: bookingData.date,
        addons: bookingData.service.addons
      };
      const emailResult = await sendBookingConfirmation(emailData);

      if (emailResult.success) {
        console.log('✅ Confirmation email sent');
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
      data: data
    };

  } catch (error) {
    console.error('Error creating booking:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to create booking. Please try again or call us directly.'
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
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    if (error) throw error;

    return { success: true, data };
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
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('customer_email', email)
      .order('appointment_date', { ascending: true });

    if (error) throw error;

    return { success: true, data };
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
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
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
    // All possible time slots
    const allSlots = [
      '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
      '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
      '04:00 PM', '05:00 PM'
    ];

    if (!isSupabaseConfigured()) {
      // In demo mode, mark some slots as booked for demonstration
      return allSlots.map((time, index) => ({
        time,
        available: index !== 3 && index !== 8 // Mark 11:00 AM and 04:00 PM as booked
      }));
    }

    const dateString = date.toISOString().split('T')[0];

    // Query existing bookings for this date
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('appointment_time')
      .eq('appointment_date', dateString)
      .in('status', ['pending', 'confirmed']);

    if (error) throw error;

    // Get booked times
    const bookedTimes = bookings.map(b => b.appointment_time);

    // Mark slots as available/unavailable
    return allSlots.map(time => ({
      time,
      available: !bookedTimes.includes(time)
    }));

  } catch (error) {
    console.error('Error fetching available slots:', error);
    // Return all slots as available on error
    return allSlots.map(time => ({ time, available: true }));
  }
};
