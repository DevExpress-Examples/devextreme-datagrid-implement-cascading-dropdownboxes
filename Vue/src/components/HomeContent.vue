<template>
  <div id="data-grid-demo">
    <DxDataGrid
      :data-source="data"
      @init-new-row="onInitNewRow"
    >
      <DxEditing
        :allow-updating="true"
        :allow-adding="true"
        mode="row"
      />
      <DxColumn
        :set-cell-value="setStateValue"
        data-field="StateID"
        caption="State"
        :cell-template="arrayCellTemplate"
        edit-cell-template="multipleDropDownBoxStateTemplate"
      >
        <DxLookup
          :data-source="states"
          display-expr="Name"
          value-expr="ID"
        />
      </DxColumn>
      <DxColumn
        data-field="CityID"
        caption="City"
        :cell-template="arrayCellTemplate"
        edit-cell-template="multipleDropDownBoxCityTemplate"
      >
        <DxLookup
          :data-source="getFilteredCities"
          display-expr="Name"
          value-expr="ID"
        />
      </DxColumn>
      <template #multipleDropDownBoxStateTemplate="{ data: cellInfo }">
        <StateDropDownBoxComponent
          :value="cellInfo.value"
          :on-value-changed="cellInfo.setValue"
          :data-source="states"
          :cell-info="cellInfo"
        />
      </template>
      <template #multipleDropDownBoxCityTemplate="{ data: cellInfo }">
        <CityDropDownBoxComponent
          :value="cellInfo.value"
          :on-value-changed="cellInfo.setValue"
          :data-source="cityDataSource(cellInfo)"
          :cell-info="cellInfo"
        />
      </template>
    </DxDataGrid>
  </div>
</template>

<script setup lang="ts">
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxLookup,
  type DxDataGridTypes,
} from 'devextreme-vue/data-grid';
import service, { type City, type Employee } from '../data';
import StateDropDownBoxComponent from './StateDropDownBoxComponent.vue';
import CityDropDownBoxComponent from './CityDropDownBoxComponent.vue';
import { DataSource, ArrayStore } from 'devextreme-vue/common/data';

const data: Employee[] = service.getEmployees();
const states = service.getStates();
const cities = service.getCities();

const onInitNewRow = (e: DxDataGridTypes.InitNewRowEvent<Employee, number>): void => {
  e.data.StateID = [];
  e.data.CityID = [];
};

const setStateValue = async function(
  this: DxDataGridTypes.Column<Employee, number>,
  rowData: Employee,
  value: number[],
  currentRowData: Employee
) {
  rowData.CityID = [];
  await this.defaultSetCellValue?.(rowData, value, currentRowData);
};

const arrayCellTemplate = (
  container: HTMLElement,
  options: DxDataGridTypes.ColumnCellTemplateData<Employee, number>
): void => {
  const noBreakSpace = '\u00A0';
  const text = (options.value || [])
    .map((element: number) => {
      return options.column.lookup?.calculateCellValue?.(element);
    })
    .join(', ');
  container.textContent = text || noBreakSpace;
  container.title = text;
};

const getFilteredCities = (options: { data: Employee, key: number }): {
  store: City[];
  filter: [string, string, number[]] | null;
} => {
  return {
    store: cities,
    filter: options.data ? ['StateID', '=', options.data.StateID] : null,
  };
};

const cityDataSource = (cellInfo: any): DataSource => {
  return new DataSource({
    store: new ArrayStore({
      data: cities,
      key: 'ID',
    }),
    filter: (data: City) => {
      return (cellInfo.row.data?.StateID?.length > 0
        ? cellInfo.row.data.StateID.includes(data.StateID)
        : true);
    },
  });
};
</script>

<style>
#data-grid-demo {
  min-height: 700px;
}
</style>
