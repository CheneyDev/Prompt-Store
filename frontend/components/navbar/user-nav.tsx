import { CreditCard, LogOut, PlusCircle, Receipt, Settings, SquareAsterisk, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { KeyRound } from "lucide"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"

export function UserNav() {

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getAvatarAndEmailByUsername();
  }, []);

  const getAvatarAndEmailByUsername = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getAvatarAndEmailByUsername`,
        {
          withCredentials: true,
        }
      );
      const res = response.data.message;
      const dataArray = JSON.parse(res);
      setUsername(dataArray.username);
      setAvatarURL(dataArray.avatarURL);
      setEmail(dataArray.email);
    } catch (error) {
      console.error("请求出错:", error);
    }
  };

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

  useEffect(() => {
    console.log(username);
    console.log(avatarURL);
    console.log(email);
  }, [username, avatarURL, email]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarURL} alt="avatar" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        <Link href="/">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>个人资料</span>
          </DropdownMenuItem>
          </Link>
          <Link href="/order/all">
          <DropdownMenuItem>
            <Receipt className="mr-2 h-4 w-4" />
            <span>订单列表</span>
          </DropdownMenuItem>
          </Link>
          <Link href="/auth/reset-password">
          <DropdownMenuItem >
            <div className="mr-2 h-4 w-4">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-key-round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></svg>
            </div>
            <span>重置密码</span>
          </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>退出登录</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
