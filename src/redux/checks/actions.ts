import {ICheck} from "../../common/types";
import {IAction} from "../types";
import {FETCH_CHECKS, UPDATE_CHECKS} from "./action-types";

export const fetchStart = (): IAction<{ type: string }> => ({
  type: FETCH_CHECKS.START,
});

export const fetchSuccess = (checks: ICheck[]): IAction<ICheck[]> => ({
  type: FETCH_CHECKS.SUCCESS,
  payload: checks
});

export const fetchFailure = (error: Error): IAction<Error> => ({
  type: FETCH_CHECKS.FAILURE,
  payload: error
});

export const updateStart = (): IAction<{}> => ({
  type: UPDATE_CHECKS.START,
});

export const updateSuccess = (checks: ICheck[]): IAction<ICheck[]> => ({
  type: UPDATE_CHECKS.SUCCESS,
  payload: checks
});

export const updateFailure = (error: Error): IAction<Error> => ({
  type: UPDATE_CHECKS.FAILURE,
  payload: error
});
