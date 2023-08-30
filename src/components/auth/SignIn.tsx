"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthValidator, InputTypes } from "@/lib/validators/auth";
import { KeyRound, Mail } from "lucide-react";
import CSS from "@/styles/auth.module.css";
import { Input } from "@/components/ui/Input";
import { Button } from "../ui/Button";
import Link from "next/link";
import { ZodError } from "zod";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Header from "@/components/Header";

interface Values {
  [key: string]: string;
}

export default function SignIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [values, setValues] = useState<Values>({
    email: "",
    password: "",
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
  ];

  async function login() {
    try {
      setLoading(true);
      const { email, password } = AuthValidator.parse({
        email: values["email"],
        password: values["password"],
      });

      signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      })
        .then((res) => {
          return toast.error(res?.error, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        })
        .catch((error) => {
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 3000);
          return toast.success("You have successfully signed in", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    } catch (error) {
      if (error instanceof ZodError) {
        return toast.error(error.errors[0].message, {
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={CSS.main}>
      <Header />
      <form
        className={CSS.form}
        onSubmit={(e) => {
          e.preventDefault();
          login();
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
            onChange={(e) =>
              setValues({ ...values, [input.name]: e.target.value })
            }
          />
        ))}
        <Button
          isLoading={loading}
          isDisabled={loading}
          fontSize="18px"
          width="100%"
          height="2.25rem"
          type="submit"
        >
          Sign In
        </Button>
      </form>
      <div className={CSS.redirection}>
        Don't have account?{" "}
        <b className={CSS.hover}>
          <Link href="/signUp">sign up</Link>
        </b>
      </div>
    </div>
  );
}
