import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Button from '../../Atoms/Button';
import Input from '../../Atoms/Input';

import COLORS from '../../constants/colors';
import { WeatherTypes } from '../Weather';

import ReactLoading from 'react-loading';

type SearchProps = {
  handleWeatherData: (data: WeatherTypes) => void;
};

const Search = ({ handleWeatherData }: SearchProps) => {
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  async function getData(value: string, e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      e.preventDefault();

      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${value.toLowerCase()}&appid=${
          process.env.REACT_APP_TOKEN
        }&lang=pt_br&units=metric`
      );

      handleWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
    }
  }

  console.log(loading);

  return (
    <Container onSubmit={(e) => getData(value, e)}>
      <Input
        placeholder="Buscar por cidade"
        value={value}
        onChange={handleValue}
      />
      {error && <ErrorText>Cidade não encontrada</ErrorText>}

      {!loading ? (
        <Button type="submit" value="Submit">
          Procurar
        </Button>
      ) : (
        <ReactLoading
          type="spinningBubbles"
          color={COLORS.primary}
          height={35}
          width={35}
        />
      )}
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  padding: 1rem;

  input {
    margin-bottom: 0.75rem;
  }
`;

const ErrorText = styled.span`
  margin-top: -0.25rem;
  margin-bottom: 0.75rem;

  font-family: Roboto;
  font-weight: 700;
  font-size: 1.15rem;

  color: ${COLORS.error};
`;

export default Search;
