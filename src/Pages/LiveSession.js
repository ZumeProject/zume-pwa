import React, { useEffect } from 'react';
import LiveSessionWrapper from 'Components/shared/live/LiveSessionWrapper';
import Section from 'Components/shared/live/views/Section';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import liveSlice, {
  selectPartIndex,
  selectCurrentPartContent,
  selectCurrentSlideIndex,
} from 'Redux/live';
import { selectFormsByName } from 'Redux/forms';
import { totalSectionLengths } from 'Utils/session/sectionLength';
import { selectSession } from 'Redux/sessions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from 'react-navi';
import { useTranslation } from 'react-i18next';
import useBasenameUrl from 'Utils/browser/useBasenameUrl';
import typeToView from 'Components/shared/live/views/typeToView';
import CountdownTimer from 'Components/shared/live/CountdownTimer';

export default function LiveSession({ selectedId, selectedIndex }) {
  const session = useSelector((state) => selectSession(state, selectedId));
  const formData = useSelector((state) =>
    selectFormsByName(state, session?.forms)
  );

  const partIndex = useSelector(selectPartIndex);

  const dispatch = useDispatch();
  let index = useSelector(selectCurrentSlideIndex);
  // Update our slide index based on the path
  // Our redux components still read it from the store.
  if (typeof selectedIndex !== 'undefined' && selectedIndex !== index) {
    index = selectedIndex;
    dispatch(liveSlice.actions.slideIndexChanged(index));
  }

  const sections = session?.sections;

  useEffect(() => {
    dispatch(liveSlice.actions.sectionsLoaded(sections));
    const html = document.querySelector('html');
    // increase root font size for in-session experience.
    const originalFontSize = html.style.fontSize;
    html.style.fontSize = '24px';
    return () => {
      html.style.fontSize = originalFontSize;
    };
  }, [selectedId, dispatch, sections]);
  const content = useSelector((state) => selectCurrentPartContent(state));
  const totalSlides = totalSectionLengths(sections);

  const navigation = useNavigation();
  const backHref = useBasenameUrl(`/session/${selectedId}`);
  const exit = () => navigation.navigate(backHref);
  const indexBaseHref = useBasenameUrl(`/live/${selectedId}/`);

  const { t } = useTranslation();

  let duration, durationKey;
  if (content?.duration) {
    const { sectionIndex } = content;
    duration = content.duration;
    durationKey = `${sectionIndex}-${duration}`;
  }
  if (content?.section) {
    const { sectionIndex } = content.section;
    duration = content.section.duration;
    durationKey = `${sectionIndex}-${duration}`;
  }

  const slideRenderer = ({ key, index }) => {
    // TODO hard-coding the height for now. Later we may need to
    // make it responsive for landscape mode.

    let sectionElement = null;
    let partElement = null;

    if (content) {
      sectionElement =
        partIndex || content.type === 'section' ? null : (
          <Section {...content.section} />
        );

      let data = null;
      if (content.type === 'form') {
        // get form data if this is a form part
        if (content.payload) {
          const { name } = content.payload;
          data = formData[name];
        }
      }

      partElement = typeToView(content.type, content, data);
    }

    return (
      <Box
        key={key}
        height="calc(100vh - 128px)"
        maxWidth={'960px'}
        m="auto"
        p={3}>
        {sectionElement}
        {partElement}
        {index === totalSlides - 1 ? (
          <Button variant="contained" onClick={exit}>
            {t('live|finish')}
          </Button>
        ) : null}
      </Box>
    );
  };
  const onChangeIndex = (index) => {
    navigation.navigate(indexBaseHref + index);
  };

  const countdown = duration ? (
    <div style={{ textAlign: 'center' }}>
      <CountdownTimer key={durationKey} minutes={duration} />
    </div>
  ) : null;

  return (
    <LiveSessionWrapper
      slideRenderer={slideRenderer}
      slideCount={totalSlides}
      index={index}
      onChangeIndex={onChangeIndex}
      centerNavElement={countdown}
      onExit={exit}
    />
  );
}
