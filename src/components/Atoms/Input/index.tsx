import styled from 'styled-components';
import COLORS from '../../constants/colors';

const Input = styled.input`
  width: 200px;
  height: 30px;

  text-align: center;
  font-family: Roboto;
  font-size: 0.7rem;

  color: ${COLORS.secondary};

  border: 1.5px solid ${COLORS.secondary};
  border-radius: 2px;
`;

export default Input;
