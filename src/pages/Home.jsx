import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-luxury-black">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
