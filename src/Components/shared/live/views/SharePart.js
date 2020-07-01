import React from 'react';
import openUrl from 'Utils/browser/openUrl';
import Button from '@material-ui/core/Button';
import Description from './Description';
import {
  useAppTranslation,
  useLocalizedAsset
} from 'Components/zume/translationHooks';

export default function SharePart({ t = 'SHARE', d, payload }) {
  const trans = useAppTranslation();
  const asset = useLocalizedAsset();
  return (
    <div>
      {t ? <h3>{trans(t)}</h3> : null}
      {d ? <Description d={d} /> : null}
      {payload ? (
        <Button
          variant="contained"
          onClick={() => {
            openUrl(asset(payload.key));
          }}
        >
          {trans(payload.label)}
        </Button>
      ) : null}
    </div>
  );
}
