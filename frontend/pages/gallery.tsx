import Navbar from "@/components/navbar/navbar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { use, useEffect, useState } from "react";

interface OrderPromptObject {
  id: any;
  orderId: any;
  mainImagePath: any;
  prompt: any;
  negativePrompt: any;
  width: any;
  height: any;
  numOutputs: any;
  steps: any;
  guidanceScale: any;
  seed: any;
  model: any;
  modelId: any;
  sampler: any;
  mainImageURL: any;
}

export default function GalleryPage() {
  const [orderPromptList, setOrderPromptList] = useState<OrderPromptObject[]>(
    []
  );
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

  const getAllPublicOrderPrompt = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/getAllPublicOrderPrompt",
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setOrderPromptList(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPublicOrderPrompt();
  }, []);

  return (
    <>
      <Navbar />
      {/* 
      {orderPromptList.map((orderPrompt) => (
        <p>
          {orderPrompt.id}
          {orderPrompt.orderId}
          {orderPrompt.mainImagePath}
          {orderPrompt.prompt}
          {orderPrompt.negativePrompt}
          {orderPrompt.width}
        </p>
      ))} */}

      <div className="bg-gray-50">
        <div className="mx-auto max-w-2xl  pt-12 pb-16 lg:max-w-7xl lg:px-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-500 tracking-tight leading-normal">
                画廊 - 用户作品集
              </h2>
              <span className="text-3xl">
                ☀️💨💧<br></br>
              </span>
              <p className="text-xl  leading-8  ">
                应对气候变化，你也可以出份力！<br></br>
                人工智能模型在使用 GPU 进行运算时会消耗许多能源⚡️，<br></br>
                这里展示了由用户分享的生成结果，也许会帮助你更快调出心仪的
                Prompt 。
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className=" grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 ">
            {orderPromptList.map((orderPrompt) => (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex items-center justify-center">
                    <div className="max-w-md rounded-3xl p-px bg-gradient-to-b from-blue-300 to-pink-300">
                      <div className="rounded-[calc(1.5rem-1px)] p-4 bg-white dark:bg-gray-900">
                        <img
                          src={orderPrompt.mainImageURL}
                          className="mb-3 h-full w-full rounded-xl object-cover"
                          alt=""
                        />
                        <div className="h-20">
                          <p className="text-gray-700 dark:text-gray-300 overflow-hidden line-clamp-3 -webkit-line-clamp-3 -webkit-box-orient-vertical">
                            {orderPrompt.prompt}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="grid gap-4 py-4">
                  <DialogHeader>
                    <DialogTitle>Prompt 详情</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 mb-2 px-4">
                    <div className="grid grid-cols-4 items-start">
                      <Label htmlFor="name" className="leading-8 col-span-4">
                        Prompt
                      </Label>
                      <p className="font-mono text-gray-600 break-all col-span-4">
                        {orderPrompt.prompt}
                      </p>
                    </div>
                    <div className="grid grid-cols-4 items-start">
                      <Label htmlFor="name" className="leading-8 col-span-4">
                        Negative Prompt
                      </Label>
                      <p className="font-mono text-gray-600 break-all col-span-4">
                        {orderPrompt.negativePrompt}
                      </p>
                    </div>
                    <div className="grid grid-cols-4 items-start">
                      <Label htmlFor="name" className="leading-8 col-span-4">
                        Model
                      </Label>
                      <p className="font-mono text-gray-600 break-all col-span-4">
                        {orderPrompt.model}
                      </p>
                    </div>
                    <div className="grid grid-cols-4 items-start">
                    <div className="col-span-2">
                        <Label htmlFor="name" className="leading-8 col-span-4">
                          Guidance Scale
                        </Label>
                        <p className="font-mono text-gray-600 break-all col-span-4">
                          {orderPrompt.guidanceScale}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="name" className="leading-8 col-span-4">
                          Steps
                        </Label>
                        <p className="font-mono text-gray-600 break-all col-span-4">
                          {orderPrompt.steps}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-start">
                      <div className="col-span-2">
                        <Label htmlFor="name" className="leading-8 col-span-4">
                          Seed
                        </Label>
                        <p className="font-mono text-gray-600 break-all col-span-4">
                          {orderPrompt.seed}
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
