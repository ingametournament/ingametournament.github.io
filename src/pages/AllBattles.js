import styled from 'styled-components'
import useDocumentTitle from './functions/useDocumentTitle';
import { LinkStyled } from './functions/LinkStyled';
import { Context } from './functions/Context';
import decideColor from './functions/decideColor';

const AllBattlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

const BattleLinkStyled = styled(LinkStyled)`
  background-color: ${props => props.theme.bgColors[props.bgcolor] || `#e5e5e5`};
`;

export default function Battle() {
  useDocumentTitle(`Все батлы - INGAME`);

  return (
    <Context.Consumer>
      {({sortedBattles, photoStatus, root}) => (
          <AllBattlesWrapper>
            {
              sortedBattles.length < 1 ?
                `Поединков не обнаружено` :
                sortedBattles.map(e =>
                  <BattleLinkStyled key={e.battleName} to={`${root}/battles/${e.battleName}`} bgcolor={decideColor(e, photoStatus[e.battleName])}>
                    {e.battleName}
                  </BattleLinkStyled>
                )
            }
          </AllBattlesWrapper>
        )
      }
    </Context.Consumer>
  );
}
