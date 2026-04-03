import { Component } from '@angular/core';
import { DataSource, ArrayStore } from 'devextreme-angular/common/data';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import dxDataGrid from 'devextreme/ui/data_grid';
import dxDropDownBox from 'devextreme/ui/drop_down_box';
import {
  AppService, Employee, State, City,
} from './app.service';
import { CityDropDownInfo, EditCellInfo } from './app.types';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService],
})
export class AppComponent {
  data: Employee[];

  states: State[];

  cities: City[];

  stateDataGrid: any;

  cityDataGrid: any;

  cityDropDownInfo: CityDropDownInfo = {
    StateID: null,
    ds: null,
  };

  constructor(private readonly service: AppService) {
    this.data = service.getEmployees();
    this.states = service.getStates();
    this.cities = service.getCities();
  }

  getFilteredCities = (options: EditCellInfo): { store: City[]; filter: [string, string, number[]] | null } => ({
    store: this.cities,
    filter: options.data ? ['StateID', '=', options.data.StateID] : null,
  });

  getCityDropDownDs(cellInfo: DxDataGridTypes.ColumnEditCellTemplateData<Employee, number>): DataSource {
    const currStateID = cellInfo.row.data.StateID || [-1];
    const prevStateID = this.cityDropDownInfo.StateID;
    if (!this.isArrEqual(prevStateID, currStateID)) {
      this.cityDropDownInfo = {
        StateID: currStateID,
        ds: new DataSource({
          store: new ArrayStore({
            data: this.cities,
            key: 'ID',
          }),
          filter: (data: City) => (cellInfo.row.data.StateID ? cellInfo.row.data.StateID.includes(data.StateID) : true),
        }),
      };
    }

    return this.cityDropDownInfo.ds ?? new DataSource({ store: [] });
  }

  isArrEqual(a: number[] | null, b: number[]): boolean {
    return (
      Array.isArray(a)
      && Array.isArray(b)
      && a.length === b.length
      && a.every((val, index) => val === b[index])
    );
  }

  async setStateValue(this: DxDataGridTypes.Column<Employee, number>, rowData: Employee, value: number[], currentRowData: Employee): Promise<void> {
    rowData.CityID = [];
    await this.defaultSetCellValue?.(rowData, value, currentRowData);
  }

  arrayCellTemplate(container: HTMLElement, options: DxDataGridTypes.ColumnCellTemplateData<Employee, number>): void {
    const noBreakSpace = '\u00A0';
    const text = (options.value || [])
      .map((element: number): string => options.column.lookup?.calculateCellValue?.(element) as string).join(', ');
    container.textContent = text || noBreakSpace;
    container.title = text;
  }

  onClick(dataGrid: dxDataGrid, cellInfo: DxDataGridTypes.ColumnEditCellTemplateData<Employee, number>, dropDownBox: dxDropDownBox): void {
    const selectedKeys = dataGrid.getSelectedRowKeys();
    cellInfo.setValue(selectedKeys);
    dropDownBox.close();
  }
}
