import { Component } from '@angular/core';
import { Service, Employee, State, City } from "./app.service";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Service]
})
export class AppComponent {
  data: Employee[];
  states: State[];
  cities: City[];

  cityDropDownInfo = {
    StateID: null,
    ds: null
  };

  constructor(private service: Service) {
    this.data = service.getEmployees();
    this.states = service.getStates();
    this.cities = service.getCities();

    this.getFilteredCities = this.getFilteredCities.bind(this);
  }

  getFilteredCities(options) {
    return {
      store: this.cities,
      filter: options.data ? ["StateID", "=", options.data.StateID] : null
    };
  }

  getCityDropDownDs(cellInfo) {
    let currStateID = cellInfo.row.data.StateID,
      prevStateID = this.cityDropDownInfo.StateID;

    if (!this.isArrEqual(prevStateID, currStateID)) {
      this.cityDropDownInfo = {
        StateID: cellInfo.row.data.StateID,
        ds: new DataSource({
          store: new ArrayStore({
            data: this.cities,
            key: "ID"
          }),
          filter: function(data) {
            return cellInfo.row.data.StateID.includes(data.StateID);
          }
        })
      };
    }

    return this.cityDropDownInfo.ds;
  }

  isArrEqual(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }

  setStateValue(rowData: any, value: any): void {
    rowData.CityID = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }

  arrayCellTemplate(container, options) {
    var noBreakSpace = "\u00A0",
      text = (options.value || [])
        .map(element => {
          return options.column.lookup.calculateCellValue(element);
        })
        .join(", ");
    container.textContent = text || noBreakSpace;
    container.title = text;
  }

  onSelectionChanged(e) {
    e.component.option("value", e.selectedRowKeys);
  }

  onClick(dataGrid, cellInfo, dropDownBox) {
    let selectedKeys = dataGrid.getSelectedRowKeys();
    cellInfo.setValue(selectedKeys);
    dropDownBox.close();
  }
}
