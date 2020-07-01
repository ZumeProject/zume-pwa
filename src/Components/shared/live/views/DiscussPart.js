import React from 'react';
import Description from './Description';
import InfoPart from './InfoPart';
import { useAppTranslation } from 'Components/zume/translationHooks';

export default function DiscussPart({ t = 'DISCUSS', d, questions, info }) {
  const trans = useAppTranslation();
  let questionsElement = null;
  if (Array.isArray(questions)) {
    if (questions.length === 1) {
      questionsElement = <div>{trans(questions[0])}</div>;
    } else {
      questionsElement = (
        <div>
          {questions.map((q, i) => (
            <p key={`discussionQ${i}`}>{trans(q)}</p>
          ))}
        </div>
      );
    }
  }

  return (
    <div>
      {t ? <h3>{trans(t)}</h3> : null}
      {d ? <Description d={d} /> : null}
      {questionsElement}
      {info ? <InfoPart d={info} /> : null}
    </div>
  );
}
