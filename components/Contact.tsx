
import React from 'react';
import { LocationMarkerIcon, PhoneIcon, MailIcon } from './IconComponents';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                        İletişime Geçin
                    </h2>
                    <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                        Projeniz hakkında konuşmak veya teklif almak için bize ulaşın.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="bg-white p-8 rounded-xl border border-gray-200">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">İletişim Bilgileri</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-500">
                                        <LocationMarkerIcon className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-medium text-slate-900">Adres</h4>
                                    <p className="text-slate-500">Kazımdirik Mahallesi, 367/7 Sokak, No:14,<br />A Blok, Daire: 117, Bornova/İzmir, Türkiye</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-500">
                                        <PhoneIcon className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-medium text-slate-900">Telefon</h4>
                                    <a href="tel:+905323902809" className="text-slate-500 hover:text-indigo-600 transition-colors">+90 532 390 28 09</a>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-500">
                                        <MailIcon className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-medium text-slate-900">Email</h4>
                                    <a href="mailto:info@yfsinsaat.com" className="text-slate-500 hover:text-indigo-600 transition-colors">info@yfsinsaat.com</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg h-full" style={{ minHeight: '400px' }}>
                        <iframe 
                            src="https://maps.google.com/maps?q=Kazimdirik%20Mahallesi%20367/7%20Sokak%20No:14%20Bornova%20Izmir&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                            width="100%" 
                            height="100%" 
                            style={{ border:0 }}
                            allowFullScreen={true}
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="YFS İnşaat Ofis Konumu"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
