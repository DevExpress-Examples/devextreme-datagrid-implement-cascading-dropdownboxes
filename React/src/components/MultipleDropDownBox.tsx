import React, { useCallback, useMemo, useReducer } from 'react';
import DataGrid, { Column, Selection, type DataGridTypes } from 'devextreme-react/data-grid';
import DropDownBox from 'devextreme-react/drop-down-box';
import type { ArrayStore, DataSourceOptions } from 'devextreme-react/common/data';
import DropDownBoxSave from './DropDownBoxSave';

interface MultipleDropDownBoxProps {
  value: number[];
  dataSource: DataSourceOptions | ArrayStore;
  // eslint-disable-next-line no-unused-vars
  setValue: (newValue: number[]) => void;
}

interface DropDownBoxState {
  selectedKeys: number[];
  currentValue: number[];
  isOpened: boolean;
}

type DropDownBoxAction =
  | { type: 'dropDownBoxValue'; data: number[] }
  | { type: 'selectedKeys'; data: number[] }
  | { type: 'openDropdown' };

function reducer(state: DropDownBoxState, action: DropDownBoxAction): DropDownBoxState {
  switch (action.type) {
    case 'dropDownBoxValue':
      return { ...state, currentValue: action.data, isOpened: false };
    case 'selectedKeys':
      return { ...state, selectedKeys: action.data };
    case 'openDropdown':
      return { ...state, isOpened: true };
    default:
      return state;
  }
}

function MultipleDropDownBox({ value, dataSource, setValue }: MultipleDropDownBoxProps): JSX.Element {
  const [{ selectedKeys, currentValue, isOpened }, dispatch] = useReducer(reducer, {
    selectedKeys: value,
    currentValue: value,
    isOpened: false,
  });

  const onShowingHandler = useCallback(() => {
    dispatch({ type: 'openDropdown' });
  }, []);

  const dropDownOpts = useMemo(() => ({
    onShowing: onShowingHandler,
    visible: isOpened,
  }), [isOpened]);

  const onSelectionChanged = useCallback((args: DataGridTypes.SelectionChangedEvent): void => {
    const { selectedRowKeys } = args;
    dispatch({ type: 'selectedKeys', data: selectedRowKeys });
  }, []);

  return (
    <DropDownBox
      dataSource={dataSource}
      value={currentValue}
      displayExpr="Name"
      valueExpr="ID"
      dropDownOptions={dropDownOpts}
    >
      <React.Fragment>
        <DataGrid
          dataSource={dataSource}
          selectedRowKeys={selectedKeys}
          hoverStateEnabled={true}
          height={250}
          onSelectionChanged={onSelectionChanged}
        >
          <Column dataField="ID" />
          <Column dataField="Name" />
          <Selection mode="multiple" />
        </DataGrid>
        <DropDownBoxSave
          selectedKeys={selectedKeys}
          setCellValue={setValue}
          setState={dispatch}
        />
      </React.Fragment>
    </DropDownBox>
  );
}

export default MultipleDropDownBox;
