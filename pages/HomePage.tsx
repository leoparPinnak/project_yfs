
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Services from '../components/Services';
import Partners from '../components/Partners';
import Showcase from '../components/Showcase';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Contact from '../components/Contact';

interface HomePageProps {
  setContactPopoverOpen: (isOpen: boolean) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setContactPopoverOpen }) => {
  return (
    <>
      <Hero />
      <Partners />
      <Features />
      <Services />
      <Showcase />
      <Testimonials />
      <CTA setContactPopoverOpen={setContactPopoverOpen} />
      <Contact />
    </>
  );
};

export default HomePage;