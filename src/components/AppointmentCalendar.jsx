import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AppointmentCalendar = ({ onDateSelect, onTimeSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Available time slots
  const timeSlots = [
    { time: '08:00 AM', available: true },
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false }, // Example: booked
    { time: '12:00 PM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: false }, // Example: booked
    { time: '05:00 PM', available: true },
  ];

  // Filter out past dates
  // eslint-disable-next-line no-unused-vars
  const isDateAvailable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  // Filter out Sundays (business closed)
  const filterDate = (date) => {
    const day = date.getDay();
    return day !== 0; // 0 = Sunday
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    if (onTimeSelect) {
      onTimeSelect(time);
    }
  };

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div>
        <label className="block text-luxury-gold text-sm font-semibold mb-3 uppercase tracking-wider">
          Select Date
        </label>
        <div className="bg-luxury-dark-gray p-4 rounded-sm border border-luxury-gold/20">
          <style>
            {`
              .react-datepicker {
                background-color: #1A1A1A !important;
                border: 1px solid rgba(212, 175, 55, 0.2) !important;
                font-family: 'Inter', sans-serif !important;
              }
              .react-datepicker__header {
                background-color: #0A0A0A !important;
                border-bottom: 1px solid rgba(212, 175, 55, 0.2) !important;
              }
              .react-datepicker__current-month,
              .react-datepicker__day-name {
                color: #D4AF37 !important;
              }
              .react-datepicker__day {
                color: #FAFAFA !important;
              }
              .react-datepicker__day:hover {
                background-color: rgba(212, 175, 55, 0.2) !important;
              }
              .react-datepicker__day--selected {
                background-color: #D4AF37 !important;
                color: #0A0A0A !important;
              }
              .react-datepicker__day--disabled {
                color: #666 !important;
              }
              .react-datepicker__navigation-icon::before {
                border-color: #D4AF37 !important;
              }
              .react-datepicker__triangle {
                display: none !important;
              }
            `}
          </style>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            filterDate={filterDate}
            minDate={new Date()}
            inline
            calendarClassName="luxury-calendar"
          />
        </div>
        {selectedDate && (
          <p className="text-luxury-white/60 text-sm mt-2">
            Selected: {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        )}
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <label className="block text-luxury-gold text-sm font-semibold mb-3 uppercase tracking-wider">
            Select Time Slot
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => slot.available && handleTimeSelect(slot.time)}
                disabled={!slot.available}
                className={`p-3 rounded-sm border-2 transition-all duration-300 ${
                  !slot.available
                    ? 'border-luxury-gold/10 bg-luxury-medium-gray/30 text-luxury-white/30 cursor-not-allowed'
                    : selectedTime === slot.time
                    ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-gold'
                    : 'border-luxury-gold/20 text-luxury-white hover:border-luxury-gold'
                }`}
              >
                <div className="text-sm font-semibold">{slot.time}</div>
                {!slot.available && (
                  <div className="text-xs mt-1">Booked</div>
                )}
              </button>
            ))}
          </div>
          {selectedTime && (
            <p className="text-luxury-gold text-sm mt-3 font-semibold">
              ✓ Appointment scheduled for {selectedTime}
            </p>
          )}
        </div>
      )}

      {/* Business Hours Notice */}
      <div className="bg-luxury-dark-gray border border-luxury-gold/20 p-4 rounded-sm">
        <h4 className="text-luxury-gold text-sm font-semibold mb-2 uppercase tracking-wider">
          Business Hours
        </h4>
        <div className="text-luxury-white/70 text-sm space-y-1">
          <p>Monday - Saturday: 8:00 AM - 6:00 PM</p>
          <p>Sunday: Closed</p>
          <p className="text-luxury-white/50 text-xs mt-2">
            * Appointments typically require 2-6 hours depending on service package
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
