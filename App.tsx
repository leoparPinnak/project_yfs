
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPopover from './components/ContactPopover';
import Preloader from './components/Preloader';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [isContactPopoverOpen, setContactPopoverOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = window.location.hash || '#/';
      setRoute(newRoute);
      if (newRoute.startsWith('#/projects') || newRoute === '#/about') {
          window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Initial load scroll
    const currentRoute = window.location.hash || '#/';
    if (currentRoute.startsWith('#/projects') || currentRoute === '#/about') {
      window.scrollTo(0, 0);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    if (route.startsWith('#/projects/')) {
      return <ProjectDetailPage />;
    }
    if (route === '#/projects') {
      return <ProjectsPage />;
    }
    if (route === '#/about') {
      return <AboutPage />;
    }
    return <HomePage setContactPopoverOpen={setContactPopoverOpen} />;
  };

  const showFooter = route !== '#/projects';

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <div className={`bg-white min-h-screen transition-opacity duration-[800ms] ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <ContactPopover isOpen={isContactPopoverOpen} onClose={() => setContactPopoverOpen(false)} />
        <Header setContactPopoverOpen={setContactPopoverOpen} />
        <main>
          {renderPage()}
        </main>
        {showFooter && <Footer />}
      </div>
    </>
  );
};

export default App;