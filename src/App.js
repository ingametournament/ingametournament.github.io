import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import LightBox from './pages/LightBox'
import Header from './pages/Header'
import MainPage from './pages/MainPage'
import AllBattles from './pages/AllBattles'
import AllParticipant from './pages/AllParticipants'
import Footer from './pages/Footer'
import Battle from './pages/Battle'
import Participant from './pages/Participant'

import { users, battles } from './objects'
import { Context } from './pages/functions/Context'
import { theme } from  './theme'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system,BlinkMacSystemFont,'Roboto','Helvetica Neue',Geneva,"Noto Sans Armenian","Noto Sans Bengali","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian","Noto Sans Hebrew","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Osmanya","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Thai",arial,Tahoma,verdana;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  box-sizing: border-box;

  min-width: 320px;
  margin: 0 auto;
  max-width: 1160px;
  min-height: 100vh;
`;

const Main = styled.main`
  min-height: 90vh;
`;

function sortBattles(arr) {
  const hasActiveVote = [], hasActiveBattle = [], isOver = [];

  for (let e of arr) {
    if ((e.voteExpDate !== null) && (new Date(e.voteExpDate) > Date.now())) {
      hasActiveVote.push(e);
      continue;
    }

    if ((e.battleExpDate !== null) && (new Date(e.battleExpDate) > Date.now())) {
      hasActiveBattle.push(e);
      continue;
    }

    isOver.push(e);
  }

  hasActiveVote.sort((a, b) => new Date(b.voteExpDate) - new Date(a.voteExpDate));
  hasActiveBattle.sort((a, b) => new Date(b.battleExpDate) - new Date(a.battleExpDate));
  isOver.sort((a, b) => (new Date(b.voteExpDate) - new Date(a.voteExpDate)));

  return hasActiveVote.concat(hasActiveBattle, isOver);
}

function getPhotoStatus(arr) {
  const getActiveBattles = (arr) => arr.filter(e => (Date.now() < new Date(e.voteExpDate)) || (Date.now() < new Date(e.battleExpDate)));

  const checkForFiles = (battle, name) => {
    try {
      require(`./pages${battle.folderPath.slice(1) + name}/1.png`);
    }
    catch {
      return false;
    }

    return true;
  }

  const obj = {};

  getActiveBattles(arr).forEach(b => {
    obj[b.battleName] = {};

    b.participants.forEach(p => {
      obj[b.battleName][p] = checkForFiles(b, p);
    })
  });

  return obj;
}

function App() {
  const root = '';

  const sortedBattles = sortBattles(battles);
  const photoStatus = getPhotoStatus(sortedBattles);

  const [isOpenFlag, setIsOpenFlag] = useState(false);
  const [targetImg, setTargetImg] = useState(null);

  function closeLightBox() {
    setIsOpenFlag(false);
  }

  function openLightBox(e) {
    if (e.target.tagName !== 'IMG') {
      return;
    }

    setTargetImg(e.target);
    setIsOpenFlag(true);
  }

  return (
    <Router>
      <Context.Provider value={{battles, sortedBattles, photoStatus, participants: users, root}}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <LightBox onClick={closeLightBox} isOpen={isOpenFlag} targetImg={targetImg} />
          <Wrapper>
            <Header/>
            <Main>
              <Routes basename={`${root}/`}>
                <Route path={`${root}/`} element={<MainPage/>}/>
                <Route path={`${root}/participants/:id`} element={<Participant />}/>
                <Route path={`${root}/battles/:id`} element={<Battle battles={battles} onClick={{openLightBox, closeLightBox}}/>}/>
                <Route exact path={`${root}/battles/`} element={<AllBattles />}/>
                <Route exact path={`${root}/participants/`} element={<AllParticipant />}/>
              </Routes>
            </Main>
            <Footer/>
          </Wrapper>
        </ThemeProvider>
      </Context.Provider>
    </Router>
  );
}

export default App;
