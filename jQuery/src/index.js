$(() => {
  $('#dataGrid').dxDataGrid({
    dataSource: data,
    editing: {
      allowUpdating: true,
      allowAdding: true,
    },
    columns: [
      {
        dataField: 'stateID',
        caption: 'State',
        lookup: {
          dataSource: states,
          displayExpr: 'Name',
          valueExpr: 'ID',
        },
        editCellTemplate: stateDropDownBoxEditorTemplate,
        cellTemplate(container, options) {
          arrayCellTemplate(container, options);
        },
        setCellValue(rowData, value) {
          rowData.stateID = value;
          rowData.cityID = [];
        },
      },
      {
        dataField: 'cityID',
        caption: 'City',
        lookup: {
          dataSource: cities,
          displayExpr: 'Name',
          valueExpr: 'ID',
        },
        editCellTemplate: cityDropDownBoxEditorTemplate,
        cellTemplate(container, options) {
          arrayCellTemplate(container, options);
        },
      },
    ],
  });
});

function arrayCellTemplate(container, options) {
  const noBreakSpace = '\u00A0';
  const text = (options.value || [])
    .map((element) => options.column.lookup.calculateCellValue(element))
    .join(', ');
  container.text(text || noBreakSpace).attr('title', text);
}

function stateDropDownBoxEditorTemplate(cellElement, cellInfo) {
  const dropDownBox = $('<div>').dxDropDownBox({
    dataSource: states,
    value: cellInfo.value,
    valueExpr: 'ID',
    displayExpr: 'Name',
    contentTemplate(e, element) {
      const dataGridEl = $('<div>');
      const dataGrid = dataGridEl
        .dxDataGrid({
          dataSource: states,
          keyExpr: 'ID',
          hoverStateEnabled: true,
          height: 250,
          selection: { mode: 'multiple' },
          selectedRowKeys: cellInfo.value,
        })
        .dxDataGrid('instance');

      const saveBtn = createDropDownSaveBtn(dataGrid, cellInfo, e.component);
      element.append(dataGridEl, saveBtn);
    },
  });

  cellElement.append(dropDownBox);
}

function cityDropDownBoxEditorTemplate(cellElement, cellInfo) {
  const cityDataSource = new DevExpress.data.DataSource({
    store: new DevExpress.data.ArrayStore({
      data: cities,
      key: 'ID',
    }),
    filter(data) {
      return cellInfo.row.data?.stateID ? cellInfo.row.data.stateID.includes(data.StateID) : true;
    },
  });

  const dropDownBox = $('<div>').dxDropDownBox({
    dataSource: cityDataSource,
    value: cellInfo.value,
    valueExpr: 'ID',
    displayExpr: 'Name',
    contentTemplate(e, element) {
      const dataGridEl = $('<div>');
      const dataGrid = dataGridEl
        .dxDataGrid({
          dataSource: cityDataSource,
          hoverStateEnabled: true,
          height: 250,
          columns: ['ID', 'Name'],
          selection: { mode: 'multiple' },
          selectedRowKeys: cellInfo.value,
        })
        .dxDataGrid('instance');

      const saveBtn = createDropDownSaveBtn(dataGrid, cellInfo, e.component);
      element.append(dataGridEl, saveBtn);
    },
  });

  cellElement.append(dropDownBox);
}

function createDropDownSaveBtn(dataGrid, cellInfo, dropDownBox) {
  return $('<div>').dxButton({
    text: 'Apply',
    onClick() {
      const selectedKeys = dataGrid.getSelectedRowKeys();
      cellInfo.setValue(selectedKeys);
      dropDownBox.option('value', selectedKeys);
      dropDownBox.close();
    },
  });
}
