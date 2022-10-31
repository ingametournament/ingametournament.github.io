import styled from 'styled-components'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import useDocumentTitle from './functions/useDocumentTitle';
import { Context } from './functions/Context';

const BattleWrapper = styled.div`
  margin: 1rem;
  position: relative;
`
const Img = styled.img`
  height: 150px;
  width: 150px;
  object-fit: cover;
  margin: 1rem;

  cursor: pointer;

  box-sizing: border-box;
  border: 1px solid black;
`;

const GameTitle = styled.h2`
  padding: .5rem;
  padding-left: 0;
  margin: 0;
  background-color: white;
`;


const LinkStyled = styled(Link)`
  color: #2b2eed;
  transition: all .25s ease;
  text-decoration: underline .1rem transparent;

  &:hover {
    text-decoration-color: #ff00aa;
  }
`;

const LinkAndImgsWrapper = styled.div`
  margin-top: .5rem;
  box-sizing: border-box;
  border-bottom: 1px solid black;
`;

const ImgsWrapper = styled.div`
  margin-top: .5rem;

  @media (width < 700px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const Vote = styled.div`
  margin-top: .5rem;
`;

function getAllPhotos(participants, folderPath) {
  const obj = {};
  
  participants.forEach(p => {
    obj[p] = [];
    
    try {
      for (let i = 1; ; i++) {
        obj[p].push(<Img src={require(`${folderPath + p + `/${i}.png`}`)} alt={`${p} ${i}.png`}/>);
      }
    }
    finally {
      if (obj[p].length < 1) {
        obj[p] = ['Фото участника не найдены'];
      }

      return;
    }
  });
  
  return obj;
}

export default function Battle(props) {
  const params = useParams();
  const battle = props.battles.find(e => e.battleName === params.id);

  useEffect(() => {
    if (battle.voteExpDate === null) {
      return;
    }

    const node = document.getElementById('vote');

    if (!node) {
      return;
    }

    let t = document.createElement('div');
    t.innerHTML = battle.voteEmbed;
    t = t.firstChild; 

    const script = document.createElement('script');

    script.src = t.getAttribute('src');
    script.dataset.telegramPost = t.dataset.telegramPost;

    node.appendChild(script);


    return () => props.onClick.closeLightBox();
  }, []);

  useDocumentTitle(`${params.id} - INGAME`);

  return (
    <Context.Consumer>
      {({root}) => {
        return (
          <BattleWrapper onClick={props.onClick.openLightBox}>
            <GameTitle>
              {battle.game}
            </GameTitle>
            {
              Object.entries(getAllPhotos(battle.participants, battle.folderPath))
                .map(e =>
                <LinkAndImgsWrapper>
                  <LinkStyled to={`${root}/participants/${e[0]}`}>{e[0]}</LinkStyled>
                  <ImgsWrapper>
                    {[...e[1]]}
                  </ImgsWrapper>
                </LinkAndImgsWrapper>
                )
            }
            <Vote id='vote' />
          </BattleWrapper>
        )
      }}
    </Context.Consumer>
  )
}
