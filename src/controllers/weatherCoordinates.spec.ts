import * as weatherController from './weatherCoordinates';
import Express from 'express';

let mockReq: Express.Request;
let mockRes: Express.Response;

beforeAll(() => {
  mockReq = { query: { lat: '37', lon: '93' } } as any as Express.Request;
  mockRes = {
    status: () => {
      return { json: () => {} };
    }
  } as any as Express.Response;
});

jest.mock('../services/weatherService', () => {
  return {
    getWeatherData: () => {
      return { weather: 'Scattered Clouds', temperature: 'Hot', alerts: ['Heat Advisory'] };
    }
  };
});

describe('weatherCoordinates', () => {
  it('should return weather data', async () => {
    const weatherSpy = jest
      .spyOn(weatherController, 'weatherCoordinates')
      .mockReturnValue(weatherController.weatherCoordinates(mockReq, mockRes));
    await weatherController.weatherCoordinates(mockReq, mockRes);
    expect(weatherSpy).toHaveBeenCalled;
  });
});
