import * as weatherController from './weatherCoordinates';
import Express from 'express';
import { ErrorMessages } from '../common/constants';

let mockReq: Express.Request;
let mockRes: Express.Response;
let mockWeatherData = {
  weather: 'Scattered Clouds',
  temperature: 'Hot',
  alerts: ['Heat Advisory']
};

beforeEach(() => {
  mockReq = { query: { lat: '37', lon: '93' } } as any as Express.Request;
  mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis()
  } as any as Express.Response;
});

jest.mock('../services/weatherService', () => ({
  __esModule: true,
  getWeatherData: jest.fn((lat, lon) => {
    return mockWeatherData;
  })
}));

describe('weatherCoordinates', () => {
  it('should send a 200 with weather data', async () => {
    await weatherController.weatherCoordinates(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.status(200).json).toHaveBeenCalledWith(mockWeatherData);
  });

  it('should send a 500 and an error', async () => {
    mockReq = { query: { lat: '123' } } as any as Express.Request;
    await weatherController.weatherCoordinates(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.status(500).send).toHaveBeenCalledWith({
      error: ErrorMessages.coordinatesMissing
    });
  });
});
