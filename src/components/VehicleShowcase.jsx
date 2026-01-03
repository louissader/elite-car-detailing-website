import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import car5 from '../assets/images/cars/car5.jpg';
import jet1 from '../assets/images/jets/jet1.jpeg';

// Condensed showcase using scroll animation - FRD mobile-first
export function VehicleShowcase({ type = 'auto' }) {
  const showcaseImage = type === 'auto' ? car5 : jet1;

  const title = type === 'auto'
    ? (
        <>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-white mb-2 sm:mb-4">
            Luxury Auto <br className="sm:hidden" />
            <span className="text-luxury-gold">Detailing Excellence</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-luxury-white/70 mt-2 sm:mt-4 max-w-2xl mx-auto">
            Precision care for high-performance vehicles from our team of former RWU athletes
          </p>
        </>
      )
    : (
        <>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-white mb-2 sm:mb-4">
            Private Jet <br className="sm:hidden" />
            <span className="text-luxury-gold">Detailing Services</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-luxury-white/70 mt-2 sm:mt-4 max-w-2xl mx-auto">
            Elite care for your aircraft with certified expertise
          </p>
        </>
      );

  return (
    <div className="flex flex-col overflow-hidden bg-luxury-black">
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

export default VehicleShowcase;
