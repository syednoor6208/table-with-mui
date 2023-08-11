interface IPath {
  label: string;
  path: string;
}
export interface IColumns extends IPath {
  styles?: IGeneric<object>;
  hide?: boolean;
  expandablePath?: IGeneric<IPath>;
}
export type IGeneric<T> = {
  [K in keyof T]: T | undefined;
};

export interface IData {
  name: string;
  calories: number;
  fat: number;
  protein: number;
  carbs: number;
  children?: Array<IData>;
}

export interface ITable {
  columns: Array<IGeneric<IColumns>>;
  expandable?: boolean;
  data: Array<IGeneric<IData>>;
  uniqueKey?: string;
}
