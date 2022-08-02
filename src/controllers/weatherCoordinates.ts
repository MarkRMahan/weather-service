import Express from 'express';
import { findWeatherData } from '../services';

export function weatherCoordinates(req: Express.Request, res: Express.Response) {
  const weatherData = findWeatherData();
  res.status(200).json({
    It: weatherData
  });
}
