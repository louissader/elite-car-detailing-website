import React from 'react';
import { Link } from 'react-router-dom';

// Mobile-first service card following FRD guidelines
const ServiceCard = ({ icon, title, description, features }) => {
  return (
    <div className="group bg-luxury-dark-gray hover:bg-luxury-medium-gray transition-all duration-300 p-4 sm:p-6 border border-luxury-gold/20 hover:border-luxury-gold rounded-sm">
      {/* Icon - Responsive sizing */}
      <div className="text-luxury-gold text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
        {icon}
      </div>

      {/* Title - Mobile-first typography (FRD: H2 24px-28px on mobile) */}
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-luxury-white mb-2 sm:mb-3 group-hover:text-luxury-gold transition-colors duration-300">
        {title}
      </h3>

      {/* Description - FRD: 16px minimum body text */}
      <p className="text-sm sm:text-base text-luxury-white/70 mb-3 sm:mb-4 leading-relaxed">
        {description}
      </p>

      {/* Features list - Condensed */}
      <ul className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
        {features.slice(0, 3).map((feature, index) => (
          <li key={index} className="flex items-start text-xs sm:text-sm text-luxury-white/60">
            <span className="text-luxury-gold mr-2">•</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* Learn More Link */}
      <Link
        to="/services"
        className="inline-flex items-center text-luxury-gold hover:text-luxury-dark-gold transition-colors duration-300 uppercase text-xs tracking-wider font-semibold group"
      >
        Learn More
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5l7 7-7 7"></path>
        </svg>
      </Link>
    </div>
  );
};

const FeaturedServices = () => {
  const services = [
    {
      icon: '🚗',
      title: 'Luxury Auto Detailing',
      description: 'Meticulous care for exotic sports cars and luxury sedans.',
      features: [
        'Paint correction & ceramic coating',
        'Interior deep cleaning',
        'Engine bay detailing'
      ]
    },
    {
      icon: '✈️',
      title: 'Private Jet Detailing',
      description: 'Exclusive detailing for private aircraft with certified expertise.',
      features: [
        'Exterior wash & polish',
        'Cabin deep cleaning',
        'Leather treatment'
      ]
    },
    {
      icon: '⭐',
      title: 'Premium Protection',
      description: 'Long-lasting protection packages that preserve your investment.',
      features: [
        'Multi-year ceramic coating',
        'Paint protection film (PPF)',
        'Maintenance programs'
      ]
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-luxury-black relative">
      {/* Background Pattern - Subtle */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(212, 175, 55, 0.1) 35px, rgba(212, 175, 55, 0.1) 70px)'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header - Mobile-first responsive spacing */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <p className="text-luxury-gold uppercase tracking-widest text-xs sm:text-sm mb-2 sm:mb-3 font-semibold">
            Our Services
          </p>
          {/* FRD: H1 28px-36px on mobile */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-luxury-white mb-3 sm:mb-4">
            Exceptional Services for
            <span className="block text-luxury-gold mt-1 sm:mt-2">
              Exceptional Vehicles
            </span>
          </h2>
          <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-luxury-gold mx-auto"></div>
        </div>

        {/* Services Grid - FRD: Mobile 1 col, Tablet 2 col, Desktop 3 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* View All Services Button - Full width on mobile, auto on larger */}
        <div className="text-center mt-6 sm:mt-8 md:mt-10">
          <Link to="/services" className="w-full sm:w-auto inline-block">
            <button className="btn-secondary w-full sm:w-auto">
              View All Services
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
