import { InputTypes } from "./interface";

const RecoveryInputs: InputTypes[] = [
    {
        label: "Password",
        type: "password",
        placeholder: "Enter new password",
        pattern: "^[A-Za-z0-9]{6,18}$",
        maxLength: 18,
    },
    {
        label: "Confirm Password",
        type: "password",
        placeholder: "Confirm new password",
        pattern: "^[A-Za-z0-9]{6,18}$",
        maxLength: 18,
    },
];

export { RecoveryInputs };
