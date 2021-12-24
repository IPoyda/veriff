import {IChecksState, checksState} from "../../redux/checks/reducer";
import {fetchStart, fetchSuccess, fetchFailure} from "../../redux/checks/actions";
import {ICheck} from "../../common/types";

describe("Checks reducer", () => {
    let state: IChecksState = {
        isLoading: false,
        isUpdating: false,
        checks: [{
            id: "aaa",
            priority: 10,
            description: "Face on the picture matches face on the document"
        }],
    };

    it("should set isLoading to true on fetchStart", () => {
        const action = fetchStart();
        const newState = checksState(state, action);
        expect(newState.isLoading).toBe(true);
    });

    it("should set 1 check item in checks store", () => {
        const action = fetchSuccess(state.checks);
        const newState = checksState(state, action);
        expect((newState.checks as ICheck[]).length).toBe(1);
    });

    it("should set 1 check item in checks store", () => {
        const action = fetchFailure(new Error("Error message"));
        const newState = checksState(state, action);
        expect((newState.error as Error).message).toBe("Error message");
    });
});
