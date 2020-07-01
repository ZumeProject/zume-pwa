import React from 'react';
import EditableTable from './EditableTable';

export default function typeToComponent(type, opts, key) {
  switch (type) {
    case 'EditableTable':
      let { formName, payload, data } = opts;
      const { title, columns } = payload;
      return (
        <EditableTable
          key={key}
          formName={formName}
          data={data}
          title={title}
          columns={columns}
        />
      );
    default:
      return <div key={key}></div>;
  }
}
