import { useTheme } from '../context/ThemeContext';
import { translations } from '../i18n/translations';

export const useTranslation = () => {
    const { language } = useTheme();
    const t = translations[language];
    return { t, language };
};
