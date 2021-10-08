import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Button from '../../Atoms/Button';
import Input from '../../Atoms/Input';

import COLORS from '../../constants/colors';

type SearchProps = {
  handleWeatherData: (data: {}) => void;
};

const Search = ({ handleWeatherData }: SearchProps) => {
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  async function getData(value: string) {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${value.toLowerCase()}&appid=${
          process.env.REACT_APP_TOKEN
        }&lang=pt_br&units=metric`
      );

      handleWeatherData(data);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  return (
    <Container>
      <Input
        placeholder="Buscar por cidade"
        value={value}
        onChange={handleValue}
      />
      {error && <ErrorText>Cidade não encontrada</ErrorText>}

      <Button onClick={() => getData(value)}>Procurar</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  input {
    margin-bottom: 0.75rem;
  }
`;

const ErrorText = styled.span`
  margin-top: -0.25rem;
  margin-bottom: 0.75rem;

  font-family: Roboto;
  font-weight: 700;
  font-size: 0.75rem;

  color: ${COLORS.error};
`;

export default Search;
