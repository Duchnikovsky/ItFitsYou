import Input from "@/components/ui/Input";
import style from "../PasswordRecovery.module.css";
import { RecoveryInputs } from "./helper";
import { PasswordFormProps } from "./interface";
import Button from "@/components/ui/Button";
import { useRecovery } from "./hooks/useRecovery";

const PasswordRecoveryForm = ({ token }: PasswordFormProps) => {
    const { formValues, setFormValues, loading, changePassword } =
        useRecovery();

    return (
        <>
            <h4 className={style.h4}>
                Enter new password and confirm it to reset your password
            </h4>
            <form
                className={style.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    changePassword(token);
                }}
            >
                {RecoveryInputs.map((input) => (
                    <Input
                        key={input.label}
                        label={input.label}
                        type={input.type}
                        name={input.label}
                        disabled={loading}
                        placeholder={input.placeholder}
                        pattern={input.pattern}
                        maxLength={input.maxLength}
                        required
                        value={formValues[input.label]}
                        onChange={(e) => {
                            setFormValues((prev) => ({
                                ...prev,
                                [input.label]: e.target.value,
                            }));
                        }}
                    />
                ))}
                <Button type="submit" loading={loading} disabled={loading}>
                    Confirm change
                </Button>
            </form>
        </>
    );
};

export { PasswordRecoveryForm };
