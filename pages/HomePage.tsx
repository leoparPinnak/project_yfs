
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Partners from '../components/Partners';
import Services from '../components/Services';
import Showcase from '../components/Showcase';
import TurkcellModule from '../components/TurkcellModule';
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
      <Features />
      <Partners />
      <Services />
      <Showcase />
      <TurkcellModule />
      <Testimonials />
      <CTA setContactPopoverOpen={setContactPopoverOpen} />
      <Contact />
    </>
  );
};

export default HomePage;