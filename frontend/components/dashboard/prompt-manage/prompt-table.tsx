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
import { ca } from "date-fns/locale";
import { Edit3, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface PromptObject {
  id: number;
  sku: string;
  productName: string;
  mainImagePath: string;
  description: string;
  prompt: string;
  negativePrompt: string;
  width: number;
  height: number;
  numOutputs: number;
  steps: any;
  guidanceScale: number;
  seed: number;
  model: string;
  modelId: number;
  sampler: string;
  maxSteps: number;
  maxScale: number;
  maxOutputs: number;
  mainImageURL: string;
}

export default function DashboardPromptTable(props: {
  _promptList: PromptObject[];
  currentPage: number;
  pageSize: number;
}) {
  const [promptList, setPromptList] = useState<PromptObject[]>([]);

  useEffect(() => {
    setPromptList(props._promptList);
  }, [props._promptList]);

  const promptSkuRef = useRef<HTMLInputElement>(null);
  const promptProductNameRef = useRef<HTMLInputElement>(null);
  const promptDescriptionRef = useRef<HTMLInputElement>(null);
  const promptModelRef = useRef<HTMLInputElement>(null);
  const promptStepsRef = useRef<HTMLInputElement>(null);

  const handleUpdatePrompt = async () => {
    try{
        const prompt_sku = promptSkuRef.current?.value;
        const prompt_productName = promptProductNameRef.current?.value;
        const prompt_description = promptDescriptionRef.current?.value;
        const prompt_model = promptModelRef.current?.value;
        const prompt_steps = promptStepsRef.current?.value;
        const response = await axios.post(
            `http://localhost:8080/updateProductPromptBySku`,
            {
                sku: prompt_sku,
                productName: prompt_productName,
                description: prompt_description,
                model: prompt_model,
                steps: prompt_steps,

            },
            {
                withCredentials: true,

            });
        if (response.data.message === "success") {
            const newPromptList = promptList.map((prompt) => {
                if (prompt.sku === prompt_sku) {
                   return {
                          ...prompt,
                            productName: prompt_productName,
                            description: prompt_description,
                            model: prompt_model,
                            steps: prompt_steps,
                        } as PromptObject;
                }else{
                    return prompt;
                }
                return prompt;
            });
            setPromptList(newPromptList);
        }
    }catch (error) {
        console.error("Error updating prompt:", error);
    }
};

  const handleDeletePrompt = async (sku: any) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/deleteProductPromptBySku?sku=${sku}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.data.message === "success") {
        const newPromptList = promptList.filter((prompt) => prompt.sku !== sku);
        setPromptList(newPromptList);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>名称</th>
              <th>Model</th>
              <th>Sampler</th>
              <th>Steps</th>
              <th>Scale</th>
              <th>Width</th>
              <th>Height</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {promptList.map((prompt) => (
              <tr key={prompt.id}>
                <td>{prompt.sku}</td>
                <td>{prompt.productName}</td>
                <td>{prompt.model}</td>
                <td>{prompt.sampler}</td>
                <td>{prompt.steps}</td>
                <td>{prompt.guidanceScale}</td>
                <td>{prompt.width}</td>
                <td>{prompt.height}</td>
                <td>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="btn btn-outline btn-sm mr-3">
                        <Edit3 size={14} />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>编辑商品信息</DialogTitle>
                        <DialogDescription>有限更改商品信息</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="promptSku" className="text-right">
                            SKU
                          </Label>
                          <Input
                            id="promptSku"
                            disabled
                            value={prompt.sku}
                            ref={promptSkuRef}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="promptName" className="text-right">
                            名称
                          </Label>
                          <Input
                            id="promptName"
                            defaultValue={prompt.productName}
                            ref={promptProductNameRef}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="promptDescription"
                            className="text-right"
                          >
                            描述
                          </Label>
                          <Input
                            id="promptDescription"
                            defaultValue={prompt.description}
                            ref={promptDescriptionRef}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="promptModel" className="text-right">
                            模型
                          </Label>
                          <Input
                            id="promptModel"
                            defaultValue={prompt.model}
                            ref={promptModelRef}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="promptSteps" className="text-right">
                            Steps
                          </Label>
                          <Input
                            id="promptSteps"
                            defaultValue={prompt.steps}
                            ref={promptStepsRef}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            type="submit"
                               onClick={handleUpdatePrompt}
                          >
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
                            Prompt "{prompt.productName}" 删除后不可恢复！
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
                            onClick={() => handleDeletePrompt(prompt.sku)}
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
