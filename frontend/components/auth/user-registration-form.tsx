import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastDescription } from "../ui/toast";
import { toast } from "../ui/use-toast";
import { ToastAction } from "@/components/ui/toast"

interface RegistrationFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegistrationForm({
  className,
  ...props
}: RegistrationFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [registrationError, setRegistrationError] = React.useState<string>("");

  const router = useRouter();
  const [isLoginForm, setIsLoginForm] = useState(false);

  const [isCodeButtonDisabled, setIsCodeButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const [showToast, setShowToast] = useState(false);

  const handleToggleForm = () => {
    setIsLoginForm(!isLoginForm);
    const newPath = isLoginForm ? "/auth/signup" : "/auth/login";
    router.push(newPath);
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setRegistrationError("");

    const form = event.target as HTMLFormElement;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        return window.location.replace("/");
      } else {
        setRegistrationError(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      setRegistrationError("注册失败，请稍后再试。");
    }

    setIsLoading(false);
  }

  const handleGetCode = async () => {
    setIsCodeButtonDisabled(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
        //   username,
        //   email,
        //   password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        return window.location.replace("/");
      } else {
        setRegistrationError(response.data.message);
        console.log(response.data.message);
        
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })

        setTimeout(() => {
          setShowToast(false); // 5秒后隐藏提示组件
        }, 5000);
      }
    } catch (error) {
      setRegistrationError("注册失败，请稍后再试。");
      setShowToast(true); // 显示提示组件
      setTimeout(() => {
        setShowToast(false); // 5秒后隐藏提示组件
      }, 5000);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">注册账户</h1>
        <p className="text-sm text-muted-foreground">请填写以下信息进行注册</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1 my-1">
            <Label className="sr-only" htmlFor="username">
              用户名
            </Label>
            <Input
              id="username"
              placeholder="用户名"
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1 my-1">
            <Label className="sr-only" htmlFor="email">
              邮箱
            </Label>
            <Input
              id="email"
              placeholder="邮箱"
              type="email"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1 my-1">
            <Label className="sr-only" htmlFor="password">
              密码
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
          <div className="grid gap-1 grid-cols-3 my-1">
            <Label className="sr-only" htmlFor="password">
              密码
            </Label>
            <Input
              id="verify-code"
              placeholder="验证码"
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              className="grid col-span-2"
            />
            <Button
              disabled={isCodeButtonDisabled}
              className="col-span-1 ml-1"
              onClick={handleGetCode}
            >
              {isCodeButtonDisabled ? `${countdown}秒` : "获取验证码"}
            </Button>
          </div>

          <Button disabled={isLoading} className="my-2">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            注册
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            已有账号？
          </span>
        </div>
      </div>
      
      <Button onClick={handleToggleForm} variant="outline" type="button">
        登录
      </Button>
    </div>
  );
}
