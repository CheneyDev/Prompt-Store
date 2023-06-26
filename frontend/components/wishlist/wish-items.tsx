import axios from "axios";
import { set } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    console.log("currentPage:", currentPage);
  }, [currentPage]);

  return (
    <>
    <div className="border rounded-lg mx-12">
      {wishPromptList.map((wish, index) => (
        <Link href={`/order/detail?orderId=${wish.id}`}>
          <div className=" grid grid-cols-8  justify-start items-start p-8 ">
            {/* <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
              {wish.id}
            </p> */}
            <div className=" col-span-8 items-start gap-8 border-b">
              <div className="grid grid-cols-8 gap-8 mb-4">
                <div className="col-span-2 ">
                    <img
                      className="w-full max-h-72  rounded hidden md:block"
                      src="https://images.unsplash.com/photo-1542451313056-b7c8e626645f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=654&q=80"
                      alt="result image"
                    />
                </div>
                <div className="col-span-6 pr-4 ">
                  <div className="grid grid-cols-6 gap-8">
                    <div className="col-span-2">
                      <h3 className="text-xl dark:text-white font-semibold leading-6 text-gray-800">
                        模型：{wish.model}
                      </h3>
                    </div>

                    <div className="col-span-2">
                      <p className="text-base dark:text-white  leading-6">
                        数量：144
                      </p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-base  leading-6">
                        价格：¥ 898
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-start items-start flex-col space-y-2 pb-4">
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
        </Link>
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
