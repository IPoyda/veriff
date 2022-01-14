import React, {FC, useCallback, useEffect, useState} from 'react';
import classNames from "classnames";
import Button from "../../common/components/Button";
import styles from "./Checks.module.css";
import {CheckItem} from "./CheckItem";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchChecksAsync, selectChecks, updateChecksAsync} from "./checksSlice";
import {getDefaultChecks, getUpdatedChecks, isSubmitAvailable, setActiveCheck} from "../../common/utill";
import {KeyCode, ListCheck} from "../../common/types";
import useKeypress from "../../common/hooks/keyPress";

const ChecksForm: FC = () => {
    const { list, isLoading, isUpdating } = useAppSelector(selectChecks);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchChecksAsync())
    }, [dispatch]);

    useEffect(() => setResultChecks(getDefaultChecks(list)), [list]);

    const [resultChecks, setResultChecks] = useState<ListCheck[]>([]);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true);

    useKeypress([KeyCode.YES, KeyCode.NO], useCallback((keyCode: number) => {
        let updatedChecks = [ ...resultChecks ];
        const activeIndex = updatedChecks.findIndex(({ active }) => active);
        if (activeIndex >= 0) {
            updatedChecks = getUpdatedChecks(resultChecks, activeIndex, keyCode === KeyCode.YES);
        }
        setResultChecks([ ...updatedChecks ]);
        setDisableSubmit(!isSubmitAvailable(updatedChecks));
    }, [resultChecks]));

    useKeypress([KeyCode.UP, KeyCode.DOWN], useCallback((keyCode: number) => {
        const updatedChecks = setActiveCheck(resultChecks, keyCode);
        setResultChecks([ ...updatedChecks ]);
    }, [resultChecks]));

    const handleCheckAction = useCallback((isPositiveAnswer: boolean, index: number) => {
        const updatedChecks = getUpdatedChecks(resultChecks, index, isPositiveAnswer);
        setResultChecks([ ...updatedChecks ]);
        setDisableSubmit(!isSubmitAvailable(updatedChecks));
    }, [resultChecks]);

    const handleSubmit = useCallback(() => {
        dispatch(updateChecksAsync(resultChecks))
    }, [dispatch, resultChecks]);

    return (
        <>
            {/* Put some loader here if needed*/}
            {isLoading && <div/>}
            {!isLoading && !resultChecks.length && <div>{"Some cool error handler"}</div>}
            {!isLoading && resultChecks.length > 0 && (
                <div className={styles.checkFormContainer}>
                    <div>
                        {resultChecks.map((checkItem: ListCheck, index: number) => (
                            <CheckItem
                                key={checkItem.id}
                                index={index}
                                checkItem={checkItem}
                                onCheckAction={handleCheckAction}
                            />
                        ))}
                    </div>
                    <div className={styles.formActions}>
                        <Button
                            classNames={classNames({ [styles.pressed]: !disableSubmit })}
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

export default ChecksForm;
