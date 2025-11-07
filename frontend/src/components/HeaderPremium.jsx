import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ui/ThemeToggle';
import { BarChart3, Table, TrendingUp, Zap } from 'lucide-react';

// Logo inline para evitar problemas de import
const LogoPremium = ({ className = "w-14 h-14" }) => (
  <svg
    className={className}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="premiumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <linearGradient id="premiumWave" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7dd3fc" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </linearGradient>
    </defs>
    
    {/* Sol principal */}
    <circle cx="100" cy="100" r="70" fill="url(#premiumGradient)" />
    
    {/* Raios do sol */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation) => (
      <rect
        key={rotation}
        x="98"
        y="25"
        width="4"
        height="25"
        fill="white"
        opacity="0.9"
        transform={`rotate(${rotation} 100 100)`}
        rx="2"
      />
    ))}
    
    {/* Ondas */}
    <path
      d="M30 130 Q100 90, 170 130"
      stroke="url(#premiumWave)"
      strokeWidth="12"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M20 150 Q100 110, 180 150"
      stroke="url(#premiumWave)"
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
      opacity="0.7"
    />
    
    {/* Brilho interno */}
    <circle cx="100" cy="100" r="45" fill="white" opacity="0.2" />
    <circle cx="100" cy="100" r="25" fill="white" opacity="0.3" />
    <circle cx="100" cy="100" r="10" fill="white" opacity="0.6" />
  </svg>
);

const HeaderPremium = ({ viewMode, setViewMode }) => {
  const { isDark } = useTheme();

  return (
    <header className="relative bg-gradient-to-br from-summer-600 via-ocean-600 to-summer-700 dark:from-dark-800 dark:via-dark-700 dark:to-dark-900 text-white py-6 shadow-2xl overflow-hidden">
      {/* Elementos de fundo animados */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo e Título - Design mais limpo */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:bg-white/30">
                <LogoPremium className="w-14 h-14 transition-transform duration-500 group-hover:rotate-12" />
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-white to-blue-200">
                Plano Verão
              </h1>
              <p className="text-blue-100 text-sm mt-1 font-light">
                Dashboard Executivo
              </p>
            </div>
          </div>
          
          {/* Controles */}
          <div className="flex items-center space-x-3">
            {/* Status */}
            <div className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">Performance Ativa</span>
            </div>
            
            <ThemeToggle />
            
            {/* Toggle de Visualização */}
            <div className="flex bg-white/20 backdrop-blur-sm rounded-xl p-1 border border-white/30">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  viewMode === 'table' 
                    ? 'bg-white/30 text-white shadow-inner' 
                    : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                <Table className="w-4 h-4" />
                <span className="text-sm font-medium">Tabela</span>
              </button>
              <button
                onClick={() => setViewMode('chart')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  viewMode === 'chart' 
                    ? 'bg-white/30 text-white shadow-inner' 
                    : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-medium">Gráficos</span>
              </button>
            </div>
          </div>
        </div>

        {/* Barra inferior informativa */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center space-x-4 text-sm text-blue-100">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Sistema Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Dados em Tempo Real</span>
            </div>
          </div>
          
          <div className="text-sm text-blue-100">
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderPremium;