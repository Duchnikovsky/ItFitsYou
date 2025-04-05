import { useEffect, useState } from "react";
import { InputValuesTypes } from "../interface";
import { AuthValidator } from "@/lib/validators/auth";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_LOCAL_ENCRYPTION_KEY;

const useSignIn = () => {
    const [formValues, setFormValues] = useState<InputValuesTypes>({
        Email: "",
        Password: "",
    });
    const [checked, setChecked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const saved = localStorage.getItem("rememberMeCredentials");
        if (saved) {
            const parsed = JSON.parse(saved);
            const decryptedPassword = ENCRYPTION_KEY
                ? CryptoJS.AES.decrypt(
                      parsed.password,
                      ENCRYPTION_KEY
                  ).toString(CryptoJS.enc.Utf8)
                : "";
            setFormValues({
                Email: parsed.email || "",
                Password: decryptedPassword || "",
            });
            setChecked(true);
        }
    }, []);

    async function login() {
        try {
            setLoading(true);
            const { email, password } = AuthValidator.parse({
                email: formValues["Email"],
                password: formValues["Password"],
            });
            await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
            })
                .then((res) => {
                    return toast.error(res?.error);
                })
                .catch(() => {
                    setTimeout(() => {
                        router.push("/");
                        router.refresh();
                    }, 3000);

                    if (checked) {
                        const encryptedPassword = ENCRYPTION_KEY
                            ? CryptoJS.AES.encrypt(
                                  password,
                                  ENCRYPTION_KEY
                              ).toString()
                            : "";
                        localStorage.setItem(
                            "rememberMeCredentials",
                            JSON.stringify({
                                email,
                                password: encryptedPassword,
                            })
                        );
                    } else {
                        localStorage.removeItem("rememberMeCredentials");
                    }

                    return toast.success("You have successfully signed in");
                });
        } catch (error) {
            if (error instanceof ZodError) {
                return toast.error(error.errors[0].message);
            }
            return toast.error("Something went wrong. Please try again");
        } finally {
            setLoading(false);
        }
    }

    return { formValues, setFormValues, checked, setChecked, login, loading };
};

export default useSignIn;
