
import React from 'react';

interface CTAProps {
  setContactPopoverOpen: (isOpen: boolean) => void;
}

const CTA: React.FC<CTAProps> = ({ setContactPopoverOpen }) => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-indigo-500 to-purple-500 p-8 sm:p-12 rounded-2xl shadow-lg">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Projenizi Hayata Geçirmeye Hazır mısınız?
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Fikrinizi tartışmak ve projeniz için nasıl bir değer yaratabileceğimizi görmek için bugün bizimle iletişime geçin.
          </p>
          <button 
            onClick={() => setContactPopoverOpen(true)}
            className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-110 hover:bg-indigo-50 shadow-md inline-block">
            Teklif Alın
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
