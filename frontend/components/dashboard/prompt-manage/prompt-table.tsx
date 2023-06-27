import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { set } from "date-fns";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

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
  steps: number;
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
