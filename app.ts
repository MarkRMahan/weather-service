import express from 'express';
import { Routes } from './src/routes';

const weatherApp = express();

const routes = new Routes();

weatherApp.use(express.json());
weatherApp.use('/api', routes.weatherRoutes);

const port: number = 3000;
weatherApp.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
