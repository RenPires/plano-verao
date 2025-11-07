import React from 'react';
import { Download } from 'lucide-react';

const ExportButton = ({ clients }) => {
  const exportToCSV = () => {
    if (!clients || clients.length === 0) return;

    const headers = [
      'Cliente',
      'Supervisor', // NOVA COLUNA
      'Status',
      'Volume 2025',
      'Volume 2024',
      'Variação Volume',
      'Faturamento 2025',
      'Faturamento 2024',
      'Variação Faturamento'
    ];

    const csvData = clients.map(client => {
      const volumeGrowth = ((client.volume.previous - client.volume.current) / client.volume.current) * 100;
      const revenueGrowth = ((client.revenue.previous - client.revenue.current) / client.revenue.current) * 100;

      return [
        client.name,
        client.supervisor, // NOVA COLUNA
        client.hasJoined ? 'Aderido' : 'Não Aderido',
        client.volume.previous,
        client.volume.current,
        `${volumeGrowth.toFixed(1)}%`,
        client.revenue.previous,
        client.revenue.current,
        `${revenueGrowth.toFixed(1)}%`
      ];
    });

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `plano-verao-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportToCSV}
      disabled={!clients || clients.length === 0}
      className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
    >
      <Download className="w-4 h-4" />
      <span>Exportar CSV</span>
    </button>
  );
};

export default ExportButton;