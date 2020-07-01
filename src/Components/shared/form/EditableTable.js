import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import { useAppTranslation } from 'Components/zume/translationHooks';
import { useDispatch } from 'react-redux';
import { formDataUpdated } from 'Redux/forms';
import { cloneDeep } from 'lodash';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const basicVariantOptions = {
  padding: 'dense',
  search: false,
  actionsColumnIndex: 3,
  actionsCellStyle: {
    fontSize: 'inherit'
  },
  headerStyle: {
    fontSize: '0.7rem'
  },
  rowStyle: {
    fontSize: '0.7rem'
  },
  cellStyle: {
    fontSize: '0.7rem'
  },
  showFirstLastPageButtons: false,
  pageSize: 10,
  pageSizeOptions: [10],
  addRowPosition: 'first',
  emptyRowsWhenPaging: false
};

export default function EditableTable({ title, columns, data, formName }) {
  const trans = useAppTranslation();
  const dispatch = useDispatch();

  // NOTE since data is modified by the table even though
  // it is immutable, we need to create a copy.
  let clonedData = cloneDeep(data);

  const localizedColumns = columns.map(c => {
    const { title, lookup } = c;
    const localizedC = {
      ...c
    };
    if (title) {
      localizedC.title = trans(title);
    }
    if (lookup) {
      localizedC.lookup = {};
      for (let i in lookup) {
        localizedC.lookup[i] = trans(lookup[i]);
      }
    }
    return localizedC;
  });

  const editable = {
    onRowAdd: newRowData =>
      new Promise((resolve, reject) => {
        let newData = clonedData || [];
        newData.unshift(newRowData);
        dispatch(formDataUpdated({ name: formName, data: newData }));
        resolve();
      }),
    onRowUpdate: (newRowData, oldData) =>
      new Promise((resolve, reject) => {
        console.log(newRowData, oldData, clonedData.indexOf(oldData));
        const index = clonedData.indexOf(oldData);
        clonedData[index] = newRowData;
        dispatch(formDataUpdated({ name: formName, data: clonedData }));
        resolve();
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        console.log(oldData);
        const index = clonedData.indexOf(oldData);
        clonedData.splice(index, 1);
        dispatch(formDataUpdated({ name: formName, data: clonedData }));
        resolve();
      })
  };

  let options = basicVariantOptions;
  // TODO support other variants

  return (
    <MaterialTable
      title={trans(title)}
      columns={localizedColumns}
      data={clonedData}
      icons={tableIcons}
      editable={editable}
      options={options}
    />
  );
}
