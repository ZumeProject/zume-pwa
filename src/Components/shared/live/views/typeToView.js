import React from 'react';
import BasicPart from './BasicPart';
import DiscussPart from './DiscussPart';
import ReadPart from './ReadPart';
import SharePart from './SharePart';
import WatchPart from './WatchPart';
import ListenPart from './ListenPart';
import SeePart from './SeePart';
import Section from './Section';
import FormPart from './FormPart';

/**
 * This function maps a Codex type to the view (React component)
 * needed to render it.
 */

export default function typeToView(type, content, data) {
  switch (type) {
    case 'section': {
      const { t, d, info } = content;
      return <Section t={t} d={d} info={info} />;
    }
    case 'watch': {
      const { t, d, payload, info } = content;
      const { video, script, scriptLabel } = payload;
      return (
        <WatchPart
          t={t}
          d={d}
          video={video}
          script={script}
          scriptLabel={scriptLabel}
          info={info}
        />
      );
    }
    case 'discuss': {
      const { t, d, questions, info } = content;
      return <DiscussPart t={t} d={d} questions={questions} info={info} />;
    }
    case 'read': {
      const { t, d, payload } = content;
      return <ReadPart t={t} d={d} payload={payload} />;
    }
    case 'see': {
      const { t, d, payload } = content;
      return <SeePart t={t} d={d} payload={payload} />;
    }
    case 'share': {
      const { t, d, payload } = content;
      return <SharePart t={t} d={d} payload={payload} />;
    }
    case 'listen': {
      const { t, d, payload } = content;
      // TODO deprecate script and scriptLabel and make
      // text into script.
      const { audio, script, scriptLabel, text } = payload;
      return (
        <ListenPart
          t={t}
          d={d}
          audio={audio}
          script={script}
          scriptLabel={scriptLabel}
          text={text}
        />
      );
    }
    case 'form': {
      const { t, d, parts, payload } = content;
      return (
        <FormPart t={t} d={d} payload={payload} parts={parts} data={data} />
      );
    }
    case 'cta':
    default: {
      const { t, d, info, payload } = content;
      return <BasicPart t={t} d={d} info={info} payload={payload} />;
    }
  }
}
