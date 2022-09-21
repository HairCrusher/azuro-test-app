import {ChangeEvent, FC, useState} from "react";
import {Button} from "../button/Button";
import styles from "./ContractForm.module.scss";

export interface FormState {
    value: string;
}

export interface ContractFormProps {
    title: string;
    onSubmit?: (state: FormState) => void;
    tip?: string;
    submitBtnText?: string;
    inputPlaceholder?: string;
    initialState?: FormState;
    disabled?: boolean;
}


const DEFAULT_STATE: FormState = {value: ''};

export const ContractForm: FC<ContractFormProps> = (props) => {

    const {
        title,
        tip,
        onSubmit = () => {},
        initialState = DEFAULT_STATE,
        submitBtnText = 'Submit',
        inputPlaceholder,
        disabled,
    } = props;

    const [state, setState] = useState<FormState>(initialState);

    const resetForm = () => {
        setState(DEFAULT_STATE);
    }

    const handleSubmit = () => {
        onSubmit(state);
        resetForm();
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setState({value});
    }

    const isValid = Boolean(state.value);

    return (
        <div className={styles.wrapper}>
            <h2>{title}</h2>
            <div className={styles.inputWrapper}>
                <input
                    className={styles.input}
                    onChange={handleChange}
                    value={state.value}
                    placeholder={inputPlaceholder}
                    disabled={disabled}
                />
                {tip && <small className={styles.tip}>{tip}</small>}
            </div>
            <Button disabled={!isValid || disabled} onClick={handleSubmit}>
                {submitBtnText}
            </Button>
        </div>
    );
}
