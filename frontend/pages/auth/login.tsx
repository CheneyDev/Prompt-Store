import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BookMarked,
  BookMinus,
  Command,
  ScrollText,
  Smile,
  SmilePlus,
  Sparkles,
  Sticker,
  Store,
  TextSelect,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserLoginForm } from "@/components/auth/user-login-form";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { RegistrationForm } from "@/components/auth/user-registration-form";

export const metadata: Metadata = {
  title: "登录 | Prompt Store",
  description: "Prompt Store",
};

export default function AuthenticationPage() {

  const router = useRouter();
  const [isLoginForm, setIsLoginForm] = useState(false);

  const handleToggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };
  

  return (
    <>
      <Head>
        <title>登录 | Prompt Store</title>
        <meta name="description" content="Prompt Store" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <div className="md:hidden">
          <Image
            src="/examples/authentication-light.png"
            width={1280}
            height={843}
            alt="Authentication"
            className="block dark:hidden"
          />
          <Image
            src="/examples/authentication-dark.png"
            width={1280}
            height={843}
            alt="Authentication"
            className="hidden dark:block"
          />
        </div>
        <div className="container relative hidden h-screen w-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div
              className="absolute inset-0 bg-cover"
              style={{
                backgroundImage:
                  "url(https://www.rijksmuseum.nl/assets/c3618b08-d956-4631-99e3-c9f496a370ff?w=2880&h=2165&fx=2881&fy=2929&format=webp&c=b2a9bf2a2aba5180bc75c7cd888b5f2383ac0cefdb4a2a5afb1692f81ca5cfac)",
              }}
            />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <Sparkles className="mr-2 h-6 w-6" />
              Prompt Store
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-2xl leading-tight">
                  释放创作激情，高效艺术创作指南！
                </p>
                {/* <footer className="text-sm">TJISE-Semester2-Homework #1</footer> */}
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {isLoginForm ? (
                <UserLoginForm />
              ) : (
                <RegistrationForm />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
