import React, {FC, ReactNode} from "react";
import "../styles/button.css";
import classnames from "classnames";

interface IProps {
    children: ReactNode,
    classNames?: string,
    disabled?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
}

const Button: FC<IProps> = (props: IProps) => {
    const { children, classNames = "", ...rest } = props;
    return (
        <button className={classnames("check-button", classNames)} {...rest}>
            {children}
        </button>
    )

};

export default Button;
