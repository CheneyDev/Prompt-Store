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
} from "./dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { set } from "date-fns";
import { ca } from "date-fns/locale";
import { Edit3, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface PromptObject {
  id: any;
  sku: any;
  productName: any;
  mainImagePath: any;
  description: any;
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
  maxSteps: any;
  maxScale: any;
  maxOutputs: any;
  mainImageURL: any;
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
    try {
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
        }
      );
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
          } else {
            return prompt;
          }
          return prompt;
        });
        setPromptList(newPromptList);
      }
    } catch (error) {
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
    }
  }
  function handleFileLoad(event: ProgressEvent<FileReader>) {
    const imageUrl = event.target?.result as string;
    setImageUrl(imageUrl);
    handleImageError();
  }

  const [imageLoadError, setImageLoadError] = useState(false);

  const handleImageError = () => {
    setImageLoadError(!imageLoadError);
  };

  const skuInputRef = useRef<HTMLInputElement | null>(null);
  const productNameInputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);
  const promptTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const negativePromptTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const modelIdInputRef = useRef<HTMLInputElement | null>(null);
  const modelInputRef = useRef<HTMLInputElement | null>(null);
  const samplerInputRef = useRef<HTMLInputElement | null>(null);
  const guidanceScaleInputRef = useRef<HTMLInputElement | null>(null);
  const maxStepsInputRef = useRef<HTMLInputElement | null>(null);
  const maxScaleInputRef = useRef<HTMLInputElement | null>(null);
  const heightInputRef = useRef<HTMLInputElement | null>(null);
  const widthInputRef = useRef<HTMLInputElement | null>(null);



  const handleCreateNewPrompt = async () => {
    try {
        const sku = skuInputRef.current?.value;
        const productName = productNameInputRef.current?.value;
        const description = descriptionInputRef.current?.value;
        const prompt = promptTextareaRef.current?.value;
        const negativePrompt = negativePromptTextareaRef.current?.value;
        const modelId = modelIdInputRef.current?.value;
        const model = modelInputRef.current?.value;
        const sampler = samplerInputRef.current?.value;
        const guidanceScale = guidanceScaleInputRef.current?.value;
        const maxSteps = maxStepsInputRef.current?.value;
        const maxScale = maxScaleInputRef.current?.value;
        const height = heightInputRef.current?.value;
        const width = widthInputRef.current?.value;


        const mainImagePath = imageUrl;

        const response = await axios.post(
            `http://localhost:8080/insertProductPrompt`,
            {
                sku: sku,
                productName: productName,
                description: description,
                prompt: prompt,
                negativePrompt: negativePrompt,
                modelId: modelId,
                model: model,
                sampler: sampler,
                guidanceScale: guidanceScale,
                maxSteps: maxSteps,
                maxScale: maxScale,
                height: height,
                width: width,
                mainImagePath: mainImagePath,
            },
            {
                withCredentials: true,
            }
        );
        if (response.data.message === "success") {
            const newPromptList = [
                ...promptList,
                {
                    sku: sku,
                    productName: productName,
                    description: description,
                    prompt: prompt,
                    negativePrompt: negativePrompt,
                    modelId: modelId,
                    model: model,
                    sampler: sampler,
                    guidanceScale: guidanceScale,
                    maxSteps: maxSteps,
                    maxScale: maxScale,
                    height: height,
                    width: width,
                } as PromptObject,
            ];
            setPromptList(newPromptList);
        }
    } catch (error) {
        console.error("Error creating prompt:", error);
    }
    };


  return (
    <>
      <div className="overflow-x-auto">
        <Dialog>
          <DialogTrigger asChild>
            <button className="btn btn-outline btn-sm my-4">
              <Edit3 size={14} /> 添加商品
            </button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>添加商品</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className=" grid grid-cols-2  justify-start items-start gap-8 p-4">
                <div className="col-span-1">
                  <div className="flex justify-center items-center">
                    {/* <Avatar className="w-32 h-32 mb-2">
                     <AvatarImage src={imageUrl} />
                     <AvatarFallback>
                    <span className="text-4xl">🤠</span>
                    </AvatarFallback>
                    </Avatar> */}
                    <div className="avatar mb-2">
                      {imageLoadError ? (
                        <div
                          className="w-[280px] max-w-[280px] rounded-xl border"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <h1 className=" text-center text-6xl">
                            🤠
                            <br />{" "}
                            <span className="text-xl  leading-snug">
                              这里还没有图片
                            </span>
                          </h1>
                        </div>
                      ) : (
                        <div className="w-[280px] max-w-[280px] rounded-xl border">
                          <img src={imageUrl} onError={handleImageError} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center items-center mb-2">
                    <input
                      id="newUserAvatar"
                      onChange={handleAvatarSelection}
                      type="file"
                      className="file-input file-input-bordered file-input-sm  w-34"
                    />
                  </div>
                  <Input
                    id="skuInput"
                    placeholder="SKU"
                    ref={skuInputRef}
                    className="my-2"
                  />
                  <Input
                    id="productNameInput"
                    placeholder="商品名称"
                    ref={productNameInputRef}
                    className="my-2"
                  />
                  <Input
                    id="descriptionInput"
                    placeholder="商品描述"
                    ref={descriptionInputRef}
                    className="my-2"
                  />
                </div>
                <div className="col-span-1">
                  <Textarea
                    id="promptTextarea"
                    placeholder="Prompt"
                    ref={promptTextareaRef}
                    className="my-2"
                  />
                  <Textarea
                    id="negativePromptTextarea"
                    placeholder="Negative Prompt"
                    ref={negativePromptTextareaRef}
                    className="my-2"
                  />
                  <Input
                    id="modelIdInput"
                    placeholder="Model ID"
                    ref={modelIdInputRef}
                    className="my-2"
                  />
                  <Input
                    id="modelInput"
                    placeholder="Model"
                    ref={modelInputRef}
                    className="my-2"
                  />
                  <Input
                    id="samplerInput"
                    placeholder="Sampler"
                    ref={samplerInputRef}
                    className="my-2"
                  />
                  <Input
                    id="guidanceScaleInput"
                    placeholder="Guidance Scale"
                    ref={guidanceScaleInputRef}
                    className="my-2"
                  />

                  <div className="grid grid-cols-2 justify-start items-start gap-2 my-2">
                    <Input
                      id="maxStepsInput"
                      placeholder="max_steps"
                      ref={maxStepsInputRef}
                    />
                    <Input
                      id="maxScaleInput"
                      placeholder="max_scale"
                      ref={maxScaleInputRef}
                    />
                    <Input
                      id="heightInput"
                      placeholder="高度"
                      ref={heightInputRef}
                    />
                    <Input
                      id="widthInput"
                      placeholder="宽度"
                      ref={widthInputRef}
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="submit"
                  onClick={handleCreateNewPrompt}
                >
                  添加
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
                          <Button type="submit" onClick={handleUpdatePrompt}>
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
