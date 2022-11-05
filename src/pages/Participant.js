import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useDocumentTitle from './functions/useDocumentTitle';
import { LinkStyled } from './functions/LinkStyled';
import { Context } from './functions/Context';
import decideColor from './functions/decideColor';

const Wrapper = styled.div`
  margin: 1rem;
  & p {
    margin: .5rem;
  }
`;

const BattlesWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & p {
    margin-top: 0;
  }
`;

const BattleLinkStyled = styled(LinkStyled)`
  background-color: ${props => props.theme.bgColors[props.bgcolor] || `#e5e5e5`};
`;

const Name = styled.h2`
  font-size: 2rem;
  margin: .5rem;
`;

export default function Participant() {
  const params = useParams();

  useDocumentTitle(`${params.id} - INGAME`);

  return (
    <Context.Consumer>
      {({participants, photoStatus, battles, root}) => {
        const participant = participants.find(e => e.userName === params.id);
        const participantBattles = battles.filter(e => e.participants.includes(participant.userName)) || [];

        return (
          <Wrapper>
            <Name>{participant.userName}</Name>
            <p>Ранг: {participant.userRank}</p>
            <p>Игры: {participant.userGames?.join(` | `) || `Участник не предоставил список игр.`}</p>
            <p>Темы: {participant.userTopics?.join(` | `) || `Участник не предоставил список тем.`}</p>
            <BattlesWrapper>
              <p>Поединки:</p>
              {
                participantBattles.length < 1 ?
                  <p>Участник не принимал участие в поединках.</p> :
                  participantBattles.map(e =>
                    <BattleLinkStyled to={`${root}/battles/${e.battleName}`} bgcolor={decideColor(e, photoStatus[e.battleName])}>{e.battleName}</BattleLinkStyled>
                  )
              }
            </BattlesWrapper>
          </Wrapper>
        )
      }}
    </Context.Consumer>
  )
}