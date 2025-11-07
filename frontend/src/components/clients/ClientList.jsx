import React from 'react';
import ClientCard from './ClientCard';
import SunIcon from '../icons/SunIcon'; // Adicionar import

const ClientList = ({ clients, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="card p-6 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-summer-200 rounded w-3/4"></div>
                <div className="h-3 bg-summer-100 rounded w-1/2"></div>
              </div>
              <div className="h-6 bg-summer-200 rounded-full w-20"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="h-3 bg-summer-200 rounded w-1/2"></div>
                <div className="h-4 bg-summer-100 rounded w-3/4"></div>
                <div className="h-3 bg-summer-100 rounded w-2/3"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-summer-200 rounded w-1/2"></div>
                <div className="h-4 bg-summer-100 rounded w-3/4"></div>
                <div className="h-3 bg-summer-100 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!clients || clients.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-summer-400 mb-4">
          <SunIcon className="w-16 h-16 mx-auto opacity-50" />
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
    <div className="grid grid-cols-1 gap-6">
      {clients.map((client) => (
        <ClientCard 
          key={client.id} 
          client={client} 
        />
      ))}
    </div>
  );
};

export default ClientList;