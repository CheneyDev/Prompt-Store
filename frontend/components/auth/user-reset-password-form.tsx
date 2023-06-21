import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastAction, ToastDescription } from "../ui/toast";
import { toast } from "../ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";

interface ResetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ResetPasswordForm({
  className,
  ...props
}: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [resetError, setResetError] = React.useState<string>("");

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  const [isEmailError, setIsEmailError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    //邮箱后缀可以只有一个字母，但是只能是字母
    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
    if (email.length === 0) {
      setIsPasswordError(false);
      setPasswordError("");
    } else if (!reg.test(email)) {
      setIsEmailError(true);
      setEmailError("邮箱格式不正确");
    } else {
      setIsEmailError(false);
      setEmailError("");
    }
  };

  const validatePassword = (password: string) => {
    const reg = /^[a-zA-Z0-9_~!@#$%^&*()_+`\-={}|\[\]:;'<>,.?/]{6,128}$/;
    if (password.length === 0) {
      setIsPasswordError(false);
      setPasswordError("");
    } else if (password.length < 6 && password.length !== 0) {
      setIsPasswordError(true);
      setPasswordError("密码长度不能小于6位数");
    } else if (password.length > 128) {
      setIsPasswordError(true);
      setPasswordError("密码长度不能大于128位数");
    } else if (!reg.test(password)) {
      setIsPasswordError(true);
      setPasswordError("密码只能是数字、字母、下划线");
    } else {
      setIsPasswordError(false);
      setPasswordError("");
    }
  };

  useEffect(() => {
    validatePassword(password);
    validateEmail(email);
  }, [email, password, isEmailError, isPasswordError]);

  const handlePasswordChange = (e: { target: { value: any } }) => {
    setPassword(e.target.value);
    validatePassword(password);
  };

  const handleEmailChange = (e: { target: { value: any } }) => {
    setEmail(e.target.value);
    validateEmail(email);
  };

  const handleCodeChange = (e: { target: { value: any } }) => {
    setVerifyCode(e.target.value);
  };

  const [showResetFailedAlter, setShowResetFailedAlter] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResetError("");

    try {
      // 在这里发送重置密码请求
      const response = await axios.post(
        `http://localhost:8080/api/auth/resetPassword?email=${email}&password=${password}&verifyCode=${verifyCode}`
      );

      // 处理响应，可能会有不同的状态码和错误信息
      if (response.status === 200) {
        // 重置密码成功
        // toast({
        //   type: "success",
        //   title: "密码重置成功",
        //   description: "您的密码已成功重置。",
        // });
        router.push("/auth/login");
      } else {
        setShowResetFailedAlter(true); // 显示提示组件
        setTimeout(() => {
          setShowResetFailedAlter(false); // 5秒后隐藏提示组件
        }, 5000);
      }
    } catch (error) {
      setShowResetFailedAlter(true); // 显示提示组件
      setTimeout(() => {
        setShowResetFailedAlter(false); // 5秒后隐藏提示组件
      }, 5000);
    }

    setIsLoading(false);
  };

  const [isCodeButtonDisabled, setIsCodeButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [showAlter, setShowAlter] = useState(false);

  const handleGetCode = async () => {
    setIsCodeButtonDisabled(true);
    if (
      !isEmailError &&
      email.length > 0 &&
      !isPasswordError &&
      password.length > 0
    ) {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/auth/getVerifyCode?email=${email}`
        );

        if (response.data.message === "true") {
          const timer = setInterval(() => {
            setCountdown((preSecond) => {
              if (preSecond <= 1) {
                clearInterval(timer);
                setIsCodeButtonDisabled(false);
                return 60;
              }
              return preSecond - 1;
            });
          }, 1000);
        } else {
          setIsCodeButtonDisabled(false);
          console.log(response.data.message);
          setShowAlter(true); // 显示提示组件
          setTimeout(() => {
            setShowAlter(false); // 5秒后隐藏提示组件
          }, 5000);
        }
      } catch (error) {
        setIsCodeButtonDisabled(false);
        setShowAlter(true); // 显示提示组件
        setTimeout(() => {
          setShowAlter(false); // 5秒后隐藏提示组件
        }, 5000);
      }
    } else {
      console.log("信息填写有误");
      setIsCodeButtonDisabled(false);
    }
  };

  return (
    <>
      <div className={cn("grid gap-6", className)} {...props}>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">重制密码</h1>
          <p className="text-sm text-muted-foreground">
            请填写以下信息进行重制
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1 my-1">
              <Label className="sr-only" htmlFor="email">
                邮箱
              </Label>
              {isEmailError && (
                <div className="tooltip tooltip-open" data-tip={emailError} />
              )}
              <Input
                id="email"
                placeholder="邮箱"
                type="email"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                onBlur={handleEmailChange}
              />
            </div>
            <div className="grid gap-1 my-1">
              <Label className="sr-only" htmlFor="password">
                新的密码
              </Label>
              {isPasswordError && (
                <div
                  className="tooltip tooltip-open"
                  data-tip={passwordError}
                />
              )}
              <Input
                id="password"
                placeholder="密码"
                type="password"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                onBlur={handlePasswordChange}
              />
            </div>
            <div className="grid gap-1 grid-cols-3 my-1">
              <Label className="sr-only" htmlFor="verifyCode">
                验证码
              </Label>
              <Input
                id="verifyCode"
                placeholder="验证码"
                type="text"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                className="grid col-span-2"
                onChange={handleCodeChange}
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
              完成
            </Button>
          </div>
        </form>
      </div>
      <div className="fixed bottom-0 right-0 p-6">
        {showAlter && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>错误</AlertTitle>
            <AlertDescription>验证码发送失败，请稍后再试。</AlertDescription>
          </Alert>
        )}
        {showResetFailedAlter && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>错误</AlertTitle>
            <AlertDescription>密码重置失败，请稍后再试。</AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
}
