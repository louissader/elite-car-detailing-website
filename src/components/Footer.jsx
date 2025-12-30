import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-darkGray border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-heading text-2xl text-gold mb-4">Elite Detailing</h3>
            <p className="text-gray-400 text-sm">
              Premium automotive and aviation detailing services for discerning clients across New England and New York.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Auto Detailing</li>
              <li>Private Jet Detailing</li>
              <li>Ceramic Coating</li>
              <li>Paint Correction</li>
              <li>Interior Restoration</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>New England & New York</li>
              <li>
                <a href="tel:+15551234567" className="hover:text-gold transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li>
                <a href="mailto:info@elitedetailing.com" className="hover:text-gold transition-colors">
                  info@elitedetailing.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Elite Detailing. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
