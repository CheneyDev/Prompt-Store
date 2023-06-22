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

export const metadata: Metadata = {
  title: "后台管理",
  description: "Prompt Store 后台管理",
};

export default function DashboardPage() {
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
                Download
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
                    <div className="text-xl font-bold">¥454</div>
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
                    <div className="text-2xl font-bold">+5</div>
                    <p className="text-xs text-muted-foreground">
                      +201 相较于上月
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">订单量</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12</div>
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
                    <div className="text-2xl font-bold">+1</div>
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
                    <CardDescription>
                      这个月完成了 23 笔订单
                    </CardDescription>
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
