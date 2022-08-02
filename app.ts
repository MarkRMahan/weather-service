import express from 'express';

const weatherApp = express();
const port: number = 3000;

weatherApp.get('/', (req, res) => {
  res.send('Hello Weather World!');
})

weatherApp.listen(port, () => {
  console.info(`Listening on port ${port}`);
})
