import styled from 'styled-components';
import COLORS from '../../constants/colors';

export type WeatherTypes = {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
};

export type DataTypes = {
  data: WeatherTypes | undefined;
  handleWeatherData: (data: WeatherTypes | undefined) => void;
};

const Weather: React.FC<DataTypes> = ({ data, handleWeatherData }) => {
  const main = data?.main;
  const sys = data?.sys;
  const weather = data?.weather[0];

  const fullDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  const sunRise =
    sys &&
    `${new Date(sys?.sunrise).getHours()}:${new Date(
      sys?.sunrise
    ).getMinutes()}`;

  const sunSet =
    sys &&
    `${new Date(sys?.sunset).getHours()}:${new Date(sys?.sunset).getMinutes()}`;

  return (
    <Container>
      <BackButton onClick={() => handleWeatherData(undefined)}>
        Voltar
      </BackButton>
      <Title>{data?.name}</Title>
      <DateWrapper>{fullDate}</DateWrapper>

      <MainWrapper>
        <MinMaxWrapper className="min">
          <MinMaxLabel>Mínima</MinMaxLabel>
          <MinMax>{main && Math.floor(main.temp_min)}º C</MinMax>
        </MinMaxWrapper>
        <TemperatureWrapper className="main">
          <Image
            src={`http://openweathermap.org/img/wn/${weather?.icon}@4x.png`}
          />
          <Temperature>{main && Math.floor(main.temp)}º C</Temperature>
          <Description>{weather?.description}</Description>
        </TemperatureWrapper>

        <MinMaxWrapper className="max">
          <MinMaxLabel>Máxima</MinMaxLabel>
          <MinMax>{main && Math.floor(main.temp_max)}º C</MinMax>
        </MinMaxWrapper>
      </MainWrapper>

      <Details>
        <DetailsItem>Umidade</DetailsItem>
        <DetailsItem>Nascer do Sol</DetailsItem>
        <DetailsItem>Pôr do Sol</DetailsItem>

        <DetailsItem>{main?.humidity}%</DetailsItem>
        <DetailsItem>{sunRise}</DetailsItem>
        <DetailsItem>{sunSet}</DetailsItem>
      </Details>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 700px;
  width: 100%;
  height: 100vh;

  padding: 1rem;
`;

const BackButton = styled.button`
  position: absolute;
  top: 50px;
  left: 10px;

  font-family: Roboto;
  font-weight: 700;
  font-size: 1.5rem;

  color: ${COLORS.primary};
  background-color: white;
  border: 0;
  cursor: pointer;

  transition: color ease 150ms;

  :hover {
    color: ${COLORS.secondary};
  }
`;

const Title = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 2rem;

  color: ${COLORS.primary};

  margin-bottom: 0.5rem;
`;
const DateWrapper = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 1rem;

  color: ${COLORS.secondary};

  margin-bottom: 2rem;
`;

const MainWrapper = styled.div`
  display: grid;
  grid-template-areas: 'min main max';
  align-items: flex-end;

  grid-row-gap: 1.5rem;

  padding-bottom: 2rem;

  border-bottom: 1px solid #d6d4d6;

  .min {
    grid-area: min;
  }

  .main {
    grid-area: main;
  }

  .max {
    grid-area: max;
  }

  @media screen and (max-width: 599px) {
    grid-template-areas:
      'main main'
      'min max';
  }
`;

const MinMaxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 2rem;

  @media screen and (max-width: 599px) {
    margin-bottom: 0;
  }
`;
const MinMaxLabel = styled.span`
  font-family: Roboto;
  font-weight: 300;
  font-size: 1rem;
`;
const MinMax = styled.span`
  font-family: Roboto;
  font-size: 2rem;

  color: ${COLORS.primary};
`;

const TemperatureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 2rem;

  text-align: center;
`;
const Image = styled.img`
  width: 300px;
  aspect-ratio: 1;

  margin-bottom: 1.5rem;

  filter: brightness(0.9);

  @media screen and (max-width: 599px) {
    width: 150px;
  }
`;
const Temperature = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 2.75rem;

  color: ${COLORS.primary};

  margin-bottom: 1rem;
`;
const Description = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 1.5rem;
  color: ${COLORS.primary};

  text-transform: capitalize;
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;

  grid-auto-flow: column;

  grid-column-gap: 1.5rem;
  grid-row-gap: 0.25rem;

  max-width: 250px;

  margin-top: 2rem;

  span:nth-last-child(-n + 3) {
    justify-self: flex-end;
  }
`;
const DetailsItem = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 1rem;
`;

export default Weather;
