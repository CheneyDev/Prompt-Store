import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastAction, ToastDescription } from "../ui/toast";
import { toast } from "../ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";

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

  const [showAlter, setShowAlter] = useState(false);

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
        "http://localhost:8080/api/auth/getVerifyCode"
      );

      if (false) {
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
        setRegistrationError(response.data.message);
        setIsCodeButtonDisabled(false);
        console.log(response.data.message);
        setShowAlter(true); // 显示提示组件
        setTimeout(() => {
          setShowAlter(false); // 5秒后隐藏提示组件
        }, 5000);
      }
    } catch (error) {
      setRegistrationError("注册失败，请稍后再试。");
      setIsCodeButtonDisabled(false);
      setShowAlter(true); // 显示提示组件
      setTimeout(() => {
        setShowAlter(false); // 5秒后隐藏提示组件
      }, 5000);
    }
  };

//   校验用户名
    const [isUsernameError, setIsUsernameError] = useState(false); // 用户名是否错误
    const [usernameError, setUsernameError] = useState("");
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

    const handleUsernameChange = async (e: { target: { value: any } }) => {
        

        const username = e.target.value;


        //向后端接口发送请求校验用户名是否已经存在,如果存在则提示用户存在为false
        //如果不存在则提示用户不存在为true
        try{
            const response = await axios.post(
                "http://localhost:8080/api/auth/checkUsername",
                {
                    username,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.data.success) {
                setIsUsernameAvailable(false);
                setUsernameError("用户名已经存在");
            }
        }catch (error) {
            setIsUsernameAvailable(false);
        }


        const reg = /^[a-zA-Z0-9_-]{4,16}$/;
        //1. 用户名长度小于4位数
        if (username.length < 4) {
            setIsUsernameError(true);
            setUsernameError("用户名长度不能小于4位数");
        }
        //2. 用户名长度大于16位数
        else if (username.length > 16) {
            setIsUsernameError(true);
            setUsernameError("用户名长度不能大于16位数");
        }
        //3. 用户名只能是数字、字母、下划线
        else if (!reg.test(username)) {
            setIsUsernameError(true);
            setUsernameError("用户名只能是数字、字母、下划线");
        }
        //4. 用户名不能以数字开头
        else if (username[0] >= "0" && username[0] <= "9") {
            setIsUsernameError(true);
            setUsernameError("用户名不能以数字开头");
        }
        else if (isUsernameAvailable===false) {
            setIsUsernameError(true);
            setUsernameError("用户名已经存在");
        }
        else {
            setIsUsernameError(false);
            setUsernameError("");
        }
    };
    

  const [isEmailError, setIsEmailError] = useState(false); // 邮箱是否错误
  const [emailError, setEmailError] = useState("");
  const handleEmailChange = (e: { target: { value: any } }) => {
    const email = e.target.value;
    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
    if (!reg.test(email)) {
      setIsEmailError(true);
      setEmailError("邮箱格式不正确");
    } else {
      setIsEmailError(false);
      setEmailError("");
    }
  };

  const [isPasswordError, setIsPasswordError] = useState(false); // 密码是否错误
  const [passwordError, setPasswordError] = useState("");
  const handlePasswordChange = (e: { target: { value: any } }) => {
    const password = e.target.value;
    const reg = /^[a-zA-Z0-9_~!@#$%^&*()_+`\-={}|\[\]:;'<>,.?/]{6,128}$/;
    // 1. 密码长度小于6位数
    if (password.length < 6) {
      setIsPasswordError(true);
      setPasswordError("密码长度不能小于6位数");
    }
    // 2. 密码长度大于128位数
    else if (password.length > 128) {
      setIsPasswordError(true);
      setPasswordError("密码长度不能大于128位数");
    }
    // 3. 密码只能是数字、字母、下划线
    else if (!reg.test(password)) {
      setIsPasswordError(true);
      setPasswordError("密码只能是数字、字母、下划线");
    }
    // 4. 密码格式正确
    else {
      setIsPasswordError(false);
      setPasswordError("");
    }
  };

  return (
    <>
      <div className={cn("grid gap-6", className)} {...props}>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">注册账户</h1>
          <p className="text-sm text-muted-foreground">
            请填写以下信息进行注册
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1 my-1">
              <Label className="sr-only" htmlFor="username">
                用户名
              </Label>
                {isUsernameError && (
                    <div className="tooltip tooltip-open" data-tip={usernameError} />
                )}
              <Input
                id="username"
                placeholder="用户名"
                type="text"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="grid gap-1 my-1">
              <Label className="sr-only" htmlFor="email">
                邮箱
              </Label>
              {isEmailError && (
                <div className="tooltip tooltip-open" data-tip={emailError} />
              )}
              <Input
                onChange={handleEmailChange}
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
                onChange={handlePasswordChange}
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
      <div className="fixed bottom-0 right-0 p-6">
        {showAlter && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>错误</AlertTitle>
            <AlertDescription>验证码发送失败，请稍后再试。</AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
}
