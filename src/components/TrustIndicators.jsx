import React from 'react';

const TrustIndicators = () => {
  // Condensed stats - FRD: Keep content essential on mobile
  const stats = [
    { number: '4', label: 'NE Members', icon: '👥', iconLabel: 'Team members' },
    { number: 'RWU', label: 'Alumni Team', icon: '🎓', iconLabel: 'Graduation cap' },
    { number: '100%', label: 'Dedicated', icon: '⭐', iconLabel: 'Star rating' }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-luxury-dark-gray relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-luxury-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-luxury-gold/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header - Condensed */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-luxury-gold uppercase tracking-widest text-xs sm:text-sm mb-2 sm:mb-3 font-semibold">
            Why Choose Us
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-luxury-white mb-3 sm:mb-4">
            Former Athletes, <span className="text-luxury-gold">Elite Standards</span>
          </h2>
          <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-luxury-gold mx-auto"></div>
        </div>

        {/* Stats Grid - FRD: Mobile 1 col, Tablet+ 3 col */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-luxury-black border border-luxury-gold/30 p-4 sm:p-6 text-center hover:border-luxury-gold transition-all duration-300 rounded-sm group"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300" role="img" aria-label={stat.iconLabel}>
                {stat.icon}
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-luxury-white mb-1 sm:mb-2">{stat.number}</p>
              <p className="text-luxury-white/60 text-xs sm:text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Single Featured Testimonial - Condensed for mobile */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-luxury-black border border-luxury-gold/20 p-6 sm:p-8 relative group hover:border-luxury-gold transition-all duration-300 rounded-sm">
            {/* Quote Icon */}
            <div className="text-luxury-gold/20 text-4xl sm:text-5xl md:text-6xl font-serif absolute top-3 sm:top-4 right-4 sm:right-6 group-hover:text-luxury-gold/30 transition-colors duration-300">
              "
            </div>

            {/* Rating Stars */}
            <div className="flex gap-1 mb-3 sm:mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-luxury-gold fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            {/* Quote - FRD: 16px minimum body text, 1.6 line height */}
            <p className="text-sm sm:text-base md:text-lg text-luxury-white/80 mb-4 sm:mb-6 leading-relaxed italic relative z-10">
              "The discipline and precision we developed as athletes translates directly to how we approach every detail. Our team brings the same dedication and work ethic to every vehicle we service."
            </p>

            {/* Author */}
            <div className="border-t border-luxury-gold/20 pt-3 sm:pt-4">
              <p className="text-luxury-gold font-semibold text-sm sm:text-base">
                Elite Detailing Team
              </p>
              <p className="text-luxury-white/50 text-xs sm:text-sm">
                Former RWU Athletes
              </p>
            </div>
          </div>
        </div>

        {/* CTA - Full width on mobile */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <a
            href="/booking"
            className="inline-block w-full sm:w-auto bg-luxury-gold hover:bg-luxury-dark-gold text-luxury-black font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-sm transition-all duration-300 uppercase tracking-wider text-sm sm:text-base"
          >
            Book Your Service
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
