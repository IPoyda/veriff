import reducer, {ChecksState, fetchChecksAsync} from "../../features/checks/checksSlice";

describe("Checks reducer", () => {
    let state: ChecksState = {
        isLoading: false,
        isUpdating: false,
        list: [],
    };

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual({
            list: [],
            error: undefined,
            isLoading: false,
            isUpdating: false,
        });
    })

    it("should set isLoading to true on fetchStart", () => {
        const action = { type: fetchChecksAsync.pending.type }
        expect(reducer(state, action)).toEqual({
            ...state,
            isLoading: true
        });
    });

    it("should set 1 check item in checks store", () => {
        const payload = [{
            id: "aaa",
            priority: 10,
            description: "Face on the picture matches face on the document"
        }];
        const action = { type: fetchChecksAsync.fulfilled.type, payload }
        const newState = reducer(state, action);
        expect(newState.list.length).toBe(1);
    });

    it("should set 1 check item in checks store", () => {
        const action = {
            type: fetchChecksAsync.rejected.type,
            payload: new Error("Error message")
        }
        const newState = reducer(state, action)
        expect((newState.error as Error).message).toEqual("Error message");
    });
});
