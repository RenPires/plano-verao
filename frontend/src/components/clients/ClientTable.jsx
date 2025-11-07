import React from 'react';
import TrendIcon from '../icons/TrendIcon';
import { CheckCircle, XCircle, Search } from 'lucide-react';

const ClientTable = ({ 
  clients, 
  loading = false, 
  filters,
  onFilterChange,
  onSortChange 
}) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Calcular variação: (2025 - 2024) / 2024 * 100
  const calculateGrowth = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const handleSort = (field) => {
    if (filters.sortBy === field) {
      onSortChange({
        ...filters,
        sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc'
      });
    } else {
      onSortChange({
        ...filters,
        sortBy: field,
        sortOrder: 'asc'
      });
    }
  };

  const SortableHeader = ({ children, field, className = "" }) => (
    <th 
      className={`px-4 py-3 text-left text-xs font-medium text-summer-600 uppercase tracking-wider cursor-pointer hover:bg-summer-50 transition-colors ${className}`}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {filters.sortBy === field && (
          <TrendIcon 
            direction={filters.sortOrder === 'asc' ? 'up' : 'down'} 
            className="w-3 h-3 text-summer-500" 
          />
        )}
      </div>
    </th>
  );

  if (loading) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-summer-200">
          <thead className="bg-summer-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-summer-600 uppercase tracking-wider">Cliente</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-summer-600 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-summer-600 uppercase tracking-wider">Volume 2025</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-summer-600 uppercase tracking-wider">Variação vs 2024</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-summer-600 uppercase tracking-wider">Faturamento 2025</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-summer-600 uppercase tracking-wider">Variação vs 2024</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-summer-200">
            {[...Array(10)].map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="h-4 bg-summer-200 rounded w-3/4"></div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="h-6 bg-summer-200 rounded-full w-20"></div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="h-4 bg-summer-200 rounded w-1/2"></div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="h-4 bg-summer-200 rounded w-1/2"></div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="h-4 bg-summer-200 rounded w-1/2"></div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="h-4 bg-summer-200 rounded w-1/2"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!clients || clients.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-summer-400 mb-4">
          <Search className="w-16 h-16 mx-auto opacity-50" />
        </div>
        <h3 className="text-lg font-semibold text-summer-600 mb-2">
          Nenhum cliente encontrado
        </h3>
        <p className="text-summer-500">
          Tente ajustar os filtros para ver mais resultados.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto card">
      <table className="min-w-full divide-y divide-summer-200">
        <thead className="bg-summer-50">
          <tr>
            <SortableHeader field="name" className="w-1/4">
              Cliente
            </SortableHeader>
            <SortableHeader field="name" className="w-1/4">
              Supervisor
            </SortableHeader>
            <th className="px-4 py-3 text-left text-xs font-medium text-summer-600 uppercase tracking-wider">
              Status
            </th>
            <SortableHeader field="volume2025" className="text-right">
              Volume 2025
            </SortableHeader>
            <SortableHeader field="volumeGrowth" className="text-right">
              Variação vs 2024
            </SortableHeader>
            <SortableHeader field="revenue2025" className="text-right">
              Faturamento 2025
            </SortableHeader>
            <SortableHeader field="revenueGrowth" className="text-right">
              Variação vs 2024
            </SortableHeader>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-summer-200">
          {clients.map((client) => {
            // Calcular variações: (2025 - 2024) / 2024 * 100
            const volumeGrowth = calculateGrowth(client.volume.previous, client.volume.current);
            const revenueGrowth = calculateGrowth(client.revenue.previous, client.revenue.current);
            
            return (
              <tr 
                key={client.id} 
                className="hover:bg-summer-50 transition-colors duration-200"
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-summer-900">
                    {client.name}
                  </div>
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-summer-600 font-medium">
                    {client.supervisor}
                  </div>
                </td>
                
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
                    client.hasJoined 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-coral-100 text-coral-700 border border-coral-200'
                  }`}>
                    {client.hasJoined ? (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        <span>Aderido</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" />
                        <span>Não Aderido</span>
                      </>
                    )}
                  </div>
                </td>
                
                {/* Volume 2025 */}
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className="text-sm font-medium text-summer-900">
                    {formatNumber(client.volume.previous)}
                  </div>
                  <div className="text-xs text-summer-500">
                    2024: {formatNumber(client.volume.current)}
                  </div>
                </td>
                
                {/* Variação Volume */}
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className={`flex items-center justify-end space-x-1 ${
                    volumeGrowth >= 0 ? 'text-green-500' : 'text-coral-500'
                  }`}>
                    <TrendIcon 
                      direction={volumeGrowth >= 0 ? 'up' : 'down'} 
                      className="w-3 h-3" 
                    />
                    <span className="text-sm font-medium">
                      {Math.abs(volumeGrowth).toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-xs text-summer-500">
                    {volumeGrowth >= 0 ? 'Crescimento' : 'Queda'}
                  </div>
                </td>
                
                {/* Faturamento 2025 */}
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className="text-sm font-medium text-summer-900">
                    {formatCurrency(client.revenue.previous)}
                  </div>
                  <div className="text-xs text-summer-500">
                    2024: {formatCurrency(client.revenue.current)}
                  </div>
                </td>
                
                {/* Variação Faturamento */}
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className={`flex items-center justify-end space-x-1 ${
                    revenueGrowth >= 0 ? 'text-green-500' : 'text-coral-500'
                  }`}>
                    <TrendIcon 
                      direction={revenueGrowth >= 0 ? 'up' : 'down'} 
                      className="w-3 h-3" 
                    />
                    <span className="text-sm font-medium">
                      {Math.abs(revenueGrowth).toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-xs text-summer-500">
                    {revenueGrowth >= 0 ? 'Crescimento' : 'Queda'}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;