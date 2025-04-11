interface InputTypes {
    label: string;
    type: string;
    placeholder: string;
    pattern: string;
    maxLength: number;
}

interface InputValuesTypes {
    [key: string]: string;
}

interface PasswordFormProps {
    token: string;
}

export type { InputTypes, InputValuesTypes, PasswordFormProps };
