import { Router, Request, Response } from 'express';
import apiController from '../controllers/apiController';

const apiRouter = Router();

// 1. Fetch "Mars-Earht Comparison" data
// Test URL format (for POSTMAN): http://localhost:3000/api/comparisonData?lat=33.44&lon=-94.04
// TODO: Process the data and only send to the front-end what's necessary
apiRouter.get(
  '/comparisonData',
  apiController.fetchEarthData,
  apiController.fetchImageOfEarthLocation,
  apiController.fetchMarsData,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.weatherData);
  }
);

// 2. Fetch "Picture of the day" data
apiRouter.get('/pod', apiController.fetchPod, (req: Request, res: Response) => {
  res.status(200).json(res.locals.pod);
});

// 3. TODO: Fetch "Random 6 Pictures" from Mars
// (Optional) Dynamic variable - SOL
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=4Ft01vTgsi4Gp07fqeIlcrjaGJ0AO3fz1KHQaL8m
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2024-6-6&api_key=4Ft01vTgsi4Gp07fqeIlcrjaGJ0AO3fz1KHQaL8m

// 4. TODO: Make an AI API call to talk to the Martian

export default apiRouter;
