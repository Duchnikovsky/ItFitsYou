"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import { InputTypes, SignUpRequest } from "@/lib/validators/auth";
import { KeyRound, Mail } from "lucide-react";
import CSS from "@/styles/auth.module.css";
import Header from "@/components/Header";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

interface Values {
  [key: string]: string;
}

export default function SignIn() {
  const router = useRouter();
  const [values, setValues] = useState<Values>({
    email: "",
    password: "",
    rep_password: "",
  });

  const input: InputTypes[] = [
    {
      name: "email",
      type: "email",
      pattern: "[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+",
      maxlenght: 100,
      icon: (
        <Mail
          stroke="#2d2d2d"
          strokeWidth={1.5}
          size={22}
          style={{ paddingTop: "0.25rem" }}
        />
      ),
    },
    {
      name: "password",
      type: "password",
      pattern: "^[A-Za-z0-9]{6,18}$",
      maxlenght: 18,
      icon: (
        <KeyRound
          stroke="#2d2d2d"
          strokeWidth={1.5}
          size={22}
          style={{ paddingTop: "0.25rem" }}
        />
      ),
    },
    {
      name: "rep_password",
      type: "password",
      pattern: "^[A-Za-z0-9]{6,18}$",
      maxlenght: 18,
      icon: (
        <KeyRound
          stroke="#2d2d2d"
          strokeWidth={1.5}
          size={22}
          style={{ paddingTop: "0.25rem" }}
        />
      ),
    },
  ];

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: SignUpRequest = {
        email: values["email"],
        password: values["password"],
        rep_password: values["rep_password"],
      };

      const { data } = await axios.post("/api/signup", payload);

      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        return toast.error(err.response?.data, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

      return toast.error("An error occured", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    },
    onSuccess: () => {
      setTimeout(() => {
        router.push("/signIn");
        router.refresh();
      }, 3000);
      return toast.success("Successfully signed up", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    },
  });

  return (
    <div className={CSS.main}>
      <Header />
      <form
        className={CSS.form}
        onSubmit={(e) => {
          e.preventDefault();
          signUp();
        }}
      >
        {input.map((input) => (
          <Input
            key={input.name}
            type={input.type}
            pattern={input.pattern}
            maxLength={input.maxlenght}
            isDisabled={false}
            width="100%"
            height="2.5rem"
            spellCheck="false"
            fontSize="16px"
            icon={input.icon}
            value={values[input.name]}
            autoComplete="false"
            onChange={(e) =>
              setValues({ ...values, [input.name]: e.target.value })
            }
          />
        ))}
        <Button
          isLoading={isLoading}
          isDisabled={isLoading}
          fontSize="18px"
          width="100%"
          height="2.25rem"
          type="submit"
        >
          Sign Up
        </Button>
      </form>
      <div className={CSS.redirection}>
        Go back to{" "}
        <b className={CSS.hover}>
          <Link href="/signIn">sign in</Link>
        </b>{" "}
        page
      </div>
    </div>
  );
}
