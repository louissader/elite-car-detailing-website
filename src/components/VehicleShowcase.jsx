import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";

// Import vehicle images
import car1 from '../assets/images/cars/car1.JPEG';
import car2 from '../assets/images/cars/car2.jpg';
import car3 from '../assets/images/cars/car3.jpg';
import car4 from '../assets/images/cars/car4.jpg';
import car5 from '../assets/images/cars/car5.jpg';
import car6 from '../assets/images/cars/car6.JPEG';
import car7 from '../assets/images/cars/car7.jpg';
import car8 from '../assets/images/cars/car8.jpg';
import jet1 from '../assets/images/jets/jet1.jpeg';
import jet2 from '../assets/images/jets/jet2.JPEG';

export function VehicleShowcase({ type = 'auto' }) {
  // Select showcase image based on type
  const showcaseImage = type === 'auto' ? car5 : jet1;

  const title = type === 'auto'
    ? (
        <>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-white mb-2 sm:mb-4">
            Luxury Auto <br className="sm:hidden" />
            <span className="text-luxury-gold">Detailing Excellence</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-luxury-white/70 mt-2 sm:mt-4">
            Precision care for high-performance vehicles
          </p>
        </>
      )
    : (
        <>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-white mb-2 sm:mb-4">
            Private Jet <br className="sm:hidden" />
            <span className="text-luxury-gold">Detailing Services</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-luxury-white/70 mt-2 sm:mt-4">
            Elite care for your aircraft
          </p>
        </>
      );

  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll titleComponent={title}>
        <img
          src={showcaseImage}
          alt={type === 'auto' ? 'Luxury vehicle detailing' : 'Private jet detailing'}
          className="mx-auto rounded-2xl object-cover h-full w-full object-center"
          draggable={false}
          loading="lazy"
        />
      </ContainerScroll>
    </div>
  );
}

// Gallery grid component for multiple vehicles - Mobile-first design
export function VehicleGallery() {
  const vehicles = [
    { src: car1, alt: 'Luxury car detailing 1', type: 'auto' },
    { src: car2, alt: 'Luxury car detailing 2', type: 'auto' },
    { src: car3, alt: 'Luxury car detailing 3', type: 'auto' },
    { src: car4, alt: 'Luxury car detailing 4', type: 'auto' },
    { src: car6, alt: 'Luxury car detailing 5', type: 'auto' },
    { src: car7, alt: 'Luxury car detailing 6', type: 'auto' },
    { src: car8, alt: 'Luxury car detailing 7', type: 'auto' },
    { src: jet1, alt: 'Private jet detailing 1', type: 'jet' },
    { src: jet2, alt: 'Private jet detailing 2', type: 'jet' },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-luxury-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-luxury-gold uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4 font-semibold">
            Our Work
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-white mb-3 sm:mb-4">
            Elite Detailing <span className="text-luxury-gold">Portfolio</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-luxury-white/70 max-w-2xl mx-auto">
            From exotic automobiles to private jets, we deliver exceptional results
          </p>
        </div>

        {/* Mobile-first grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border-2 border-luxury-gold/20 hover:border-luxury-gold transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-luxury-dark-gray">
                <img
                  src={vehicle.src}
                  alt={vehicle.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-luxury-black/90 to-transparent p-3 sm:p-4">
                <span className="inline-block bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {vehicle.type === 'auto' ? '🚗 Auto Detailing' : '✈️ Jet Detailing'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button - Full width on mobile, auto on larger screens */}
        <div className="mt-8 sm:mt-12 text-center">
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
}

export default VehicleShowcase;
