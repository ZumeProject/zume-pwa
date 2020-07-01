import React from 'react';
import InfoPart from './InfoPart';
import Description from './Description';
import { useAppTranslation } from 'Components/zume/translationHooks';

export default function Section({ t, d, info, duration }) {
  const trans = useAppTranslation();
  return (
    <div>
      {t ? <h2>{trans(t)}</h2> : null}
      {d ? <Description d={d} /> : null}
      {info ? <InfoPart d={info} /> : null}
    </div>
  );
}
