import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { connectDB } from './configs/dbConfig.js';
import { PORT } from './configs/serverConfigs.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'Server is up'
  });
});

app.listen(PORT, async () => {
  connectDB()
  console.log(`App is listening on ${PORT}`);
});
