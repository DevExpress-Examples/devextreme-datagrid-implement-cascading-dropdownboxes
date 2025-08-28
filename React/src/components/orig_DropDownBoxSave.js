import React from 'react';
import Button from 'devextreme-react/button';

export default function DropDownBoxSave({selectedKeys, setCellValue, setState}) {
    function onClick() {
        setState({type: "dropDownBoxValue", data: selectedKeys})
        setCellValue(selectedKeys)
    }

    return <Button text="Apply" onClick={onClick}/>
}