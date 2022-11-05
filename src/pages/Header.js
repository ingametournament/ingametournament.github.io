import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Context } from './functions/Context';

const HeaderWrapper = styled.header`
  display: flex;
  box-sizing: border-box;
  border-bottom: 1px black solid;
`;

const NavLinkStyled = styled(NavLink)`
  box-sizing: border-box;
  color: black;
  padding: 0 1.5rem;
  text-decoration: underline .1rem transparent;

  &.active {
    text-decoration-color: #ff00aa;
  }

  @media (width < 700px) {
    display: block;
    width: 100%;
    text-align: center;
    padding: .5rem 0;
  }
`;

const LinksWrapper = styled.div`
  display: flex;

`;

const Nav = styled.nav`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  
  width: 100%;

  min-height: 4vh;

  @media (width < 700px) {
    flex-direction: column;
    
    & ${LinksWrapper} {
      flex-direction: column;

    }
  }
`;

const Container = styled.div`
  display:flex;
  align-items: center;
  transition: all .25s ease;

  &:hover {
    background-color: khaki;
  }
  
  &:hover ${NavLinkStyled} {
    text-decoration-color: #ff00aa;
  }

  @media (width < 700px) {
    display: ${props => !props.isVisible ? 'flex' : 'none' || 'none'}
  }
`;

const HelpButton = styled.button`
  width: 2rem;
  height: 2rem;

  cursor: pointer;

  background-color: transparent;
  border: none;
  text-decoration: underline .1rem transparent;

  &:hover {
    text-decoration-color: #ff00aa;
  }

  @media (width < 700px) {
    display: block;
    width: 100%;
    padding: .5rem 0;
    height: 100%;
    text-align: center;
  }
`;

const PopUpWrapper = styled.div`
  display: ${props => props.displayState ? `flex` : `none`};
  position: absolute;
  align-items: center;
  z-index: 1;
 
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.25);
`;

const PopUp = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  min-width: 320px;
  min-height: 50vh;

  padding: .5rem;
  margin: 0 auto;

  box-sizing: border-box;
  border: 1px black solid;
  background-color: white;
  border-radius: .5rem;
`;

const XButton = styled(HelpButton)`
  width: 2rem;
  height: 2rem;
  position: absolute;
  right: .5rem;
  top: .5rem;
`;

const Colored = styled.span`
  background-color: ${props => props.theme.bgColors[props.bgColor] || `transparent`};
  border: .2rem solid ${props => props.theme.borderColors[props.borderColor] || `transparent`};
  padding: 0 .2rem;
`;

const StyledSpan = styled.span`
  margin-bottom: .7rem;
`;

const StyledH2 = styled.h2`
  margin-bottom: 1rem;
`;

const StyledH3 = styled.h3`
  margin-bottom: 1rem;
`;

const MobileContainer = styled(Container)`
  display: none;

  @media (width < 700px) {
    display: flex;
  }
`;

const BurgerButton = styled(HelpButton)`

`;

export default function Header() {
  const [visible, setVisibility] = useState(false);
  const [arrowFlip, flipArrow] = useState(true);

  function togglePopUp() {
    setVisibility(!visible);
  }

  function toggleArrow() {
    flipArrow(!arrowFlip);
  }

  return (
    <Context.Consumer>
      {({root}) => (
        <HeaderWrapper>
          <Nav>
            <LinksWrapper>
              <MobileContainer>
                <BurgerButton onClick={toggleArrow}>
                  {arrowFlip ? `▼` : `▲`}
                </BurgerButton>
              </MobileContainer>
              <Container isVisible={arrowFlip}>
                <NavLinkStyled to={`${root}/`}>
                  Таблица
                </NavLinkStyled>
              </Container>
              <Container isVisible={arrowFlip}>
                <NavLinkStyled to={`${root}/battles/`}>
                  Все поединки
                </NavLinkStyled>
              </Container>
              <Container isVisible={arrowFlip}>
                <NavLinkStyled to={`${root}/participants/`}>
                  Все участники
                </NavLinkStyled>
              </Container>
            </LinksWrapper>
            <Container isVisible={arrowFlip}>
              <HelpButton onClick={togglePopUp}>
                ?
              </HelpButton>
            </Container>
          </Nav>
          <PopUpWrapper displayState={visible}>
            <PopUp>
              <StyledH2>Легенда</StyledH2>
              <StyledH3>Поединки</StyledH3>
              <StyledSpan>
                <Colored bgColor={`green`}>Зелёный фон</Colored> - все участники сдали работы или началось голосование
              </StyledSpan>
              <StyledSpan>
                <Colored bgColor={`yellow`}>Жёлтый фон</Colored> - как минимум один участник сдал работы
              </StyledSpan>
              <StyledSpan>
                <Colored bgColor={`red`}>Красный фон</Colored> - ни один участник не сдал работы
              </StyledSpan>
              <StyledSpan>
                <Colored bgColor={`gray`}>Серый фон</Colored> - голосование окончилось
              </StyledSpan>
              <StyledH3>Участники</StyledH3>
              <StyledSpan>
                <Colored borderColor={`hasBattle`}>Зелёная рамка</Colored> - участник не принимает участие в поединке
              </StyledSpan>
              <StyledSpan>
                <Colored borderColor={`hasNoBattle`}>Красная рамка</Colored> - участник принимает участие в поединке
              </StyledSpan>
              <StyledSpan>
                <Colored borderColor={`inactive`}>Серая рамка</Colored> - участник не принимает заявки на участие в поединке
              </StyledSpan>
              <XButton onClick={togglePopUp}>
                X
              </XButton>
            </PopUp>
          </PopUpWrapper>
        </HeaderWrapper>
      )}
    </Context.Consumer>
  )
}