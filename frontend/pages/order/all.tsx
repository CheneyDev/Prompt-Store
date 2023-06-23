import Navbar from "@/components/navbar/navbar";
import OrderItems from "@/components/order/all/order-items";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AllOrders() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const [username, setUsername] = useState("");
  const [orderList, setOrderList] = useState([]);

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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Navbar />
      <OrderItems orderList={orderList} />
      <div className="join my-6" style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="join-item btn" onClick={handlePreviousPage}>«</button>
        <button className="join-item btn">第 {currentPage} 页</button>
        <button className="join-item btn" onClick={handleNextPage}>»</button>
      </div>
    </>
  );
}
