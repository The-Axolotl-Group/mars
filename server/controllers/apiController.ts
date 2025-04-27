import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const NASA_API_KEY = process.env.NASA_API_KEY;
const MARS_URL = 'https://api.nasa.gov/insight_weather/?api_key=';
const NASA_URL = MARS_URL + NASA_API_KEY;
const NASA_POD_URL =
  'https://api.nasa.gov/planetary/apod?api_key=' + NASA_API_KEY;

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_URL = 'https://api.openweathermap.org/data/3.0/onecall?';

/*
Resources:
- InSight Lander Location: https://science.nasa.gov/mission/mars-2020-perseverance/location-map/
- handleForm React + Express: https://www.youtube.com/watch?v=GR5-aao7Y-0
- fetchAPI request: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

Links:
- Query URL format: http://localhost:3000/api/fetchEarthData?lat={lat}&lon={lon}
- Test URL format (for POSTMAN): http://localhost:3000/api/comparisonData?lat=33.44&lon=-94.04
*/

const apiController = {
  getData: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {},

  // Fetch Earths' Weather Data Given LATITUDE & LONGITUDE
  fetchEarthData: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { lat, lon } = req.query;

    /*  FETCH EARTHS DATA
        "lat": 33.44,
        "lon": -94.04,
        "timezone": "America/Chicago",
        "timezone_offset": -18000,
        "daily": [
          {
            "dt": 1745690400, <---
            "temp": {
              "day": 300.86, <---
              "min": 291.57, <---
              "max": 300.86, <---
            },
            "pressure": 1018, <---
            "wind_speed": 3.48, <---
          },
       */

    try {
      const response = await fetch(
        OPENWEATHER_URL + `lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      if (!res.locals.weatherData) res.locals.weatherData = {};

      const randomDay = data.daily[0];
      console.log(randomDay.dt);
      console.log(randomDay.temp.day);

      res.locals.weatherData.earth = {
        date: randomDay.dt,
        temp_avg: randomDay.temp.day, // <---
        temp_min: randomDay.temp.min, // <---
        temp_max: randomDay.temp.max, // <---
        pressure: randomDay.pressure, // <---
        wind_speed: randomDay.wind_speed, // <---
        humidity: randomDay.humidity,
      };

      console.log('### EARTH DATA ###');
      console.log(res.locals.weatherData.earth);
      return next();
    } catch (err) {
      return next({
        log: `fetchEarthData Error: ${err}`,
        status: 500,
        message: { error: 'An error occurred inside fetchEarthData' },
      });
    }
  },
  // https://api.nasa.gov/insight_weather/?api_key=4Ft01vTgsi4Gp07fqeIlcrjaGJ0AO3fz1KHQaL8m
  // https://api.nasa.gov/insight_weather/?api_key=4Ft01vTgsi4Gp07fqeIlcrjaGJ0AO3fz1KHQaL8m&feedtype=json&ver=1.0

  // Fetch Mars Weather Data
  fetchMarsData: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    /* !!! 
    
    1/ Implement logic where we look up the data inside our database
    - If we can find it, retrieve form the data base.
    - If we canNOT find it, run the fetch call and SAVE the data as to avoid repeated DB fetches.

    2/ Let the user select the SOL
    */

    const FINAL_URL = `${NASA_URL}&feedtype=json&ver=1.0`;
    console.log(FINAL_URL);

    try {
      const response = await fetch(FINAL_URL);
      console.log(FINAL_URL);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      const sols = data.sol_keys;
      console.log(sols);
      const lastSol = sols[sols.length - 1];
      if (!res.locals.weatherData) res.locals.weatherData = {};
      res.locals.weatherData.mars = {
        sol: lastSol,
        temperature_avg: lastSol.AT.av,
        temperature_min: lastSol.AT.mn,
        temperature_max: lastSol.AT.mx,
        wind_speed: lastSol.HWS.av,
        pressue: lastSol.PRE.av,
      };

      /* DATA CATALOG: https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf
        "675": {
          "AT": {
            "av": -62.314, <---
            "ct": 177556,
            "mn": -96.872, <---
            "mx": -15.908 <---
          },
          "First_UTC": "2020-10-19T18:32:20Z", <---
          "HWS": {
            "av": 7.233, <---
          },
          "Last_UTC": "2020-10-20T19:11:55Z",
          "Month_ordinal": 10,
          "Northern_season": "early winter",
          "PRE": {
            "av": 750.563, <---
          },
          "Season": "fall",
          "Southern_season": "early summer",
        },
   */

      console.log('### MARS DATA ###');
      console.log(res.locals.weatherData);
      return next();
    } catch (err) {
      return next({
        log: `fetchMarsData Error: ${err}`,
        status: 500,
        message: { error: 'An error occurred inside fetchMarsData' },
      });
    }
  },

  // URL: https://api.nasa.gov/planetary/earth/imagery?lat=36.098592&lon=-112.097796&date=2020-01-01&cloud_score=true&dim=0.3&api_key=4Ft01vTgsi4Gp07fqeIlcrjaGJ0AO3fz1KHQaL8m
  fetchImageOfEarthLocation: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // !!! Make date dynamic
      const { lat, lon } = req.query;
      const FINAL_URL = `https://api.nasa.gov/planetary/earth/imagery?lat=${lat}&lon=${lon}&date=2024-01-01&cloud_score=true&dim=0.3&api_key=${NASA_API_KEY}`;
      console.log(FINAL_URL);
      const response = await fetch(FINAL_URL);
      const data = await response.json();

      if (!res.locals.weatherData) res.locals.weatherData = {};
      res.locals.weatherData.earth.randomImage = data;

      return next();
    } catch (err) {
      return next({
        log: `fetchImageOfEarthLocation data Error: ${err}`,
        status: 500,
        message: { error: 'An error occurred' },
      });
    }
  },

  // Fetch Picture Of The Day
  fetchPod: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const response = await fetch(NASA_POD_URL);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      res.locals.pod = data;
      console.log(res.locals.pod);
      return next();
    } catch (err) {
      return next({
        log: `fetchPod data Error: ${err}`,
        status: 500,
        message: { error: 'An error occurred' },
      });
    }
  },
};

export default apiController;
