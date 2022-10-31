import styled from 'styled-components'

const FooterWrapper = styled.footer`
  box-sizing: border-box;
  border-top: 1px solid black;
  min-height: 5vh;
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

const LinkStyled = styled.a`
  color: #2b2eed;
  transition: all .25s ease;
  text-decoration: underline .1rem transparent;

  &:hover {
    text-decoration-color: #ff00aa;
  }
`;

const StyledH1 = styled.h1`
  display: inline;
  font-size: inherit;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <LinkStyled target="_blank" href="https://t.me/ingameph" rel="noopener noreferrer">
        <StyledH1>INGAME </StyledH1>
        в telegram
      </LinkStyled>
    </FooterWrapper>
  )
}