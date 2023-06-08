"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";

import axios from "axios";
import { Checkbox } from "../ui/checkbox";
import { headers } from "next/dist/client/components/headers";
import Link from "next/link";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [loginError, setLoginError] = React.useState<string>("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setLoginError("");

    const form = event.target as HTMLFormElement;
    const username = form.username.value;
    const password = form.password.value;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username,
          password,
          remember: true,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        return window.location.replace("/");
      } else {
        setLoginError(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      setLoginError("登录失败，请稍后再试。");
    }

    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">登录账户</h1>
        <p className="text-sm text-muted-foreground">
          请在下方输入您的账户信息
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1 my-1">
            <Label className="sr-only" htmlFor="username">
              username
            </Label>
            <Input
              id="username"
              placeholder="用户名或邮箱"
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1 my-1">
            <Label className="sr-only" htmlFor="password">
              password
            </Label>
            <Input
              id="password"
              placeholder="密码"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>

          <Button disabled={isLoading} className="my-2">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            登录
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            还没有账号？
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={true}>
        注册
      </Button>
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          忘记密码
        </Link>
      </p>
    </div>
  );
}
