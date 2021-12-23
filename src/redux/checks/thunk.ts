import {Dispatch} from "redux";
import {fetchStart, fetchSuccess, fetchFailure, updateStart, updateSuccess, updateFailure} from "./actions";
import {fetchChecks, submitCheckResults} from "../../api";
import {ICheck, IResultCheck} from "../../common/types";

export const fetchChecksThunk = () => async (dispatch: Dispatch) => {
    try {
        dispatch(fetchStart());
        const checks = await fetchChecks() as ICheck[];
        dispatch(fetchSuccess(checks));
    } catch (e) {
        dispatch(fetchFailure({ message: "Failed to fetch checks" } as Error));
    }
};

export const updateChecksThunk = (checks: IResultCheck[]) => async (dispatch: Dispatch) => {
    try {
        dispatch(updateStart());
        const updatedChecks = await submitCheckResults(checks) as ICheck[];
        dispatch(updateSuccess(updatedChecks));
    } catch (err) {
        dispatch(updateFailure({ message: "Failed to update checks" } as Error));
    }
};
