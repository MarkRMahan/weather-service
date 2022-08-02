import express from 'express';
import { weatherRoute } from './src/routes';

const weatherApp = express();

// TODO: Write README.md
// TODO: Write jest unit tests
// TODO: Write endpoints

weatherApp.get('/', (req, res) => {
  res.send('Hello Weather World!');
});

weatherApp.use(express.json());
weatherApp.use('/api', weatherRoute);

const port: number = 3000;
weatherApp.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
