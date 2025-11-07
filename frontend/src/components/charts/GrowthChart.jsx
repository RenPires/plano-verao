import React from 'react';

const GrowthChart = ({ clients }) => {
  // Se não houver clientes, mostrar mensagem
  if (!clients || clients.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-summer-600">Nenhum dado disponível para o gráfico</p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-summer-800 mb-4">Gráfico de Crescimento</h3>
      <div className="h-64 flex items-center justify-center bg-summer-50 rounded-lg">
        <p className="text-summer-600">
          Gráfico será implementado em breve com Chart.js
        </p>
      </div>
    </div>
  );
};

export default GrowthChart;