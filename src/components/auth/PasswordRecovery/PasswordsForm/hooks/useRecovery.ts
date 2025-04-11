import { useState } from "react";
import { InputValuesTypes } from "../interface";
import { useMutation } from "@tanstack/react-query";
import { RecoveryValidator } from "@/lib/validators/auth";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const useRecovery = () => {
    const [formValues, setFormValues] = useState<InputValuesTypes>({
        Password: "",
        "Confirm Password": "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const { mutate: changePassword } = useMutation({
        mutationFn: async (token: string) => {
            setLoading(true);
            const payload = RecoveryValidator.parse({
                token,
                password: formValues["Password"],
                rep_password: formValues["Confirm Password"],
            });
            const { data } = await axios.post(
                "/api/auth/change-password",
                payload
            );
            return data;
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                return toast.error(err.response?.data.message);
            }
            return toast.error("Something went wrong. Please try again");
        },
        onSuccess: (data) => {
            setTimeout(() => {
                router.push("/signIn");
                router.refresh();
            }, 2000);
            return toast.success(data.message);
        },
        onSettled: () => {
            setLoading(false);
        },
    });

    return { formValues, setFormValues, loading, changePassword };
};

export { useRecovery };
