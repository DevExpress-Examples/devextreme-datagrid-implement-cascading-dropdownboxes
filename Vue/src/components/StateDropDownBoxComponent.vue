<template>
  <DxDropDownBox
    :data-source="dataSource"
    v-model:value="currentValue"
    display-expr="Name"
    value-expr="ID"
    content-template="contentTemplate"
  >
    <template #contentTemplate="{ data }">
      <div>
        <DxDataGrid
          :data-source="dataSource"
          key-expr="ID"
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

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import { DxDataGrid, DxSelection, DxColumn, type DxDataGridTypes } from 'devextreme-vue/data-grid';
import DxDropDownBox from 'devextreme-vue/drop-down-box';
import DropDownSaveBtnComponent from './DropDownSaveBtnComponent.vue';
import type { Employee, State } from '../data';

interface Props {
  value: number[] | undefined;
  // eslint-disable-next-line no-unused-vars
  onValueChanged: (value: number[]) => void;
  dataSource: State[];
  cellInfo: DxDataGridTypes.ColumnEditCellTemplateData<Employee, number>;
}

const props = defineProps<Props>();

const currentValue: Ref<number[]> = ref([...(props.value || [])]);
const dataGrid = ref();

const onInitialized = (e: DxDataGridTypes.InitializedEvent): void => {
  dataGrid.value = e.component;
};

watch(() => props.value, (newValue: number[] | undefined) => {
  currentValue.value = [...(newValue || [])];
}, { deep: true });
</script>
