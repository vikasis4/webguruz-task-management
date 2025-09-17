"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthSchema } from "@repo/dto/auth";
import Link from "next/link";
import { toast } from "sonner";
import axiosClient from "@/utils/axios";
import { useAppDispatch } from "@/store/store.hppks";
import { authActions } from "../api/auth.slice";
import React from "react";

type FormType = "login" | "signup";

interface AuthFormProps {
  type: FormType;
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [Loading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof AuthSchema.formSchema>>({
    resolver: zodResolver(AuthSchema.formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AuthSchema.formSchema>) {
    setIsLoading(true);
    const response = await axiosClient.post(
      type === "login" ? "/auth/login" : "/auth/register",
      values
    );

    if (!response.data || response.data?.status !== 200)
      return toast.error(response.data?.message || "Something went wrong");

    dispatch(authActions.setUser(response.data.user));

    setIsLoading(true);

    toast.success(response.data.message);
    router.push("/");
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">
          {type === "login" ? "Login" : "Sign Up"}
        </CardTitle>
        <CardDescription>
          {type === "login"
            ? "Enter your credentials to access your account."
            : "Enter your email below to create a new account."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              className="cursor-pointer flex justify-end"
              href={type === "login" ? "/auth/signup" : "/auth/login"}
            >
              <Button variant="ghost">
                {type === "login" ? "Sign Up" : "Login"}
              </Button>
            </Link>
            <Button type="submit" className="w-full" disabled={Loading}>
              {Loading ? "Loading..." : type === "login" ? "Login" : "Sign Up"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
