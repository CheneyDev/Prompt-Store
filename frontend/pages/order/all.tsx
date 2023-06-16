import Navbar from "@/components/navbar";
import OrderItems from "@/components/order/all/order-items";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AllOrders() {
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
          .get(`http://localhost:8080/getOrderListByUsername?username=${username}`, {
            withCredentials: true,
          })
          .then((response) => {
            const ordersData = response.data.message;
            setOrderList(ordersData);
          })
          .catch((error) => {
            console.error("Error fetching order:", error);
          });
      }, [username]);


    return (<>
    
    <Navbar/>

    <OrderItems orderList={orderList} />


    </>);
}