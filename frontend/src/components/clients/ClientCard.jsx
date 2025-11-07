import React from 'react';
import Card from '../ui/Card';
import TrendIcon from '../icons/TrendIcon';
import { CheckCircle, XCircle } from 'lucide-react';

const ClientCard = ({ client }) => {
  const {
    name,
    hasJoined,
    volume,
    revenue
  } = client;

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

  const StatItem = ({ label, current, previous, variation }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <span className="text-sm font-medium text-summer-600">{label}</span>
        <div className={`flex items-center space-x-1 ${
          variation >= 0 ? 'text-green-500' : 'text-coral-500'
        }`}>
          <TrendIcon 
            direction={variation >= 0 ? 'up' : 'down'} 
            className="w-4 h-4" 
          />
          <span className="text-xs font-semibold">
            {Math.abs(variation).toFixed(1)}%
          </span>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-summer-500">2024:</span>
          <span className="font-semibold text-summer-800">
            {label.includes('Faturamento') ? formatCurrency(current) : formatNumber(current)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-summer-500">2025:</span>
          <span className="font-medium text-summer-600">
            {label.includes('Faturamento') ? formatCurrency(previous) : formatNumber(previous)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Card hover={true} className="group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-summer-800 group-hover:text-summer-900 transition-colors">
            {name}
          </h3>
        </div>
        
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
          hasJoined 
            ? 'bg-green-100 text-green-700' 
            : 'bg-coral-100 text-coral-700'
        }`}>
          {hasJoined ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Aderido</span>
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Não Aderido</span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatItem
          label="Volume"
          current={volume.current}
          previous={volume.previous}
          variation={volume.variation}
        />
        
        <StatItem
          label="Faturamento"
          current={revenue.current}
          previous={revenue.previous}
          variation={revenue.variation}
        />
      </div>

      {/* Growth indicator bar */}
      <div className="mt-4 pt-4 border-t border-summer-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-summer-600">Crescimento geral:</span>
          <span className={`font-semibold ${
            volume.variation >= 0 && revenue.variation >= 0 
              ? 'text-green-500' 
              : 'text-coral-500'
          }`}>
            {((volume.variation + revenue.variation) / 2).toFixed(1)}%
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ClientCard;