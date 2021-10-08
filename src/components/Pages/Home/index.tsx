import { useState } from 'react';
import styled from 'styled-components';

import Search from '../../Organisms/Search';
import Weather from '../../Organisms/Weather';

const Home = () => {
  /* const [city, setCity] = useState('');
  const [state, setState] = useState(''); */

  const [weatherData, setWeatherData] = useState({});

  const handleWeatherData = (data: {}) => {
    setWeatherData(data);
  };

  console.log(weatherData);
  return (
    <Container>
      {!weatherData ? (
        <Search handleWeatherData={handleWeatherData} />
      ) : (
        <Weather />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  overflow: hidden;
`;

export default Home;
