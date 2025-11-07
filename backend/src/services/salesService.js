import { supabase } from '../config/supabase.js';
import { processSalesData, calculateVariation, normalizeText } from '../utils/helpers.js';

export class SalesService {
  /**
   * Busca todos os clientes e seus dados de vendas
   * @returns {Promise<Array>} Lista de clientes com dados processados
   */
  static async getAllClients() {
    try {
      const { data, error } = await supabase
        .from('plano_verao')
        .select('*')
        .order('cliente');

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log(`✅ Encontrados ${data?.length || 0} clientes na tabela plano_verao`);
      return processSalesData(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw new Error(`Erro ao buscar dados dos clientes: ${error.message}`);
    }
  }

  /**
   * Busca estatísticas gerais da campanha
   * @returns {Promise<Object>} Estatísticas consolidadas
   */
  static async getCampaignStats() {
    try {
      const clients = await this.getAllClients();
      
      const totalClients = clients.length;
      const joinedClients = clients.filter(client => client.hasJoined).length;
      const adhesionRate = totalClients > 0 ? (joinedClients / totalClients) * 100 : 0;

      // Calcular totais de volume e faturamento
      const totalVolume = {
        current: clients.reduce((sum, client) => sum + client.volume.current, 0),
        previous: clients.reduce((sum, client) => sum + client.volume.previous, 0)
      };
      
      const totalRevenue = {
        current: clients.reduce((sum, client) => sum + client.revenue.current, 0),
        previous: clients.reduce((sum, client) => sum + client.revenue.previous, 0)
      };

      totalVolume.variation = calculateVariation(totalVolume.current, totalVolume.previous);
      totalRevenue.variation = calculateVariation(totalRevenue.current, totalRevenue.previous);

      // Clientes com maior crescimento
      const topGrowthClients = clients
        .filter(client => client.volume.variation > 0)
        .sort((a, b) => b.volume.variation - a.volume.variation)
        .slice(0, 5);

      return {
        summary: {
          totalClients,
          joinedClients,
          adhesionRate: Math.round(adhesionRate * 100) / 100,
          pendingClients: totalClients - joinedClients
        },
        totals: {
          volume: totalVolume,
          revenue: totalRevenue
        },
        highlights: {
          topGrowthClients: topGrowthClients.map(client => ({
            name: client.name,
            growth: Math.round(client.volume.variation * 100) / 100
          }))
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error calculating campaign stats:', error);
      throw new Error('Erro ao calcular estatísticas da campanha');
    }
  }

  /**
   * Busca clientes com filtros
   * @param {Object} filters - Filtros para aplicar
   * @returns {Promise<Array>} Clientes filtrados
   */
  static async getFilteredClients(filters = {}) {
    try {
      let query = supabase
        .from('plano_verao')
        .select('*');

      // Aplicar filtros
      if (filters.search) {
        const searchTerm = normalizeText(filters.search);
        // Filtro manual no código
        const allData = await query;
        if (allData.error) throw allData.error;
        
        const filteredData = allData.data.filter(client => 
          normalizeText(client.cliente).includes(searchTerm)
        );
        return processSalesData(filteredData);
      }

      if (filters.hasJoined !== undefined) {
        const aderidoValue = filters.hasJoined ? 'sim' : 'não';
        query = query.eq('aderido', aderidoValue); // Agora usando 'aderido'
      }

      // NOVO FILTRO: Supervisor
      if (filters.supervisor && filters.supervisor !== 'all') {
        query = query.eq('supervisor', filters.supervisor);
      }

      // Ordenação
      if (filters.sortBy) {
        const sortOrder = filters.sortOrder === 'desc' ? false : true;
        
        // Mapear nomes das colunas do frontend para o banco
        const columnMap = {
          'name': 'cliente',
          'volume.current': 'volume_2024',
          'volume.previous': 'volume_2025',
          'revenue.current': 'faturamento_2024',
          'revenue.previous': 'faturamento_2025',
          'supervisor': 'supervisor' // NOVA COLUNA
        };
        
        const dbColumn = columnMap[filters.sortBy] || filters.sortBy;
        query = query.order(dbColumn, { ascending: sortOrder });
      } else {
        query = query.order('cliente');
      }

      const { data, error } = await query;

      if (error) throw error;

      return processSalesData(data || []);
    } catch (error) {
      console.error('Error fetching filtered clients:', error);
      throw new Error('Erro ao buscar clientes filtrados');
    }
  }

  /**
   * Busca lista de supervisores únicos
   * @returns {Promise<Array>} Lista de supervisores
   */
  static async getSupervisors() {
    try {
      const { data, error } = await supabase
        .from('plano_verao')
        .select('supervisor')
        .not('supervisor', 'is', null);

      if (error) throw error;

      // Extrair supervisores únicos e ordenar
      const supervisors = [...new Set(data.map(item => item.supervisor))]
        .filter(supervisor => supervisor && supervisor.trim() !== '')
        .sort();

      return supervisors;
    } catch (error) {
      console.error('Error fetching supervisors:', error);
      throw new Error('Erro ao buscar lista de supervisores');
    }
  }
}