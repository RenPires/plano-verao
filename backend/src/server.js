import app from './app.js';

const PORT = process.env.PORT || 3001;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log(`
🚀 Plano Verão Backend Server Started!
📍 Port: ${PORT}
🌍 Environment: ${ENVIRONMENT}
📊 Endpoints:
   • Health: http://localhost:${PORT}/health
   • Sales API: http://localhost:${PORT}/api/sales
   • Stats API: http://localhost:${PORT}/api/sales/stats
   • Filter API: http://localhost:${PORT}/api/sales/filter
   • Supervisors API: http://localhost:${PORT}/api/sales/supervisors
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default server;