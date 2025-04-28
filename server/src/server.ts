import dotenv from 'dotenv';
import express, { ErrorRequestHandler, Request, Response } from 'express';
import path from 'path';
import apiRouter from '../routes/api';
import cors from 'cors';
import OpenAI from 'openai';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// OpenAI auth: https://github.com/openai/openai-node
const client = new OpenAI({ apiKey: process.env['OPENAI_KEY'] });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client')));

app.use('/api', apiRouter(client));

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('API is working...');
});

// https://stackoverflow.com/questions/50218878/typescript-express-error-function
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  res.status(errorObj.status).json(errorObj.message);
};
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
