import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { set } from "date-fns";
import { da } from "date-fns/locale";
import { useEffect, useState } from "react";

export function RecentSales() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getOrdersTotalSum();
  }, []);

  const getOrdersTotalSum = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getTopFiveOrders`,
        {
          withCredentials: true,
        }
      );
      const res = response.data.message;
      const dataArray = JSON.parse(res);
      setData(dataArray);
    } catch (error) {
      console.error("请求出错:", error);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="space-y-8">
      {data.map((item, index) => (
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={item.avatarURL} alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.username}</p>
            <p className="text-sm text-muted-foreground">
              {item.email}
            </p>
          </div>
          <div className="ml-auto font-medium">¥{item.orderTotalPrice}</div>
        </div>
      ))}
    </div>
  );
}
