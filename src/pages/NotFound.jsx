import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to Elite Detailing homepage or browse our luxury auto and jet detailing services."
      />
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Large Number */}
          <div className="mb-8">
            <h1 className="font-heading text-8xl sm:text-9xl md:text-[12rem] font-bold text-luxury-gold/20 leading-none">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <button className="btn-primary w-full sm:w-auto min-h-[44px]">
                Back to Home
              </button>
            </Link>
            <Link to="/services">
              <button className="btn-secondary w-full sm:w-auto min-h-[44px]">
                View Services
              </button>
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-12 pt-8 border-t border-luxury-gold/20">
            <p className="text-sm text-gray-400 mb-3">
              Need assistance? Contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center text-sm">
              <a
                href="tel:+16032757513"
                className="text-luxury-gold hover:text-luxury-gold/80 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                603-275-7513
              </a>
              <a
                href="mailto:louissader42@gmail.com"
                className="text-luxury-gold hover:text-luxury-gold/80 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NotFound;
