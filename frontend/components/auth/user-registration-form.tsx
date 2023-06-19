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

  

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  const [isUsernameError, setIsUsernameError] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isEmailError, setIsEmailError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validateUsername = async (username: string) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/auth/verifyUsername?username=${username}`
      );
      if (response.data.message === "true") {
        setIsUsernameAvailable(false);
        setUsernameError("用户名已经存在");
      } else {
        setIsUsernameAvailable(true);
        setUsernameError("");
      }
    } catch (error) {
      setIsUsernameAvailable(false);
    }

    const reg = /^[a-zA-Z0-9_-]{4,16}$/;
    if (username.length === 0) {
      setIsPasswordError(false);
      setPasswordError("");
    } else if (username.length < 4) {
      setIsUsernameError(true);
      setUsernameError("用户名长度不能小于4位数");
    } else if (username.length > 16) {
      setIsUsernameError(true);
      setUsernameError("用户名长度不能大于16位数");
    } else if (!reg.test(username)) {
      setIsUsernameError(true);
      setUsernameError("用户名只能是数字、字母、下划线");
    } else if (username[0] >= "0" && username[0] <= "9") {
      setIsUsernameError(true);
      setUsernameError("用户名不能以数字开头");
    } else if (isUsernameAvailable === false) {
      setIsUsernameError(true);
      setUsernameError("用户名已经存在");
    } else {
      setIsUsernameError(false);
      setUsernameError("");
    }
  };

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
    validateUsername(username);
    validatePassword(password);
    validateEmail(email);
  }, [
    username,
    email,
    password,
    isUsernameError,
    isEmailError,
    isPasswordError,
  ]);

  const handleUsernameChange = async (e: { target: { value: any } }) => {
    setUsername(e.target.value);
    validateUsername(username);
  };

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

  const handleGetCode = async () => {
    setIsCodeButtonDisabled(true);
    console.log(username.length > 0);
    if (
      !isUsernameError &&
      username.length > 0 &&
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
    }else
    {
        console.log("信息填写有误");
        setIsCodeButtonDisabled(false);
    }
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setRegistrationError("");



    try {
      const response = await axios.post(
        `http://localhost:8080/api/auth/register?username=${username}&email=${email}&password=${password}&verifyCode=${verifyCode}`,
      );

      if (response.data.success) {
        console.log(response.data.message);
      } else {
        setRegistrationError(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      setRegistrationError("注册失败，请稍后再试。");
    }

    setIsLoading(false);
  }

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
                <div
                  className="tooltip tooltip-open"
                  data-tip={usernameError}
                />
              )}
              <Input
                id="username"
                placeholder="用户名"
                type="text"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                onBlur={handleUsernameChange}
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

            <Button disabled={isLoading} onClick={onSubmit} className="my-2">
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
