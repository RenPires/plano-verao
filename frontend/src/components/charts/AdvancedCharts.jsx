import React, { useRef, useEffect, useState } from 'react';
import { useChartData } from '../../hooks/useChartData';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
  RadarController
} from 'chart.js';
import { useTheme } from '../../contexts/ThemeContext';

// Registrar componentes do Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
  RadarController
);

const AdvancedCharts = ({ clients }) => {
  const { isDark } = useTheme();
  const [activeChart, setActiveChart] = useState(' ');
  const chartData = useChartData(clients);
  
  //Refs para armazenar as instâncias dos gráficos
  const volumeChartInstance = useRef(null);
  const revenueChartInstance = useRef(null);
  const adhesionChartInstance = useRef(null);
  const comparisonChartInstance = useRef(null);
  
  // Cores do tema
  const chartColors = {
    light: {
      summer: {
        primary: 'rgba(14, 165, 233, 0.8)',
        secondary: 'rgba(45, 212, 191, 0.8)',
        accent: 'rgba(244, 63, 94, 0.8)',
        sand: 'rgba(234, 179, 8, 0.8)',
        background: 'rgba(255, 255, 255, 0.9)',
        text: '#0c4a6e',
        grid: 'rgba(226, 232, 240, 0.5)'
      }
    },
    dark: {
      summer: {
        primary: 'rgba(56, 189, 248, 0.8)',
        secondary: 'rgba(45, 212, 191, 0.8)',
        accent: 'rgba(251, 113, 133, 0.8)',
        sand: 'rgba(253, 224, 71, 0.8)',
        background: 'rgba(30, 41, 59, 0.9)',
        text: '#e2e8f0',
        grid: 'rgba(71, 85, 105, 0.5)'
      }
    }
  };

  const colors = isDark ? chartColors.dark.summer : chartColors.light.summer;

  // Configurações comuns dos gráficos
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: colors.text,
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: colors.background,
        titleColor: colors.text,
        bodyColor: colors.text,
        borderColor: colors.grid,
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('pt-BR', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1
              }).format(context.parsed.y) + '%';
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: colors.grid,
        },
        ticks: {
          color: colors.text,
        },
      },
      y: {
        grid: {
          color: colors.grid,
        },
        ticks: {
          color: colors.text,
          callback: function(value) {
            return value + '%';
          },
        },
      },
    },
  };

  // 1. Gráfico de Barras Horizontais - Comparação Volume 2025 vs 2024
  const volumeChartRef = useRef(null);
  useEffect(() => {
    if (!clients || clients.length === 0 || activeChart !== 'volume') return;

    // Calcular totais por ano
    const totalVolume2025 = clients.reduce((sum, client) => sum + client.volume.previous, 0);
    const totalVolume2024 = clients.reduce((sum, client) => sum + client.volume.current, 0);

    const ctx = volumeChartRef.current.getContext('2d');

    //Destruir gráfico anterior
    if (volumeChartInstance.current) {
      volumeChartInstance.current.destroy();
    }
    
    volumeChartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Volume Total'],
        datasets: [
          {
            label: '2025',
            data: [totalVolume2025],
            backgroundColor: colors.primary,
            borderColor: colors.primary,
            borderWidth: 2,
            borderRadius: 8,
            barPercentage: 0.6,
          },
          {
            label: '2024',
            data: [totalVolume2024],
            backgroundColor: colors.secondary,
            borderColor: colors.secondary,
            borderWidth: 2,
            borderRadius: 8,
            barPercentage: 0.6,
          }
        ],
      },
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            display: true,
            text: 'Comparação do Volume Total - 2025 vs 2024',
            color: colors.text,
            font: {
              size: 16,
              weight: '600',
              family: 'Inter, system-ui, sans-serif'
            }
          },
          tooltip: {
            ...commonOptions.plugins.tooltip,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.x !== null) {
                  label += new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }).format(context.parsed.x);
                }
                return label;
              }
            }
          }
        }
      }
    });

    return () => {
      if (volumeChartInstance.current) {
        volumeChartInstance.current.destroy();
      }
    };
  }, [clients, activeChart, isDark]);

  // 2. Gráfico de Faturamento - Comparação por Ano
  const revenueChartRef = useRef(null);
  useEffect(() => {
    if (!clients || clients.length === 0 || activeChart !== 'revenue') return;

    // Calcular totais por ano
    const totalRevenue2025 = clients.reduce((sum, client) => sum + client.revenue.previous, 0);
    const totalRevenue2024 = clients.reduce((sum, client) => sum + client.revenue.current, 0);

    const ctx = revenueChartRef.current.getContext('2d');
    
    const revenueChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Faturamento Total'],
        datasets: [
          {
            label: '2025',
            data: [totalRevenue2025],
            backgroundColor: colors.accent,
            borderColor: colors.accent,
            borderWidth: 2,
            borderRadius: 8,
            barPercentage: 0.6,
          },
          {
            label: '2024',
            data: [totalRevenue2024],
            backgroundColor: colors.sand,
            borderColor: colors.sand,
            borderWidth: 2,
            borderRadius: 8,
            barPercentage: 0.6,
          }
        ],
      },
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            display: true,
            text: 'Comparação de Faturamento Total - 2025 vs 2024',
            color: colors.text,
            font: {
              size: 16,
              weight: '600',
              family: 'Inter, system-ui, sans-serif'
            }
          },
          tooltip: {
            ...commonOptions.plugins.tooltip,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.x !== null) {
                  label += new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(context.parsed.x);
                }
                return label;
              }
            }
          }
        }
      }
    });

    return () => {
      if (revenueChartInstance.current) {
        revenueChartInstance.current.destroy();
      }
    };
  }, [clients, activeChart, isDark]);

  // 3. Gráfico de Pizza - Distribuição de Adesões
  const adhesionChartRef = useRef(null);
  useEffect(() => {
    if (!clients || clients.length === 0 || activeChart !== 'adhesion') return;

    const adhesionData = {
      aderidos: clients.filter(client => client.hasJoined).length,
      naoAderidos: clients.filter(client => !client.hasJoined).length
    };

    const ctx = adhesionChartRef.current.getContext('2d');

    // Destruir gráfico anterior se existir
    if (adhesionChartInstance.current) {
      adhesionChartInstance.current.destroy();
    }
    
    adhesionChartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Aderidos', 'Não Aderidos'],
        datasets: [
          {
            data: [adhesionData.aderidos, adhesionData.naoAderidos],
            backgroundColor: [colors.primary, colors.accent],
            borderColor: [colors.primary, colors.accent],
            borderWidth: 2,
          }
        ],
      },
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            display: true,
            text: 'Distribuição de Adesões ao Plano Verão',
            color: colors.text,
            font: {
              size: 16,
              weight: '600',
              family: 'Inter, system-ui, sans-serif'
            }
          }
        },
        cutout: '60%'
      }
    });

    return () => {
      if (adhesionChartInstance.current) {
        adhesionChartInstance.current.destroy();
      }
    };
  }, [clients, activeChart, isDark]);

  // 4. Gráfico de Linha - Evolução Comparativa
  const comparisonChartRef = useRef(null);
  useEffect(() => {
    if (!clients || clients.length === 0 || activeChart !== 'comparison') return;

    // Agrupar por faixa de crescimento
    const growthRanges = {
      'Queda Forte (< -20%)': 0,
      'Queda Moderada (-20% a 0%)': 0,
      'Crescimento Moderado (0% a 20%)': 0,
      'Crescimento Forte (20% a 50%)': 0,
      'Crescimento Excelente (> 50%)': 0
    };

    clients.forEach(client => {
      const growth = ((client.volume.previous - client.volume.current) / client.volume.current) * 100;
      
      if (growth < -20) growthRanges['Queda Forte (< -20%)']++;
      else if (growth < 0) growthRanges['Queda Moderada (-20% a 0%)']++;
      else if (growth < 20) growthRanges['Crescimento Moderado (0% a 20%)']++;
      else if (growth < 50) growthRanges['Crescimento Forte (20% a 50%)']++;
      else growthRanges['Crescimento Excelente (> 50%)']++;
    });

    const ctx = comparisonChartRef.current.getContext('2d');

    // Destruir gráfico anterior se existir
    if (comparisonChartInstance.current) {
      comparisonChartInstance.current.destroy();
    }
    
    comparisonChartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(growthRanges),
        datasets: [
          {
            label: 'Número de Clientes',
            data: Object.values(growthRanges),
            backgroundColor: colors.primary,
            borderColor: colors.primary,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: colors.primary,
            pointBorderColor: colors.background,
            pointBorderWidth: 2,
            pointRadius: 6,
          }
        ],
      },
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            display: true,
            text: 'Distribuição de Clientes por Faixa de Crescimento',
            color: colors.text,
            font: {
              size: 16,
              weight: '600',
              family: 'Inter, system-ui, sans-serif'
            }
          }
        }
      }
    });

    return () => {
      if (comparisonChartInstance.current) {
        comparisonChartInstance.current.destroy();
      }
    };
  }, [clients, activeChart, isDark]);


  if (!clients || clients.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-summer-600 dark:text-summer-400">
          Nenhum dado disponível para exibir gráficos
        </p>
      </div>
    );
  }

  // Calcular totais para exibir nas estatísticas
  const totalVolume2025 = clients.reduce((sum, client) => sum + client.volume.previous, 0);
  const totalVolume2024 = clients.reduce((sum, client) => sum + client.volume.current, 0);
  const totalRevenue2025 = clients.reduce((sum, client) => sum + client.revenue.previous, 0);
  const totalRevenue2024 = clients.reduce((sum, client) => sum + client.revenue.current, 0);
  const volumeGrowth = ((totalVolume2025 - totalVolume2024) / totalVolume2024) * 100;
  const revenueGrowth = ((totalRevenue2025 - totalRevenue2024) / totalRevenue2024) * 100;

  const chartTabs = [
    { id: 'volume', label: 'Volume', icon: '📊', description: 'Comparação de Volume Total entre 2025 vs 2024' },
    { id: 'revenue', label: 'Faturamento', icon: '💰', description: 'Comparação de Faturamento Total entre 2025 vs 2024' },
    { id: 'adhesion', label: 'Adesões', icon: '👥', description: 'Distribuição de Adesões' },
    { id: 'comparison', label: 'Comparativo', icon: '📈', description: 'Distribuição de clientes por faixa de crescimento' }
  ];

  return (
    <div className="space-y-6">
      {/* Navegação entre gráficos */}
      <div className="text-center mb-2">
        <h3 className="text-lg font-semibold text-summer-800 dark:text-summer-800 mb-2">
          Análise Visual da Campanha
        </h3>
        <p className="text-sm text-summer-600 dark:text-summer-600">
          {chartTabs.find(tab => tab.id === activeChart)?.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {chartTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveChart(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeChart === tab.id
                ? 'bg-summer-500 text-white shadow-lg transform scale-105'
                : 'bg-white/80 dark:bg-dark-600 text-summer-700 dark:text-summer-300 hover:bg-summer-100 dark:hover:bg-dark-500'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Container do Gráfico Ativo */}
      <div className="card p-6">
        <div className="h-96">
          {activeChart === 'volume' && <canvas ref={volumeChartRef} />}
          {activeChart === 'revenue' && <canvas ref={revenueChartRef} />}
          {activeChart === 'adhesion' && <canvas ref={adhesionChartRef} />}
          {activeChart === 'comparison' && <canvas ref={comparisonChartRef} />}
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-summer-600 dark:text-summer-400">
            {new Intl.NumberFormat('pt-BR', { 
              minimumFractionDigits: 0, 
              maximumFractionDigits: 0 
            }).format(totalVolume2025)}
          </div>
          <div className="text-sm text-summer-500 dark:text-summer-300">Volume 2025</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-summer-600 dark:text-summer-400">
            {new Intl.NumberFormat('pt-BR', { 
              style: 'currency', 
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(totalRevenue2025)}
          </div>
          <div className="text-sm text-summer-500 dark:text-summer-300">Faturamento 2025</div>
        </div>
        <div className="card p-4 text-center">
          <div className={`text-2xl font-bold ${
            volumeGrowth >= 0 ? 'text-green-500' : 'text-coral-500'
          }`}>
            {volumeGrowth >= 0 ? '+' : ''}{volumeGrowth.toFixed(1)}%
          </div>
          <div className="text-sm text-summer-500 dark:text-summer-300">Crescimento Volume</div>
        </div>
        <div className="card p-4 text-center">
          <div className={`text-2xl font-bold ${
            revenueGrowth >= 0 ? 'text-green-500' : 'text-coral-500'
          }`}>
            {revenueGrowth >= 0 ? '+' : ''}{revenueGrowth.toFixed(1)}%
          </div>
          <div className="text-sm text-summer-500 dark:text-summer-300">Crescimento Faturamento</div>
        </div>
      </div>

      {/* Legenda das Cores (apenas para Volume e Faturamento) */}
      {(activeChart === 'volume' || activeChart === 'revenue') && (
        <div className="flex justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded" 
              style={{ 
                backgroundColor: activeChart === 'volume' ? colors.primary : colors.accent 
              }}
            ></div>
            <span className="text-summer-600 dark:text-summer-400 font-semibold">
              2025
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded" 
              style={{ 
                backgroundColor: activeChart === 'volume' ? colors.secondary : colors.sand 
              }}
            ></div>
            <span className="text-summer-600 dark:text-summer-400">
              2024
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedCharts;