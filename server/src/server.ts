import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config/env.config';
import { productRoutes } from './routes/product.routes';


const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

app.use('/api', productRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: config.nodeEnv });
});

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log(`Connected to MongoDB (${config.nodeEnv})`);
    
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

