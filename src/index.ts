import express, {Express} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import logger from './utils/logger.js';
import routes from './routes/index.js';

const app:Express = express();
const port:number = 3333;
dotenv.config({});  // Reads the .env values from disk

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(`/api`, routes );


app.listen(port, () => {
  console.log(`Backend starting on port ${port}`);
  logger.log('info', `Backend starting on port ${port}`);
});