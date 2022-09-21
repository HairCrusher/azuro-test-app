import {ButtonHTMLAttributes, DetailedHTMLProps, FC, PropsWithChildren} from "react";
import styles from "./Button.module.scss";

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
}

export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
    return <button {...props} className={styles.button}>{props.children}</button>
}
