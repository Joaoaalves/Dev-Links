"use client";
import Image from "next/image";
import Input from "./Input";
import Button from "./Button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";

import { signIn } from "next-auth/react";
import { useState } from "react";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Can't be empty" })
    .email("Invalid email"),
  password: z.string().min(8, { message: "Invalid password" }).max(50),
});

export default function Login() {
  const [error, setError] = useState();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values) {
    const { email, password } = values;
    signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    }).then((res) => {
      if (res.error) {
        setError("Check your credentials!");
      }
    });
  }

  return (
    <div className="bg-white p-8 rounded-xl max-w-[90vw]">
      <h1 className="self-start font-bold text-[32px]">Login</h1>
      <p className="self-start text-dark-gray">
        Add your details below to get back into the app
      </p>
      <Form {...form}>
        {error && <span className="text-center text-red">{error}</span>}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 mt-10"
        >
          <Input
            type={"email"}
            id={"email"}
            label={"Email address"}
            placeholder={"e.g. alex@email.com"}
            control={form.control}
          >
            <Image src={"/images/icon-email.svg"} width={13} height={10} />
          </Input>
          <Input
            type={"password"}
            id={"password"}
            label={"Password"}
            placeholder={"Enter your password"}
          >
            <Image src={"/images/icon-password.svg"} width={13} height={10} />
          </Input>
          <Button>Login</Button>
          <p className="text-dark-gray text-xs text-center xl:text-md">
            Don’t have an account?{" "}
            <a className="text-primary cursor-pointer" href="/signup">
              Create account
            </a>
          </p>
        </form>
      </Form>
    </div>
  );
}
