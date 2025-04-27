import MarsWeatherModel from './MarsWeatherModel';
import EarthWeatherModel from './EarthWeatherModel';
type WeatherProps = {
  scrollTop: number;
};
const Weather = ({ scrollTop }: WeatherProps) => {
  return (
    <div className='weather-container'>
      <div
        className={`weather-mars-container ${
          scrollTop < 1800 || scrollTop > 3000 ? 'hide-left-300' : ''
        }`}
      >
        <MarsWeatherModel />
      </div>

      <div className='weather-content'>
        <div
          className={`weather-title  ${
            scrollTop < 1950 || scrollTop > 3000 ? 'hide-top-100' : ''
          }`}
        >
          <h1>Mars vs Earth</h1>
        </div>
        <div className='weather-data-container'>
          <div
            className={`mars-weather-content ${
              scrollTop < 2150 || scrollTop > 3000 ? 'hide-left-100' : ''
            }`}
          >
            <p>
              <span className='weather-content-title'>Date:</span>
              <span className='weather-content-value'> 1745690400</span>
            </p>
            <p>
              <span className='weather-content-title'>
                Average daily temperature:
              </span>
              <span className='weather-content-value'> 300.86</span>
            </p>
            <p>
              <span className='weather-content-title'>Max daily temp:</span>
              <span className='weather-content-value'> 291.57</span>
            </p>
            <p>
              <span className='weather-content-title'>Min daily temp:</span>
              <span className='weather-content-value'> 301.14</span>
            </p>
            <p>
              <span className='weather-content-title'>Wind speed:</span>
              <span className='weather-content-value'> 1018</span>
            </p>
            <p>
              <span className='weather-content-title'>Pressure:</span>
              <span className='weather-content-value'> 3.48</span>
            </p>
            <p>
              <span className='weather-content-title'>humidity:</span>
              <span className='weather-content-value'> 61</span>
            </p>
          </div>
          <div
            className={`earth-weather-content ${
              scrollTop < 2150 || scrollTop > 3000 ? 'hide-right-100' : ''
            }`}
          >
            <p>
              <span className='weather-content-title'>Date:</span>
              <span className='weather-content-value'> 1745690400</span>
            </p>
            <p>
              <span className='weather-content-title'>
                Average daily temperature:
              </span>
              <span className='weather-content-value'> 300.86</span>
            </p>
            <p>
              <span className='weather-content-title'>Max daily temp:</span>
              <span className='weather-content-value'> 291.57</span>
            </p>
            <p>
              <span className='weather-content-title'>Min daily temp:</span>
              <span className='weather-content-value'> 301.14</span>
            </p>
            <p>
              <span className='weather-content-title'>Wind speed:</span>
              <span className='weather-content-value'> 1018</span>
            </p>
            <p>
              <span className='weather-content-title'>Pressure:</span>
              <span className='weather-content-value'> 3.48</span>
            </p>
            <p>
              <span className='weather-content-title'>humidity:</span>
              <span className='weather-content-value'> 61</span>
            </p>
          </div>
        </div>
      </div>
      <div
        className={`weather-earth-container  ${
          scrollTop < 1800 || scrollTop > 3000 ? 'hide-right-300' : ''
        }`}
      >
        <EarthWeatherModel />
      </div>
    </div>
  );
};

export default Weather;
