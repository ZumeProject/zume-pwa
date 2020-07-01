import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ZumeInstallBanner from 'Components/zume/ZumeInstallBanner';
import ZumeLogo from 'Components/zume/ZumeLogo';
import { useSelector } from 'react-redux';
import SessionGridList from 'Components/shared/session/SessionGridList';
import { getSessionTitles } from 'Redux/sessions';

function App() {
  const titles = useSelector(getSessionTitles);

  return (
    <Container bgcolor="white" component="main" maxWidth="md">
      <Box pb={10}>
        <ZumeInstallBanner />
        <br />
        <div className="App">
          <header className="App-header">
            <Box
              bgcolor="white"
              display="flex"
              m={1}
              p={1}
              justifyContent="center">
              <ZumeLogo size="large" />
            </Box>
          </header>
          <br />
          <SessionGridList sessions={titles} variant="wrapped" animate={true} />
          <br />
        </div>
      </Box>
    </Container>
  );
}

export default App;
