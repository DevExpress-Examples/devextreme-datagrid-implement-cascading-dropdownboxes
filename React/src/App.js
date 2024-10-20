import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import DataGrid, { Editing, Column, Lookup } from 'devextreme-react/data-grid';
import './App.css';
import service from './data'
import MultipleDropDownBox from './components/MultipleDropDownBox';
import ArrayStore from 'devextreme/data/array_store';

const dataSource = service.getEmployees(),
  states = new ArrayStore({
    data: service.getStates(),
    key: "ID"
  }),
  cities = new ArrayStore({
    data: service.getCities(),
    key: "ID"
  });

function App() {
  function renderMultipleDropDownBox(value, setValue, dataSource) {
    return <MultipleDropDownBox dataSource={dataSource} value={value} setValue={setValue} />
  }

  function renderCityDropDownBox(e) {
    const {value, setValue} = e;
    return renderMultipleDropDownBox(
      value,
      setValue,
      getFilteredCities(e)
    )
  }
  
  return (
    <div className="App">
      <DataGrid dataSource={dataSource}>
        <Editing
          mode="row"
          allowUpdating={true}
          allowAdding={true}>
        </Editing>
        <Column
          dataField="StateID"
          caption="State"
          setCellValue={setStateValue}
          cellTemplate={arrayCellTemplate}
          editCellRender={({ value, setValue }) => renderMultipleDropDownBox(value, setValue, states)}>
          <Lookup dataSource={states} displayExpr="Name" valueExpr="ID" />
        </Column>
        <Column
          dataField="CityID"
          caption="City"
          cellTemplate={arrayCellTemplate}
          editCellRender={renderCityDropDownBox}>
          <Lookup dataSource={getFilteredCities} displayExpr="Name" valueExpr="ID" />
        </Column>
      </DataGrid>
    </div>
  );
}

function getFilteredCities(options) {
  return {
    store: cities,
    filter: options.data ? ["StateID", "=", options.data.StateID] : null,
  };
}

function setStateValue(rowData, value) {
  rowData.CityID = [];
  this.defaultSetCellValue(rowData, value);
}

function arrayCellTemplate(container, options) {
  var noBreakSpace = "\u00A0",
    text = (options.value || [])
      .map(element => {
        return options.column.lookup.calculateCellValue(element);
      })
      .join(", ");
  container.textContent = text || noBreakSpace;
  container.title = text;
}

export default App;
