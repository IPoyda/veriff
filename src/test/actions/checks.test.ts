import {fetchStart, fetchSuccess, fetchFailure} from "../../redux/checks/actions";
import {FETCH_CHECKS, UPDATE_CHECKS} from "../../redux/checks/action-types";
import {ICheck} from "../../common/types";

describe("Checks actions", () => {
    let checks : ICheck[];

    beforeEach((done) => {
        checks = [{
            id: "aaa",
            priority: 10,
            description: "Face on the picture matches face on the document"
        }];
        done();
    });

    it("should return a valid fetch start payload", () => {
        const body = fetchStart();
        expect(body.type).toEqual(FETCH_CHECKS.START);
    });

    it("should return a valid fetch success payload", () => {
        const body = fetchSuccess(checks);
        expect(body.type).toEqual(FETCH_CHECKS.SUCCESS);
        expect(body.payload).toEqual(checks);
    });

    it("should return a valid fetch failure payload", () => {
        const error = new Error("Error message");
        const body = fetchFailure(error);
        expect(body.type).toEqual(FETCH_CHECKS.FAILURE);
        expect(body.payload).toMatchObject(error);
    });

});
