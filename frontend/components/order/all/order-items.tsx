

import axios from "axios";
import Link from "next/link";
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

export default function OrderItems({ orderList }: { orderList: Order[] }) {



  const orderIdList = orderList.map((order) => order.orderId);
  const [orderPromptList, setOrderPromptList] = useState<OrderPrompt[]>([]);
  const [formattedOrderId, setFormattedOrderId] = useState<string[]>([]);
  const [formattedUnitPriceList, setFormattedUnitPriceList] = useState<
    string[]
  >([]);
  const [formattedTotalPriceList, setFormattedTotalPriceList] = useState<
    string[]
  >([]);
  const [formattedDateList, setFormattedDateList] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderPrompts = await Promise.all(
          orderIdList.map((orderId) =>
            axios.get(
              `http://localhost:8080/getOrderPromptByOrderId?orderID=${orderId}`,
              {
                withCredentials: true,
              }
            )
          )
        );
        const orderPromptDataList = orderPrompts.map(
          (response) => response.data.message
        );

        setOrderPromptList(orderPromptDataList);

        const formattedOrderIds = orderList.map(
          (order) => `Order #${order.orderId.slice(5)}`
        );
        setFormattedOrderId(formattedOrderIds);

        const formattedUnitPrices = orderList.map(
          (order) => `¥${order.unitPrice.toFixed(2)}`
        );
        setFormattedUnitPriceList(formattedUnitPrices);

        const formattedTotalPrices = orderList.map(
          (order) => `¥${order.totalPrice.toFixed(2)}`
        );
        setFormattedTotalPriceList(formattedTotalPrices);

        const formattedDates = orderList.map((order) =>
          formatOrderDate(order.orderDate)
        );
        setFormattedDateList(formattedDates);
      } catch (error) {
        console.error("Error fetching order prompts:", error);
      }
    };

    fetchData();
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

  if (!orderPromptList) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1 className="text-4xl text-center font-bold my-10">订单列表</h1>
      {orderPromptList.map((orderPrompt, index) => (
        <Link href={`/order/detail?orderId=${orderPrompt.orderId}`}>
          <div className="mx-12 my-3 flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 p-8">
            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
              {formattedOrderId[index]}
            </p>
            <div className="mt-4 md:mt-6 grid grid-cols-8 items-start gap-8">
              <div className="col-span-2">
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
                      单价：{formattedUnitPriceList[index]}
                    </p>
                    <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                      数量：1
                    </p>
                    <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                      合计：{formattedTotalPriceList[index]}
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
        </Link>
      ))}
    </>
  );
}










// import axios from "axios";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// interface Order {
//   id: number;
//   orderId: string;
//   customerName: string;
//   orderDate: string;
//   productName: string;
//   quantity: number;
//   unitPrice: number;
//   totalPrice: number;
//   orderPrompt: string;
//   resultPath: string;
//   resultURL: string;
// }

// interface OrderPrompt {
//   id: number;
//   orderId: string;
//   mainImagePath: string;
//   prompt: string;
//   negativePrompt: string;
//   width: number;
//   height: number;
//   steps: number;
//   guidanceScale: number;
//   seed: number;
//   model: string;
//   sampler: string;
//   mainImageURL: string;
// }

// const pageSize = 10; // 每页显示的数据条数

// export default function OrderItems({ orderList }: { orderList: Order[] }) {
//   const orderIdList = orderList.map((order) => order.orderId);
//   const [orderPromptList, setOrderPromptList] = useState<OrderPrompt[]>([]);

//   const [formattedOrderId, setFormattedOrderId] = useState<string[]>([]);
//   const [formattedUnitPriceList, setFormattedUnitPriceList] = useState<
//     string[]
//   >([]);
//   const [formattedTotalPriceList, setFormattedTotalPriceList] = useState<
//     string[]
//   >([]);
//   const [formattedDateList, setFormattedDateList] = useState<string[]>([]);

//   const [currentPageData, setCurrentPageData] = useState<OrderPrompt[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const orderPrompts = await Promise.all(
//           orderIdList.map((orderId) =>
//             axios.get(
//               `http://localhost:8080/getOrderPromptByOrderId?orderID=${orderId}`,
//               {
//                 withCredentials: true,
//               }
//             )
//           )
//         );
//         const orderPromptDataList = orderPrompts.map(
//           (response) => response.data.message
//         );
//         setOrderPromptList(orderPromptDataList);
//         const formattedOrderIds = orderList.map(
//           (order) => `Order #${order.orderId.slice(5)}`
//         );
//         setFormattedOrderId(formattedOrderIds);

//         const formattedUnitPrices = orderList.map(
//           (order) => `¥${order.unitPrice.toFixed(2)}`
//         );
//         setFormattedUnitPriceList(formattedUnitPrices);

