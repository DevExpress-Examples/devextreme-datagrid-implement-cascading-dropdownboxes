<template>
  <DxButton
    text="Apply"
    @click="onClick"
  />
</template>

<script setup lang="ts">
import type { Employee } from '@/data';
import DxButton from 'devextreme-vue/button';
import type { DxDataGridTypes } from 'devextreme-vue/cjs/data-grid';
import type dxDataGrid from 'devextreme/ui/data_grid';
import type dxDropDownBox from 'devextreme/ui/drop_down_box';

interface Props {
  dataGrid?: dxDataGrid;
  cellInfo: DxDataGridTypes.ColumnEditCellTemplateData<Employee, number>;
  dropDownBox?: dxDropDownBox;
}

const props = defineProps<Props>();

const onClick = (): void => {
  if (!props.dataGrid) return;

  const selectedKeys = props.dataGrid.getSelectedRowKeys() as number[];
  props.cellInfo.setValue(selectedKeys);
  props.dropDownBox?.option('value', selectedKeys);
  props.dropDownBox?.close();
};
</script>
