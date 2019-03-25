import { ComponentType, PureComponent } from 'react';
import { ReducersMapObject } from "redux";
import { gluer } from "glue-redux";

interface Glue {
  [index:string]: any;
}

type modelState = any;

interface DestructResult {
  reducers: ReducersMapObject,
  useGlue: (model: Glue) => [modelState],
  referToState: (model: Glue) => any,
}

interface Dispatch {
  (p: any): any;
}

interface GetState {
  (p?: any): any;
}

interface DestructParams {
  dispatch: Dispatch;
  getState: GetState;
  [index: string]: any;
}
interface DestructReturn {
  (structure: Glue): DestructResult;
}
interface Destruct {
  (p: DestructParams): DestructReturn;
}

export { gluer };
export const destruct:Destruct;
