"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations";
import type { LoginInput } from "@/lib/validations";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema)
    });

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    async function onSubmit(data: LoginInput) {
      try {
        setLoading(true);

        const response = await login(data);
        
        router.replace("/dashboard");
      } catch (error: any) {
        console.error(error);

        setApiError(error.response?.data?.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-bold">Task Board</CardTitle>

        <CardDescription>Login to manage your daily tasks</CardDescription>
      </CardHeader>

      <CardContent>
        {apiError && (
          <p className="mb-4 text-center text-sm text-red-500">{apiError}</p>
        )}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email"
            />

            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter your password"
            />

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
