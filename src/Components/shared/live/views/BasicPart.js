import React from 'react';
import openUrl from 'Utils/browser/openUrl';
import Button from '@material-ui/core/Button';
import {
  useAppTranslation,
  useLocalizedAsset
} from 'Components/zume/translationHooks';
import Description from './Description';
import InfoPart from './InfoPart';

export default function BasicPart({ t, d, info, payload }) {
  const trans = useAppTranslation();
  const asset = useLocalizedAsset();
  return (
    <div>
      {t ? <h3>{trans(t)}</h3> : null}
      {d ? <Description d={d} /> : null}
      {payload ? (
        <p>
          <Button
            variant="contained"
            onClick={() => {
              openUrl(asset(payload.key));
            }}>
            {trans(payload.label)}
          </Button>
        </p>
      ) : null}
      {info ? <InfoPart d={info} /> : null}
    </div>
  );
}
