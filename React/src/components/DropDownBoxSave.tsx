import React, { useCallback } from 'react';
import Button from 'devextreme-react/button';

type DropDownBoxAction =
  | { type: 'dropDownBoxValue'; data: number[] }
  | { type: 'selectedKeys'; data: number[] }
  | { type: 'openDropdown' };

interface DropDownBoxSaveProps {
  selectedKeys: number[];
  // eslint-disable-next-line no-unused-vars
  setCellValue: (value: number[]) => void;
  setState: React.Dispatch<DropDownBoxAction>;
}

function DropDownBoxSave({ selectedKeys, setCellValue, setState }: DropDownBoxSaveProps): JSX.Element {
  const onClick = useCallback(() => {
    setState({ type: 'dropDownBoxValue', data: selectedKeys });
    setCellValue(selectedKeys);
  }, [selectedKeys, setCellValue, setState]);

  return <Button text="Apply" onClick={onClick} />;
}

export default DropDownBoxSave;
