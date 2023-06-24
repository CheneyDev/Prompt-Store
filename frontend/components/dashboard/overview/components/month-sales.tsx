"use client"

import axios from "axios";
import { useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { json } from "stream/consumers";

const data = [
  {
    name: "一月",
    total: 1,
  },
  {
    name: "二月",
    total: 1,  },
  {
    name: "三月",
    total: 1,  },
  {
    name: "四月",
    total: 1,  },
  {
    name: "五月",
    total: 1,  },
  {
    name: "六月",
    total: 1,  },
  {
    name: "七月",
    total: 1,  },
  {
    name: "八月",
    total: 1,  },
  {
    name: "九月",
    total: 1,  },
  {
    name: "十月",
    total: 1,  },
  {
    name: "十一月",
    total: 1,  },
  {
    name: "十二月",
    total: 1,  },
]

export function MonthSales() {
  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => {
    getOrdersTotalSum();
  }, []);

  const getOrdersTotalSum = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getOrderTotalSumByYear?year=${year}`,
        {
          withCredentials: true,
        }
      );
      const res = response.data.message;
      const json = JSON.parse(res);
      const orderTotalSumByYear = json.orderTotalSumByYear;
      const updatedData = [...data];
      orderTotalSumByYear.forEach((item: { month: any; totalPrice: number; }) => {
        const month = parseInt(item.month);
        const totalPrice = item.totalPrice;
        const index = month - 1; 
        if (index >= 0 && index < updatedData.length) {
          updatedData[index].total = totalPrice;
        }
      });
    } catch (error) {
      console.error("请求出错:", error);
    }
  };
  

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `¥${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
