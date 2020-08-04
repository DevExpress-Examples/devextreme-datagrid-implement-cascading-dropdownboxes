<template>
  <DxDropDownBox
    :data-source="dataSource"
    :value.sync="currentValue"
    display-expr="Name"
    value-expr="ID"
    content-template="contentTemplate"
  >
    <template #contentTemplate="{ data }">
      <div>
        <DxDataGrid
          :data-source="dataSource"
          :selected-row-keys="currentValue"
          :hover-state-enabled="true"
          :height="250"
          @initialized="onInitialized"
        >
          <DxColumn data-field="ID"/>
          <DxColumn data-field="Name"/>
          <DxSelection mode="multiple"/>
        </DxDataGrid>
        <DropDownSaveBtnComponent
          :data-grid="dataGrid"
          :cell-info="cellInfo"
          :drop-down-box="data.component"
        />
      </div>
    </template>
  </DxDropDownBox>
</template>
<script>
import { DxDataGrid, DxSelection, DxColumn } from "devextreme-vue/data-grid";
import DxDropDownBox from "devextreme-vue/drop-down-box";
import DropDownSaveBtnComponent from "./DropDownSaveBtnComponent.vue";

export default {
  components: {
    DxDataGrid,
    DxSelection,
    DxColumn,
    DxDropDownBox,
    DropDownSaveBtnComponent
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    onValueChanged: {
      type: Function,
      default: () => function() {}
    },
    dataSource: {
      type: Object,
      default: () => function() {}
    },
    cellInfo: {
      type: Object,
      default: () => function() {}
    }
  },
  data() {
    return {
      dataGridRef: "dataGrid",
      currentValue: this.value,
      dataGrid: null
    };
  },
  methods: {
    onInitialized(e) {
      this.dataGrid = e.component;
    }
  }
};
</script>
