import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ZumeInstallBanner from 'Components/zume/ZumeInstallBanner';
import ZumeLogo from 'Components/zume/ZumeLogo';
import { useSelector } from 'react-redux';
import { useNavigation } from 'react-navi';
import SessionGridList from 'Components/shared/session/SessionGridList';
import { getSessionTitles } from 'Redux/sessions';
import ZumeResumeBanner from 'Components/zume/ZumeResumeBanner';
import { useCheckpoints } from 'Components/zume/savepointsHooks';

function App() {
  const titles = useSelector(getSessionTitles);
  const navigation = useNavigation();
  const { checkpoint } = useCheckpoints();

  const handleBannerClick = () => {
    navigation.navigate(checkpoint.url);
  };

  return (
    <Container bgcolor="white" component="main" maxWidth="md">
      <Box pb={10}>
        <ZumeInstallBanner />
        <br />
        <div className="App">
          <header className="App-header">
            <Box bgcolor="white" display="flex" m={1} p={1} justifyContent="center">
              <ZumeLogo size="large" />
            </Box>
          </header>
          <br />
          <SessionGridList sessions={titles} variant="wrapped" animate={true} />
          <br />
        </div>
        {checkpoint && <ZumeResumeBanner onClick={handleBannerClick} />}
      </Box>
    </Container>
  );
}

export default App;
