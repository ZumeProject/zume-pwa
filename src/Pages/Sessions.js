import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SessionSectionList from 'Components/shared/session/SessionSectionList';
import ZoomInFAB from 'Components/shared/ZoomInFAB';
import { selectSession, getSessionTitles } from 'Redux/sessions';
import { useSelector } from 'react-redux';
import { useNavigation } from 'react-navi';
import { useTranslation } from 'react-i18next';
import { useAppTranslation } from 'Components/zume/translationHooks';
import useBasenameUrl from 'Utils/browser/useBasenameUrl';

export default function Sessions({ selectedId }) {
  const session = useSelector(state => selectSession(state, selectedId));
  const titles = useSelector(getSessionTitles);
  const { title } = titles[selectedId];
  const navigation = useNavigation();
  const href = useBasenameUrl(`/live/${selectedId}`);
  const { t } = useTranslation();
  const trans = useAppTranslation();

  console.log(titles[selectedId]);
  return (
    <Container component="main" maxWidth="lg" style={{ padding: 0 }}>
      <Box>
        <Box p={2}>
          <Typography component="h2" variant="h2">
            {trans(title)}
          </Typography>
        </Box>
        {session ? (
          <SessionSectionList
            key={`sectionsFor${selectedId}`}
            sections={session.sections}
          />
        ) : null}
      </Box>
      <ZoomInFAB onClick={() => navigation.navigate(href)}>
        {t('sessions|start_session')}
      </ZoomInFAB>
    </Container>
  );
}
