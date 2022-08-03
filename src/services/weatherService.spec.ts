import { Temperatures } from '../common/constants';
import * as weatherService from './weatherService';

interface WeatherData {
  current: Record<string, Record<string, string>[] | number>;
  alerts?: Record<string, string>[];
}

const temperatureNum = 325;
const typeOfWeather = 'Scattered Clouds';
const currentAlerts = [{ event: 'Heat Advisory' }];
let mockWeatherData: WeatherData = {
  current: {
    weather: [{ description: typeOfWeather }],
    temp: temperatureNum
  },
  alerts: currentAlerts
};

jest.mock('./weatherService', () => {
  const originalService = jest.requireActual('./weatherService');
  return {
    __esModule: true,
    getWeatherData: jest.fn(() => originalService.parseAndFormatData(mockWeatherData)),
    findWeatherData: jest.fn(() => mockWeatherData),
    parseAndFormatData: originalService.parseAndFormatData
  };
});

describe('weatherService', () => {
  const expectedWeatherResult = {
    weather: typeOfWeather,
    temperature: Temperatures.hot,
    alerts: [...currentAlerts.map((current) => current.event)]
  };

  it('should get weather data', async () => {
    const latitude = '30';
    const longitude = '60';
    const weatherData = await weatherService.getWeatherData(latitude, longitude);
    expect(weatherData).toEqual(expectedWeatherResult);
  });

  it('should parse and return weather data without alerts', () => {
    const fakeData: WeatherData = {
      ...mockWeatherData
    };
    delete fakeData.alerts;
    const weatherData = weatherService.parseAndFormatData(fakeData);
    expect(weatherData).toEqual({
      weather: expectedWeatherResult.weather,
      temperature: expectedWeatherResult.temperature
    });
  });

  it('should parse and return data with alerts', () => {
    const weatherData = weatherService.parseAndFormatData(mockWeatherData);
    expect(weatherData).toEqual(expectedWeatherResult);
  });
});
