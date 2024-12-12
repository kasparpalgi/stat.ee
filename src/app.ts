import express from 'express';
import handleRequest from './application/routes/eestat/1/elujoud/id';
import { env } from './infrastructure/config/environment';

const app = express();
const port = env.get('PORT');

// Middleware
app.use(express.json());

// Routes
app.post('/eestat/1/elujoud', handleRequest);

// Health check endpoint
app.head('/eestat/1/elujoud', (_, res) => res.sendStatus(200));

// Start server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app; 