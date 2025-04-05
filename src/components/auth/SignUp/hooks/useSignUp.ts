import { useState } from "react";
import { InputValuesTypes } from "../interface";
import { SignUpRequest, SignUpValidator } from "@/lib/validators/auth";
import { toast } from "react-toastify";
import { ZodError } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const useSignUp = () => {
    const [formValues, setFormValues] = useState<InputValuesTypes>({
        Email: "",
        Password: "",
        "Confirm Password": "",
    });
    const [checked, setChecked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const { mutate: signUp } = useMutation({
        mutationFn: async (payload: SignUpRequest) => {
            const { data } = await axios.post("/api/signup", payload);
            return data;
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                return toast.error(err.response?.data);
            }
            return toast.error("Something went wrong. Please try again");
        },
        onSuccess: () => {
            setTimeout(() => {
                router.push("/signIn");
                router.refresh();
            }, 3000);
            return toast.success(
                "Welcome! Your account has been created. Please sign in to continue."
            );
        },
        onSettled: () => {
            setLoading(false);
        },
    });

    function register() {
        try {
            setLoading(true);
            const payload = SignUpValidator.parse({
                email: formValues["Email"],
                password: formValues["Password"],
                rep_password: formValues["Confirm Password"],
            });
            if (!checked) {
                setLoading(false);
                return toast.error("You must accept the privacy terms.");
            }
            signUp(payload);
        } catch (error) {
            setLoading(false);
            if (error instanceof ZodError) {
                return toast.error(error.errors[0].message);
            }
        }
    }

    return {
        formValues,
        setFormValues,
        checked,
        setChecked,
        register,
        loading,
    };
};

export default useSignUp;
