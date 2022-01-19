import React, { useEffect } from 'react';
import LiveSessionWrapper from 'Components/shared/live/LiveSessionWrapper';
import Section from 'Components/shared/live/views/Section';

import { makeStyles } from '@material-ui/core/styles';
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
import { useAppTranslation } from 'Components/zume/translationHooks';
import { selectLanguage } from 'Redux/language';

import useBasenameUrl from 'Utils/browser/useBasenameUrl';
import typeToView from 'Components/shared/live/views/typeToView';
import CountdownTimer from 'Components/shared/live/CountdownTimer';
import { useCheckpoints } from 'Components/zume/savepointsHooks';

const useStyles = makeStyles(() => ({
  rtlRoot: {
    flip: false,
    direction: 'rtl',
  },
}));

export default function LiveSession({ selectedId, selectedIndex }) {
  const session = useSelector((state) => selectSession(state, selectedId));
  const formData = useSelector((state) => selectFormsByName(state, session?.forms));

  const partIndex = useSelector(selectPartIndex);
  const { checkpoint, setCheckpoint } = useCheckpoints();

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
  const indexBaseHref = useBasenameUrl(`/live/${selectedId}/`);

  const trans = useAppTranslation();
  const { rtl } = useSelector(selectLanguage);
  const classes = useStyles();

  useEffect(() => {
    if (checkpoint) {
      const { url, position, media } = checkpoint;

      // We need to be sure we are on the correct url.
      if (url === indexBaseHref + index) {
        // We take the swappable element as our content element.
        const element = document.querySelector(
          'div.react-swipeable-view-container div[aria-hidden="false"]',
        );
        if (position) {
          element.scrollTop = position;
        }
        if (media?.time > 10) {
          // Since we are using a placeholder for media, we need to trigger the click event to make the real media element appears.
          const placeholderMediaElement = element.getElementsByClassName('media')[0];
          placeholderMediaElement.click();

          // We wait until placeholder's click event finish to try to get the real media.
          setTimeout(() => {
            const displayedMedia = element.getElementsByTagName(media.type)[0];
            displayedMedia.currentTime = media.time - 10; // A polite 10 secs rewind to let the user undestand where they were before leaving.
            displayedMedia.play();
          }, 500);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // We only need to run this once during the first load.

  const exit = () => {
    // We grab the swappable content element
    const element = document.querySelector(
      'div.react-swipeable-view-container div[aria-hidden="false"]',
    );
    // We get the correct media type (here is always video, but we are supporting audio as well).
    const media =
      element.getElementsByTagName('video')[0] || element.getElementsByTagName('audio')[0];

    setCheckpoint({
      url: indexBaseHref + index,
      position: element?.scrollTop,
      media: { type: media?.tagName.toLowerCase(), time: media?.currentTime },
    });
    navigation.navigate(backHref);
  };

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
        partIndex || content.type === 'section' ? null : <Section {...content.section} />;

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
        className={rtl ? classes.rtlRoot : ''}
        key={key}
        height="calc(100vh - 128px)"
        maxWidth={'960px'}
        m="auto"
        p={3}
      >
        {sectionElement}
        {partElement}
        {index === totalSlides - 1 ? (
          <Button
            variant="contained"
            onClick={() => {
              setCheckpoint(null); // We clear our checkpoint once the lessons has been completed.
              navigation.navigate(backHref);
            }}
          >
            {trans('Finish')}
          </Button>
        ) : null}
      </Box>
    );
  };
  const onChangeIndex = (index) => {
    if (index < 0) {
      index = 0;
    }
    const url = indexBaseHref + index;
    setCheckpoint({ url, media: null, position: 0 }); // Checkpoint is saved every time we change pages.
    navigation.navigate(url);
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
