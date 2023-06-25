import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { set } from "date-fns";
import { ro } from "date-fns/locale";
import { Edit3, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  accountStatus: string;
  avatarURL: string;
  lastActivityTimestamp: string;
}

export default function DashboardUserTable({
  _userList,
  currentPage,
  pageSize,
}: {
  _userList: User[];
    currentPage: any;
    pageSize: any;
}) {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    setUserList(_userList);
  }, [_userList]);

  const userIdRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const accountStatusRef = useRef<HTMLInputElement>(null);

  const handleSaveChanges = async () => {
    try {
      const user_id = Number(userIdRef.current?.value);
      const user_name = usernameRef.current?.value;
      const email = emailRef.current?.value;
      const role = roleRef.current?.value;
      const account_status = accountStatusRef.current?.value;

      const response = await axios.post(
        `http://localhost:8080/updateAccountById?id=${user_id}&username=${user_name}&role=${role}&email=${email}&accountStatus=${account_status}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.data.message === "success") {
        // 更新 orderList
        const newUserList = userList.map((user) => {
          if (user.id === user_id) {
            return {
              ...user,
              username: user_name,
              email: email,
              role: role,
              accountStatus: account_status,
            } as User; // 添加类型断言
          } else {
            return user;
          }
        });
        setUserList(newUserList);
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleDeleteOrder = async (userId: any) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/deleteAccountById?id=${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.data.message === "success") {
        const newUserList = userList.filter(
          (user) => user.id !== Number(userId)
        );
        setUserList(newUserList);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const [imageUrl, setImageUrl] = useState("");
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    console.log("useEffect");
    const avatarInput = avatarInputRef.current;
    if (avatarInput) {
      avatarInput.addEventListener("change", handleAvatarSelection);
    }

    return () => {
      if (avatarInput) {
        avatarInput.removeEventListener("change", handleAvatarSelection);
      }
    };
  }, [avatarInputRef.current]);

  function handleAvatarSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", handleFileLoad);
      reader.readAsDataURL(file);
      console.log("handleAvatarSelection");
    }
  }
  function handleFileLoad(event: ProgressEvent<FileReader>) {
    const imageUrl = event.target?.result as string;
    setImageUrl(imageUrl);
  }

  const newUserNameRef = useRef<HTMLInputElement>(null);
  const newUserEmailRef = useRef<HTMLInputElement>(null);
  const newUserRoleRef = useRef<HTMLInputElement>(null);
  const newUserPasswordRef = useRef<HTMLInputElement>(null);

  const handleCreateNewUser = async () => {
    try {
      const newUserName = newUserNameRef.current?.value;
      const newUserEmail = newUserEmailRef.current?.value;
      const newUserRole = newUserRoleRef.current?.value;
      const newUserPassword = newUserPasswordRef.current?.value;

      const avatarData=imageUrl;
      const response = await axios.post(
        `http://localhost:8080/insertAccountFromDashboard`,
        {
            newUserName,
            newUserEmail,
            newUserRole,
            newUserPassword,
            avatarData,
        },
        {
          withCredentials: true,
        }
      );

    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Dialog>
          <DialogTrigger asChild>
            <button className="btn btn-outline btn-sm my-4">
              <Edit3 size={14} /> 添加用户
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>添加新用户</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex justify-center items-center">
                <Avatar className="w-32 h-32 mb-2">
                  <AvatarImage src={imageUrl} />
                  <AvatarFallback>
                    <span className="text-4xl">🤠</span>
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex justify-center items-center">
                <input
                  ref={avatarInputRef}
                  id="newUserAvatar"
                  onChange={handleAvatarSelection}
                  type="file"
                  className="file-input file-input-accent file-input-sm  w-32"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newUserName" className="text-right">
                  用户名
                </Label>
                <Input
                  id="newUserName"
                  ref={newUserNameRef}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newUserPassword" className="text-right">
                  密码
                </Label>
                <Input
                  type="password"
                  id="newUserPassword"
                  ref={newUserPasswordRef}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newUserRole" className="text-right">
                  角色
                </Label>
                <Input
                  id="newUserRole"
                  defaultValue="user"
                  ref={newUserRoleRef}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newUserEmail" className="text-right">
                  邮箱
                </Label>
                <Input
                  id="newUserEmail"
                  ref={newUserEmailRef}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={handleCreateNewUser}>
                  添加
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <table className="table">
          <thead>
            <tr>
              <th>用户名</th>
              <th>角色</th>
              <th>邮箱</th>
              <th>账号状态</th>
              <th>上次活动时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-8 h-8">
                        <img src={user.avatarURL} alt="头像" />
                      </div>
                    </div>
                    <div>
                      <div className="">{user.username}</div>
                    </div>
                  </div>
                </td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.accountStatus}</td>
                <td>
                  {user.lastActivityTimestamp
                    ? user.lastActivityTimestamp
                    : "无活动"}
                </td>
                <td>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="btn btn-outline btn-sm mr-3">
                        <Edit3 size={14} />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>编辑用户信息</DialogTitle>
                        <DialogDescription>有限更改用户信息</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="user-id" className="text-right">
                            ID
                          </Label>
                          <Input
                            id="user-id"
                            disabled
                            value={user.id}
                            ref={userIdRef}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="user-name" className="text-right">
                            用户名
                          </Label>
                          <Input
                            id="user-name"
                            defaultValue={user.username}
                            ref={usernameRef}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="user-role" className="text-right">
                            角色
                          </Label>
                          <Input
                            id="user-role"
                            defaultValue={user.role}
                            ref={roleRef}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="user-email" className="text-right">
                            邮箱
                          </Label>
                          <Input
                            id="user-email"
                            defaultValue={user.email}
                            ref={emailRef}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="user-status" className="text-right">
                            状态
                          </Label>
                          <Input
                            id="user-status"
                            defaultValue={user.accountStatus}
                            ref={accountStatusRef}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="submit" onClick={handleSaveChanges}>
                            保存更改
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="btn btn-outline btn-error  btn-sm">
                        <Trash2 size={14} />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>确定要删除吗？</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid items-center gap-4">
                          <p className="text-gray-600">
                            用户 {user.username} 删除后不可恢复！
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">取消</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            variant="destructive"
                            onClick={() => handleDeleteOrder(user.id)}
                          >
                            确定
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
