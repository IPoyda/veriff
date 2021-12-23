import { combineReducers } from 'redux';
import {checksState} from "./checks/reducer";

export const rootReducer = combineReducers({
  checksState,
});
