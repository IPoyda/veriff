import {IAction} from "../types";
import {FETCH_CHECKS, UPDATE_CHECKS} from "./action-types";
import {ICheck} from "../../common/types";

export interface IChecksState {
  checks: ICheck[];
  error?: Error;
  isLoading: boolean;
  isUpdating: boolean;
}

const initialState: IChecksState = {
  checks: [],
  error: undefined,
  isLoading: false,
  isUpdating: false,
};

export const checksState = (state: IChecksState = initialState, action: IAction<unknown>) => {
  switch (action.type) {

    case FETCH_CHECKS.START:
      return {
        ...state,
        isLoading: true
      };

    case UPDATE_CHECKS.START:
      return {
        ...state,
        isUpdating: true
      };

    case FETCH_CHECKS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        checks: action.payload,
      };

    case UPDATE_CHECKS.SUCCESS:
      return {
        ...state,
        isUpdating: false,
      }

    case UPDATE_CHECKS.FAILURE:
    case FETCH_CHECKS.FAILURE:
      return {
        ...state,
        isLoading: false,
        isUpdating: false,
        error: action.payload
      };

    default:
      return state;
  }
};
