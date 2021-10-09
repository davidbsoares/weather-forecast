import styled from 'styled-components';
import COLORS from '../../constants/colors';

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  height: 45px;

  text-align: center;
  font-family: Roboto;
  font-size: 1.25rem;

  color: ${COLORS.secondary};

  border: 1.5px solid ${COLORS.secondary};
  border-radius: 2px;
`;

export default Input;
