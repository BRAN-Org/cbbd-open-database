import express from 'express';
import cors from 'cors';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadData } from './src/dataManager.js';
import { getDatasetConfig } from './src/config.js';
import { createApiRouter } from './src/routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares padrão
app.use(cors());
app.use(express.json());

// Carregar dataset em memória no boot
loadData();

// Servir arquivos estáticos do Dashboard (public/)
app.use(express.static(join(__dirname, 'public')));

// Montar rotas da API REST
const apiRouter = createApiRouter();
app.use('/api/v1', apiRouter);
app.use('/api', apiRouter); // Alias de compatibilidade rápida

// Fallback para a SPA / Dashboard no root
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint não encontrado' });
  }
  res.sendFile(join(__dirname, 'public/index.html'));
});

// Inicializar Servidor em modo local
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    const config = getDatasetConfig();
    console.log(`=======================================================`);
    console.log(`🚀 BRAN Open Data Server rodando na porta ${PORT}`);
    console.log(`📌 Dataset: ${config.dataset?.title || 'BRAN Template'}`);
    console.log(`🌐 Dashboard: http://localhost:${PORT}`);
    console.log(`📡 REST API:  http://localhost:${PORT}/api/v1/${config.dataset?.entityName || 'articles'}`);
    console.log(`=======================================================`);
  });
}

export default app;
