import { useState } from 'react';
import MarsWeatherModel from './MarsWeatherModel';
import EarthWeatherModel from './EarthWeatherModel';

type EarthData = {
  date: string;
  humidity: string;
  pressure: string;
  temp_avg: string;
  temp_max: string;
  temp_min: string;
  wind_speed: string;
};

type MarsDayData = {
  sol: string;
  temp_avg: string;
  temp_min: string;
  temp_max: string;
  pressure: string;
  wind_speed: string;
  humidity: string;
};
type City = {
  name: string;
  lat: number;
  lon: number;
};

type ComparisonData = {
  earth: EarthData;
  mars: MarsDayData[];
};

type WeatherProps = {
  scrollTop: number;
  comparisonData: ComparisonData;
  setCoords: (coords: { lat: number; lon: number }) => void;
};
const cities: City[] = [
  { name: 'New York', lat: 40.7128, lon: -74.006 },
  { name: 'San Francisco', lat: 37.7749, lon: -122.4194 },
  { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
  { name: 'Prague', lat: 50.0755, lon: 14.4378 },
  { name: 'Beijing', lat: 39.9042, lon: 116.4074 },
  { name: 'London', lat: 51.5072, lon: -0.1276 },
  { name: 'Paris', lat: 48.8566, lon: 2.3522 },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
];

// Full Mars weather data
// const marsData = [
//   {
//     sol: '675',
//     temperature_avg: '-62.314',
//     temperature_min: '-96.872',
//     temperature_max: '-15.908',
//     pressure: '750.563',
//     wind_speed: '7.233',
//   },
//   {
//     sol: '676',
//     temperature_avg: '-62.812',
//     temperature_min: '-96.912',
//     temperature_max: '-16.499',
//     pressure: '749.09',
//     wind_speed: '8.526',
//   },
//   {
//     sol: '677',
//     temperature_avg: '-63.056',
//     temperature_min: '-97.249',
//     temperature_max: '-16.853',
//     pressure: '748.698',
//     wind_speed: '7.887',
//   },
//   {
//     sol: '678',
//     temperature_avg: '-62.562',
//     temperature_min: '-97.728',
//     temperature_max: '-9.055',
//     pressure: '743.741',
//     wind_speed: '5.246',
//   },
//   {
//     sol: '679',
//     temperature_avg: '-62.551',
//     temperature_min: '-96.644',
//     temperature_max: '-11.561',
//     pressure: '744.529',
//     wind_speed: '5.565',
//   },
//   {
//     sol: '680',
//     temperature_avg: '-61.789',
//     temperature_min: '-96.811',
//     temperature_max: '-15.298',
//     pressure: '743.99',
//     wind_speed: '6.517',
//   },
//   {
//     sol: '681',
//     temperature_avg: '-62.434',
//     temperature_min: '-95.447',
//     temperature_max: '-4.444',
//     pressure: '743.55',
//     wind_speed: '5.632',
//   },
// ];

const Weather: React.FC<WeatherProps> = ({
  scrollTop,
  comparisonData,
  setCoords,
}) => {
  // Store the currently selected Mars sol
  const [selectedSol, setSelectedSol] = useState('675');
  // console.log(comparisonData);

  // Find the Mars weather data corresponding to the selected sol
  const currentMarsData = comparisonData.mars.find(
    (data) => data.sol === selectedSol
  );

  return (
    <div id='weather' className='weather-container'>
      {/* Mars 3D Model on the left */}
      <div
        className={`weather-mars-container ${
          scrollTop < 1800 || scrollTop > 3000 ? 'hide-left-300' : ''
        }`}
      >
        <MarsWeatherModel />
      </div>

      {/* Center content */}
      <div className='weather-content'>
        <div
          className={`weather-title ${
            scrollTop < 1950 || scrollTop > 3000 ? 'hide-top-100' : ''
          }`}
        >
          <h1 className='section-title'>Mars vs Earth</h1>
        </div>

        {/* Climate comparison section */}
        <section className='climate-compare-container'>
          <div
            className={`planet-column ${
              scrollTop < 2150 || scrollTop > 3000 ? 'hide-left-100' : ''
            }`}
          >
            <h2>Mars</h2>
            {currentMarsData && (
              <ul>
                <li>
                  Date:{' '}
                  <select
                    value={selectedSol}
                    onChange={(e) => setSelectedSol(e.target.value)}
                    className='sol-dropdown'
                  >
                    {comparisonData.mars.map((data) => (
                      <option key={data.sol} value={data.sol}>
                        Sol {data.sol}
                      </option>
                    ))}
                  </select>
                </li>
                <li>Avg Temp: {currentMarsData.temp_avg}</li>
                <li>Max Temp: {currentMarsData.temp_max}</li>
                <li>Min Temp: {currentMarsData.temp_min}</li>
                <li>Wind Speed: {currentMarsData.wind_speed}</li>
                <li>Pressure: {currentMarsData.pressure}</li>
              </ul>
            )}
          </div>

          <div
            className={`planet-column ${
              scrollTop < 2150 || scrollTop > 3000 ? 'hide-right-100' : ''
            }`}
          >
            <h2>Earth</h2>

            {/* Citys Selector */}
            <ul>
              <li>
                City:{' '}
                <select
                  className='sol-dropdown'
                  onChange={(e) => {
                    const selectedCity = cities.find(
                      (city) => city.name === e.target.value
                    );
                    if (selectedCity) {
                      setCoords({
                        lat: selectedCity.lat,
                        lon: selectedCity.lon,
                      });
                    }
                  }}
                >
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </li>

              <li>Date: {comparisonData.earth.date}</li>
              <li>Avg Temp: {comparisonData.earth.temp_avg}</li>
              <li>Max Temp: {comparisonData.earth.temp_max}</li>
              <li>Min Temp: {comparisonData.earth.temp_min}</li>
              <li>Wind Speed: {comparisonData.earth.wind_speed}</li>
              <li>Pressure: {comparisonData.earth.pressure}</li>
              <li>Humidity: {comparisonData.earth.humidity}</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Earth 3D Model on the right */}
      <div
        className={`weather-earth-container ${
          scrollTop < 1800 || scrollTop > 3000 ? 'hide-right-300' : ''
        }`}
      >
        <EarthWeatherModel />
      </div>
    </div>
  );
};

export default Weather;
