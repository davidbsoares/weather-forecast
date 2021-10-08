import styled from 'styled-components';
import COLORS from '../../constants/colors';

const Button = styled.button`
  padding: 0.5rem 1rem;

  width: 100px;

  outline: 0;
  border: 0;
  border-radius: 3px;

  background-color: ${COLORS.button};
  color: ${COLORS.white};

  font-family: Roboto;
  font-weight: 700;
  font-size: 0.75rem;

  cursor: pointer;

  transition: background-color ease 150ms;

  :hover {
    background-color: ${COLORS.primary};
  }
`;

export default Button;
