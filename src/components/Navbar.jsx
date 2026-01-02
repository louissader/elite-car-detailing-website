import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-luxury-black/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between py-4 sm:py-6">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold">
              <span className="text-luxury-gold">ELITE</span>
              <span className="text-luxury-white"> DETAILING</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-luxury-white hover:text-luxury-gold transition-colors duration-300 uppercase text-sm tracking-wider font-medium"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-luxury-white hover:text-luxury-gold transition-colors duration-300 uppercase text-sm tracking-wider font-medium"
                >
                  {link.name}
                </a>
              )
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link to="/booking">
              <button className="bg-luxury-gold hover:bg-luxury-dark-gold text-luxury-black font-semibold px-6 py-3 rounded-sm transition-all duration-300 uppercase tracking-wider text-xs">
                Book Now
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button - Enhanced with better touch target */}
          <button
            className="md:hidden text-luxury-white p-2 hover:text-luxury-gold transition-colors focus:outline-none focus:ring-2 focus:ring-luxury-gold rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Solid background with smooth slide-down animation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 border-t border-luxury-gold/20 mt-2 animate-fadeIn">
            <div className="flex flex-col space-y-4 mt-6">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-luxury-white hover:text-luxury-gold transition-colors duration-300 uppercase text-sm tracking-wider font-medium py-2 px-2 rounded hover:bg-luxury-gold/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-luxury-white hover:text-luxury-gold transition-colors duration-300 uppercase text-sm tracking-wider font-medium py-2 px-2 rounded hover:bg-luxury-gold/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
              <Link to="/booking" className="w-full pt-2">
                <button
                  className="btn-primary w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
