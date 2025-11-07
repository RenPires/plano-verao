import React, { useState } from 'react';
import { useSalesData } from '../hooks/useSalesData';
import { usePagination } from '../hooks/usePagination';
import { useTheme } from '../contexts/ThemeContext';
import StatsGrid from './ui/StatsGrid';
import FilterBar from './ui/FilterBar';
import ClientTable from './clients/ClientTable';
import Pagination from './ui/Pagination';
import AdvancedCharts from './charts/AdvancedCharts';
import ExportButton from './ui/ExportButton';
import HeaderPremium from './HeaderPremium';

const Dashboard = () => {
  const {
    stats,
    filteredStats,
    shouldUseFilteredStats,
    filteredClients,
    supervisors, // NOVO
    loading,
    error,
    usingMockData,
    filters,
    setFilters
  } = useSalesData();

  const { isDark } = useTheme();
  
  const [viewMode, setViewMode] = useState('table');
  
  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage
  } = usePagination(filteredClients, 15);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    goToPage(1);
  };

  const handleSortChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-summer-50 via-sand-50 to-ocean-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700">
      {/* Novo Header Elegante */}
      <HeaderPremium viewMode={viewMode} setViewMode={setViewMode} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 -mt-4 relative z-20">
        {/* Aviso se estiver usando dados mock */}
        {usingMockData && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl dark:bg-yellow-900/20 dark:border-yellow-800 animate-slide-up">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-yellow-800 dark:text-yellow-300 font-medium">Modo de Desenvolvimento</p>
                <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                  {error} - Dados de exemplo sendo exibidos.
                  <button 
                    onClick={() => window.location.reload()} 
                    className="ml-2 text-yellow-800 dark:text-yellow-300 underline hover:text-yellow-900 dark:hover:text-yellow-200"
                  >
                    Tentar reconectar
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="animate-fade-in">
          <StatsGrid
            stats={
              shouldUseFilteredStats ? filteredStats : stats
            }
            hasFilters={shouldUseFilteredStats}
          />
        </div>

        {/* Gráfico de Crescimento */}
        {viewMode === 'chart' && (
          <div className="mb-8 animate-slide-up">
            <AdvancedCharts clients={filteredClients} />
          </div>
        )}

        {/* Filters */}
        <div className="animate-slide-up">
          <FilterBar
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            supervisors={supervisors} // NOVO PROP
          />
        </div>

        {/* Client Table */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-summer-600 to-summer-300 bg-clip-text text-transparent">
              Análise de Clientes
            </h2>
            <div className="flex items-center space-x-4">
              {usingMockData && (
                <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-2 py-1 rounded-full">
                  Dados de Exemplo
                </span>
              )}
              
              <ExportButton clients={filteredClients} />
              
              <span className="text-summer-600 dark:text-summer-300 bg-summer-100 dark:bg-dark-600 px-3 py-1 rounded-full text-sm font-medium">
                {filteredClients.length} cliente{filteredClients.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          
          <ClientTable 
            clients={paginatedData} 
            loading={loading}
            filters={filters}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
          
          {/* Paginação */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            className="mt-6"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-summer-800 dark:bg-dark-800 text-summer-200 dark:text-summer-300 py-6 mt-12 border-t border-summer-700 dark:border-dark-600">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-6 mb-2">
            <p className="text-sm">D&R Distribuidora de Bebidas</p>
            <div className="w-1 h-1 bg-summer-600 rounded-full"></div>
            <p className="text-sm">Campanha Plano Verão  &copy; 2025</p>
            <div className="w-1 h-1 bg-summer-600 rounded-full"></div>
            <p className="text-sm">Inteligência Comercial</p>
          </div>
          {usingMockData && (
            <p className="text-sm text-yellow-300">
              ⚠️ Executando com dados de exemplo - Inicie o backend para dados reais
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;