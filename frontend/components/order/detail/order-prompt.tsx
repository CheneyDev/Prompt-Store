import axios from "axios";
import { Download } from "lucide-react";
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
export default function OrderPrompt({
  orderIdParam,
  order,
}: {
  orderIdParam: any;
  order: Order;
}) {
  const [orderPrompt, setOrderPrompt] = useState<OrderPrompt | null>(null);
  const [formattedUnitPrice, setFormattedUnitPrice] = useState("");
  const [formattedTotalPrice, setFormattedTotalPrice] = useState("");
  useEffect(() => {
    setFormattedUnitPrice(`¥${order?.unitPrice.toFixed(2)}`);
    setFormattedTotalPrice(`¥${order.totalPrice.toFixed(2)}`);
    axios
      .get(
        `http://localhost:8080/getOrderPromptByOrderId?orderID=${orderIdParam}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const orderPromptData = response.data.message;
        setOrderPrompt(orderPromptData);
      })
      .catch((error) => {
        console.error("Error fetching orderPrompt:", error);
      });
  }, [order, orderPrompt, orderIdParam]);

  if (!orderPrompt) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 p-8">
        <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
          订单详情
        </p>
        <div className="mt-4 md:mt-6 grid grid-cols-8 items-start gap-8">
          <div className="w-full col-span-2">
            <img
              className="w-full hidden md:block"
              src={orderPrompt.mainImageURL}
              alt="result image"
            />
            <img
              className="w-full md:hidden"
              src={orderPrompt.mainImageURL}
              alt="result image"
            />
          </div>
          <div className="col-span-6 pr-4 border-b border-gray-200">
            <div className=" md:flex-row flex-col flex justify-between items-start w-full pb-8  space-y-4 md:space-y-0">
              <div className="w-full flex flex-col justify-start items-start space-y-8">
                <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                  模型：{orderPrompt.model}
                </h3>
              </div>

              <div className="flex justify-between space-x-8 items-start w-full">
                <p className="text-base dark:text-white xl:text-lg leading-6">
                  单价：{formattedUnitPrice}
                </p>
                <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                  数量：{order.quantity}
                </p>
                <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                  合计：{formattedTotalPrice}
                </p>
              </div>
            </div>
            <div className="flex justify-start items-start flex-col space-y-2 pb-4">
              <p className="text-sm dark:text-white leading-1 text-gray-800">
                <span className="text-gray-500">Prompt：</span>
                {orderPrompt.prompt}
              </p>
              <p className="text-sm dark:text-white leading-1 text-gray-800">
                <span className="text-gray-500">Negative Prompt：</span>
                {orderPrompt.negativePrompt}
              </p>
              <p className="text-sm dark:text-white leading-1 text-gray-800">
                <span className="text-gray-500">Sampler：</span>
                {orderPrompt.sampler}
              </p>
              <p className="text-sm dark:text-white leading-1 text-gray-800">
                <span className="text-gray-500">Guidance Scale：</span>
                {orderPrompt.guidanceScale}
              </p>
              <p className="text-sm dark:text-white leading-1 text-gray-800">
                <span className="text-gray-500">Steps：</span>
                {orderPrompt.steps}
              </p>
              <p className="text-sm dark:text-white leading-1 text-gray-800">
                <span className="text-gray-500">Size：</span>
                {orderPrompt.width}
              </p>
              <p className="text-sm dark:text-white leading-1 text-gray-800">
                <span className="text-gray-500">Seed：</span>
                {orderPrompt.seed}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
