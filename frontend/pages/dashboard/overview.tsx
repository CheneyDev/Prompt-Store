import { Metadata } from "next";
import Image from "next/image";
import {
  Activity,
  CreditCard,
  DollarSign,
  Download,
  JapaneseYen,
  Sparkles,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/dashboard/components/date-range-picker";
import TeamSwitcher from "@/components/dashboard/components/team-switcher";
import { MainNav } from "@/components/navbar/main-nav";
import { Search } from "@/components/navbar/search";
import { UserNav } from "@/components/navbar/user-nav";
import { Overview } from "@/components/dashboard/components/overview";
import { RecentSales } from "@/components/dashboard/components/recent-sales";
import Link from "next/link";
import Navbar from "@/components/navbar/navbar";
import Head from "next/head";
import axios from "axios";
import { use, useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "后台管理",
  description: "Prompt Store 后台管理",
};

export default function DashboardPage() {

  const [ordersTotalSum, setOrdersTotalSum] = useState(0);
  const [ordersTotalCount, setOrdersTotalCount] = useState(0);
  const [accountsTotalCount, setAccountsTotalCount] = useState(0);
  const [onlineAccounts, setOnlineAccounts] = useState(0);

  useEffect(() => {
    getOrdersTotalSum();
  }, []);

  const getOrdersTotalSum = async () => {
    try {
      const response1 = axios.get(`http://localhost:8080/getOrdersTotalSum`, {
        withCredentials: true,
      });
      const response2 = axios.get(`http://localhost:8080/getOrdersTotalCount`, {
        withCredentials: true,
      });
      const response3 = axios.get(`http://localhost:8080/getAccountsTotalCount`, {
        withCredentials: true,
      });
      const response4 = axios.get(`http://localhost:8080/getOnlineAccounts`, {
        withCredentials: true,
      });
      setOrdersTotalSum((await response1).data.message)
      setOrdersTotalCount((await response2).data.message)
      setAccountsTotalCount((await response3).data.message)
      setOnlineAccounts((await response4).data.message)
    } catch (error) {
      console.error("请求出错:", error);
    }
  };

  return (
    <>
      <Head>
        <title>后台管理 | Prompt Store</title>
        <meta name="description" content="Prompt Store" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
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
              <TabsTrigger value="overview">概览</TabsTrigger>
              <TabsTrigger value="orders" disabled>
                订单
              </TabsTrigger>
              <TabsTrigger value="users" disabled>
                用户
              </TabsTrigger>
              <TabsTrigger value="prompts" disabled>
                Prompts
              </TabsTrigger>
              <TabsTrigger value="models" disabled>
                Models
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      全部收益
                    </CardTitle>
                    <JapaneseYen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">¥ {ordersTotalSum}</div>
                    <p className="text-xs text-muted-foreground">
                      +201 相较于上月
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      用户量
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+{accountsTotalCount}</div>
                    <p className="text-xs text-muted-foreground">
                      +201 相较于上月
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      订单量
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+{ordersTotalCount}</div>
                    <p className="text-xs text-muted-foreground">
                      +201 相较于上月
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      在线人数
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+{onlineAccounts}</div>
                    <p className="text-xs text-muted-foreground">
                      +201 相较于上月
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>月收益</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>最近订单</CardTitle>
                    <CardDescription>这个月完成了 23 笔订单</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
