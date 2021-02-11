<template>
  <DxButton text="Apply" @click="onClick($event)"/>
</template>
<script>
import DxButton from "devextreme-vue/button";

export default {
  components: {
    DxButton
  },
  props: {
    dataGrid: {
      type: Object,
      default: () => function() {}
    },
    cellInfo: {
      type: Object,
      default: () => function() {}
    },
    dropDownBox: {
      type: Object,
      default: () => function() {}
    }
  },
  methods: {
    onClick() {
      let selectedKeys = this.dataGrid.getSelectedRowKeys();
      this.cellInfo.setValue(selectedKeys);
      this.dropDownBox.option("value", selectedKeys);
      this.dropDownBox.close();
    }
  }
};
</script>
