import { useState } from 'react';
import MarsWeatherModel from './MarsWeatherModel';
import EarthWeatherModel from './EarthWeatherModel';

type WeatherProps = {
  scrollTop: number;
};

// Full Mars weather data
const marsData = [
  {
    sol: '675',
    temperature_avg: '-62.314',
    temperature_min: '-96.872',
    temperature_max: '-15.908',
    pressure: '750.563',
    wind_speed: '7.233',
  },
  {
    sol: '676',
    temperature_avg: '-62.812',
    temperature_min: '-96.912',
    temperature_max: '-16.499',
    pressure: '749.09',
    wind_speed: '8.526',
  },
  {
    sol: '677',
    temperature_avg: '-63.056',
    temperature_min: '-97.249',
    temperature_max: '-16.853',
    pressure: '748.698',
    wind_speed: '7.887',
  },
  {
    sol: '678',
    temperature_avg: '-62.562',
    temperature_min: '-97.728',
    temperature_max: '-9.055',
    pressure: '743.741',
    wind_speed: '5.246',
  },
  {
    sol: '679',
    temperature_avg: '-62.551',
    temperature_min: '-96.644',
    temperature_max: '-11.561',
    pressure: '744.529',
    wind_speed: '5.565',
  },
  {
    sol: '680',
    temperature_avg: '-61.789',
    temperature_min: '-96.811',
    temperature_max: '-15.298',
    pressure: '743.99',
    wind_speed: '6.517',
  },
  {
    sol: '681',
    temperature_avg: '-62.434',
    temperature_min: '-95.447',
    temperature_max: '-4.444',
    pressure: '743.55',
    wind_speed: '5.632',
  },
];

const Weather = ({ scrollTop }: WeatherProps) => {
  // Store the currently selected Mars sol
  const [selectedSol, setSelectedSol] = useState('675');

  // Find the Mars weather data corresponding to the selected sol
  const currentMarsData = marsData.find((data) => data.sol === selectedSol);

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
                    {marsData.map((data) => (
                      <option key={data.sol} value={data.sol}>
                        Sol {data.sol}
                      </option>
                    ))}
                  </select>
                </li>
                <li>Avg Temp: {currentMarsData.temperature_avg} °C</li>
                <li>Max Temp: {currentMarsData.temperature_max} °C</li>
                <li>Min Temp: {currentMarsData.temperature_min} °C</li>
                <li>Wind Speed: {currentMarsData.wind_speed} m/s</li>
                <li>Pressure: {currentMarsData.pressure} Pa</li>
              </ul>
            )}
          </div>

          <div
            className={`planet-column ${
              scrollTop < 2150 || scrollTop > 3000 ? 'hide-right-100' : ''
            }`}
          >
            <h2>Earth</h2>
            <ul>
              <li>Date: 04/27/2025</li>
              <li>Avg Temp: 27.18 °C</li>
              <li>Max Temp: 28.39 °C</li>
              <li>Min Temp: 18.25 °C</li>
              <li>Wind Speed: 4.34 m/s</li>
              <li>Pressure: 101800 Pa</li>
              <li>Humidity: 56%</li>
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
