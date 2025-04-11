import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

const useRecoveryEmail = () => {
    const [value, setValue] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { mutate: recover } = useMutation({
        mutationFn: async () => {
            setLoading(true);
            const { email } = z
                .object({
                    email: z
                        .string()
                        .max(100, "Email can't be longer than 100 characters")
                        .min(5, "Email can't be shorter than 5 characters")
                        .email({ message: "Email format is not valid" }),
                })
                .parse({
                    email: value,
                });

            const { data } = await axios.post("/api/auth/recovery", {
                email,
            });
            return data;
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                return toast.error(err.response?.data.message);
            }
            return toast.error("Something went wrong. Please try again");
        },
        onSuccess: (data) => {
            return toast.info(data.message);
        },
        onSettled: () => {
            setLoading(false);
        },
    });

    return { value, setValue, loading, recover };
};

export { useRecoveryEmail };
