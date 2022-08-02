import express from 'express';
import { weatherCoordinates } from '../controllers';

const router = express.Router();

export class Routes {
  get weatherRoutes() {
    router.get('/weather', weatherCoordinates);
    return router;
  }
}
