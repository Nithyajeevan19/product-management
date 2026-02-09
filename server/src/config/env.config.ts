import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'test';
const envFile = env === 'production' ? '.env.production' : '.env.test';

dotenv.config({ path: path.resolve(__dirname, '../../', envFile) });

interface IConfig {
  nodeEnv: string;
  port: number;
  mongoUri: string;
  corsOrigin: string;
}

const getConfig = (): IConfig => {
  const required = ['MONGODB_URI', 'CORS_ORIGIN', 'PORT'];
  
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  return {
    nodeEnv: env,
    port: parseInt(process.env.PORT || '5001', 10),
    mongoUri: process.env.MONGODB_URI!,
    corsOrigin: process.env.CORS_ORIGIN!
  };
};

export const config = getConfig();