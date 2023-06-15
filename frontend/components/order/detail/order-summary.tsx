import { useEffect, useState } from "react";

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

export default function OrderSummary({ order }: { order: Order }) {
  const [formattedOrderId, setFormattedOrderId] = useState("");
  const [formattedOrderDate, setFormattedOrderDate] = useState("");
  const [formattedTotalPrice, setFormattedTotalPrice] = useState("");
  const [formattedUnitPrice, setFormattedUnitPrice] = useState("");

  useEffect(() => {
    setFormattedOrderId(`Order #${order.orderId.slice(5)}`);
    setFormattedOrderDate(formatDate(order.orderDate));
    setFormattedTotalPrice(
      `¥ ${order.totalPrice
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
    );
    setFormattedUnitPrice(
      `Unit Price: $${order.unitPrice
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
    );
  }, [order]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour =
      date.getHours() > 12
        ? (date.getHours() - 12).toString()
        : date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${year}-${month}-${day} ${hour}:${minute}:${second} ${ampm}`;
  };

  return (
    <>
      <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
          交易信息
        </h3>
        <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
          <div className="flex justify-between w-full">
            <p className="text-base dark:text-white leading-4 text-gray-800">
              订单编号
            </p>
            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
              {formattedOrderId}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base dark:text-white leading-4 text-gray-800">
              支付方式
            </p>
            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
              PayPal
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base dark:text-white leading-4 text-gray-800">
              创建时间
            </p>
            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
              {formattedOrderDate}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
            实付
          </p>
          <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
            {formattedTotalPrice}
          </p>
        </div>
      </div>
    </>
  );
}
