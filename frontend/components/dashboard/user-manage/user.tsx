import axios from "axios";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import DashboardUserTable from "./user-table";

export default function DashboardUser() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(0);

  const [userList, setUserList] = useState([]);

  const [usersTotalCount, setUsersTotalCount] = useState<number>(0);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/getAllAccountsWithPagination?page=${currentPage}&pageSize=${pageSize}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const usersData = response.data.message;
        setUserList(usersData);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getAccountsTotalCount`, {
        withCredentials: true,
      })
      .then((response) => {
        const usersTotalCount = response.data.message;
        setUsersTotalCount(usersTotalCount);
        setPageCount(Math.ceil(usersTotalCount / pageSize));
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }, []);

  function getUserListByUsernameWithPagination(
    page: number,
    pageSize: number
  ) {
    axios
      .get(
        `http://localhost:8080/getAllAccountsWithPagination?page=${page}&pageSize=${pageSize}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const usersData = response.data.message;
        setUserList(usersData);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
      getUserListByUsernameWithPagination(page, pageSize);
    }
  };

  useEffect(() => {
    console.log("currentPage:", currentPage);
  }, [currentPage]);

  return <>
  <DashboardUserTable _userList={userList}/>



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

  </>;
}
