import Express from 'express';
import { getWeatherData } from '../services';

export async function weatherCoordinates(req: Express.Request, res: Express.Response) {
  const queryParams: Record<string, any> = req.query;
  if (!queryParams.lat || !queryParams.lon) {
    // TODO: error out here
    return;
  }
  const weatherData = await getWeatherData(queryParams.lat, queryParams.lon);
  //console.log(weatherData);
  res.status(200).json(weatherData);
}
