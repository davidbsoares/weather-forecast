import { useState } from 'react';
import styled from 'styled-components';

import Search from '../../Organisms/Search';
import Weather, { WeatherTypes } from '../../Organisms/Weather';

const Home = () => {
  /* const [city, setCity] = useState('');
  const [state, setState] = useState(''); */

  const [weatherData, setWeatherData] = useState<WeatherTypes>();

  const handleWeatherData = (data: WeatherTypes | undefined) => {
    setWeatherData(data);
  };

  return (
    <Container>
      {!weatherData ? (
        <Search handleWeatherData={handleWeatherData} />
      ) : (
        <Weather handleWeatherData={handleWeatherData} data={weatherData} />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
`;

export default Home;
