import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { submitContactForm } from '../lib/bookingService';

// Import team images
import wesleyImg from '../assets/images/team/wesley-baccay.JPG';
import dylanImg from '../assets/images/team/dylan-hovey.JPEG';
import louisImg from '../assets/images/team/louis-sader.JPG';
import vedanthImg from '../assets/images/team/vader.jpg';

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
      name: 'Wesley',
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
      <Navbar />

      {/* Combined Hero Section with Team and Contact Info */}
      <section className="relative pt-24 pb-12 px-4 min-h-screen flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent"></div>

        {/* Meet Our Team */}
        <div className="max-w-7xl mx-auto relative z-10 flex-1 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="font-heading text-4xl md:text-5xl text-white mb-3">
              Meet Our Team
            </h1>
            <p className="text-lg text-gray-300">
              Expert detailing professionals serving the Northeast
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-darkGray border border-gold/20 rounded-lg overflow-hidden hover:border-gold transition-colors">
                <div className="aspect-square overflow-hidden bg-black/50">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-heading text-white mb-1">{member.name}</h3>
                  <p className="text-gray-400 text-xs mb-3">
                    <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {member.location}
                  </p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gold hover:text-gold/80 transition-colors text-xs"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Get in Touch Section */}
          <div className="bg-darkGray/50 border border-gold/20 rounded-lg p-8">
            <h2 className="font-heading text-3xl text-white mb-6 text-center">
              Get in Touch
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-heading text-white mb-1">Phone</h3>
                <a href="tel:+16032757513" className="text-gray-300 hover:text-gold transition-colors text-sm">
                  603-275-7513
                </a>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-heading text-white mb-1">Email</h3>
                <a href="mailto:louissader42@gmail.com" className="text-gray-300 hover:text-gold transition-colors text-sm">
                  louissader42@gmail.com
                </a>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-heading text-white mb-1">Service Area</h3>
                <p className="text-gray-300 text-sm">
                  New England & New York
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 bg-darkGray">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl text-white mb-4">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-300">
              Have questions? We're here to help.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-black/50 border border-gold/20 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                  className="w-full px-4 py-3 bg-black border border-gold/20 rounded-lg text-white focus:border-gold focus:outline-none transition-colors"
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
                  className="w-full px-4 py-3 bg-black border border-gold/20 rounded-lg text-white focus:border-gold focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-gray-300 mb-2 text-sm font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black border border-gold/20 rounded-lg text-white focus:border-gold focus:outline-none transition-colors"
                placeholder="603-275-7513"
              />
            </div>

            <div className="mb-6">
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
                className="w-full px-4 py-3 bg-black border border-gold/20 rounded-lg text-white focus:border-gold focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your vehicle or aircraft and what services you're interested in..."
              ></textarea>
            </div>

            {/* Success/Error Message */}
            {submitMessage && (
              <div className={`p-4 rounded-lg mb-6 ${
                submitMessage.type === 'success'
                  ? 'bg-green-900/20 border border-green-500/50'
                  : 'bg-red-900/20 border border-red-500/50'
              }`}>
                <p className={submitMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}>
                  {submitMessage.text}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-8 py-4 rounded-lg font-semibold transition-colors text-lg ${
                isSubmitting
                  ? 'bg-gold/50 text-black/50 cursor-not-allowed'
                  : 'bg-gold text-black hover:bg-gold/90'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gold/10 to-gold/5 border-t border-gold/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Book your detailing service today and experience the Elite difference.
          </p>
          <a
            href="/booking"
            className="inline-block bg-gold text-black px-8 py-4 rounded-lg font-semibold hover:bg-gold/90 transition-colors text-lg"
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
