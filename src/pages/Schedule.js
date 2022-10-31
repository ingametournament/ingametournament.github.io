import { Context } from "./functions/Context";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ScheduleWrapper = styled.div`
  width: 30%;
  min-width: 320px;
  height:90vh;
  
  overflow: auto;
  scrollbar-color: orange #d9d9d9;

  @media (width < 700px) {
    width: 100vw;
    order: 2;
  }
`;

const BattleCard = styled.div`
  box-sizing: border-box;
  background-color: ${props => props.theme.bgcolors[props.bgcolor] || `white`};
  border: 1px solid black;
  margin: .2em;
  padding: .15em;
`;

const LinkBattle = styled(Link)`
  font-weight: bold;
  font-size 24px;
  color: black;
  text-decoration: underline .1rem transparent;
  transition: all .25s ease;


  &:visited {
    color: black;
  }

  &:hover {
    text-decoration-color: #ff00aa;
  }
`;

const StyledH3 = styled.h3`
  margin: 1rem 0;
`;

const LinkParticipant = styled(Link)`
  margin: 2px;
  white-space: nowrap;
  font-style: italic;
  font-size 16px;
  color: #2b2eed;
  text-decoration: underline .1rem transparent;
  transition: all .25s ease;

  &:hover {
    text-decoration-color: #ff00aa;
  }
`;

const getActiveBattles = (arr) => arr.filter(e => (Date.now() < new Date(e.voteExpDate)) || (Date.now() < new Date(e.battleExpDate)));

function decideColor({participants, voteExpDate}, photoStatus) {
  const count = participants.reduce((acc, p) => acc + photoStatus[p], 0);

  if ((voteExpDate !== null) || (count === participants.length)) {
    return `green`;
  }

  if (count === 0) {
    return `red`;
  }

  if (count < participants.length) {
    return `yellow`;
  }
}

const getActiveBattlesCards = (sortedBattles, photoStatus, root) => {
  return getActiveBattles(sortedBattles).map(e => {
    return (
      <BattleCard key={`${e.battleName} @ ${e.battleExpDate}`} bgcolor={decideColor(e, photoStatus[e.battleName])}>
        <LinkBattle  to={`${`${root}/battles/${e.battleName}`}`}>{e.battleName}</LinkBattle>
        <StyledH3>Участники:</StyledH3>
        {e.participants.map(p =>
          <div>
            <LinkParticipant to={`${`${root}/participants/${p}`}`}>
              {`${p} (Работы ${photoStatus[e.battleName][p] ? `` : `не`} сданы)`}
            </LinkParticipant>
          </div>
        )}
        <StyledH3>
          {
            e.voteExpDate ?
            `Дата окончания голосования:` :
            `Дата окончания приёма работ:`
          }
        </StyledH3>
        <p>
          {
            e.voteExpDate ?
            new Date(e.voteExpDate).toString() :
            new Date(e.battleExpDate).toString()
          }
        </p>
      </BattleCard>
    );
  })
};

export default function Schedule() {
  return (
    <Context.Consumer>
      {({sortedBattles, photoStatus, root}) => (
        <ScheduleWrapper>
          {getActiveBattlesCards(sortedBattles, photoStatus, root)}
        </ScheduleWrapper>
      )}
    </Context.Consumer>
  );
}