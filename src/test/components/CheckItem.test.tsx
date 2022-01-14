import React from "react";
import { render } from "@testing-library/react";
import {CheckItem} from "../../features/checks/CheckItem";
import { Provider } from 'react-redux';
import { store } from "../../app/store";
import {ListCheck} from "../../common/types";

describe("CheckItem", () => {
    let checkItem : ListCheck;

    beforeEach((done) => {
        checkItem = {
            id: "aaa",
            priority: 10,
            description: "Face on the picture matches face on the document",
            disabled: false,
            active: false,
        };
        done();
    });

    it("renders CheckItem component", () => {
        const handleCheckAction = (isPositiveAnswer: boolean, position: number) => {};

        const {container} = render(
            <Provider store={store}>
                <CheckItem
                    index={0}
                    checkItem={checkItem}
                    onCheckAction={handleCheckAction}
                />
            </Provider>
        );
        const label = container?.querySelector('label')?.textContent;
        const buttons = container?.querySelectorAll('button');
        expect(label).toBe('Face on the picture matches face on the document');
        expect(buttons[0].textContent).toBe("Yes");
        expect(buttons[1].textContent).toBe("No");
    });
});
