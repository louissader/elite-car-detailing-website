import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ServicePackage from '../components/ServicePackage';
import BeforeAfterGallery from '../components/BeforeAfterGallery';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import jet1 from '../assets/images/jets/jet1.jpeg';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('auto');

  // Auto Detailing Packages
  const autoPackages = [
    {
      tier: 'Basic',
      title: 'Essential Detail',
      price: '$199',
      priceNote: 'starting',
      vehicleType: 'Sedans & Coupes',
      features: [
        'Exterior hand wash & dry',
        'Wheel & tire cleaning',
        'Interior vacuum & wipe down',
        'Window cleaning (interior & exterior)',
        'Tire shine application',
        'Air freshener treatment'
      ]
    },
    {
      tier: 'Premium',
      title: 'Executive Detail',
      price: '$399',
      priceNote: 'starting',
      vehicleType: 'Luxury Vehicles & SUVs',
      popular: true,
      features: [
        'Everything in Essential Detail',
        'Clay bar treatment',
        'Machine polish & wax',
        'Leather conditioning',
        'Engine bay cleaning',
        'Headlight restoration',
        'Paint sealant protection',
        'Deep interior shampooing'
      ]
    },
    {
      tier: 'Luxury',
      title: 'Concierge Detail',
      price: '$799',
      priceNote: 'starting',
      vehicleType: 'Exotic & High-End Vehicles',
      features: [
        'Everything in Executive Detail',
        'Multi-stage paint correction',
        '9H ceramic coating application',
        'Premium leather treatment',
        'Complete interior restoration',
        'Chrome & trim polishing',
        'Undercarriage cleaning',
        'White glove finish inspection',
        '12-month coating warranty'
      ]
    }
  ];

  // Private Jet Packages
  const jetPackages = [
    {
      tier: 'Essential',
      title: 'Light Aircraft Detail',
      price: '$1,499',
      priceNote: 'starting',
      vehicleType: 'Cessna, Light Turboprops',
      features: [
        'Exterior hand wash & wax',
        'Window & windscreen cleaning',
        'Cabin vacuum & sanitization',
        'Leather seat cleaning',
        'Galley & lavatory detail',
        'Control panel cleaning'
      ]
    },
    {
      tier: 'Premium',
      title: 'Executive Jet Detail',
      price: '$3,999',
      priceNote: 'starting',
      vehicleType: 'Mid-Size Private Jets',
      popular: true,
      features: [
        'Everything in Light Aircraft Detail',
        'Paint decontamination & clay bar',
        'Multi-stage paint correction',
        'Ceramic coating application',
        'Deep cabin shampooing',
        'Premium leather conditioning',
        'Cockpit instrument detailing',
        'Brightwork polishing',
        'UV protection treatment'
      ]
    },
    {
      tier: 'Elite',
      title: 'Fleet & Large Aircraft',
      price: '$8,999',
      priceNote: 'starting',
      vehicleType: 'Large Jets & Commercial Aircraft',
      features: [
        'Everything in Executive Jet Detail',
        'Complete exterior restoration',
        'Aircraft-grade ceramic coating',
        'Full cabin refurbishment',
        'Avionics cleaning & protection',
        'Corrosion treatment',
        'Engine cowling detail',
        'Landing gear cleaning',
        'FAA-compliant products',
        'Expedited turnaround available'
      ]
    }
  ];

  // Add-on Services
  const addOnServices = [
    {
      title: 'Ceramic Coating',
      price: 'From $599',
      description: '9H hardness coating with 2-5 year protection',
      icon: '🛡️'
    },
    {
      title: 'Paint Protection Film',
      price: 'From $1,299',
      description: 'Clear bra protection for high-impact areas',
      icon: '🎬'
    },
    {
      title: 'Interior Protection',
      price: 'From $299',
      description: 'Fabric & leather guard coating',
      icon: '💺'
    },
    {
      title: 'Engine Detailing',
      price: 'From $199',
      description: 'Complete engine bay cleaning & dressing',
      icon: '⚙️'
    },
    {
      title: 'Headlight Restoration',
      price: 'From $149',
      description: 'Professional oxidation removal & sealing',
      icon: '💡'
    },
    {
      title: 'Pet Hair Removal',
      price: 'From $99',
      description: 'Deep extraction of pet hair & odor elimination',
      icon: '🐕'
    }
  ];

  // Gallery Items
  const galleryItems = [
    {
      icon: '🚗',
      title: 'Ferrari 488 - Paint Correction',
      description: 'Multi-stage correction with ceramic coating'
    },
    {
      icon: '✈️',
      title: 'Gulfstream G650 - Full Detail',
      description: 'Complete exterior & interior restoration'
    },
    {
      icon: '🏎️',
      title: 'Lamborghini Aventador - Concierge Detail',
      description: 'Premium detail with paint protection film'
    },
    {
      icon: '🛩️',
      title: 'Citation X - Executive Jet Detail',
      description: 'Ceramic coating & cabin refurbishment'
    },
    {
      icon: '🚙',
      title: 'Range Rover - Executive Detail',
      description: 'Interior restoration & exterior ceramic coating'
    },
    {
      icon: '🛫',
      title: 'Bombardier Global 7500',
      description: 'Fleet detail with expedited turnaround'
    }
  ];

  return (
    <div className="min-h-screen bg-luxury-black">
      <SEO
        title="Our Services"
        description="Explore our luxury auto and private jet detailing packages. From essential details to concierge-level service, we offer ceramic coating, paint correction, and premium protection for your vehicle or aircraft."
        canonical="https://elitedetailing.com/services"
      />
      <Navbar />

      {/* Hero Section with Background Image */}
      <section className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        {/* Background Image with Enhanced Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/85 to-transparent z-10"></div>
        <div className="absolute inset-0">
          <img
            src={jet1}
            alt="Private jet detailing"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-20">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-luxury-gold uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4 font-semibold">
              Premium Services
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-luxury-white mb-4 sm:mb-6">
              Detailing Packages &
              <span className="block text-luxury-gold mt-1 sm:mt-2">
                Service Offerings
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-luxury-white/70 leading-relaxed px-2">
              From luxury automobiles to private jets, we offer comprehensive detailing
              solutions tailored to your needs. Each package is designed to deliver
              exceptional results with meticulous attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* Category Selector - Stack on mobile, side-by-side on tablet+ */}
      <section className="py-8 sm:py-10 md:py-12 bg-luxury-dark-gray border-y border-luxury-gold/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-2xl mx-auto">
            <button
              onClick={() => setSelectedCategory('auto')}
              className={`px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-sm uppercase tracking-wider text-xs sm:text-sm font-semibold transition-all duration-300 ${
                selectedCategory === 'auto'
                  ? 'bg-luxury-gold text-luxury-black'
                  : 'bg-transparent border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black'
              }`}
            >
              <span className="hidden sm:inline">Luxury </span>Auto Detailing
            </button>
            <button
              onClick={() => setSelectedCategory('jet')}
              className={`px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-sm uppercase tracking-wider text-xs sm:text-sm font-semibold transition-all duration-300 ${
                selectedCategory === 'jet'
                  ? 'bg-luxury-gold text-luxury-black'
                  : 'bg-transparent border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black'
              }`}
            >
              <span className="hidden sm:inline">Private </span>Jet Detailing
            </button>
          </div>
        </div>
      </section>

      {/* Service Packages - Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
      <section className="py-8 sm:py-12 md:py-16 bg-luxury-black">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-luxury-white mb-3 sm:mb-4 px-2">
              {selectedCategory === 'auto' ? 'Auto Detailing Packages' : 'Private Jet Detailing Packages'}
            </h2>
            <p className="text-sm sm:text-base text-luxury-white/60 max-w-2xl mx-auto px-4">
              Choose the package that best suits your vehicle's needs. All packages include
              premium products and expert craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
            {(selectedCategory === 'auto' ? autoPackages : jetPackages).map((pkg, index) => (
              <ServicePackage key={index} {...pkg} />
            ))}
          </div>

          {/* Pricing Note */}
          <div className="mt-12 text-center">
            <p className="text-luxury-white/50 text-sm">
              * Final pricing may vary based on vehicle size, condition, and selected add-ons.
              Contact us for a detailed quote.
            </p>
          </div>
        </div>
      </section>

      {/* Add-On Services */}
      <section className="py-8 sm:py-12 md:py-16 bg-luxury-dark-gray">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <p className="text-luxury-gold uppercase tracking-widest text-xs sm:text-sm mb-2 sm:mb-3 font-semibold">
              Enhance Your Detail
            </p>
            <h2 className="text-4xl font-bold text-luxury-white mb-4">
              Add-On Services
            </h2>
            <div className="w-20 h-1 bg-luxury-gold mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {addOnServices.map((service, index) => (
              <div
                key={index}
                className="bg-luxury-black border border-luxury-gold/20 p-6 hover:border-luxury-gold transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-luxury-white mb-2 group-hover:text-luxury-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-luxury-gold font-semibold mb-3">
                  {service.price}
                </p>
                <p className="text-luxury-white/60 text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-8 sm:py-12 md:py-16 bg-luxury-black">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <p className="text-luxury-gold uppercase tracking-widest text-xs sm:text-sm mb-2 sm:mb-3 font-semibold">
              Our Work
            </p>
            <h2 className="text-4xl font-bold text-luxury-white mb-4">
              Before & After Gallery
            </h2>
            <p className="text-luxury-white/60 max-w-2xl mx-auto">
              See the transformation. Each project showcases our commitment to excellence
              and attention to detail.
            </p>
            <div className="w-20 h-1 bg-luxury-gold mx-auto mt-6"></div>
          </div>

          <BeforeAfterGallery items={galleryItems} />

          {/* Note about placeholder images */}
          <div className="mt-12 text-center bg-luxury-dark-gray border border-luxury-gold/20 p-6 max-w-3xl mx-auto">
            <p className="text-luxury-gold font-semibold mb-2">
              📸 Gallery Images Coming Soon
            </p>
            <p className="text-luxury-white/60 text-sm">
              High-resolution before/after photos of our completed projects will be added here.
              Each image will showcase our premium detailing results.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-luxury-dark-gray to-luxury-black border-t border-luxury-gold/20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-4xl font-bold text-luxury-white mb-6">
            Ready to Experience Elite Detailing?
          </h2>
          <p className="text-luxury-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Contact us today for a personalized quote or to schedule your detailing service.
            Our team is ready to exceed your expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Get a Free Quote
            </Link>
            <Link to="/booking" className="btn-secondary">
              Schedule Appointment
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Services;
