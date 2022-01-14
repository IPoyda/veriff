import React, {FC, useCallback} from 'react';
import classNames from "classnames";
import Button from "../../common/components/Button";
import styles from "./Checks.module.css";
import {ListCheck} from "../../common/types";

type ICheckItemProps = {
    index: number;
    checkItem: ListCheck;
    onCheckAction: (isPositiveAnswer: boolean, position: number) => void;
}

export const CheckItem: FC<ICheckItemProps> = (props: ICheckItemProps) => {
    const {checkItem, index, onCheckAction} = props;
    const {active, disabled, positive, description} = checkItem;

    const handleClick = useCallback((isPositiveAnswer: boolean, position: number) => () => {
        onCheckAction(isPositiveAnswer, position);
    }, [onCheckAction]);

    return (
        <div
            className={classNames({
                [styles.checkItem]: true,
                [styles.disabled]: disabled,
                [styles.active]: active,
            })}
        >
            {disabled && <div className={styles.opacity} />}
            <label>{description}</label>
            <div className={styles.checkItemActions}>
                <div className={styles.actions}>
                    <Button
                        classNames={classNames({ [styles.pressed]: positive })}
                        disabled={disabled}
                        onClick={handleClick(true, index)}
                    >
                        {"Yes"}
                    </Button>
                    <div className={styles.actionsSeparator}/>
                    <Button
                        classNames={classNames({ [styles.pressed]: positive === false })}
                        disabled={disabled}
                        onClick={handleClick(false, index)}
                    >
                        {"No"}
                    </Button>
                </div>
            </div>
        </div>
    )
};
