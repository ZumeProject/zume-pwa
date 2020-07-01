import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { selectAbout } from 'Redux/sessions';
import { useSelector } from 'react-redux';
import typeToView from 'Components/shared/live/views/typeToView';
import Section from 'Components/shared/live/views/Section';

export default function About() {
  const about = useSelector(selectAbout);
  return (
    <Container component="main">
      <Box mb={8} maxWidth={'960px'}>
        {about &&
          about.sections.map((s, i) => (
            <React.Fragment key={`about${i}`}>
              <Section {...s} />
              {s.parts
                ? s.parts.map((p, j) => (
                    <React.Fragment key={`about${i}-part${j}`}>
                      {typeToView(p.type, p)}
                    </React.Fragment>
                  ))
                : null}
            </React.Fragment>
          ))}
      </Box>
    </Container>
  );
}
