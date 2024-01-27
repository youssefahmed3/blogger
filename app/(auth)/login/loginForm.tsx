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
function LoginForm() {
  const { data: session } = useSession();

  if (session) {
    redirect("/home");
  }

  const FormSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 characters." }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      }); 
    } catch (error) {
      console.log(error);
      
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white tracking-[0.15rem]">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email ..."
                  className="input-field-style"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
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

        <Button variant={"default"} className="button-style w-full">
          Login
        </Button>
        <hr />
        <Button
          type="button"
          variant={"default"}
          className="button-style w-full"
          onClick={() => signIn("github")}
        >
          Login With Github
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
