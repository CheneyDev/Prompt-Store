"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "一月",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "二月",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "三月",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "四月",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "五月",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "六月",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "七月",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "八月",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "九月",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "十月",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "十一月",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "十二月",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

export function Overview() {
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
