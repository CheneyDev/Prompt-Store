import Navbar from "@/components/navbar/navbar";
import PromptDetail from "@/components/product/prompt/prompt_detail";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function PromptDetailPage() {

  const [userName, setUserName] = useState("");

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
          setUserName(response.data.message);
        } else {
          return (window.location.href = "/auth/login");
        }
      } catch (error) {
        return (window.location.href = "/auth/login");
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
      <div className="h-screen w-screen ">
        <Navbar />
        <PromptDetail username={userName}/>
      </div>
    </>
  );
}
