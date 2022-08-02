import axios from 'axios';
import { URLs } from '../common/constants';

const dotenv = require('dotenv');
dotenv.config();

export async function findWeatherData(
  latitude: string,
  longitude: string
): Promise<Record<string, any>> {
  const weatherData = await axios
    .get(`${URLs.weatherUrl}?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
  return weatherData;
}
