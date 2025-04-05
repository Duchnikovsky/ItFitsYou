import { InputTypes } from "./interface";

const SignInInputs: InputTypes[] = [
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
];

export { SignInInputs };
