import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import car3 from '../assets/images/cars/car3.jpg';

function About() {
  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="About Us"
        description="Meet Elite Detailing - four Roger Williams University NCAA cross country and track athletes bringing precision and dedication to luxury auto and jet detailing across New England."
        canonical="https://elitedetailing.com/about"
      />
      <Navbar />

      {/* Our Story Section - Background spans full width/height */}
      <section className="relative min-h-screen flex items-start py-24 sm:py-32 px-4 sm:px-6">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={car3}
            alt="Luxury vehicle"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>

        {/* Radial Gradient - Glow Effect Around Text Only (positioned in upper portion) */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `radial-gradient(
              ellipse 700px 500px at center 30%,
              rgba(0, 0, 0, 0.78) 0%,
              rgba(0, 0, 0, 0.58) 40%,
              transparent 70%
            )`
          }}
        ></div>

        {/* Content positioned in upper third (sky area) */}
        <div className="max-w-3xl mx-auto relative z-20 -mt-5">
          {/* Our Story Content */}
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white mb-6 sm:mb-8 text-center">
              Our Story
            </h1>
            <div className="space-y-5 text-white text-sm sm:text-base md:text-lg">
              <p>
                Four Roger Williams University NCAA cross country and track athletes who turned their shared passion for performance into a business. The discipline and precision developed as athletes translates directly to how we approach every detail.
              </p>
              <p>
                Our appreciation for high-performance vehicles comes from understanding what excellence looks like, whether on the track or in the garage. We've taken that expertise and applied it to professional detailing services across New England.
              </p>
              <p>
                Between the four of us, we cover Massachusetts, New Hampshire, Rhode Island, Connecticut, and New York. Whether it's your exotic car or private jet, we bring the same dedication to every vehicle we service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Map - Condensed */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-darkGray">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white mb-6 sm:mb-8 md:mb-12 text-center">
            Coverage Across New England
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            <div className="bg-black/50 border border-gold/20 rounded-lg p-3 sm:p-4 md:p-6 text-center">
              <h3 className="text-base sm:text-lg md:text-xl font-heading text-gold mb-1 sm:mb-2">New York</h3>
              <p className="text-xs sm:text-sm text-gray-400">Wesley</p>
            </div>
            <div className="bg-black/50 border border-gold/20 rounded-lg p-3 sm:p-4 md:p-6 text-center">
              <h3 className="text-base sm:text-lg md:text-xl font-heading text-gold mb-1 sm:mb-2">CT & RI</h3>
              <p className="text-xs sm:text-sm text-gray-400">Dylan</p>
            </div>
            <div className="bg-black/50 border border-gold/20 rounded-lg p-3 sm:p-4 md:p-6 text-center">
              <h3 className="text-base sm:text-lg md:text-xl font-heading text-gold mb-1 sm:mb-2">NH & MA</h3>
              <p className="text-xs sm:text-sm text-gray-400">Louis</p>
            </div>
            <div className="bg-black/50 border border-gold/20 rounded-lg p-3 sm:p-4 md:p-6 text-center">
              <h3 className="text-base sm:text-lg md:text-xl font-heading text-gold mb-1 sm:mb-2">NH & RI</h3>
              <p className="text-xs sm:text-sm text-gray-400">Vedanth</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart - Condensed */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white mb-6 sm:mb-8 md:mb-12 text-center">
            Why Choose Us
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-darkGray border border-gold/20 rounded-lg p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-heading text-white mb-1 sm:mb-2">Performance-Driven Precision</h3>
                  <p className="text-xs sm:text-sm text-gray-300">
                    We approach every detail with the same meticulous standards used in high-performance motorsports.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-darkGray border border-gold/20 rounded-lg p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-heading text-white mb-1 sm:mb-2">Proven Trust</h3>
                  <p className="text-xs sm:text-sm text-gray-300">
                    With an established presence in the luxury car community, we've already earned credibility.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-darkGray border border-gold/20 rounded-lg p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-heading text-white mb-1 sm:mb-2">Regional Coverage</h3>
                  <p className="text-xs sm:text-sm text-gray-300">
                    Four team members covering all of New England means fast, convenient service wherever you are.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-darkGray border border-gold/20 rounded-lg p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-heading text-white mb-1 sm:mb-2">Athlete Work Ethic</h3>
                  <p className="text-xs sm:text-sm text-gray-300">
                    The discipline and commitment we brought to the track now goes into every vehicle we service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Mobile responsive */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-gradient-to-r from-gold/10 to-gold/5 border-t border-gold/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white mb-4 sm:mb-6">
            Ready to Experience Elite Detailing?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8">
            Let us bring the same precision to your vehicle that we brought to the track.
          </p>
          <a
            href="/booking"
            className="inline-block bg-gold text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gold/90 transition-colors text-sm sm:text-base md:text-lg"
          >
            Schedule Your Service
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
