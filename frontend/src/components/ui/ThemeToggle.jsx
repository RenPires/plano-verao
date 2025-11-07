import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
      aria-label={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
    >
      <div className="relative w-5 h-5">
        <Sun className={`w-5 h-5 text-yellow-300 transition-all duration-300 ${
          isDark ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
        }`} />
        <Moon className={`absolute top-0 left-0 w-5 h-5 text-summer-100 transition-all duration-300 ${
          isDark ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
        }`} />
      </div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-summer-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {isDark ? 'Modo Claro' : 'Modo Escuro'}
      </div>
    </button>
  );
};

export default ThemeToggle;