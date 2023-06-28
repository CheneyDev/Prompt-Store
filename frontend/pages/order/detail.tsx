import Navbar from "@/components/navbar/navbar";
import OrderDetailHead from "@/components/order/detail/order-detail-head";
import OrderPrompt from "@/components/order/detail/order-prompt";
import OrderRecycle from "@/components/order/detail/order-recycle";
import OrderSummary from "@/components/order/detail/order-summary";
import axios from "axios";
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

export default function OrderDetail() {
  const [orderIdParam, setOrderIdParam] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function handleLogin() {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/isLogin",
          {},
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setUsername(response.data.message);
        } else {
          return (window.location.href = "/auth/login");
        }
      } catch (error) {
        return (window.location.href = "/auth/login");
      }
    }
    handleLogin();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("orderId") || "";
    setOrderIdParam(orderId);

    axios
      .get(`http://localhost:8080/getOrder?orderID=${orderId}`, {
        withCredentials: true,
      })
      .then((response) => {
        const orderData = response.data.message;
        setOrder(orderData);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }, [orderIdParam]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="h-screen w-screen ">
        <Navbar />
        <div className="py-8 px-6">
          <OrderDetailHead
            orderIdParam={orderIdParam}
            orderDate={order.orderDate}
          />

          <div className="mt-4 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <OrderPrompt orderIdParam={orderIdParam} order={order} />
              <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                <OrderSummary order={order}/>
                <OrderRecycle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
