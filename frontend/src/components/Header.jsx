import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ui/ThemeToggle';
import Logo from './Logo';
import LogoIcon from './LogoIcon';
import { BarChart3, Table, Sun, Waves, TrendingUp } from 'lucide-react';

const Header = ({ viewMode, setViewMode }) => {
  const { isDark } = useTheme();

  return (
    <header className="relative bg-gradient-to-br from-summer-600 via-ocean-600 to-summer-700 dark:from-dark-800 dark:via-dark-700 dark:to-dark-900 text-white py-6 lg:py-8 shadow-2xl overflow-hidden">
      {/* Elementos de fundo decorativos melhorados */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-yellow-300 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-ocean-300 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-coral-400 rounded-full blur-2xl opacity-30 animate-pulse-slow" style={{animationDelay: '3s'}}></div>
      </div>
      
      {/* Padrão de ondas sutil na base */}
      <div className="absolute bottom-0 left-0 right-0 h-12 opacity-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          {/* Logo e Título - Layout mais compacto e elegante */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="relative group">
              <div className="p-2 lg:p-3 bg-white/20 rounded-xl lg:rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg glow-effect transition-transform duration-300 group-hover:scale-105">
                <Logo className="w-10 h-10 lg:w-14 lg:h-14 text-yellow-300 animate-float-subtle" />
              </div>
              {/* Efeito de brilho externo */}
              <div className="absolute -inset-1 bg-yellow-400 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            
            <div className="text-left">
              <h1 className="text-2xl lg:text-4xl font-bold text-gradient-premium leading-tight tracking-tight">
                Plano Verão
              </h1>
              <p className="text-summer-100 dark:text-summer-300 text-sm lg:text-base mt-1 font-light opacity-90">
                Performance & Analytics Dashboard
              </p>
            </div>
          </div>
          
          {/* Controles - Mais compactos e alinhados */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Indicador de Performance */}
            <div className="hidden xl:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
              <TrendingUp className="w-4 h-4 text-green-300" />
              <span className="text-xs font-medium text-summer-100">Performance</span>
            </div>
            
            <ThemeToggle />
            
            {/* Toggle de Visualização - Mais compacto */}
            <div className="flex bg-white/20 backdrop-blur-sm rounded-lg p-1 border border-white/30 shadow-lg">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center space-x-1 px-2 py-1 lg:px-3 lg:py-2 rounded-md transition-all duration-200 ${
                  viewMode === 'table' 
                    ? 'bg-white/30 text-white shadow-inner' 
                    : 'text-summer-100 hover:bg-white/10'
                }`}
                title="Visualização em Tabela"
              >
                <Table className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="text-xs lg:text-sm font-medium hidden sm:block">Tabela</span>
              </button>
              <button
                onClick={() => setViewMode('chart')}
                className={`flex items-center space-x-1 px-2 py-1 lg:px-3 lg:py-2 rounded-md transition-all duration-200 ${
                  viewMode === 'chart' 
                    ? 'bg-white/30 text-white shadow-inner' 
                    : 'text-summer-100 hover:bg-white/10'
                }`}
                title="Visualização em Gráficos"
              >
                <BarChart3 className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="text-xs lg:text-sm font-medium hidden sm:block">Gráficos</span>
              </button>
            </div>
          </div>
        </div>

        {/* Barra de status inferior - Mais informativa */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-white/20 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-summer-100">Sistema Online</span>
            </div>
            <div className="flex items-center space-x-1">
              <Waves className="w-3 h-3 text-blue-300" />
              <span className="text-summer-100">Campanha Ativa</span>
            </div>
          </div>
          
          <div className="text-xs text-summer-200 font-medium">
            {new Date().toLocaleDateString('pt-BR', { 
              day: '2-digit',
              month: 'long', 
              year: 'numeric'
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;