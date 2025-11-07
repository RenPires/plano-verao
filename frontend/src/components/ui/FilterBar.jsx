import React, { useState } from 'react';
import Card from './Card';
import { Search, Filter, SortAsc, User } from 'lucide-react';

const FilterBar = ({ onFilterChange, onSortChange, supervisors }) => {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    supervisor: 'all',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortBy, sortOrder) => {
    const newFilters = {
      ...filters,
      sortBy,
      sortOrder
    };
    setFilters(newFilters);
    onSortChange(newFilters);
  };

  return (
    <Card className="mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="flex-1 w-full">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-summer-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar cliente ou supervisor..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-summer-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-summer-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-start lg:justify-end">
          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="text-summer-500 w-4 h-4" />
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-3 py-2 border border-summer-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-summer-500 focus:border-transparent bg-white/50 backdrop-blur-sm text-sm"
            >
              <option value="all">Todos os status</option>
              <option value="joined">Aderidos</option>
              <option value="not-joined">Não aderidos</option>
            </select>
          </div>

          {/* NOVO FILTRO: Supervisor */}
          <div className="flex items-center space-x-2">
            <User className="text-summer-500 w-4 h-4" />
            <select
              value={filters.supervisor}
              onChange={(e) => handleFilterChange('supervisor', e.target.value)}
              className="px-3 py-2 border border-summer-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-summer-500 focus:border-transparent bg-white/50 backdrop-blur-sm text-sm"
            >
              <option value="all">Todos supervisores</option>
              {supervisors.map((supervisor) => (
                <option key={supervisor} value={supervisor}>
                  {supervisor}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <SortAsc className="text-summer-500 w-4 h-4" />
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                handleSortChange(sortBy, sortOrder);
              }}
              className="px-3 py-2 border border-summer-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-summer-500 focus:border-transparent bg-white/50 backdrop-blur-sm text-sm"
            >
              <option value="name-asc">Nome (A-Z)</option>
              <option value="name-desc">Nome (Z-A)</option>
              <option value="supervisor-asc">Supervisor (A-Z)</option>
              <option value="supervisor-desc">Supervisor (Z-A)</option>
              <option value="volume2025-desc">Maior volume 2025</option>
              <option value="volume2025-asc">Menor volume 2025</option>
              <option value="revenue2025-desc">Maior faturamento 2025</option>
              <option value="revenue2025-asc">Menor faturamento 2025</option>
              <option value="volumeGrowth-desc">Maior crescimento volume</option>
              <option value="volumeGrowth-asc">Menor crescimento volume</option>
              <option value="revenueGrowth-desc">Maior crescimento faturamento</option>
              <option value="revenueGrowth-asc">Menor crescimento faturamento</option>
              <option value="growth-desc">Maior crescimento geral</option>
              <option value="growth-asc">Menor crescimento geral</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filtros Ativos */}
      {(filters.status !== 'all' || filters.supervisor !== 'all') && (
        <div className="mt-3 pt-3 border-t border-summer-200">
          <div className="flex items-center space-x-2 text-sm text-summer-600">
            <span>Filtros ativos:</span>
            {filters.status !== 'all' && (
              <span className="bg-summer-100 px-2 py-1 rounded-full">
                Status: {filters.status === 'joined' ? 'Aderidos' : 'Não Aderidos'}
              </span>
            )}
            {filters.supervisor !== 'all' && (
              <span className="bg-summer-100 px-2 py-1 rounded-full">
                Supervisor: {filters.supervisor}
              </span>
            )}
            <button
              onClick={() => {
                handleFilterChange('status', 'all');
                handleFilterChange('supervisor', 'all');
              }}
              className="text-coral-500 hover:text-coral-600 text-sm"
            >
              Limpar filtros
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default FilterBar;