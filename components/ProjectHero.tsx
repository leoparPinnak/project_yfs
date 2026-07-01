
import React from 'react';

interface ProjectHeroProps {
  name: string;
  location: string;
  imageUrl: string;
}

const ProjectHero: React.FC<ProjectHeroProps> = ({ name, location, imageUrl }) => {
  return (
    <section 
      className="relative h-screen flex items-center justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
      aria-label={`${name} projesi, ${location}'da`}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2 text-white drop-shadow-lg">
          {name}
        </h1>
        <p className="text-xl md:text-2xl text-indigo-200 drop-shadow-md font-medium">
          {location}
        </p>
      </div>
    </section>
  );
};

export default ProjectHero;
