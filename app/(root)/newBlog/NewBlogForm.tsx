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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
function NewBlogForm() {
  const { data: session } = useSession();

  const FormSchema = z.object({
    blog: z.string().min(10, {
      message: "Blog must be at least 10 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      blog: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex-col">
        <div className="flex justify-between items-center mx-10 pb-5">
          <h1 className="text-4xl font-bold text-white tracking-[.15em]">
            New Blog
          </h1>
          <Button
            variant="default"
            className="button-style"
            type="submit"
          >
            Publish
          </Button>
        </div>
        <FormField
          control={form.control}
          name="blog"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white tracking-[0.15rem]">
                Blog Body
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Use your Beautiful Words ..."
                  className="bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default NewBlogForm;
