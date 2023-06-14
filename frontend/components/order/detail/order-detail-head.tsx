import { useEffect, useState } from "react";

export default function OrderDetailHead({
  orderIdParam,
  orderDate,
}: {
  orderIdParam: any;
  orderDate: any;
}) {
  const [formattedOrderId, setFormattedOrderId] = useState("");
  const [formattedOrderDate, setFormattedOrderDate] = useState("");

  useEffect(() => {
    setFormattedOrderId(`Order #${orderIdParam.slice(5)}`);
    setFormattedOrderDate(formatDate(orderDate));
  }, [orderIdParam, orderDate]);

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
      <div className="flex justify-start item-start space-y-2 flex-col">
        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          {formattedOrderId}
        </h1>
        <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
          {formattedOrderDate}
        </p>
      </div>
    </>
  );
}
