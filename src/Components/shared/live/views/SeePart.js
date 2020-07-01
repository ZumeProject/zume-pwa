import React from 'react';
import Grid from '@material-ui/core/Grid';
import Description from './Description';
import {
  useAppTranslation,
  useLocalizedAsset
} from 'Components/zume/translationHooks';

export default function SeePart({ t, d, payload }) {
  const trans = useAppTranslation();
  const asset = useLocalizedAsset();
  let image = null,
    alt = null;
  if (payload) {
    image = payload.image;
    alt = payload.alt;
  }

  return (
    <div>
      {<h3>{trans(t)}</h3>}
      <Grid container spacing={1}>
        <Grid item xs={12} sm={5} md={4}>
          <img src={asset(image)} alt={trans(alt)} />
        </Grid>
        <Grid item xs={12} sm={7} md={8}>
          {d ? <Description d={d} /> : null}
        </Grid>
      </Grid>
    </div>
  );
}
