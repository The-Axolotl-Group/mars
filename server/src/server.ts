import dotenv from 'dotenv';
import express, { ErrorRequestHandler, Request, Response } from 'express';
import path from 'path';
import apiRouter from '../routes/api';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client')));

app.use('/api', apiRouter);

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
