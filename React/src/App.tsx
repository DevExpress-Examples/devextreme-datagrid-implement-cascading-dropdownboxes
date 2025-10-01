import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import DataGrid, {
  Editing, Column, Lookup, type DataGridTypes,
} from 'devextreme-react/data-grid';
import './App.css';
import ArrayStore from 'devextreme/data/array_store';
import { type DataSourceOptions } from 'devextreme-react/common/data';
import service, { type City, type Employee } from './data';
import MultipleDropDownBox from './components/MultipleDropDownBox';

const dataSource: Employee[] = service.getEmployees();

const statesStore = new ArrayStore({
  data: service.getStates(),
  key: 'ID',
});

const citiesStore = new ArrayStore({
  data: service.getCities(),
  key: 'ID',
});

function getFilteredCities(cellInfo: DataGridTypes.ColumnEditCellTemplateData<Employee, number>, citiesStore: ArrayStore): DataSourceOptions {
  return {
    store: citiesStore,
    filter: (data: City) => (cellInfo.data?.StateID && cellInfo.data?.StateID?.length > 0
      ? cellInfo.data?.StateID.includes(data.StateID)
      : true),
  };
}

async function setStateValue(this: DataGridTypes.Column<Employee, number>, rowData: Employee, value: number[], currentRowData: Employee): Promise<void> {
  rowData.CityID = [];
  await this.defaultSetCellValue?.(rowData, value, currentRowData);
}

function arrayCellTemplate(container: HTMLElement, options: DataGridTypes.ColumnCellTemplateData<Employee, number>): void {
  const noBreakSpace = '\u00A0';
  const text = (options.value || [])
    .map((element: number) => options.column.lookup?.calculateCellValue?.(element) as string || '')
    .join(', ');
  container.textContent = text || noBreakSpace;
  container.title = text;
}

function renderMultipleDropDownBox(
  currentValue: number[],
  // eslint-disable-next-line no-unused-vars
  setValue: (value: number[]) => void,
  dataSource: ArrayStore | DataSourceOptions,
): JSX.Element {
  return (
    <MultipleDropDownBox
      dataSource={dataSource}
      value={currentValue}
      setValue={setValue}
    />
  );
}

function renderStateDropDownBox(e: DataGridTypes.ColumnEditCellTemplateData<Employee, number>): JSX.Element {
  const { setValue } = e;
  return renderMultipleDropDownBox(
    e.value,
    setValue,
    statesStore,
  );
}

function renderCityDropDownBox(e: DataGridTypes.ColumnEditCellTemplateData<Employee, number>): JSX.Element {
  const { setValue } = e;
  return renderMultipleDropDownBox(
    e.value,
    setValue,
    getFilteredCities(e, citiesStore),
  );
}

function App(): JSX.Element {
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
          editCellRender={renderStateDropDownBox}>
          <Lookup dataSource={statesStore} displayExpr="Name" valueExpr="ID" />
        </Column>
        <Column
          dataField="CityID"
          caption="City"
          cellTemplate={arrayCellTemplate}
          editCellRender={renderCityDropDownBox}>
          <Lookup dataSource={citiesStore} displayExpr="Name" valueExpr="ID" />
        </Column>
      </DataGrid>
    </div>
  );
}

export default App;
