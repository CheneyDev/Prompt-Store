import { Activity, CreditCard, JapaneseYen, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { RecentSales } from "./components/recent-sales";
import { useEffect, useState } from "react";
import axios from "axios";
import { MonthSales } from "./components/month-sales";

export default function DashboardOverview() {

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
      const response3 = axios.get(
        `http://localhost:8080/getAccountsTotalCount`,
        {
          withCredentials: true,
        }
      );
      const response4 = axios.get(`http://localhost:8080/getOnlineAccounts`, {
        withCredentials: true,
      });
      
      setOrdersTotalSum((await response1).data.message);
      setOrdersTotalCount((await response2).data.message);
      setAccountsTotalCount((await response3).data.message);
      setOnlineAccounts((await response4).data.message);
    } catch (error) {
      console.error("请求出错:", error);
    }
  };
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">全部收益</CardTitle>
            <JapaneseYen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">¥ {ordersTotalSum}</div>
            <p className="text-xs text-muted-foreground">历史所有收益总和</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">用户量</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{accountsTotalCount}</div>
            <p className="text-xs text-muted-foreground">所有用户的总和</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">订单量</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{ordersTotalCount}</div>
            <p className="text-xs text-muted-foreground">历史所有订单量</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">在线人数</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{onlineAccounts}</div>
            <p className="text-xs text-muted-foreground">现在在线的人数</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>月收益</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <MonthSales />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>最近订单</CardTitle>
            <CardDescription>仅显示最新的 5 笔订单</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
