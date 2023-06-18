import axios from "axios";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {

  const router = useRouter();

  const handleLogout = () => {
    axios
      .get("http://localhost:8080/api/auth/logout", { withCredentials: true })
      .then((response) => {
        router.push("/auth/login"); 
      })
      .catch((error) => {
        console.error("注销失败:", error);
      });
  };

  return (
    <>
      <div className="navbar bg-base-100 border-b border-inherit">
        <div className="navbar-start">
          
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            <Sparkles size={20} />
            Prompt Store
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
            <details>
                <summary>分类</summary>
                <ul className="p-2">
                  <li>
                    <a>Prompts</a>
                  </li>
                  <li>
                    <a>Models</a>
                  </li>
                </ul>
              </details>
            </li>
            <li tabIndex={0}>
              <a>订单</a>
            </li>
            <li>
              <a>心愿单</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="form-control">
            <input
              type="text"
              placeholder="搜索商品"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end ml-3">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://prompt-store-bucket.qqdd.dev/resources/default_avatar.png" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  个人中心
                </a>
              </li>
              <li>
                <a>修改密码</a>
              </li>
              <li>
                <a onClick={handleLogout}>注销</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}