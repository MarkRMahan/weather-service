import express from "express";
import { weatherCoordinates } from "../controllers";

const router = express.Router();

export function weatherRoute() {
  router.get('/test', weatherCoordinates)
}