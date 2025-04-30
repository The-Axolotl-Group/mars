import request from 'supertest';
import app from '../server'; // import your app
//👉 This imports the nock library, which is used to intercept and mock HTTP requests in your test environment.
import nock from 'nock';

describe('GET /api/comparisonData', () => {
  it('should return Earth and Mars weather data', async () => {
    const res = await request(app)
      .get('/api/comparisonData?lat=35&lon=139')
      .expect(200);

    expect(res.body.earth).toBeDefined();
    expect(res.body.mars).toBeDefined();
  });
});

describe('GET /api/comparisonData', () => {
  it('should not return Earth or Mars weather data', async () => {
    const res = await request(app)
    .get('/api/comparisonData')
    .expect(500);

    expect(res.body.earth).not.toBeDefined();
    expect(res.body.mars).not.toBeDefined();
  });
});

// describe('GET /api/comparisonData', () => {
//   it('should not return Earth but return Mars weather data', async () => {
//    // Mock the Earth API to return an error
//    nock('https://earth-weather-api.com')
//    .get('/weather')
//    .reply(500);

//    // Mock the Mars API to return valid data
//    nock('https://mars-weather-api.com')
//    .get('/weather')
//    .reply(200, { temperature: -60 });

//    const res = await request(app)
//       .get('/api/comparisonData?lat=35&lon=139')
//       .expect(200);

//       expect(res.body.earth).not.toBeDefined(); // Earth data should be missing
//       expect(res.body.mars).toBeDefined(); // Mars data should be present
//       expect(res.body.mars.temperature).toBe(-60); // Validate Mars data
//   });
// });

// describe('GET /api/comparisonData', () => {
//   it('should return Earth but not return Mars weather data', async () => {
//   // Mock the Earth API to return valid data
//    nock('https://earth-weather-api.com')
//    .get('/weather')
//    .reply(200, { temperature: 60 });

//    // Mock the Mars API to NOT return valid data
//    nock('https://mars-weather-api.com')
//    .get('/weather')
//    .reply(500);

//    const res = await request(app)
//       .get('/api/comparisonData?lat=35&lon=139')
//       .expect(200);

//       expect(res.body.mars).not.toBeDefined(); // Mars data should be missing
//       expect(res.body.earth).toBeDefined(); // Earth data should be present
//       expect(res.body.earth.temperature).toBe(60); // Validate Earth data
//       // Possibly need to make new function for earth and mars data respectively

//   });
// });

describe('GET /api/pod', () => {
    it('should return picture of the day data', async () => {
      const res = await request(app)
        .get('/api/pod')
        .expect(200);
  
      expect(res.body).toBeDefined();
      expect(['image', 'video']).toContain(res.body.media_type);
    });
  });
  
  
describe('GET /api/pod (invalid endpoint)', () => {
    it('should return 404 for invalid route', async () => {
      const res = await request(app)
        .get('/api/podi') // invalid route
        .expect(404); // this assumes you're using default express 404 handler
  
      expect(res.body).toEqual({error: 'Route not found'}); // or check for a custom error message if you send one
    });
  });

  //This defines a test suite for the case when the NASA API fails (e.g. returns a 500 error).
describe('GET /api/pod (NASA API error)',() =>{
    beforeEach(()=>{
        //•	nock('https://api.nasa.gov'): targets the domain you’re mocking (NASA API).
        //•	.get('/planetary/apod'): intercepts a GET request to /planetary/apod.
        //•	.query(true): allows any query string, like ?api_key=....
        //•	.reply(500, { error: 'Internal NASA error' }): simulates a 500 Internal Server Error, and responds with a fake JSON error payload.
        nock('https://api.nasa.gov')
        .get('/planetary/apod')
        .query(true)
        .reply(500, { error: 'Internal Server Error' });
    })
    it('should handle NASA API failure', async () => {
        const res = await request(app).get('/api/pod');
    
        expect(res.status).toBeGreaterThanOrEqual(500);
        expect(res.body).toHaveProperty('error');
      });
    
      afterEach(() => {
        nock.cleanAll();
      });
})

describe('GET /api/randomPics', () => {
  it('should return random Mars pictures', async () => {
    const res = await request(app)
      .get('/api/randomPics')
      .expect(200);

    expect(res.body).toBeDefined();
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/randomPics (failure case)', () => {
  beforeEach(() => {
    // This should match the real NASA Mars Rover API endpoint
    nock('https://api.nasa.gov')
      .get('/mars-photos/api/v1/rovers/curiosity/photos')
      .query(true)
      .reply(500, { error: 'Internal Server Error' });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should handle the failure gracefully', async () => {
    const res = await request(app)
      .get('/api/randomPics')
      .expect(500);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('An error occurred');
  });
});

//404 and default error handling
describe('Unknown Routes', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route').expect(404);
    expect(res.body).toHaveProperty('error', 'Route not found');
  });
});


