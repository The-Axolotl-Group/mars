import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import path from 'path';
import apiRouter from '../routes/api';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('API is working');
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
