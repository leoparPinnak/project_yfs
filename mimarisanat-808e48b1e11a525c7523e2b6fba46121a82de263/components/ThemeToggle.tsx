import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-600 dark:text-stone-300"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <Moon size={20} className="transition-transform hover:rotate-12" />
            ) : (
                <Sun size={20} className="transition-transform hover:rotate-90" />
            )}
        </button>
    );
};
