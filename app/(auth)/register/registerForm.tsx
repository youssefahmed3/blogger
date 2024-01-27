"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
function RegisterForm() {
  const { data: session } = useSession();

  if (session) {
    redirect("/home");
  }

  const FormSchema = z
    .object({
      username: z.string().min(5, {
        message: "username must be at least 5 characters.",
      }),
      email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
      password: z
        .string()
        .min(8, { message: "password must be at least 8 characters." }),
      confirmPassword: z
        .string()
        .min(8, { message: "password must be at least 8 characters." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "passwords must match",
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    form.clearErrors();
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        form.reset();
      } else if (res.status === 400) {
        const data = await res.json();
        form.setError(data.field, {
          type: "server",
          message: data.message,
        });
      } else {
        console.log("user Registration failed");
      }
    } catch (error) {
      console.log("error in user Registration", error);
    }
  }

  //   const inputStyle:string = "w-full bg-white";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white tracking-[0.15rem]">
                Username
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    placeholder="Enter Your Unique name ..."
                    className="input-field-style"
                    {...field}
                  />
                </>
              </FormControl>
              {form.formState.errors.username && <FormMessage />}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white tracking-[0.15rem]">
                Email
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    placeholder="Enter your email ..."
                    className="input-field-style"
                    type="email"
                    {...field}
                  />
                </>
              </FormControl>
              {form.formState.errors.email && <FormMessage />}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white tracking-[0.15rem]">
                password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your very Secure password ..."
                  className="input-field-style"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white tracking-[0.15rem]">
                Password Confirmation
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter again your very Secure password ..."
                  className="input-field-style"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link href={"/login"}>
          <Button variant={"default"} className="button-style w-full">
            Register
          </Button>
        </Link>
        <hr />
        <Button
          type="button"
          variant={"default"}
          className="button-style w-full"
          onClick={() => signIn("github")}
        >
          Register With Github
        </Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
