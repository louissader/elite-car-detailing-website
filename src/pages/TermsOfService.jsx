import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

function TermsOfService() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <SEO
        title="Terms of Service"
        description="Terms of Service for Elite Detailing - Read our service terms and conditions."
        canonical="https://elite-detailing-website.vercel.app/terms"
      />
      <Navbar />

      <main className="flex-grow pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white mb-2">
            Terms of Service
          </h1>
          <p className="text-luxury-white/50 text-sm mb-10">Last updated: February 21, 2026</p>

          <div className="space-y-8 text-luxury-white/80 text-sm sm:text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-luxury-gold mb-3">1. Services</h2>
              <p>
                Elite Detailing provides luxury auto and private jet detailing services across New
                England (MA, NH, RI, CT, NY). All services are performed by our trained team members
                using professional-grade products and equipment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-luxury-gold mb-3">2. Booking & Appointments</h2>
              <ul className="list-disc list-inside space-y-2 text-luxury-white/70">
                <li>Appointments can be scheduled through our website or by contacting us directly.</li>
                <li>We require at least 24 hours notice for cancellations or rescheduling.</li>
                <li>Final pricing may vary from estimates based on vehicle condition and size.</li>
                <li>We will confirm your appointment and provide a detailed quote before beginning work.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-luxury-gold mb-3">3. Pricing</h2>
              <p>
                Prices listed on our website are starting prices and may vary based on vehicle size,
                condition, and selected add-on services. A final quote will be provided before any
                work begins. We accept cash and credit card payments.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-luxury-gold mb-3">4. Service Guarantee</h2>
              <p>
                We take pride in our work and strive for complete customer satisfaction. If you are
                not satisfied with the results, please contact us within 48 hours of service
                completion and we will work to resolve any concerns.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-luxury-gold mb-3">5. Liability</h2>
              <ul className="list-disc list-inside space-y-2 text-luxury-white/70">
                <li>We exercise the utmost care when servicing your vehicle or aircraft.</li>
                <li>We are not responsible for pre-existing damage, paint defects, or mechanical issues.</li>
                <li>Any concerns about damage must be reported within 24 hours of service completion.</li>
                <li>Our liability is limited to the cost of the service provided.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-luxury-gold mb-3">6. Ceramic Coating & Protection Warranties</h2>
              <p>
                Ceramic coating warranties are subject to proper maintenance by the vehicle owner.
                Warranty terms will be provided in writing at the time of service. Failure to follow
                recommended maintenance guidelines may void the warranty.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-luxury-gold mb-3">7. Cancellation Policy</h2>
              <p>
                Cancellations made less than 24 hours before a scheduled appointment may be subject
                to a cancellation fee. No-shows may be charged the full service amount. We understand
                that emergencies happen and will work with you on a case-by-case basis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-luxury-gold mb-3">8. Changes to Terms</h2>
              <p>
                We reserve the right to update these terms at any time. Changes will be posted on
                this page with an updated revision date. Continued use of our services constitutes
                acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-luxury-gold mb-3">9. Contact</h2>
              <p className="mb-2">
                For questions about these terms, reach out to us:
              </p>
              <p>
                <a href="mailto:louissader42@gmail.com" className="text-luxury-gold hover:text-luxury-gold/80 transition-colors">
                  louissader42@gmail.com
                </a>
                {' '} | {' '}
                <a href="tel:+16032757513" className="text-luxury-gold hover:text-luxury-gold/80 transition-colors">
                  (603) 275-7513
                </a>
              </p>
            </section>
          </div>

          <div className="mt-12 border-t border-luxury-gold/20 pt-8">
            <Link to="/" className="btn-primary inline-block min-h-[44px]">
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TermsOfService;
