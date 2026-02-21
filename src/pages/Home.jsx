import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedServices from '../components/FeaturedServices';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <div className="min-h-screen bg-luxury-black">
      <SEO
        title="Home"
        description="Elite Detailing offers professional luxury auto and private jet detailing services across New England. Four Roger Williams University NCAA athletes bringing precision to exotic cars and aircraft."
        canonical="https://elite-detailing-website.vercel.app/"
      />
      <Navbar />
      <Hero />
      <FeaturedServices />
      <Footer />
    </div>
  );
};

export default Home;
