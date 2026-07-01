import React from 'react';
import { LocationMarkerIcon, PhoneIcon, MailIcon } from './IconComponents';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
    const { theme } = useTheme();
    const { t, isRtl } = useLanguage();

    return (
        <section id="contact" className="py-20 bg-gray-50 dark:bg-stone-900 transition-colors duration-500">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 font-sans">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white dark:font-display dark:font-normal">
                        {t('contact_title')}
                    </h2>
                    <p className="mt-4 text-lg text-slate-500 dark:text-stone-400 max-w-2xl mx-auto font-light">
                        {t('contact_desc')}
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className={`bg-white dark:bg-stone-950 p-8 rounded-xl border border-gray-200 dark:border-stone-850 shadow-sm ${isRtl ? 'text-right' : 'text-left'}`}>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-stone-100 mb-6 dark:font-serif dark:font-medium">
                            {t('footer_contact_info')}
                        </h3>
                        <ul className="space-y-6">
                            <li className={`flex items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                                <div className="flex-shrink-0">
                                    <div className={`flex items-center justify-center h-12 w-12 rounded-md ${theme === 'dark' ? 'bg-rose-950/20 text-brand-primary border border-brand-primary/20' : 'bg-indigo-100 text-indigo-500'}`}>
                                        <LocationMarkerIcon className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className={isRtl ? 'mr-4 ml-0 text-right' : 'ml-4 mr-0 text-left'}>
                                    <h4 className="text-lg font-medium text-slate-900 dark:text-stone-100">{t('contact_address_label')}</h4>
                                    <p className="text-slate-500 dark:text-stone-400 font-light text-sm md:text-base leading-relaxed">
                                        Kazımdirik Mahallesi, 367/7 Sokak, No:14,<br />
                                        A Blok, Daire: 117, Bornova/İzmir, Türkiye
                                    </p>
                                </div>
                            </li>
                            <li className={`flex items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                                <div className="flex-shrink-0">
                                    <div className={`flex items-center justify-center h-12 w-12 rounded-md ${theme === 'dark' ? 'bg-rose-950/20 text-brand-primary border border-brand-primary/20' : 'bg-indigo-100 text-indigo-500'}`}>
                                        <PhoneIcon className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className={isRtl ? 'mr-4 ml-0 text-right' : 'ml-4 mr-0 text-left'}>
                                    <h4 className="text-lg font-medium text-slate-900 dark:text-stone-100">{t('contact_phone_label')}</h4>
                                    <a href="tel:+905323902809" className="text-slate-500 dark:text-stone-400 hover:text-indigo-600 dark:hover:text-brand-primary transition-colors font-light text-sm md:text-base">+90 532 390 28 09</a>
                                </div>
                            </li>
                            <li className={`flex items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                                <div className="flex-shrink-0">
                                    <div className={`flex items-center justify-center h-12 w-12 rounded-md ${theme === 'dark' ? 'bg-rose-950/20 text-brand-primary border border-brand-primary/20' : 'bg-indigo-100 text-indigo-500'}`}>
                                        <MailIcon className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className={isRtl ? 'mr-4 ml-0 text-right' : 'ml-4 mr-0 text-left'}>
                                    <h4 className="text-lg font-medium text-slate-900 dark:text-stone-100">{t('contact_email_label')}</h4>
                                    <a href="mailto:info@yfsinsaat.com" className="text-slate-500 dark:text-stone-400 hover:text-indigo-600 dark:hover:text-brand-primary transition-colors font-light text-sm md:text-base">info@yfsinsaat.com</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg h-full border border-gray-200 dark:border-stone-850 relative" style={{ minHeight: '400px' }}>
                        <iframe 
                            src="https://maps.google.com/maps?q=Kazimdirik%20Mahallesi%20367/7%20Sokak%20No:14%20Bornova%20Izmir&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                            className="w-full h-full absolute inset-0 border-0"
                            allowFullScreen={true}
                            loading="lazy"
                            title={t('contact_map_title')}
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
