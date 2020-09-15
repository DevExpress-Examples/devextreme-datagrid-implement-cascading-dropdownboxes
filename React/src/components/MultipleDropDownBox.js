import React, { useReducer } from 'react';

import DataGrid, { Column, Selection } from 'devextreme-react/data-grid';
import DropDownBox from 'devextreme-react/drop-down-box';
import DropDownBoxSave from './DropDownBoxSave';

export default function MultipleDropDownBox({value, dataSource, setValue}) {
    const [{selectedKeys, currentValue, isOpened}, dispatch] = useReducer(reducer, {
        selectedKeys: value, 
        currentValue: value,
        isOpened: false
    })
    const dropDownOpts = {
        onShowing: () => {
            dispatch({type: "openDropdown"})
        },
        visible: isOpened
    } 

    function onSelectionChanged({selectedRowKeys}) {
        dispatch({type: "selectedKeys", data: selectedRowKeys})
    }

    function renderDataGrid({component}) {
        return (
            <React.Fragment>
                <DataGrid 
                    dataSource={dataSource} 
                    keyExpr="ID"
                    selectedRowKeys={selectedKeys}
                    hoverStateEnabled={true}
                    height={250}
                    onSelectionChanged={onSelectionChanged}> 
                    <Column dataField="ID" />
                    <Column dataField="Name" />
                    <Selection mode="multiple" />
                </DataGrid>
                <DropDownBoxSave selectedKeys={selectedKeys} setCellValue={setValue} setState={dispatch}/>
            </React.Fragment>
        )
    }

    return (
        <DropDownBox 
            dataSource={dataSource}
            value={currentValue}
            displayExpr="Name"
            valueExpr="ID"
            dropDownOptions={dropDownOpts}
            contentRender={renderDataGrid}
        />
    )
}

function reducer(state, action) {
    if(action.type === "dropDownBoxValue") {
        return {...state, currentValue: action.data, isOpened: false}
    } else if(action.type === "selectedKeys")
        return {...state, selectedKeys: action.data}
    else if(action.type === "openDropdown") 
        return {...state, isOpened: true}
}