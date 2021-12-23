import React, {FC, useCallback, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchChecksThunk, updateChecksThunk} from '../redux/checks/thunk';
import {ICheck, IResultCheck} from "../common/types";
import {RootState} from "../redux/types";
import classNames from "classnames";
import {ThunkDispatch} from "redux-thunk";
import Button from "../components/Button";
import "../styles/check-form.css";
import {CheckItem, IListCheck} from "../components/CheckItem";

interface IRedux {
    checks: ICheck[];
    isLoading: boolean;
    isUpdating: boolean;
}

interface IDispatch {
    onFetchChecks: () => void;
    onSubmitChecks: (checks: IResultCheck[]) => void;
}

type IProps = IRedux & IDispatch;

const KEY_CODES = {
    UP: 38,
    DOWN: 40,
    YES: 49,
    NO: 50
};

const ChecksFormContainer: FC<IProps> = (props: IProps) => {
    const {checks, isLoading, isUpdating, onFetchChecks, onSubmitChecks} = props;

    useEffect(() => {
        onFetchChecks();
    }, [onFetchChecks]);

    useEffect(() => {
        setResultChecks(getDefaultChecks(checks));
    }, [checks]);

    const [resultChecks, setResultChecks] = useState<IListCheck[]>([]);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true);

    const handleKeyPress = useCallback((e) => {
        let updatedChecks = [ ...resultChecks ];
        switch (e.keyCode) {
            case KEY_CODES.YES:
            case KEY_CODES.NO:
                const activeIndex = updatedChecks.findIndex(({ active }) => active);
                if (activeIndex >= 0) {
                    updatedChecks =
                        getUpdatedChecks(resultChecks, activeIndex, e.keyCode === KEY_CODES.YES);
                }
                break;
            case KEY_CODES.UP:
            case KEY_CODES.DOWN:
                updatedChecks = setActiveCheck(resultChecks, e.keyCode);
                break;
        }
        setResultChecks([ ...updatedChecks ]);
    }, [resultChecks]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }
    }, [handleKeyPress]);

    const handleCheckAction = useCallback((isPositiveAnswer: boolean, index: number) => {
        const updatedChecks = getUpdatedChecks(resultChecks, index, isPositiveAnswer);
        setResultChecks([ ...updatedChecks ]);
        setDisableSubmit(!isSubmitAvailable(updatedChecks));
    }, [resultChecks]);

    const handleSubmit = useCallback(() => {
        onSubmitChecks(resultChecks);
    }, [resultChecks, onSubmitChecks]);

    return (
        <>
            {/* Put some loader here if needed*/}
            {isLoading && <div/>}
            {!isLoading && !resultChecks.length && <div>{"Some cool error handler"}</div>}
            {!isLoading && (
                <div className="check-form-container">
                    <div className="check-form">
                        {resultChecks.map((checkItem: IListCheck, index: number) => (
                            <CheckItem
                                key={checkItem.id}
                                index={index}
                                checkItem={checkItem}
                                onCheckAction={handleCheckAction}
                            />
                        ))}
                    </div>
                    <div className="form-actions">
                        <Button
                            classNames={classNames({ pressed: !disableSubmit })}
                            disabled={disableSubmit || isUpdating}
                            onClick={handleSubmit}
                        >
                            {"Submit"}
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
};

const getDefaultChecks = (checks: ICheck[]): IListCheck[] => {
    return checks.map((check, index) => ({
        ...check,
        active: false,
        disabled: index > 0,
        positive: undefined,
    }));
};

const setActiveCheck = (resultChecks: IListCheck[], keyCode: number) => {
    let updatedChecks: IListCheck[] = [ ...resultChecks ];
    const activeIndex = updatedChecks.findIndex(({ active }) => active);
    const nextIndex = keyCode === KEY_CODES.UP ? activeIndex - 1 : activeIndex + 1;

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

const getUpdatedChecks = (resultChecks: IListCheck[], position: number, isPositiveAnswer: boolean): IListCheck[] => {
    const nextPosition = position + 1;
    return resultChecks.map((check: IListCheck, index: number) => {
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

const isSubmitAvailable = (resultChecks: IListCheck[]) => {
    return resultChecks.some(({ positive }) => positive === false)
        || resultChecks.every(({ positive }) => positive === true)
};

const mapStateToProps = (state: RootState) => ({
    checks: state.checksState.checks,
    isLoading: state.checksState.isLoading,
    isUpdating: state.checksState.isUpdating,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onFetchChecks: () => dispatch(fetchChecksThunk()),
    onSubmitChecks: (checks: IResultCheck[]) => dispatch(updateChecksThunk(checks)),
});

export const ChecksForm = connect(mapStateToProps, mapDispatchToProps)(ChecksFormContainer);
