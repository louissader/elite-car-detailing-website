import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { submitContactForm } from '../lib/bookingService';

// Import team images
import wesleyImg from '../assets/images/team/wesley-baccay.JPG';
import dylanImg from '../assets/images/team/dylan-hovey.JPEG';
import louisImg from '../assets/images/team/louis-sader.JPG';
import vedanthImg from '../assets/images/team/vader.jpg';
import car2 from '../assets/images/cars/car2.jpg';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const teamMembers = [
    {
      name: 'Wesley Baccay',
      location: 'New York',
      image: wesleyImg,
      linkedin: null
    },
    {
      name: 'Dylan Hovey',
      location: 'Connecticut & Rhode Island',
      image: dylanImg,
      linkedin: 'https://www.linkedin.com/in/dylan-hovey-163358353/'
    },
    {
      name: 'Louis Sader',
      location: 'New Hampshire & Massachusetts',
      image: louisImg,
      linkedin: 'https://www.linkedin.com/in/louis-sader-a6a391287/'
    },
    {
      name: 'Vedanth Penumatsa',
      location: 'New Hampshire & Rhode Island',
      image: vedanthImg,
      linkedin: 'https://www.linkedin.com/in/vedanth-penumatsa-780767345/'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setSubmitMessage({ type: 'success', text: result.message });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitMessage({ type: 'error', text: result.message });
      }
    } catch (err) {
      setSubmitMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again or call us at 603-275-7513.'
      });
      console.error('Contact form error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Contact Us"
        description="Get in touch with Elite Detailing. Contact our team of professional detailers serving Massachusetts, New Hampshire, Rhode Island, Connecticut, and New York."
        canonical="https://elitedetailing.com/contact"
      />
      <Navbar />

      {/* Hero Section with Background Image */}
      <section className="relative pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6">
        {/* Background Image with Enhanced Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-10"></div>
        <div className="absolute inset-0">
          <img
            src={car2}
            alt="Luxury vehicle"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-20">
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white mb-2 sm:mb-3">
              Meet Our Team
            </h1>
            <p className="text-base sm:text-lg text-gray-300">
              Expert detailing professionals serving the Northeast
            </p>
          </div>

          {/* Compact Combined Layout - Team Images + Contact Info */}
          <div className="bg-luxury-dark-gray border border-luxury-gold/20 rounded-lg p-4 sm:p-6">
            {/* Team Grid - 4 cols on all breakpoints */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="group">
                  <div className="aspect-square overflow-hidden bg-black/50 rounded-lg mb-2 border border-luxury-gold/20 group-hover:border-luxury-gold transition-colors">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm md:text-base font-heading text-white text-center mb-1 font-bold">{member.name}</h3>
                  <p className="text-gray-400 text-xs text-center mb-1 font-bold">
                    {member.location.split('&')[0].trim()}
                  </p>
                  {member.linkedin && (
                    <div className="text-center">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center text-luxury-gold hover:text-luxury-gold/80 transition-colors text-xs"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Info - Horizontal Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-6 border-t border-luxury-gold/20">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-heading text-white mb-1 font-bold">Phone</h3>
                <a href="tel:+16032757513" className="text-gray-300 hover:text-luxury-gold transition-colors text-xs sm:text-sm font-bold">
                  603-275-7513
                </a>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-heading text-white mb-1 font-bold">Email</h3>
                <a href="mailto:louissader42@gmail.com" className="text-gray-300 hover:text-luxury-gold transition-colors text-xs sm:text-sm break-all font-bold">
                  louissader42@gmail.com
                </a>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-heading text-white mb-1 font-bold">Service Area</h3>
                <p className="text-gray-300 text-xs sm:text-sm font-bold">
                  New England & NY
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form - Mobile responsive padding and spacing */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-luxury-dark-gray">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white mb-3 sm:mb-4">
              Send Us a Message
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300">
              Have questions? We're here to help.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-black/50 border border-luxury-gold/20 rounded-lg p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2 text-sm font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-luxury-gold/20 rounded-lg text-white focus:border-luxury-gold focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2 text-sm font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-luxury-gold/20 rounded-lg text-white focus:border-luxury-gold focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <label htmlFor="phone" className="block text-gray-300 mb-2 text-sm font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black border border-luxury-gold/20 rounded-lg text-white focus:border-luxury-gold focus:outline-none transition-colors"
                placeholder="603-275-7513"
              />
            </div>

            <div className="mb-4 sm:mb-6">
              <label htmlFor="message" className="block text-gray-300 mb-2 text-sm font-medium">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 bg-black border border-luxury-gold/20 rounded-lg text-white focus:border-luxury-gold focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your vehicle or aircraft and what services you're interested in..."
              ></textarea>
            </div>

            {/* Success/Error Message - Accessible alert */}
            {submitMessage && (
              <div
                role="alert"
                aria-live="polite"
                className={`p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 ${
                  submitMessage.type === 'success'
                    ? 'bg-green-900/20 border border-green-500/50'
                    : 'bg-red-900/20 border border-red-500/50'
                }`}
              >
                <p className={`text-sm sm:text-base ${submitMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {submitMessage.text}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors text-base sm:text-lg ${
                isSubmitting
                  ? 'bg-luxury-gold/50 text-black/50 cursor-not-allowed'
                  : 'bg-luxury-gold text-black hover:bg-luxury-gold/90'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* CTA Section - Mobile responsive */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-gradient-to-r from-luxury-gold/10 to-luxury-gold/5 border-t border-luxury-gold/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white mb-4 sm:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">
            Book your detailing service today and experience the Elite difference.
          </p>
          <a
            href="/booking"
            className="inline-block bg-luxury-gold text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-luxury-gold/90 transition-colors text-base sm:text-lg"
          >
            Schedule Your Service
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
