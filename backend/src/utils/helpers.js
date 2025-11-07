/**
 * Calcula a variação percentual entre dois valores
 * @param {number} current - Valor atual (2024)
 * @param {number} previous - Valor anterior (2025)
 * @returns {number} Variação percentual
 */
export const calculateVariation = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Formata números para o padrão brasileiro
 * @param {number} value - Valor a ser formatado
 * @param {string} type - Tipo de formatação ('currency' ou 'number')
 * @returns {string} Valor formatado
 */
export const formatNumber = (value, type = 'number') => {
  if (type === 'currency') {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
  
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Converte string numérica brasileira para número (trata vírgula como decimal)
 */
const parseBrazilianNumber = (value) => {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return 0;
  
  // Remove pontos de milhar e substitui vírgula decimal por ponto
  const cleaned = value.replace(/\./g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
};

/**
 * Processa os dados brutos do Supabase para o formato esperado pelo frontend
 * @param {Array} data - Dados brutos do banco
 * @returns {Array} Dados processados
 */
export const processSalesData = (data) => {
  return data.map((client, index) => {
    // Converter strings numéricas brasileiras para números
    const volume2024 = parseBrazilianNumber(client.volume_2024);
    const volume2025 = parseBrazilianNumber(client.volume_2025);
    const faturamento2024 = parseInt(client.faturamento_2024) || 0;
    const faturamento2025 = parseInt(client.faturamento_2025) || 0;

    return {
      id: client.id || `client-${index}`,
      name: client.cliente || 'Cliente sem nome',
      hasJoined: client.aderido === 'sim',
      supervisor: client.supervisor || 'Não definido',
      volume: {
        current: volume2024,
        previous: volume2025,
        variation: calculateVariation(volume2024, volume2025)
      },
      revenue: {
        current: faturamento2024,
        previous: faturamento2025,
        variation: calculateVariation(faturamento2024, faturamento2025)
      },
      segment: client.segment || 'Não definido',
      region: client.region || 'Não definida',
      // Manter dados brutos para referência
      rawData: {
        aderido: client.aderido,
        supervisor: client.supervisor,
        volume_2024: client.volume_2024,
        volume_2025: client.volume_2025,
        faturamento_2024: client.faturamento_2024,
        faturamento_2025: client.faturamento_2025
      }
    };
  });
};

/**
 * Normaliza texto para busca (remove acentos e coloca em minúsculas)
 * @param {string} text - Texto para normalizar
 * @returns {string} Texto normalizado
 */
export const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};