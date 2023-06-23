import { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/dashboard/components/date-range-picker";
import Navbar from "@/components/navbar/navbar";
import Head from "next/head";
import { SetStateAction, useState } from "react";
import DashboardOverview from "@/components/dashboard/overview";

export const metadata: Metadata = {
  title: "后台管理",
  description: "Prompt Store 后台管理",
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabClick = (value: SetStateAction<string>) => {
    setActiveTab(value);
  };

  //生成当前日期，只要年和月
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const currentMonth = year + "-" + month;

  return (
    <>
      <Head>
        <title>后台管理 | Prompt Store</title>
        <meta name="description" content="Prompt Store" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="hidden flex-col md:flex">
        <Navbar />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">后台管理</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                下载报表
              </Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger
                value="overview"
                onClick={() => handleTabClick("overview")}
                disabled={activeTab === "overview"}
              >
                概览
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                onClick={() => handleTabClick("orders")}
                disabled={activeTab === "orders"}
              >
                订单
              </TabsTrigger>
              <TabsTrigger
                value="users"
                onClick={() => handleTabClick("users")}
                disabled={activeTab === "users"}
              >
                用户
              </TabsTrigger>
              <TabsTrigger
                value="prompts"
                onClick={() => handleTabClick("prompts")}
                disabled={activeTab === "prompts"}
              >
                Prompts
              </TabsTrigger>
              <TabsTrigger
                value="models"
                onClick={() => handleTabClick("models")}
                disabled={activeTab === "models"}
              >
                Models
              </TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="space-y-4">
              {activeTab === "overview" && <DashboardOverview />}
              {/* {activeTab === "orders" && <DashboardOrder />} */}
              {/* {activeTab === "users" && <DashboardUser />} */}
              {/* {activeTab === "prompts" && <DashboardPrompts />} */}
              {/* {activeTab === "models" && <DashboardModels />} */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
