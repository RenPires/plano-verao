import express from 'express';
import { SalesService } from '../services/salesService.js';

const router = express.Router();

/**
 * @route GET /api/sales
 * @description Retorna todos os clientes com dados de vendas
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const clients = await SalesService.getAllClients();
    res.json({
      success: true,
      data: clients,
      count: clients.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in GET /api/sales:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * @route GET /api/sales/supervisors
 * @description Retorna lista de supervisores únicos
 * @access Public
 */
router.get('/supervisors', async (req, res) => {
  try {
    const supervisors = await SalesService.getSupervisors();
    res.json({
      success: true,
      data: supervisors,
      count: supervisors.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in GET /api/sales/supervisors:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * @route GET /api/sales/stats
 * @description Retorna estatísticas consolidadas da campanha
 * @access Public
 */
router.get('/stats', async (req, res) => {
  try {
    const stats = await SalesService.getCampaignStats();
    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in GET /api/sales/stats:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * @route GET /api/sales/filter
 * @description Retorna clientes com filtros aplicados
 * @access Public
 */
router.get('/filter', async (req, res) => {
  try {
    const { search, hasJoined, sortBy, sortOrder } = req.query;
    
    const filters = {};
    if (search) filters.search = search;
    if (hasJoined !== undefined) filters.hasJoined = hasJoined === 'true';
    if (sortBy) filters.sortBy = sortBy;
    if (sortOrder) filters.sortOrder = sortOrder;

    const clients = await SalesService.getFilteredClients(filters);
    res.json({
      success: true,
      data: clients,
      filters,
      count: clients.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in GET /api/sales/filter:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * @route GET /api/sales/export
 * @description Retorna dados formatados para exportação
 * @access Public
 */
router.get('/export', async (req, res) => {
  try {
    const exportData = await SalesService.getExportData();
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=plano-verao-dados.json');
    
    res.json({
      success: true,
      data: exportData,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in GET /api/sales/export:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

export default router;