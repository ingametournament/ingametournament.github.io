import styled from 'styled-components'
import useDocumentTitle from './functions/useDocumentTitle';
import { Context } from './functions/Context';
import { LinkStyled } from './functions/LinkStyled';

const AllParticipantsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

const ParticepantLink = styled(LinkStyled)`
border: 1px solid;
  border-color: ${props => props.bordercolor || `black`};
`;

const getNames = (arr) => arr.map(e => e.userName).sort();


const getParticipantsWithActiveBattles = (arr) => (
  new Set(arr.filter(e => (Date.now() < new Date(e.voteExpDate)) || (Date.now() < new Date(e.battleExpDate))).map(e => e.participants).flat())
);


const generateContent = (participants, sortedBattles, root) => {
  const names = getNames(participants);
  
  const participantsWithActiveBattles = getParticipantsWithActiveBattles(sortedBattles);

  return names.length < 1 ?
    `Участников не обнаружено` :
    names.map(e => {
      let color = `#e5e5e5`;

      if (participants.find(p => p.userName === e).active) {
        participantsWithActiveBattles.has(e) ? color = `red` : color =  `green`;
      }

      return <ParticepantLink key={e} bordercolor={color} to={`${root}/participants/${e}`}>{e}</ParticepantLink>
    }
    )
}

export default function Battle() {
  useDocumentTitle(`Все участники - INGAME`);

  return (
    <Context.Consumer>
      {({participants, sortedBattles, root}) => (
        <AllParticipantsWrapper>
          {generateContent(participants, sortedBattles, root)}
        </AllParticipantsWrapper>
      )}
    </Context.Consumer>
  );
}
