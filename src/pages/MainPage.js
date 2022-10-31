import styled from 'styled-components';
import Pyramid from './Pyramid';
import MySchedule from './Schedule';
import useDocumentTitle from './functions/useDocumentTitle';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 320px;

  @media (width < 700px) {
    flex-direction: column;
  }
`;

export default function MainPage() {
  useDocumentTitle(`INGAME`);

  return (
    <Wrapper>
      <MySchedule />
      <Pyramid />
    </Wrapper>
  )
}