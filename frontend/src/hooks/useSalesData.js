import { useState, useEffect, useMemo } from 'react';
import { fetchSalesData } from '../services/api';
import { mockClients, mockStats } from '../services/mockData';

export const useSalesData = () => {
  const [data, setData] = useState({
    clients: [],
    stats: {},
    supervisors: [],
    loading: true,
    error: null,
    usingMockData: false
  });

  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    supervisor: 'all',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  // ✅ FUNÇÃO PARA CALCULAR ESTATÍSTICAS DINÂMICAS
  const calculateStats = (clientsArray) => {
    if (!clientsArray || clientsArray.length === 0) {
      return {
        summary: {
          totalClients: 0,
          joinedClients: 0,
          adhesionRate: 0,
          pendingClients: 0
        },
        totals: {
          volume: {
            current: 0, // 2024
            previous: 0, // 2025
            variation: 0
          },
          revenue: {
            current: 0, // 2024
            previous: 0, // 2025
            variation: 0
          }
        }
      };
    }

    const totalClients = clientsArray.length;
    const joinedClients = clientsArray.filter(client => client.hasJoined).length;
    const pendingClients = totalClients - joinedClients;
    const adhesionRate = totalClients > 0 ? (joinedClients / totalClients) * 100 : 0;

    const totalVolume2024 = clientsArray.reduce((sum, client) => sum + (client.volume?.current || 0), 0);
    const totalVolume2025 = clientsArray.reduce((sum, client) => sum + (client.volume?.previous || 0), 0);
    const totalRevenue2024 = clientsArray.reduce((sum, client) => sum + (client.revenue?.current || 0), 0);
    const totalRevenue2025 = clientsArray.reduce((sum, client) => sum + (client.revenue?.previous || 0), 0);

    const volumeGrowth = totalVolume2024 > 0 ? 
      ((totalVolume2025 - totalVolume2024) / totalVolume2024) * 100 : 0;
    
    const revenueGrowth = totalRevenue2024 > 0 ? 
      ((totalRevenue2025 - totalRevenue2024) / totalRevenue2024) * 100 : 0;

    return {
      summary: {
        totalClients,
        joinedClients,
        adhesionRate,
        pendingClients
      },
      totals: {
        volume: {
          current: totalVolume2024, // 2024
          previous: totalVolume2025, // 2025
          variation: volumeGrowth
        },
        revenue: {
          current: totalRevenue2024, // 2024
          previous: totalRevenue2025, // 2025
          variation: revenueGrowth
        }
      }
    };
  };

  // ✅ FILTER AND SORT CLIENTS - DEFINIR ANTES DE USAR
  const filteredClients = useMemo(() => {
    let filtered = data.clients;

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(searchLower) ||
        (client.supervisor && client.supervisor.toLowerCase().includes(searchLower))
      );
    }

    // Status filter
    if (filters.status === 'joined') {
      filtered = filtered.filter(client => client.hasJoined);
    } else if (filters.status === 'not-joined') {
      filtered = filtered.filter(client => !client.hasJoined);
    }

    // Supervisor filter
    if (filters.supervisor !== 'all') {
      filtered = filtered.filter(client => client.supervisor === filters.supervisor);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      let aValue, bValue;

      switch (filters.sortBy) {
        case 'volume2025':
          aValue = a.volume?.previous || 0; // 2025
          bValue = b.volume?.previous || 0;
          break;
        case 'revenue2025':
          aValue = a.revenue?.previous || 0; // 2025
          bValue = b.revenue?.previous || 0;
          break;
        case 'volumeGrowth':
          aValue = a.volume?.variation || ((a.volume?.previous - a.volume?.current) / a.volume?.current) * 100 || 0;
          bValue = b.volume?.variation || ((b.volume?.previous - b.volume?.current) / b.volume?.current) * 100 || 0;
          break;
        case 'revenueGrowth':
          aValue = a.revenue?.variation || ((a.revenue?.previous - a.revenue?.current) / a.revenue?.current) * 100 || 0;
          bValue = b.revenue?.variation || ((b.revenue?.previous - b.revenue?.current) / b.revenue?.current) * 100 || 0;
          break;
        case 'supervisor':
          aValue = a.supervisor || '';
          bValue = b.supervisor || '';
          break;
        case 'growth':
          const aVolumeGrowth = a.volume?.variation || ((a.volume?.previous - a.volume?.current) / a.volume?.current) * 100 || 0;
          const aRevenueGrowth = a.revenue?.variation || ((a.revenue?.previous - a.revenue?.current) / a.revenue?.current) * 100 || 0;
          aValue = (aVolumeGrowth + aRevenueGrowth) / 2;
          
          const bVolumeGrowth = b.volume?.variation || ((b.volume?.previous - b.volume?.current) / b.volume?.current) * 100 || 0;
          const bRevenueGrowth = b.revenue?.variation || ((b.revenue?.previous - b.revenue?.current) / b.revenue?.current) * 100 || 0;
          bValue = (bVolumeGrowth + bRevenueGrowth) / 2;
          break;
        case 'name':
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (typeof aValue === 'string') {
        return filters.sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      aValue = isNaN(aValue) ? 0 : aValue;
      bValue = isNaN(bValue) ? 0 : bValue;

      return filters.sortOrder === 'asc' 
        ? aValue - bValue
        : bValue - aValue;
    });

    return filtered;
  }, [data.clients, filters]);

  // ✅ AGORA SIM: STATS GERAIS (todos os clientes)
  const generalStats = useMemo(() => {
    return calculateStats(data.clients);
  }, [data.clients]);

  // ✅ STATS FILTRADOS (clientes filtrados)
  const filteredStats = useMemo(() => {
    return calculateStats(filteredClients);
  }, [filteredClients]);

  // ✅ VERIFICAR SE DEVE USAR STATS FILTRADOS
  const shouldUseFilteredStats = useMemo(() => {
    return filters.supervisor !== 'all' || filters.status !== 'all' || filters.search !== '';
  }, [filters]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null, usingMockData: false }));
        
        const response = await fetchSalesData();
        
        let clientsData = [];
        
        if (response && Array.isArray(response)) {
          clientsData = response;
        } else if (response && response.data && Array.isArray(response.data)) {
          clientsData = response.data;
        } else if (response && response.success && Array.isArray(response.data)) {
          clientsData = response.data;
        } else {
          throw new Error('Formato de resposta do backend não reconhecido');
        }

        if (clientsData.length > 0) {
          const uniqueSupervisors = [...new Set(clientsData.map(client => client.supervisor))].filter(Boolean).sort();
          const initialStats = calculateStats(clientsData);
          
          setData({
            clients: clientsData,
            stats: initialStats,
            supervisors: uniqueSupervisors,
            loading: false,
            error: null,
            usingMockData: false
          });
        } else {
          throw new Error('Backend retornou dados vazios');
        }
      } catch (error) {
        console.warn('Falha ao carregar dados do backend, usando dados mock:', error.message);
        
        const mockSupervisors = [...new Set(mockClients.map(client => client.supervisor))].filter(Boolean).sort();
        const mockStatsCalculated = calculateStats(mockClients);

        setData({
          clients: mockClients,
          stats: mockStatsCalculated,
          supervisors: mockSupervisors,
          loading: false,
          error: `Modo de desenvolvimento: ${error.message}`,
          usingMockData: true
        });
      }
    };

    loadData();
  }, []);

  return {
    ...data,
    filteredClients,
    filters,
    setFilters,
    // ✅ AGORA TODAS AS VARIÁVEIS ESTÃO DEFINIDAS
    stats: generalStats,
    filteredStats: filteredStats,
    shouldUseFilteredStats: shouldUseFilteredStats
  };
};