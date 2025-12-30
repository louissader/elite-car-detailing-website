import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import team images
import wesleyImg from '../assets/images/team/wesley.jpeg';
import dylanImg from '../assets/images/team/dylan.jpeg';
import louisImg from '../assets/images/team/louis.jpeg';
import vedanthImg from '../assets/images/team/vedanth.jpeg';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to experience elite detailing? Contact our team to discuss your automotive or aviation needs.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 bg-darkGray">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/50 border border-gold/20 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading text-white mb-2">Phone</h3>
              <a href="tel:+15551234567" className="text-gray-300 hover:text-gold transition-colors">
                (555) 123-4567
              </a>
            </div>

            <div className="bg-black/50 border border-gold/20 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading text-white mb-2">Email</h3>
              <a href="mailto:info@elitedetailing.com" className="text-gray-300 hover:text-gold transition-colors">
                info@elitedetailing.com
              </a>
            </div>

            <div className="bg-black/50 border border-gold/20 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading text-white mb-2">Service Area</h3>
              <p className="text-gray-300">
                New England & New York
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-300">
              Expert detailing professionals serving the Northeast
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-darkGray border border-gold/20 rounded-lg overflow-hidden hover:border-gold transition-colors">
                <div className="aspect-square overflow-hidden bg-black/50">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading text-white mb-2">{member.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      className="inline-flex items-center text-gold hover:text-gold/80 transition-colors text-sm"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      Connect on LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
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
                placeholder="(555) 123-4567"
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

            <button
              type="submit"
              className="w-full bg-gold text-black px-8 py-4 rounded-lg font-semibold hover:bg-gold/90 transition-colors text-lg"
            >
              Send Message
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
