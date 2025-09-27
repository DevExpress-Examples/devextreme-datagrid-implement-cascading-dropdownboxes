import { DataSource } from 'devextreme-angular/common/data';

export interface EditCellInfo<TItem=any, TKey=any> {
  data?: TItem;
  key?: TKey;
}

export interface CityDropDownInfo {
  StateID: number[] | null;
  ds: DataSource | null;
}