//         const formattedTotalPrices = orderList.map(
//           (order) => `¥${order.totalPrice.toFixed(2)}`
//         );
//         setFormattedTotalPriceList(formattedTotalPrices);

//         const formattedDates = orderList.map((order) =>
//           formatOrderDate(order.orderDate)
//         );
//         setFormattedDateList(formattedDates);
//       } catch (error) {
//         console.error("Error fetching order prompts:", error);
//       }
//     };

//     fetchData();
//   }, [orderIdList]);

//     const formatOrderDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     const formattedDate = date.toLocaleString("en-US", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       hour: "numeric",
//       minute: "numeric",
//       second: "numeric",
//       hour12: true,
//     });
//     return formattedDate.replace(",", "");
//   };

//   useEffect(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     const currentPageData = orderPromptList.slice(startIndex, endIndex);
//     setCurrentPageData(currentPageData);
//   }, [currentPage, orderPromptList]);

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   if (!orderPromptList) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <h1 className="text-4xl text-center font-bold my-10">订单列表</h1>
//       {currentPageData.map((orderPrompt, index) => (
//         <Link href={`/order/detail?orderId=${orderPrompt.orderId}`}>
//           <div className="mx-12 my-3 flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 p-8">
//             <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
//               {formattedOrderId[index]}
//             </p>
//             <div className="mt-4 md:mt-6 grid grid-cols-8 items-start gap-8">
//               <div className="col-span-2">
//                 <img
//                   className="w-full hidden md:block"
//                   src={orderPrompt.mainImageURL}
//                   alt="result image"
//                 />
//                 <img
//                   className="w-full md:hidden"
//                   src={orderPrompt.mainImageURL}
//                   alt="result image"
//                 />
//               </div>
//               <div className="col-span-6 pr-4 border-b border-gray-200">
//                 <div className=" md:flex-row flex-col flex justify-between items-start w-full pb-8  space-y-4 md:space-y-0">
//                   <div className="w-full flex flex-col justify-start items-start space-y-8">
//                     <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
//                       模型：{orderPrompt.model}
//                     </h3>
//                   </div>

//                   <div className="flex justify-between space-x-8 items-start w-full">
//                     <p className="text-base dark:text-white xl:text-lg leading-6">
//                       单价：{formattedUnitPriceList[index]}
//                     </p>
//                     <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
//                       数量：1
//                     </p>
//                     <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
//                       合计：{formattedTotalPriceList[index]}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex justify-start items-start flex-col space-y-2 pb-4">
//                   <p className="text-sm dark:text-white leading-1 text-gray-800">
//                     <span className="text-gray-500">Prompt：</span>
//                     {orderPrompt.prompt}
//                   </p>
//                   <p className="text-sm dark:text-white leading-1 text-gray-800">
//                     <span className="text-gray-500">Negative Prompt：</span>
//                     {orderPrompt.negativePrompt}
//                   </p>
//                   <p className="text-sm dark:text-white leading-1 text-gray-800">
//                     <span className="text-gray-500">Sampler：</span>
//                     {orderPrompt.sampler}
//                   </p>
//                   <p className="text-sm dark:text-white leading-1 text-gray-800">
//                     <span className="text-gray-500">Guidance Scale：</span>
//                     {orderPrompt.guidanceScale}
//                   </p>
//                   <p className="text-sm dark:text-white leading-1 text-gray-800">
//                     <span className="text-gray-500">Steps：</span>
//                     {orderPrompt.steps}
//                   </p>
//                   <p className="text-sm dark:text-white leading-1 text-gray-800">
//                     <span className="text-gray-500">Size：</span>
//                     {orderPrompt.width}
//                   </p>
//                   <p className="text-sm dark:text-white leading-1 text-gray-800">
//                     <span className="text-gray-500">Seed：</span>
//                     {orderPrompt.seed}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Link>
//       ))}

//       {/* 分页控件 */}
//       <div className="flex justify-center items-center mt-4">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="mr-2 px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 focus:outline-none"
//         >
//           上一页
//         </button>
//         {Array.from({
//           length: Math.ceil(orderPromptList.length / pageSize),
//         }).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handlePageChange(index + 1)}
//             className={`mx-1 px-3 py-1 rounded-md border ${
//               currentPage === index + 1
//                 ? "border-blue-500 bg-blue-500 text-white"
//                 : "border-gray-300 bg-white text-gray-600"
//             } hover:bg-gray-50 focus:outline-none`}
//           >
//             {index + 1}
//           </button>
//         ))}
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={
//             currentPage === Math.ceil(orderPromptList.length / pageSize)
//           }
//           className="ml-2 px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 focus:outline-none"
//         >
//           下一页
//         </button>
//       </div>
//     </>
//   );
// }