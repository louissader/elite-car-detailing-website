import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedServices from '../components/FeaturedServices';
import TrustIndicators from '../components/TrustIndicators';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-luxury-black">
      <Navbar />
      <Hero />
      <FeaturedServices />
      <TrustIndicators />
      <Footer />
    </div>
  );
};

export default Home;
