import { InputTypes } from "./interface";

const SignUpInputs: InputTypes[] = [
    {
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        pattern: "[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+",
        maxLength: 100,
    },
    {
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        pattern: "^[A-Za-z0-9]{6,18}$",
        maxLength: 18,
    },
    {
        label: "Confirm Password",
        type: "password",
        placeholder: "Confirm your password",
        pattern: "^[A-Za-z0-9]{6,18}$",
        maxLength: 18,
    },
];

export { SignUpInputs };
