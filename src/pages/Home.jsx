import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import car3 from '../assets/images/cars/car3.jpg';

const Home = () => {
  return (
    <div className="min-h-screen bg-luxury-black">
      <Navbar />

      {/* Merged Hero + Our Story Section with Option C Styling */}
      <section className="relative min-h-screen flex items-center">
        {/* Smart Gradient Overlay - Dark top 30%, bright center 40-50%, dark bottom 20% */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.28) 0%,
              rgba(0, 0, 0, 0) 40%,
              rgba(0, 0, 0, 0.22) 100%
            )`
          }}
        ></div>

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={car3}
            alt="Luxury vehicle"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 w-full px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto">
            {/* Hero Headline - Top 30% with text outline */}
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 sm:mb-6 text-outline-heading-lg">
                From The Track to Your Driveway
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 text-outline-heading">
                Four teammates. One passion. Precision detailing across New England.
              </p>
            </div>

            {/* Our Story Content - Center area with text outlines */}
            <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white mb-6 sm:mb-8 text-center text-outline-heading">
                Our Story
              </h2>
              <div className="space-y-6 text-white text-base sm:text-lg md:text-xl text-outline-body">
                <p>
                  We're four former Roger Williams University cross country and track athletes who turned our shared passion for performance into a business. The discipline and precision we developed as athletes translates directly to how we approach every detail.
                </p>
                <p>
                  Our appreciation for high-performance vehicles comes from understanding what excellence looks like—whether on the track or in the garage. Vedanth has already built trust in the luxury car community through his Instagram, photographing and filming high-end automobiles. We've taken that expertise and applied it to professional detailing services.
                </p>
                <p>
                  Between the four of us, we cover New England—from Massachusetts and New Hampshire to Rhode Island, Connecticut, and New York. Whether it's your exotic car or private jet, we bring the same dedication and work ethic we had on the track to every vehicle we service.
                </p>
              </div>
            </div>

            {/* Trust Indicators with text outlines */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              <div className="border-l-4 border-luxury-gold pl-6 py-4">
                <p className="text-4xl sm:text-5xl font-bold text-luxury-gold text-outline-heading">4</p>
                <p className="text-sm sm:text-base text-white uppercase tracking-wider mt-2 text-outline-body">
                  New England Members
                </p>
              </div>
              <div className="border-l-4 border-luxury-gold pl-6 py-4">
                <p className="text-4xl sm:text-5xl font-bold text-luxury-gold text-outline-heading">RWU</p>
                <p className="text-sm sm:text-base text-white uppercase tracking-wider mt-2 text-outline-body">
                  Alumni Team
                </p>
              </div>
              <div className="border-l-4 border-luxury-gold pl-6 py-4">
                <p className="text-4xl sm:text-5xl font-bold text-luxury-gold text-outline-heading">100%</p>
                <p className="text-sm sm:text-base text-white uppercase tracking-wider mt-2 text-outline-body">
                  Dedicated
                </p>
              </div>
            </div>

            {/* CTAs - Bottom 20% with text outlines */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link
                to="/booking"
                className="btn-primary text-outline-heading"
              >
                Book Your Detail
              </Link>
              <Link
                to="/services"
                className="btn-secondary text-outline-heading"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-luxury-gold text-outline-body"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
