
import React from 'react';
import { WhatsAppIcon, PhoneIcon, MailIcon, LocationMarkerIcon, XIcon } from './IconComponents';

interface ContactPopoverProps {
    isOpen: boolean;
    onClose: () => void;
}

const contactOptions = [
    {
        name: 'WhatsApp',
        icon: <WhatsAppIcon className="h-8 w-8 text-white" />,
        href: 'https://api.whatsapp.com/send?phone=905323902809&text=Merhaba%2C%20projeniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.',
        bgColor: 'bg-green-500',
        hoverColor: 'hover:bg-green-600'
    },
    {
        name: 'Telefon',
        icon: <PhoneIcon className="h-8 w-8 text-white" />,
        href: 'tel:+905323902809',
        bgColor: 'bg-blue-500',
        hoverColor: 'hover:bg-blue-600'
    },
    {
        name: 'E-posta',
        icon: <MailIcon className="h-8 w-8 text-white" />,
        href: 'mailto:info@yfsinsaat.com',
        bgColor: 'bg-red-500',
        hoverColor: 'hover:bg-red-600'
    },
    {
        name: 'Konum',
        icon: <LocationMarkerIcon className="h-8 w-8 text-white" />,
        href: '#contact',
        bgColor: 'bg-gray-700',
        hoverColor: 'hover:bg-gray-800'
    }
];

const ContactPopover: React.FC<ContactPopoverProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-popover-title"
        >
            <div 
                className="relative bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 text-center"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Kapat"
                >
                    <XIcon className="h-6 w-6" />
                </button>
                <h2 id="contact-popover-title" className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Bize Ulaşın</h2>
                <p className="text-slate-500 mb-8">Size en uygun iletişim yolunu seçin.</p>

                <div className="grid grid-cols-2 gap-4">
                    {contactOptions.map(option => (
                        <a 
                            key={option.name} 
                            href={option.href}
                            onClick={onClose}
                            className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl ${option.bgColor} ${option.hoverColor} text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-md`}
                            target={option.name === 'WhatsApp' ? '_blank' : undefined}
                            rel={option.name === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                        >
                            {option.icon}
                            <span className="mt-3 text-sm sm:text-base">{option.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactPopover;
