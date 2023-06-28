import Navbar from "@/components/navbar/navbar";
import AccountForm from "@/components/profile/account-form";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { use, useEffect, useState } from "react";

interface User {
  id: any;
  username: any;
  password: any;
  role: any;
  email: any;
  firstName: any;
  lastName: any;
  createAt: any;
  createdAt: any;
  onlineStatus: any;
  accountStatus: any;
  loginTimestamp: any;
  lastActivityTimestamp: any;
  avatarPath: any;
  avatarURL: any;
}


export default function ProfilePage() {


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
          return window.location.replace("auth/login");
        }
      } catch (error) {
        return window.location.replace("auth/login");
      }
    }
    handleLogin();
  }, []);

  const [user, setUser] = useState<User>();
  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/getAccountByUsername",
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setUser(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getUser();
  }, []);





  return (
    <>
      <Navbar />
      <div className="px-16 py-12">
        <div className="px-4 sm:px-0">
          <h3 className="text-3xl font-semibold leading-7 text-gray-900">
            个人资料
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            个人资料和账号信息
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-base font-medium leading-6 text-gray-900">
                头像
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <div className="avatar ">
                  <div className="w-24 rounded-xl">
                    <img src={user?.avatarURL} />
                  </div>
                </div>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-base font-medium leading-6 text-gray-900">
                用户名
              </dt>
              <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user?.username}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-base font-medium leading-6 text-gray-900">
                邮箱
              </dt>
              <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user?.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-base font-medium leading-6 text-gray-900">
                角色
              </dt>
              <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user?.role}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-base font-medium leading-6 text-gray-900">
                全名
              </dt>
              <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user?.firstName} {user?.lastName}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-base font-medium leading-6 text-gray-900">
                注册时间
              </dt>
              <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user?.createAt}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
