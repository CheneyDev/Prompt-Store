import HomePage from "@/components/home/home";
import axios from "axios";
import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function handleLogin() {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/isLogin",
          {},
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          console.log(response.data.message);
        } else {
          console.log(response.data.message);
          return window.location.replace("auth/login");
        }
      } catch (error) {
        return window.location.replace("auth/login");
      }
    }
    handleLogin();
  }, []);
  return (
    <>
      <Head>
        <title>首页 | Prompt Store</title>
        <meta name="description" content="Prompt Store" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <HomePage />
    </>
  );
}
