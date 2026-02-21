import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Elite Detailing - Learn how we protect your personal information."
        canonical="https://elite-detailing-website.vercel.app/privacy"
      />
      <Navbar />

      <main className="flex-grow pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-luxury-white/50 text-sm mb-10">Last updated: February 21, 2026</p>

          <div className="space-y-8 text-luxury-white/80 text-sm sm:text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-luxury-gold mb-3">1. Information We Collect</h2>
              <p className="mb-3">When you book a service or contact us, we may collect:</p>
              <ul className="list-disc list-inside space-y-1 text-luxury-white/70">
                <li>Name and contact information (email, phone number)</li>
                <li>Vehicle or aircraft details relevant to your service</li>
                <li>Appointment date and time preferences</li>
                <li>Service location address</li>
                <li>Payment information (processed securely by our payment provider)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-luxury-gold mb-3">2. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-1 text-luxury-white/70">
                <li>Schedule and perform detailing services</li>
                <li>Send booking confirmations and appointment reminders</li>
                <li>Communicate about your service or respond to inquiries</li>
                <li>Improve our services and customer experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-luxury-gold mb-3">3. Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share
                information only with service providers who assist us in operating our business (e.g.,
                email delivery, payment processing), and only to the extent necessary for them to
                provide those services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-luxury-gold mb-3">4. Data Security</h2>
              <p>
                We implement reasonable security measures to protect your personal information.
                However, no method of transmission over the internet is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-luxury-gold mb-3">5. Cookies</h2>
              <p>
                Our website may use cookies and similar technologies to enhance your browsing
                experience. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-luxury-gold mb-3">6. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 text-luxury-white/70">
                <li>Request access to the personal information we hold about you</li>
                <li>Request correction or deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-luxury-gold mb-3">7. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on
                this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-luxury-gold mb-3">8. Contact Us</h2>
              <p className="mb-2">
                If you have questions about this Privacy Policy, contact us at:
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

export default PrivacyPolicy;
