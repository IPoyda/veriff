import React from "react";
import { render } from "@testing-library/react";
import {CheckItem, IListCheck} from "../../components/CheckItem";
import { Provider } from 'react-redux';
import store from "../../redux/rootStore";

describe("CheckItem", () => {
    let checkItem : IListCheck;

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
        const label = container?.querySelector('.check-item label')?.textContent;
        const buttons = container?.querySelectorAll('.check-item button');
        expect(label).toBe('Face on the picture matches face on the document');
        expect(buttons[0].textContent).toBe("Yes");
        expect(buttons[1].textContent).toBe("No");
    });
});
