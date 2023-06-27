import axios from "axios";
import { set } from "date-fns";
import { is } from "date-fns/locale";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface WishPromptObject {
  id: number;
  wishId: string;
  customerId: string;
  mainImagePath: string;
  prompt: string;
  negativePrompt: string;
  width: number;
  height: number;
  numOutputs: number;
  steps: number;
  guidanceScale: number;
  seed: number;
  model: string;
  modelId: number;
  sampler: string;
  mainImageURL: string;
}

export default function WishItems() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(0);

  const [wishPromptTotalCount, setWishPromptTotalCount] = useState<number>(0);
  const [wishPromptList, setWishPromptList] = useState<WishPromptObject[]>([]);

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
    axios
      .get(
        `http://localhost:8080/getWishListByUsernameWithPagination?&page=${currentPage}&pageSize=${pageSize}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setWishPromptList(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getWishListCountByUsername`, {
        withCredentials: true,
      })
      .then((response) => {
        const totalCount = response.data.message;
        setWishPromptTotalCount(totalCount);
        setPageCount(Math.ceil(totalCount / pageSize));
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }, []);

  function getOrderListByUsernameWithPagination(
    page: number,
    pageSize: number
  ) {
    axios
      .get(
        `http://localhost:8080/getWishListByUsernameWithPagination?&page=${currentPage}&pageSize=${pageSize}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setWishPromptList(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
      getOrderListByUsernameWithPagination(page, pageSize);
    }
  };
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log("currentPage:", currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="border rounded-lg mx-12">
        {wishPromptList.map((wish, index) => (
          // <Link href={`/order/detail?orderId=${wish.id}`}>
          <div className=" grid grid-cols-8  justify-start items-start p-8 ">
            <div className=" col-span-8 items-start gap-8 border-b border-gray-600">
              <div className="grid grid-cols-8 mb-6">
                <div className="col-span-2">
                  <img
                    className="w-56 h-56 col-span-2 rounded-lg border border-gray-600"
                    src={wish.mainImageURL}
                    alt="result image"
                  />
                  <div className="join col-span-2  mt-2">
                    <button className="btn join-item btn-sm btn-outline w-28">
                      移除列表
                    </button>
                    <button className="btn join-item btn-sm btn-outline w-28">
                      立即生成
                    </button>
                  </div>
                </div>
                <div className="col-span-6 pr-4 ">
                  <div className="grid grid-cols-6 gap-8">
                    <div className="col-span-4">
                      <h3 className="text-xl dark:text-white font-semibold leading-6 text-gray-800">
                        模型：{wish.model}
                      </h3>
                    </div>
                    <div className="col-span-2">
                      <p className="text-base  leading-6">价格：¥ 2.00</p>
                    </div>
                  </div>
                  <div className="my-4 border-b border-gray-600" />
                  <div className="flex justify-start items-start flex-col space-y-2 pb-4 mt-4">
                    <p className="text-sm dark:text-white leading-1 text-gray-800">
                      <span className="text-gray-500">Prompt：</span>
                      {wish.prompt}
                    </p>
                    <p className="text-sm dark:text-white leading-1 text-gray-800">
                      <span className="text-gray-500">Negative Prompt：</span>
                      {wish.negativePrompt}
                    </p>
                    <p className="text-sm dark:text-white leading-1 text-gray-800">
                      <span className="text-gray-500">Sampler：</span>
                      {wish.sampler}
                    </p>
                    <p className="text-sm dark:text-white leading-1 text-gray-800">
                      <span className="text-gray-500">Guidance Scale：</span>
                      {wish.guidanceScale}
                    </p>
                    <p className="text-sm dark:text-white leading-1 text-gray-800">
                      <span className="text-gray-500">Steps：</span>
                      {wish.steps}
                    </p>
                    <p className="text-sm dark:text-white leading-1 text-gray-800">
                      <span className="text-gray-500">Size：</span>
                      {wish.width}
                    </p>
                    <p className="text-sm dark:text-white leading-1 text-gray-800">
                      <span className="text-gray-500">Seed：</span>
                      {wish.seed}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          // </Link>
        ))}
      </div>

      <div
        className="join grid grid-cols-2 my-6"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button
          className="join-item btn btn-outline"
          onClick={() => handlePageClick(currentPage - 1)}
        >
          上一页
        </button>
        {currentPage > 3 && (
          <button
            className={`join-item btn btn-outline ${
              currentPage === 1 ? "btn-disabled" : ""
            }`}
            onClick={() => handlePageClick(1)}
          >
            1
          </button>
        )}
        {currentPage > 3 && (
          <button className="join-item btn btn-outline btn-disabled">
            ...
          </button>
        )}
        {/* <button className={`join-item btn btn-outline ${currentPage === 1 ? 'bg-gray-200' : ''}`} onClick={() => handlePageClick(1)}>1</button> */}
        {currentPage > 2 && (
          <button
            className="join-item btn btn-outline"
            onClick={() => handlePageClick(currentPage - 2)}
          >
            {currentPage - 2}
          </button>
        )}
        {currentPage > 1 && (
          <button
            className="join-item btn btn-outline"
            onClick={() => handlePageClick(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        )}
        <button className={`join-item btn btn-outline bg-gray-200`}>
          {currentPage}
        </button>
        {currentPage < pageCount && (
          <button
            className="join-item btn btn-outline"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}
        {currentPage < pageCount - 1 && (
          <button
            className="join-item btn btn-outline"
            onClick={() => handlePageClick(currentPage + 2)}
          >
            {currentPage + 2}
          </button>
        )}
        {currentPage < pageCount - 2 && (
          <button className="join-item btn btn-outline btn-disabled">
            ...
          </button>
        )}
        {currentPage < pageCount - 2 && (
          <button
            className={`join-item btn btn-outline ${
              currentPage === pageCount ? "btn-disabled" : ""
            }`}
            onClick={() => handlePageClick(pageCount)}
          >
            {pageCount}
          </button>
        )}
        <button
          className="join-item btn btn-outline"
          onClick={() => handlePageClick(currentPage + 1)}
        >
          下一页
        </button>
      </div>
    </>
  );
}
