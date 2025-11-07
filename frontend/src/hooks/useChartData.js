import { useMemo } from 'react';

export const useChartData = (clients) => {
  const chartData = useMemo(() => {
    if (!clients || clients.length === 0) return null;

    // Calcular métricas principais
    const totalClients = clients.length;
    const joinedClients = clients.filter(client => client.hasJoined).length;
    const adhesionRate = (joinedClients / totalClients) * 100;

    // Calcular crescimento médio
    const avgVolumeGrowth = clients.reduce((sum, client) => 
      sum + ((client.volume.previous - client.volume.current) / client.volume.current) * 100, 0
    ) / totalClients;

    const avgRevenueGrowth = clients.reduce((sum, client) => 
      sum + ((client.revenue.previous - client.revenue.current) / client.revenue.current) * 100, 0
    ) / totalClients;

    // Top performers
    const topPerformers = [...clients]
      .sort((a, b) => {
        const aGrowth = ((a.volume.previous - a.volume.current) / a.volume.current) * 100;
        const bGrowth = ((b.volume.previous - b.volume.current) / b.volume.current) * 100;
        return bGrowth - aGrowth;
      })
      .slice(0, 5);

    // Distribuição por faixa de crescimento
    const growthDistribution = {
      'Queda Forte (< -20%)': clients.filter(client => 
        ((client.volume.previous - client.volume.current) / client.volume.current) * 100 < -20
      ).length,
      'Queda Moderada (-20% a 0%)': clients.filter(client => {
        const growth = ((client.volume.previous - client.volume.current) / client.volume.current) * 100;
        return growth >= -20 && growth < 0;
      }).length,
      'Crescimento Moderado (0% a 20%)': clients.filter(client => {
        const growth = ((client.volume.previous - client.volume.current) / client.volume.current) * 100;
        return growth >= 0 && growth < 20;
      }).length,
      'Crescimento Forte (20% a 50%)': clients.filter(client => {
        const growth = ((client.volume.previous - client.volume.current) / client.volume.current) * 100;
        return growth >= 20 && growth < 50;
      }).length,
      'Crescimento Excelente (> 50%)': clients.filter(client => 
        ((client.volume.previous - client.volume.current) / client.volume.current) * 100 >= 50
      ).length,
    };

    return {
      totalClients,
      joinedClients,
      adhesionRate,
      avgVolumeGrowth,
      avgRevenueGrowth,
      topPerformers,
      growthDistribution
    };
  }, [clients]);

  return chartData;
};