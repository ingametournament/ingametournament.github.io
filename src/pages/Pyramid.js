import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Context } from './functions/Context';

const PyramidWrapper = styled.div`
  width: 70%;
  min-width: 320px;
  
  text-align: center;
  overflow-y: auto;
  padding: 0 1em;
  
  box-sizing: border-box;
  border-left: 1px solid black;

  @media (width < 700px) {
    width: 100vw;
    border-left: none;

    &>*:last-child {
      border-bottom: none;
    }
  }
`;

const PyramidRowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
`;

const ParticepantWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: safe center;
  flex-wrap: wrap;
  flex-grow: 1;
`;

const ParticepantLink = styled(Link)`
  box-sizing: border-box;
  background-color: white;
  padding: .5em;
  margin: .5em;
  border: .15em solid transparent;
  text-decoration: underline .1rem transparent;
  color: black;
  border-color: ${props => props.bordercolor || `black`};
  transition: all .25s ease;

  &:hover {
    box-sizing: border-box;
    cursor: pointer;
    text-decoration-color: #ff00aa;
  }

  &:active {
    color: black;
    background-color: grey;
  }

  &:visited {
    color: black;
  }
`;

const listRows = (participants, sortedBattles, root) => {
  const getParticipantsByRank = (arr) => {
    const obj = {};
  
    arr.filter(e => e.active === true)
      .forEach(p =>
        obj[p.userRank] ?
        obj[p.userRank].push(p) :
        obj[p.userRank] = [p]
      );
  
    return obj;
  }

  const getParticipantsWithActiveBattles = (arr) => (
    new Set(arr.filter(e => (Date.now() < new Date(e.voteExpDate)) || (Date.now() < new Date(e.battleExpDate))).map(e => e.participants).flat())
  );

  const participantsWithActiveBattles = getParticipantsWithActiveBattles(sortedBattles);
  const participantsByRank = getParticipantsByRank(participants);

  return Object.keys(participantsByRank)
    .sort((a, b) => a-b)
    .map(rank =>
      <PyramidRowWrapper>
        <p>  
          {rank}
        </p>
        <ParticepantWrapper>
          {
            participantsByRank[rank].map(e =>
              <ParticepantLink bordercolor={participantsWithActiveBattles.has(e.userName) ? `red` : `green`} to={`${root}/participants/${e.userName}`}>{e.userName}</ParticepantLink>
            )
          }
        </ParticepantWrapper>
      </PyramidRowWrapper>
    );
}

export default function Pyramid() {
  return (
    <Context.Consumer>
      {({participants, sortedBattles, root}) => (
        <PyramidWrapper>
          {listRows(participants, sortedBattles, root)}
        </PyramidWrapper>
      )}
    </Context.Consumer>
  );
}