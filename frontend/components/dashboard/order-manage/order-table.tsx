import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { set } from "date-fns";
import { Edit3, Trash2 } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";

interface Order {
  id: number;
  orderId: string;
  customerName: string;
  orderDate: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  orderPrompt: string;
  resultPath: string;
  resultURL: string;
}

interface OrderPrompt {
  id: number;
  orderId: string;
  mainImagePath: string;
  prompt: string;
  negativePrompt: string;
  width: number;
  height: number;
  steps: number;
  guidanceScale: number;
  seed: number;
  model: string;
  sampler: string;
  mainImageURL: string;
}

export default function DashboardOrderTable({
  _orderList,
}: {
  _orderList: Order[];
}) {
    const [orderList, setOrderList] = useState<Order[]>([]);
  const [orderPromptList, setOrderPromptList] = useState<OrderPrompt[]>([]);
  const [formattedOrderId, setFormattedOrderId] = useState<string[]>([]);
  const [formattedTotalPriceList, setFormattedTotalPriceList] = useState<
    string[]
  >([]);
  const [formattedDateList, setFormattedDateList] = useState<string[]>([]);


  useEffect(() => {
    setOrderList(_orderList);
  }, [_orderList]);
  

  useEffect(() => {
    const formattedOrderIds = orderList.map(
      (order) => `Order #${order.orderId.slice(5)}`
    );
    setFormattedOrderId(formattedOrderIds);

    const formattedTotalPrices = orderList.map(
      (order) => `¥${order.totalPrice.toFixed(2)}`
    );
    setFormattedTotalPriceList(formattedTotalPrices);

    const formattedDates = orderList.map((order) =>
      formatOrderDate(order.orderDate)
    );
    setFormattedDateList(formattedDates);
  }, [orderList]);

  const formatOrderDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    return formattedDate.replace(",", "");
  };

  const orderIdRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const createdAtRef = useRef<HTMLInputElement>(null);
  const totalPriceRef = useRef<HTMLInputElement>(null);


  const handleSaveChanges = async () => {
    try {
      const order_id = orderIdRef.current?.value;
      const user_name = usernameRef.current?.value;
      const created_at = createdAtRef.current?.value;
      const total_price = totalPriceRef.current?.value;

      console.log(order_id, user_name, created_at, total_price);

      const response = await axios.post(
        `http://localhost:8080/updateOrderByOrderId?orderID=${order_id}&customerName=${user_name}&orderDate=${created_at}&totalPrice=${total_price}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.data.message === "success") {
        // 更新 orderList
        const newOrderList = orderList.map((order) => {
            if (order.orderId === order_id) {
              return {
                ...order,
                customerName: user_name,
                orderDate: created_at,
                totalPrice: Number(total_price),
              } as Order; // 添加类型断言
            } else {
              return order;
            }

          }

        );
        setOrderList(newOrderList);
    }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  if (!orderPromptList) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>订单编号</th>
              <th>用户</th>
              <th>创建日期</th>
              <th>金额</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order, index) => (
              <tr key={order.id}>
                <th>{index + 1}</th>
                <td>{formattedOrderId[index]}</td>
                <td>{order.customerName}</td>
                <td>{formattedDateList[index]}</td>
                <td>{formattedTotalPriceList[index]}</td>
                <td>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="btn btn-outline btn-sm mr-3">
                        <Edit3 size={14} />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>修改订单</DialogTitle>
                        <DialogDescription>有限更改订单信息</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="order-id" className="text-right">
                            订单编号
                          </Label>
                          <Input
                            id="order-id"
                            disabled
                            value={orderList[index].orderId}
                            ref={orderIdRef}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="user-name" className="text-right">
                            所属用户
                          </Label>
                          <Input
                            id="user-name"
                            defaultValue={orderList[index].customerName}
                            ref={usernameRef}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="created-at" className="text-right">
                            创建日期
                          </Label>
                          <Input
                            id="created-at"
                            defaultValue={formattedDateList[index]}
                            ref={createdAtRef}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="order-price" className="text-right">
                            金额
                          </Label>
                          <Input
                            id="order-price"
                            defaultValue={orderList[index].totalPrice}
                            ref={totalPriceRef}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="submit" onClick={handleSaveChanges}>
                            保存更改
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <button className="btn btn-outline btn-error  btn-sm">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {/* <tr>
              <th>1</th>
              <td>order#131434354545</td>
              <td>admin</td>
              <td>2023-05-32 16:33:34</td>
              <td>¥ 2</td>
              <td>
                <button className="btn btn-outline btn-sm mr-3">
                  <Edit3 size={14} />
                </button>
                <button className="btn btn-outline btn-error  btn-sm">
                  <Trash2 size={14} />
                </button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
}
