import React from 'react';
import { Link } from 'react-router-dom';
import heroCarImg from '../assets/images/cars/car5.jpg'; // Using one of the luxury car images

const Hero = () => {
  return (
    <section className="relative min-h-screen h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/80 to-transparent z-10"></div>

      {/* Actual Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroCarImg}
          alt="Luxury vehicle detailing"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            {/* Accent Line */}
            <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-luxury-gold mb-6 sm:mb-8"></div>

            {/* Main Heading - Mobile-first responsive sizing */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-luxury-white mb-4 sm:mb-6 leading-tight">
              Precision Detailing
              <span className="block text-luxury-gold mt-1 sm:mt-2">
                For Elite Vehicles
              </span>
            </h1>

            {/* Tagline/Value Proposition - Mobile-optimized text size */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-luxury-white/80 mb-8 sm:mb-10 md:mb-12 leading-relaxed font-light">
              Experience unparalleled care for your luxury automobiles and private jets.
              Where craftsmanship meets perfection.
            </p>

            {/* CTA Buttons - Stack on mobile, side-by-side on tablet+ */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
              <Link to="/booking" className="w-full sm:w-auto">
                <button className="btn-primary w-full sm:w-auto">
                  Book Now
                </button>
              </Link>
              <Link to="/booking" className="w-full sm:w-auto">
                <button className="btn-secondary w-full sm:w-auto">
                  Get a Quote
                </button>
              </Link>
            </div>

            {/* Trust Indicators - Responsive grid: 1 col mobile, 3 cols tablet+ */}
            <div className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="border-l-2 border-luxury-gold pl-3 sm:pl-4 py-2 sm:py-0">
                <p className="text-2xl sm:text-3xl font-bold text-luxury-gold">15+</p>
                <p className="text-xs sm:text-sm text-luxury-white/60 uppercase tracking-wider mt-1">
                  Years Experience
                </p>
              </div>
              <div className="border-l-2 border-luxury-gold pl-3 sm:pl-4 py-2 sm:py-0">
                <p className="text-2xl sm:text-3xl font-bold text-luxury-gold">500+</p>
                <p className="text-xs sm:text-sm text-luxury-white/60 uppercase tracking-wider mt-1">
                  Satisfied Clients
                </p>
              </div>
              <div className="border-l-2 border-luxury-gold pl-3 sm:pl-4 py-2 sm:py-0">
                <p className="text-2xl sm:text-3xl font-bold text-luxury-gold">100%</p>
                <p className="text-xs sm:text-sm text-luxury-white/60 uppercase tracking-wider mt-1">
                  Satisfaction Rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on very small screens */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden xs:block">
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-luxury-gold text-xs uppercase tracking-widest mb-2">
            Scroll
          </span>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-luxury-gold"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
