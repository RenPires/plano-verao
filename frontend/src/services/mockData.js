// Dados mock para desenvolvimento quando o backend não está disponível
export const mockClients = [
  {
    id: '1',
    name: 'MERC JAIRO 01',
    hasJoined: false,
    supervisor: 'José Welton',
    volume: {
      current: 75750.75,
      previous: 50654.98,
      variation: 49.54
    },
    revenue: {
      current: 1943753,
      previous: 1553851,
      variation: 25.09
    },
    segment: 'Mercado',
    region: 'Região 1'
  },
  {
    id: '2',
    name: 'ATACADAO JURERE 01',
    hasJoined: true,
    supervisor: 'José Welton',
    volume: {
      current: 49562.47,
      previous: 33989.59,
      variation: 45.82
    },
    revenue: {
      current: 1352532,
      previous: 1052425,
      variation: 28.51
    },
    segment: 'Atacado',
    region: 'Região 2'
  },
  {
    id: '3',
    name: 'ARMAZEM COREAU',
    hasJoined: false,
    supervisor: 'Marcos Epifanio',
    volume: {
      current: 1176.03,
      previous: 8304.61,
      variation: -85.84
    },
    revenue: {
      current: 34448,
      previous: 263733,
      variation: -86.94
    },
    segment: 'Armazém',
    region: 'Região 3'
  },
  {
    id: '4',
    name: 'BOM VIZINHO',
    hasJoined: true,
    supervisor: 'Romario Loiola',
    volume: {
      current: 18471.81,
      previous: 18524.03,
      variation: -0.28
    },
    revenue: {
      current: 540081,
      previous: 507821,
      variation: 6.35
    },
    segment: 'Mercado',
    region: 'Região 1'
  },
  {
    id: '5',
    name: 'BRASEIROS',
    hasJoined: false,
    supervisor: 'José Welton',
    volume: {
      current: 16736.34,
      previous: 9932.96,
      variation: 68.49
    },
    revenue: {
      current: 408338,
      previous: 280264,
      variation: 45.70
    },
    segment: 'Restaurante',
    region: 'Região 2'
  }
];

export const mockStats = {
  summary: {
    totalClients: 12,
    joinedClients: 4,
    adhesionRate: 33.33,
    pendingClients: 8
  },
  totals: {
    volume: {
      current: 245678.45,
      previous: 198765.32,
      variation: 23.61
    },
    revenue: {
      current: 8567321,
      previous: 7123456,
      variation: 20.26
    }
  },
  highlights: {
    topGrowthClients: [
      { name: 'MERC JAIRO 01', growth: 49.54 },
      { name: 'BRASEIROS', growth: 68.49 },
      { name: 'ATACADAO JURERE 01', growth: 45.82 }
    ]
  },
  timestamp: new Date().toISOString()
};