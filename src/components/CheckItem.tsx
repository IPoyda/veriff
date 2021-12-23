import React, {FC, useCallback} from 'react';
import {IResultCheck} from "../common/types";
import classNames from "classnames";
import Button from "../components/Button";
import "../styles/check-form.css";

export interface IListCheck extends IResultCheck {
    disabled: boolean;
    active: boolean;
}

interface IProps {
    index: number;
    checkItem: IListCheck;
    onCheckAction: (isPositiveAnswer: boolean, position: number) => void;
}

export const CheckItem: FC<IProps> = (props: IProps) => {
    const {checkItem, index, onCheckAction} = props;
    const {active, disabled, positive, description} = checkItem;

    const handleClick = useCallback((isPositiveAnswer: boolean, position: number) => () => {
        onCheckAction(isPositiveAnswer, position);
    }, [onCheckAction]);

    return (
        <div
            className={classNames({
                "check-item": true,
                disabled: disabled,
                active: active,
            })}
        >
            {disabled && <div className="opacity" />}
            <label>{description}</label>
            <div className="check-item-actions">
                <div className="actions">
                    <Button
                        classNames={classNames({ pressed: positive })}
                        disabled={disabled}
                        onClick={handleClick(true, index)}
                    >
                        {"Yes"}
                    </Button>
                    <div className="actions-separator"/>
                    <Button
                        classNames={classNames({ pressed: positive === false })}
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
