import React from 'react';
import Description from './Description';
import BasicPart from './BasicPart';
import { useAppTranslation } from 'Components/zume/translationHooks';
import typeToComponent from 'Components/shared/form/typeToComponent';

export default function FormPart({ t, d, payload, parts, data }) {
  const trans = useAppTranslation();
  const { name, downloadLabel, downloadKey } = payload;
  let formElement = null;
  if (Array.isArray(parts)) {
    formElement = (
      <div>
        {parts.map((p, i) =>
          typeToComponent(
            p.type,
            {
              formName: name,
              payload: p.payload,
              data
            },
            `form-${name}-${i}`
          )
        )}
      </div>
    );
  }

  return (
    <div>
      {t ? <h3>{trans(t)}</h3> : null}
      {d ? <Description d={d} /> : null}
      {downloadKey ? (
        <BasicPart payload={{ key: downloadKey, label: downloadLabel }} />
      ) : null}
      {formElement}
    </div>
  );
}
