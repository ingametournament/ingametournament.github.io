import styled from 'styled-components';

const LightBoxWrapper = styled.div`
  display: ${props => props.isOpen ? 'flex' : 'none' || 'none'};
  position: fixed;
  align-items: center;

  z-index: 99;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.25);
`;

const Img = styled.img`
  position: absolute;

  max-width: 100%;
  max-height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;

export default function LightBox(props) {
  return (
    <LightBoxWrapper onClick={props.onClick} isOpen={props.isOpen}>
      <Img src={props.targetImg?.getAttribute('src')} alt={props.targetImg?.getAttribute('alt')}/>
    </LightBoxWrapper>
  )
}