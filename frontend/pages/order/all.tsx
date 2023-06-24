import Navbar from "@/components/navbar/navbar";
import OrderItems from "@/components/order/all/order-items";
import axios from "axios";
import { set } from "date-fns";
import { use, useEffect, useState } from "react";

export default function AllOrders() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(0);

  const [username, setUsername] = useState("");
  const [orderList, setOrderList] = useState([]);

  const [ordersTotalCount, setOrdersTotalCount] = useState<number>(0);

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
    axios
      .get(
        `http://localhost:8080/getOrderListByUsernameWithPagination?username=${username}&page=${currentPage}&pageSize=${pageSize}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const ordersData = response.data.message;
        setOrderList(ordersData);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }, [username]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getOrdersTotalCount`, {
        withCredentials: true,
      })
      .then((response) => {
        const ordersTotalCount = response.data.message;
        setOrdersTotalCount(ordersTotalCount);
        setPageCount(Math.ceil(ordersTotalCount / pageSize));
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }, [username]);

  function getOrderListByUsernameWithPagination(
    username: string,
    page: number,
    pageSize: number
  ) {
    axios
      .get(
        `http://localhost:8080/getOrderListByUsernameWithPagination?username=${username}&page=${page}&pageSize=${pageSize}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const ordersData = response.data.message;
        setOrderList(ordersData);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }


  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
      getOrderListByUsernameWithPagination(username, page, pageSize);
    }
  };

  useEffect(() => {
    console.log("currentPage:", currentPage);
  }, [currentPage]);

  return (
    <>
      <Navbar />
      <OrderItems orderList={orderList} />
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
