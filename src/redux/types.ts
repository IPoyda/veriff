import {IChecksState} from "./checks/reducer";

export interface IAction<P> {
  type: string;
  payload?: P;
}

export interface RootState {
  checksState: IChecksState;
}
