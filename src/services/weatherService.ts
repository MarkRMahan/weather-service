import axios from 'axios';
import { Temperatures, URLs } from '../common/constants';
import { TemperatureRanges } from '../common/constants';

const dotenv = require('dotenv');
dotenv.config();

export async function getWeatherData(
  latitude: string,
  longitude: string
): Promise<Record<string, any>> {
  const weatherData = await findWeatherData(latitude, longitude);
  const formattedData = parseAndFormatData(weatherData);
  return formattedData;
}

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

export function parseAndFormatData(data: Record<string, any>): Record<string, string> {
  const dataToPresent: Record<string, string> = {};
  const temp = data.current.temp;
  const currentTemp =
    temp >= TemperatureRanges.hotTemp
      ? Temperatures.hot
      : temp <= TemperatureRanges.coldTemp
      ? Temperatures.cold
      : Temperatures.moderate;
  dataToPresent.weather = data.current.weather[0].description.replace(/\w\S*/g, (word: string) =>
    word.replace(/^\w/, (c) => c.toUpperCase())
  );
  dataToPresent.temperature = currentTemp;
  if (data.alerts) {
    dataToPresent.alerts = data.alerts.map((current: Record<string, any>) => current.event);
  }

  return dataToPresent;
}
