import React from 'react';
import Description from './Description';
import InfoPart from './InfoPart';
import { useAppTranslation } from 'Components/zume/translationHooks';

export default function ReadPart({ t = 'READ', d, payload }) {
  const trans = useAppTranslation();
  let info = null;
  if (payload) {
    info = payload.info;
  }

  return (
    <div>
      {<h3>{trans(t)}</h3>}
      {d ? <Description d={d} /> : null}
      {info ? <InfoPart d={info} /> : null}
    </div>
  );
}
