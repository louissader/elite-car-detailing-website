import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PricingCalculator from '../components/PricingCalculator';
import AppointmentCalendar from '../components/AppointmentCalendar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { createBooking } from '../lib/bookingService';

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [bookingData, setBookingData] = useState({
    service: null,
    totalPrice: 0,
    date: null,
    time: null,
    customer: {
      name: '',
      email: '',
      phone: '',
      vehicleInfo: ''
    }
  });

  const steps = [
    { number: 1, title: 'Select Service', description: 'Choose your detailing package' },
    { number: 2, title: 'Choose Date & Time', description: 'Schedule your appointment' },
    { number: 3, title: 'Your Information', description: 'Complete your booking' }
  ];

  const handleServiceSelect = (serviceData) => {
    setBookingData(prev => ({
      ...prev,
      service: serviceData,
      totalPrice: serviceData.total
    }));
  };

  const handlePriceChange = (price) => {
    setBookingData(prev => ({
      ...prev,
      totalPrice: price
    }));
  };

  const handleDateSelect = (date) => {
    setBookingData(prev => ({
      ...prev,
      date: date
    }));
  };

  const handleTimeSelect = (time) => {
    setBookingData(prev => ({
      ...prev,
      time: time
    }));
  };

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value
      }
    }));
  };

  const canProceedToStep2 = bookingData.service !== null;
  const canProceedToStep3 = bookingData.date !== null && bookingData.time !== null;
  const canSubmit = bookingData.customer.name && bookingData.customer.email && bookingData.customer.phone;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Submit booking to Supabase
      const result = await createBooking(bookingData);

      if (result.success) {
        // Show success message
        const message = result.demo
          ? `Booking created in demo mode!\n\nNote: To enable real bookings and email confirmations:\n1. Set up Supabase (see supabase-setup.md)\n2. Add environment variables to .env file\n3. Restart the dev server\n\nYour booking details have been logged to the console.`
          : `Thank you for booking, ${bookingData.customer.name}!\n\nConfirmation email sent to ${bookingData.customer.email}\n\nBooking ID: ${result.data.id}\n\nWe'll see you on ${bookingData.date.toLocaleDateString()} at ${bookingData.time}!`;

        alert(message);

        // Reset form and go back to step 1
        setBookingData({
          service: null,
          totalPrice: 0,
          date: null,
          time: null,
          customer: {
            name: '',
            email: '',
            phone: '',
            vehicleInfo: ''
          }
        });
        setCurrentStep(1);
      } else {
        // Show error message
        setSubmitError(result.message || 'Failed to create booking. Please try again.');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitError('An unexpected error occurred. Please try again or call us at 603-275-7513.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black">
      <SEO
        title="Book Your Appointment"
        description="Schedule your luxury auto or private jet detailing appointment online. Choose from our premium detailing packages and select a convenient time."
        canonical="https://elitedetailing.com/booking"
      />
      <Navbar />

      {/* Hero Section - Mobile responsive padding and text sizes */}
      <section className="relative pt-24 sm:pt-32 pb-8 sm:pb-12 bg-gradient-to-b from-luxury-dark-gray to-luxury-black">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-luxury-gold uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4 font-semibold">
              Book Your Appointment
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-white mb-3 sm:mb-4">
              Schedule Your
              <span className="block text-luxury-gold mt-1 sm:mt-2">
                Elite Detailing Service
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-luxury-white/70">
              Complete your booking in 3 simple steps
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps - Mobile responsive with smaller circles and tighter spacing */}
      <section className="py-4 sm:py-6 md:py-8 bg-luxury-dark-gray border-y border-luxury-gold/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="flex justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'border-luxury-gold bg-luxury-gold text-luxury-black'
                        : 'border-luxury-gold/30 text-luxury-white/30'
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="text-center mt-1 sm:mt-2 hidden sm:block">
                    <p
                      className={`text-xs sm:text-sm font-semibold ${
                        currentStep >= step.number ? 'text-luxury-gold' : 'text-luxury-white/50'
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-luxury-white/40 hidden md:block">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-1 sm:mx-2 transition-all duration-300 ${
                      currentStep > step.number ? 'bg-luxury-gold' : 'bg-luxury-gold/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form - Mobile responsive padding and grid */}
      <section className="py-8 sm:py-12 md:py-16 bg-luxury-black">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              {/* Main Form Area */}
              <div className="lg:col-span-2">
                <div className="bg-luxury-dark-gray border border-luxury-gold/20 p-4 sm:p-6 md:p-8 rounded-sm">
                  {/* Step 1: Service Selection */}
                  {currentStep === 1 && (
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-luxury-white mb-4 sm:mb-6">
                        Select Your Service Package
                      </h2>
                      <PricingCalculator
                        onPriceChange={handlePriceChange}
                        onServiceSelect={handleServiceSelect}
                      />
                      <div className="mt-6 sm:mt-8">
                        <button
                          onClick={() => setCurrentStep(2)}
                          disabled={!canProceedToStep2}
                          aria-disabled={!canProceedToStep2}
                          className={`w-full ${
                            canProceedToStep2 ? 'btn-primary' : 'bg-luxury-gold/30 text-luxury-black/50 cursor-not-allowed'
                          } py-3 sm:py-4`}
                        >
                          Continue to Date & Time
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Date & Time Selection */}
                  {currentStep === 2 && (
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-luxury-white mb-4 sm:mb-6">
                        Choose Your Appointment
                      </h2>
                      <AppointmentCalendar
                        onDateSelect={handleDateSelect}
                        onTimeSelect={handleTimeSelect}
                      />
                      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="flex-1 btn-secondary py-3 sm:py-4"
                        >
                          Back
                        </button>
                        <button
                          onClick={() => setCurrentStep(3)}
                          disabled={!canProceedToStep3}
                          aria-disabled={!canProceedToStep3}
                          className={`flex-1 ${
                            canProceedToStep3 ? 'btn-primary' : 'bg-luxury-gold/30 text-luxury-black/50 cursor-not-allowed'
                          } py-3 sm:py-4`}
                        >
                          Continue to Details
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Customer Information */}
                  {currentStep === 3 && (
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-luxury-white mb-4 sm:mb-6">
                        Your Contact Information
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div>
                          <label className="block text-luxury-gold text-sm font-semibold mb-2 uppercase tracking-wider">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={bookingData.customer.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full bg-luxury-black border-2 border-luxury-gold/20 text-luxury-white p-3 rounded-sm focus:border-luxury-gold focus:outline-none"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label className="block text-luxury-gold text-sm font-semibold mb-2 uppercase tracking-wider">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={bookingData.customer.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full bg-luxury-black border-2 border-luxury-gold/20 text-luxury-white p-3 rounded-sm focus:border-luxury-gold focus:outline-none"
                            placeholder="john@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-luxury-gold text-sm font-semibold mb-2 uppercase tracking-wider">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={bookingData.customer.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full bg-luxury-black border-2 border-luxury-gold/20 text-luxury-white p-3 rounded-sm focus:border-luxury-gold focus:outline-none"
                            placeholder="603-275-7513"
                          />
                        </div>

                        <div>
                          <label className="block text-luxury-gold text-sm font-semibold mb-2 uppercase tracking-wider">
                            Vehicle/Aircraft Information
                          </label>
                          <textarea
                            value={bookingData.customer.vehicleInfo}
                            onChange={(e) => handleInputChange('vehicleInfo', e.target.value)}
                            rows="3"
                            className="w-full bg-luxury-black border-2 border-luxury-gold/20 text-luxury-white p-3 rounded-sm focus:border-luxury-gold focus:outline-none"
                            placeholder="Make, model, year, color, special notes..."
                          />
                        </div>

                        {/* Error Display - Accessible alert */}
                        {submitError && (
                          <div
                            role="alert"
                            aria-live="assertive"
                            className="bg-red-900/20 border border-red-500/50 p-4 rounded-sm"
                          >
                            <p className="text-red-400 text-sm">{submitError}</p>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="flex-1 btn-secondary py-3 sm:py-4"
                            disabled={isSubmitting}
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={!canSubmit || isSubmitting}
                            aria-disabled={!canSubmit || isSubmitting}
                            aria-busy={isSubmitting}
                            className={`flex-1 ${
                              canSubmit && !isSubmitting ? 'btn-primary' : 'bg-luxury-gold/30 text-luxury-black/50 cursor-not-allowed'
                            } py-3 sm:py-4`}
                          >
                            {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Summary Sidebar - Order on mobile to appear first */}
              <div className="lg:col-span-1 order-first lg:order-last">
                <div className="bg-luxury-dark-gray border border-luxury-gold/20 p-4 sm:p-6 rounded-sm lg:sticky lg:top-24">
                  <h3 className="text-luxury-gold text-base sm:text-lg font-bold mb-3 sm:mb-4 uppercase tracking-wider">
                    Booking Summary
                  </h3>

                  <div className="space-y-4">
                    {/* Service */}
                    <div>
                      <p className="text-luxury-white/50 text-xs uppercase tracking-wider mb-1">
                        Service Package
                      </p>
                      {bookingData.service ? (
                        <div>
                          <p className="text-luxury-white font-semibold">
                            {bookingData.service.package.name}
                          </p>
                          <p className="text-luxury-white/60 text-sm">
                            {bookingData.service.category === 'auto' ? '🚗 Auto' : '✈️ Jet'} • {bookingData.service.vehicleSize}
                          </p>
                          {bookingData.service.addons.length > 0 && (
                            <div className="mt-2">
                              <p className="text-luxury-white/50 text-xs">Add-ons:</p>
                              {bookingData.service.addons.map((addon, idx) => (
                                <p key={idx} className="text-luxury-white/70 text-sm">
                                  • {addon.name}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-luxury-white/40 text-sm">Not selected</p>
                      )}
                    </div>

                    {/* Date & Time */}
                    <div className="border-t border-luxury-gold/20 pt-4">
                      <p className="text-luxury-white/50 text-xs uppercase tracking-wider mb-1">
                        Appointment
                      </p>
                      {bookingData.date ? (
                        <div>
                          <p className="text-luxury-white font-semibold">
                            {bookingData.date.toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                          {bookingData.time && (
                            <p className="text-luxury-gold text-sm">{bookingData.time}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-luxury-white/40 text-sm">Not selected</p>
                      )}
                    </div>

                    {/* Total Price */}
                    <div className="border-t border-luxury-gold/20 pt-4">
                      <p className="text-luxury-white/50 text-xs uppercase tracking-wider mb-1">
                        Estimated Total
                      </p>
                      <p className="text-luxury-gold text-2xl sm:text-3xl font-bold">
                        ${bookingData.totalPrice.toLocaleString()}
                      </p>
                      <p className="text-luxury-white/40 text-xs mt-1">
                        Final price confirmed on-site
                      </p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-6 pt-6 border-t border-luxury-gold/20">
                    <p className="text-luxury-white/70 text-sm mb-2">
                      Questions? Call us:
                    </p>
                    <p className="text-luxury-gold font-semibold">
                      603-275-7513
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Booking;
