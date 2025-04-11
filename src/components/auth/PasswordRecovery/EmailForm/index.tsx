import style from "../PasswordRecovery.module.css";
import { useRecoveryEmail } from "./hooks/useRecoveryEmail";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

const EmailRecoveryForm = () => {
    const { value, setValue, loading, recover } = useRecoveryEmail();

    return (
        <>
            <h4 className={style.h4}>
                Enter your email address and we'll send you instructions to
                reset your password
            </h4>
            <form
                className={style.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    recover();
                }}
            >
                <div className={style.input_wrapper}>
                    <Input
                        label="Email"
                        type={"email"}
                        name={"email"}
                        placeholder="Enter your email address"
                        pattern="[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+"
                        maxLength={100}
                        required
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                    />
                </div>
                <Button type="submit" loading={loading}>
                    Send Recovery Link
                </Button>
            </form>
            <Link href="/signIn">Return to sign in</Link>
        </>
    );
};

export { EmailRecoveryForm };
