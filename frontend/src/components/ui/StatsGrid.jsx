import React from 'react';
import Card from './Card';
import SunIcon from '../icons/SunIcon';
import TrendIcon from '../icons/TrendIcon';
import UsersIcon from '../icons/UsersIcon';
import ChartIcon from '../icons/ChartIcon';

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendDirection = "up",
  icon,
  color = "summer"
}) => {
  const colors = {
    summer: {
      bg: 'from-summer-500 to-ocean-500',
      iconBg: 'bg-summer-500/10',
      iconColor: 'text-summer-600',
      text: 'text-summer-700',
      value: 'text-summer-900'
    },
    sand: {
      bg: 'from-sand-400 to-sand-600',
      iconBg: 'bg-sand-500/10',
      iconColor: 'text-sand-600',
      text: 'text-sand-700',
      value: 'text-sand-900'
    },
    coral: {
      bg: 'from-coral-400 to-coral-600',
      iconBg: 'bg-coral-500/10',
      iconColor: 'text-coral-600',
      text: 'text-coral-700',
      value: 'text-coral-900'
    },
    ocean: {
      bg: 'from-ocean-400 to-ocean-600',
      iconBg: 'bg-ocean-500/10',
      iconColor: 'text-ocean-600',
      text: 'text-ocean-700',
      value: 'text-ocean-900'
    }
  };

  const colorSet = colors[color];

  return (
    <Card hover={true} padding="p-6" className="relative overflow-hidden">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorSet.bg} opacity-5`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className={`text-sm font-medium ${colorSet.text}`}>
              {title}
            </p>
            <p className={`text-2xl font-bold ${colorSet.value} mt-1`}>
              {value}
            </p>
          </div>
          <div className={`p-3 rounded-full ${colorSet.iconBg}`}>
            {React.cloneElement(icon, { 
              className: `w-6 h-6 ${colorSet.iconColor}` 
            })}
          </div>
        </div>
        
        {(subtitle || trend) && (
          <div className="flex items-center justify-between mt-2">
            {subtitle && (
              <span className={`text-xs ${colorSet.text}`}>
                {subtitle}
              </span>
            )}
            {trend && (
              <div className={`flex items-center space-x-1 ${
                trendDirection === 'up' ? 'text-green-500' : 'text-coral-500'
              }`}>
                <TrendIcon 
                  direction={trendDirection} 
                  className="w-4 h-4" 
                />
                <span className="text-xs font-medium">
                  {trend}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

const StatsGrid = ({ stats }) => {
  const {
    summary = {},
    totals = {}
  } = stats;

  const {
    totalClients = 0,
    joinedClients = 0,
    adhesionRate = 0,
    pendingClients = 0
  } = summary;

  const {
    volume = {},
    revenue = {}
  } = totals;

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

  // Calcular variações: (2025 - 2024) / 2024 * 100
  const volumeGrowth = ((volume.previous - volume.current) / volume.current) * 100;
  const revenueGrowth = ((revenue.previous - revenue.current) / revenue.current) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total de Clientes"
        value={totalClients}
        subtitle={`${pendingClients} pendentes`}
        color="summer"
        icon={<UsersIcon />}
      />
      
      <StatCard
        title="Adesões Confirmadas"
        value={joinedClients}
        subtitle={`${adhesionRate}% de adesão`}
        color="ocean"
        icon={<TrendIcon direction="up" />}
      />
      
      <StatCard
        title="Volume Total 2025"
        value={formatNumber(volume.previous || 0)}
        subtitle={`2024: ${formatNumber(volume.current || 0)}`}
        trend={!isNaN(volumeGrowth) ? `${volumeGrowth.toFixed(1)}%` : null}
        trendDirection={volumeGrowth >= 0 ? 'up' : 'down'}
        color="sand"
        icon={<ChartIcon />}
      />
      
      <StatCard
        title="Faturamento Total 2025"
        value={formatCurrency(revenue.previous || 0)}
        subtitle={`2024: ${formatCurrency(revenue.current || 0)}`}
        trend={!isNaN(revenueGrowth) ? `${revenueGrowth.toFixed(1)}%` : null}
        trendDirection={revenueGrowth >= 0 ? 'up' : 'down'}
        color="coral"
        icon={<ChartIcon />}
      />
    </div>
  );
};

export default StatsGrid;