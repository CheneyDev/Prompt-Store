import PromptDetail from "@/components/product/prompt/prompt_detail";
import axios from "axios";
import Head from "next/head";
import { useEffect } from "react";

export default function PromptDetailPage() {
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
          return window.location.href = "/auth/login";
        }
      } catch (error) {
        return window.location.href = "/auth/login";
      }
    }
    handleLogin();
  }, []);
  return (
    <>
      <Head>
        <title>详情 | Prompt Store</title>
        <meta name="description" content="Prompt Store" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <PromptDetail />
    </>
  );
}
