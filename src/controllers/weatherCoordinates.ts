import Express from 'express';
import { ErrorMessages } from '../common/constants';
import { getWeatherData } from '../services';

export async function weatherCoordinates(req: Express.Request, res: Express.Response) {
  const queryParams: Record<string, any> = req.query;
  if (!queryParams.lat || !queryParams.lon) {
    res.status(500).send({ error: ErrorMessages.coordinatesMissing });
    return;
  }
  const weatherData = await getWeatherData(queryParams.lat, queryParams.lon);
  res.status(200).json(weatherData);
}
