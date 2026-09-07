import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { ecommerceRouter } from './server/ecommerceRoutes';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Full-Stack MERN E-Commerce REST API endpoints
app.use('/api/ecommerce', ecommerceRouter);

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'ApexTech MERN E-Commerce' });
});

// Start server with Vite middleware in development or static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ApexTech E-Commerce server running on port ${PORT}`);
  });
}

startServer();
