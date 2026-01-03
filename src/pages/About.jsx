import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section - Mobile responsive */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6">
            From The Track to Your Driveway
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300">
            Four teammates. One passion. Precision detailing across New England.
          </p>
        </div>
      </section>

      {/* Our Story - Condensed */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-darkGray border border-gold/20 rounded-lg p-6 sm:p-8 md:p-10">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white mb-4 sm:mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-300 text-sm sm:text-base">
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
        </div>
      </section>

      {/* Coverage Map - Condensed */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-darkGray">
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
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
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
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-r from-gold/10 to-gold/5 border-t border-gold/20">
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
