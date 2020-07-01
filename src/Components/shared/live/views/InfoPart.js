import React from 'react';
import Description from './Description';

export default function InfoPart({ t, d }) {
  return (
    <div>
      <Description d={d} />
    </div>
  );
}
