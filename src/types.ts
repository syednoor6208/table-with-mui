import React from 'react';
interface IPath {
  label: string;
  path: string;
}
export interface IColumns extends IPath {
  styles?: IGeneric<Object>;
  hide?: boolean;
  
}
export type IGeneric<T> = {
  [K in keyof T]: T[K];
};

export interface IData {
  name: string;
  calories: number;
  fat: number;
  protein: number;
  carbs: number;
  children?: Array<IData>;
}

interface IGeneral{
  expandable?: ((row:IGeneric<Object>,columns:IColumns[]) => React.ReactElement | null ) | boolean;
    columns: IColumns[];
}

export interface IPrintRow extends IGeneral{
   row:IGeneric<Object>;
  


}
export interface ITable extends IGeneral {
  data: Array<IGeneric<Object>>;
  uniqueKey?: string;
}
