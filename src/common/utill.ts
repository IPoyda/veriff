import {Check, KeyCode, ListCheck} from "./types";

export const getDefaultChecks = (checks: Check[]): ListCheck[] => {
    return checks.map((check, index) => ({
        ...check,
        active: false,
        disabled: index > 0,
        positive: undefined,
    }));
};

export const setActiveCheck = (resultChecks: ListCheck[], keyCode: number) => {
    let updatedChecks = [ ...resultChecks ];
    const activeIndex = updatedChecks.findIndex(({ active }) => active);
    const nextIndex = keyCode === KeyCode.UP ? activeIndex - 1 : activeIndex + 1;

    if (activeIndex >= 0) {
        if (updatedChecks[nextIndex] && !updatedChecks[nextIndex].disabled) {
            updatedChecks[activeIndex].active = false;
            updatedChecks[nextIndex].active = true;
        }
    } else if (updatedChecks.length) {
        updatedChecks[0].active = true;
    }

    return updatedChecks;
}

export const getUpdatedChecks = (resultChecks: ListCheck[], position: number, isPositiveAnswer: boolean): ListCheck[] => {
    const nextPosition = position + 1;
    return resultChecks.map((check: ListCheck, index: number) => {
        check.active = false;
        if (!isPositiveAnswer) {
            check = index <= position ? check : { ...check, positive: undefined, disabled: true };
        }
        if (index === position) {
            check.active = true;
            check.positive = isPositiveAnswer;
        }
        if (isPositiveAnswer && index === nextPosition && resultChecks[nextPosition]) {
            check.disabled = false;
        }
        return check;
    });
};

export const isSubmitAvailable = (resultChecks: ListCheck[]) => {
    return resultChecks.some(({ positive }) => positive === false)
        || resultChecks.every(({ positive }) => positive === true)
};
