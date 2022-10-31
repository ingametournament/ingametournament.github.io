import styled from 'styled-components'
import { Link } from 'react-router-dom';

export const LinkStyled = styled(Link)`
  box-sizing: border-box;
  color: #2b2eed;
  background-color: ${props => props.theme.bgcolors.gray};
  padding: .5rem;
  margin: .5rem;
  transition: all .25s ease;
  text-decoration: underline .1rem transparent;

  &:hover {
    text-decoration-color: #ff00aa;
    background-color: #97979c;
  }
`;