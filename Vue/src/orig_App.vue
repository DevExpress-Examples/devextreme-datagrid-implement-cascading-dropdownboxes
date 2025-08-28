<template>
  <div id="data-grid-demo">
    <DxDataGrid :data-source="data">
      <DxEditing :allow-updating="true" :allow-adding="true" mode="row"/>
      <DxColumn
        :set-cell-value="setStateValue"
        data-field="StateID"
        caption="State"
        :cell-template="arrayCellTemplate"
        edit-cell-template="multipleDropDownBoxStateTemplate"
      >
        <DxLookup :data-source="states" display-expr="Name" value-expr="ID"/>
      </DxColumn>
      <DxColumn
        data-field="CityID"
        caption="City"
        :cell-template="arrayCellTemplate"
        edit-cell-template="multipleDropDownBoxCityTemplate"
      >
        <DxLookup :data-source="getFilteredCities" display-expr="Name" value-expr="ID"/>
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

<script>
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxLookup
} from "devextreme-vue/data-grid";
import service from "./data.js";
import StateDropDownBoxComponent from "./components/StateDropDownBoxComponent.vue";
import CityDropDownBoxComponent from "./components/CityDropDownBoxComponent.vue";

import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";

const data = service.getEmployees();
const states = service.getStates();
const cities = service.getCities();

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxLookup,
    StateDropDownBoxComponent,
    CityDropDownBoxComponent
  },
  data() {
    return {
      data,
      states,
      setStateValue(rowData, value) {
        rowData.CityID = [];
        this.defaultSetCellValue(rowData, value);
      }
    };
  },
  methods: {
    arrayCellTemplate(container, options) {
      var noBreakSpace = "\u00A0",
        text = (options.value || [])
          .map(element => {
            return options.column.lookup.calculateCellValue(element);
          })
          .join(", ");
      container.textContent = text || noBreakSpace;
      container.title = text;
    },
    getFilteredCities: options => {
      return {
        store: cities,
        filter: options.data ? ["StateID", "=", options.data.StateID] : null
      };
    },
    cityDataSource: function(cellInfo) {
      return new DataSource({
        store: new ArrayStore({
          data: cities,
          key: "ID"
        }),
        filter: function(data) {
          return cellInfo.row.data.StateID.includes(data.StateID);
        }
      });
    }
  },
  computed: {}
};
</script>
<style>
#data-grid-demo {
  min-height: 700px;
}
</style>
