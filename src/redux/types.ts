import {IChecksState} from "./checks/reducer";

export interface ITypeAction {
  type: string;
}

export interface IAction<P> {
  type: string;
  payload: P;
}

export interface RootState {
  checksState: IChecksState;
}
