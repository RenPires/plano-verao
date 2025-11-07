import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Interceptor para tratamento de erros melhorado
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'Erro ao conectar com o servidor';
    
    if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Servidor backend não está respondendo. Verifique se o backend está rodando na porta 3001.';
    } else if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    console.error('API Error:', {
      message: errorMessage,
      code: error.code,
      url: error.config?.url,
      status: error.response?.status
    });
    
    throw new Error(errorMessage);
  }
);

export const fetchSalesData = async () => {
  try {
    const response = await api.get('/sales');
    return response.data.data;
  } catch (error) {
    throw new Error(`Falha ao buscar dados de vendas: ${error.message}`);
  }
};

export const fetchCampaignStats = async () => {
  try {
    const response = await api.get('/sales/stats');
    return response.data.data;
  } catch (error) {
    throw new Error(`Falha ao buscar estatísticas: ${error.message}`);
  }
};

export const fetchFilteredClients = async (filters = {}) => {
  try {
    const response = await api.get('/sales/filter', { params: filters });
    return response.data.data;
  } catch (error) {
    throw new Error(`Falha ao buscar clientes filtrados: ${error.message}`);
  }
};

export const fetchSupervisors = async () => {
  try {
    const response = await api.get('/sales/supervisors');
    return response.data.data;
  } catch (error) {
    throw new Error(`Falha ao buscar lista de supervisores: ${error.message}`);
  }
};

export default api;