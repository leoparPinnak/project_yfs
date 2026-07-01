import React, { useState } from 'react';
import { Reveal } from './Reveal';
import { useTranslation } from '../hooks/useTranslation';



export const InteriorShowcase: React.FC = () => {
  const { t } = useTranslation();

  const rooms = [
    {
      id: 'salon',
      label: t.interior.livingRoom,
      image: '/mimarisanatt/post_6/image_1.jpg',
      title: t.interior.livingRoomTitle,
      desc: t.interior.livingRoomDesc
    },
    {
      id: 'mutfak',
      label: t.interior.kitchen,
      image: '/mimarisanatt/post_6/image_2.jpg',
      title: t.interior.kitchenTitle,
      desc: t.interior.kitchenDesc
    },
    {
      id: 'yatak',
      label: t.interior.bedroom,
      image: '/mimarisanatt/post_1/image_1.jpg',
      title: t.interior.bedroomTitle,
      desc: t.interior.bedroomDesc
    },
    {
      id: 'banyo',
      label: t.interior.bathroom,
      image: '/mimarisanatt/post_2/image_1.jpg',
      title: t.interior.bathroomTitle,
      desc: t.interior.bathroomDesc
    }
  ];

  const [activeRoom, setActiveRoom] = useState(rooms[0]);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 border-b border-gray-800 pb-6 md:pb-8">
            <div className="max-w-2xl mb-4 md:mb-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 md:mb-4 text-white">{t.interior.title}</h2>
              <p className="text-gray-400 font-light text-base md:text-lg">
                {t.interior.description}
              </p>
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room)}
                  className={`px-4 py-2.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap min-h-[44px] flex items-center ${activeRoom.id === room.id
                    ? 'bg-brand-primary text-white shadow-[0_0_15px_rgba(217,119,6,0.4)]'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  {room.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] group">
            {/* Image with Transition */}
            <div
              key={activeRoom.id} // Key change triggers re-render/animation
              className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
              style={{ backgroundImage: `url(${activeRoom.image})` }}
            ></div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

            <div className="absolute bottom-0 left-0 p-6 md:p-8 lg:p-12 max-w-3xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-2 md:mb-3 text-white animate-fade-in-up">
                {activeRoom.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg font-light animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                {activeRoom.desc}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};