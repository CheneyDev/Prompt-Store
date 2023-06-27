import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/product/prompt/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Component, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Generating from "./ui/generating-dialog";

import Generated from "./ui/generated-dialog";
import { set } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ProductModelObject {
  id: number;
  mainImagePath: string;
  modelName: string;
  modelDetailsUrl: string;
  modelApiId: string;
  defaultPrompt: string;
  defaultNegativePrompt: string;
  defaultResolution: string;
  supportedResolutions: string;
  defaultOutputs: number;
  supportedOutputs: string;
  defaultSampler: string;
  supportedSamplers: string;
  defaultSteps: number;
  maxSteps: number;
  defaultScale: number;
  maxScale: number;
  seed: number;
  mainImageURL: string;
}

let modelNames: any[] = [];
// let modelIds: any[] = [];
let resolutionList: any[] = [];
let instantSamplerList: any[] = [];
let orderId = "";

export default function PromptDetail({ username }: { username: any }) {
  let sku: string = "";
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    sku = urlParams.get("sku") || "";
  }, []);

  const [samplerList, setSamplerList] = useState([]);

  const [isGenerated, setIsGenerated] = useState(false);

  const [id, setId] = useState("");

  const [productName, setProductName] = useState("");
  const [mainImageURL, setMainImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [numOutputs, setNumOutputs] = useState(0);
  const [steps, setSteps] = useState(0);
  const [guidanceScale, setGuidanceScale] = useState(0.0);
  const [seed, setSeed] = useState(0);
  const [model, setModel] = useState("");
  const [modelId, setModelId] = useState("");
  const [sampler, setSampler] = useState("");
  const [maxScale, setMaxScale] = useState(0.0);
  const [maxOutputs, setMaxOutputs] = useState(0);
  const [maxSteps, setMaxSteps] = useState("");

  const [modelObjects, setModelObjects] = useState<ProductModelObject[]>([]);

  useEffect(() => {
    fetchProductModel();
    fetchProductPrompt();
    fetchSupportedResolutionsByModelID();
    fetchSamplerList(modelId);
  }, [modelId]);

  const fetchProductPrompt = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getPromptDetail?sku=${sku}`,
        {
          withCredentials: true,
        }
      );
      const productPrompt = response.data;
      if (productPrompt) {
        setId(productPrompt.message.id);
        // setSku(productPrompt.message.sku);
        setMainImageURL(productPrompt.message.mainImageURL);
        setProductName(productPrompt.message.productName);
        setDescription(productPrompt.message.description);
        setPrompt(productPrompt.message.prompt);
        setNegativePrompt(productPrompt.message.negativePrompt);
        setWidth(productPrompt.message.width);
        setHeight(productPrompt.message.height);
        setNumOutputs(productPrompt.message.numOutputs);
        setSteps(productPrompt.message.steps);
        setGuidanceScale(productPrompt.message.guidanceScale);
        setSeed(productPrompt.message.seed);
        setModel(productPrompt.message.model);
        setModelId(productPrompt.message.modelId);
        setSampler(productPrompt.message.sampler);
        setMaxScale(productPrompt.message.maxScale);
        setMaxOutputs(productPrompt.message.maxOutputs);
        setMaxSteps(productPrompt.message.maxSteps);
      } else {
        return window.location.replace("auth/login");
      }
    } catch (error) {
      console.error("Error fetching product prompt:", error);
    }
  };

  const fetchSamplerList = async (modelId: any) => {
    const encodedModelId = encodeURIComponent(modelId);
    try {
      const response = await axios.get(
        `http://localhost:8080/getSamplerByModelId?modelId=${encodedModelId}`,
        {
          withCredentials: true,
        }
      );
      const res = response.data;
      if (res) {
        setSamplerList(res.message);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching product samplers:", error);
    }
  };

  const fetchProductModel = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getProductModels`,
        {
          withCredentials: true,
        }
      );
      const productModel = response.data;
      if (productModel) {
        modelNames = productModel.message.map((item: any) => item.modelName);
        setModelObjects(productModel.message);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching product models:", error);
    }
  };

  const fetchSupportedResolutionsByModelID = async () => {
    const encodedModelID = encodeURIComponent(modelId);
    try {
      const response = await axios.get(
        `http://localhost:8080/getSupportedResolutionsByModelID?modelID=${encodedModelID}`,
        {
          withCredentials: true,
        }
      );
      const res = response.data;
      if (res) {
        resolutionList = res.message;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching supported resolutions:", error);
    }
  };

  const [promptError, setPromptError] = useState("");
  const [stepsError, setStepsError] = useState("");
  const [scaleError, setScaleError] = useState("");
  const [seedError, setSeedError] = useState("");

  useEffect(() => {
    validatePrompt(prompt);
    validateSeed(seed);
  }, [prompt, steps, guidanceScale, seed]);

  const validatePrompt = (prompt: string) => {
    if (prompt == "") {
      setPromptError("不能为空");
    } else {
      setPromptError("");
    }
  };

  const validateSeed = (seed: number) => {
    if (isNaN(seed) || String(seed) == "") {
      setSeedError("不能为空");
    } else {
      setSeedError("");
    }
  };

  const handlePromptChange = (event: any) => {
    setPrompt(event.target.value);
    validatePrompt(prompt);
  };

  const handleNegativePromptChange = (event: any) => {
    setNegativePrompt(event.target.value);
  };

  // const handleModelChange = (event: any) => {
  //   const value = event.target.value;
  //   setModel(event.target.value);
  //   fetchSupportedResolutionsByModelID();
  // };

  const handleModelChangeTemp = (selectedModelId: any) => {
    let currentModel = modelObjects.filter(
      (item: any) => item.id == selectedModelId
    );
    setModel(currentModel[0].modelName);
    if (
      currentModel[0].supportedResolutions == null &&
      currentModel[0].supportedSamplers == null
    ) {
      resolutionList = [];
      instantSamplerList = [];
    } else {
      resolutionList = currentModel[0].supportedResolutions.split(",");
      instantSamplerList = currentModel[0].supportedSamplers.split(",");
    }
  };

  const handleSamplerChange = (event: any) => {
    setSampler(event.target.value);
  };

  const handleResolutionChange = (event: any) => {
    setWidth(event.target.value);
    setHeight(event.target.value);
  };

  const handleStepsChange = (event: any) => {
    setSteps(event.target.value);
  };

  const handleSeedChange = (event: any) => {
    setSeed(event.target.value);
    validateSeed(seed);
  };

  const handleGuidanceScaleChange = (event: any) => {
    setGuidanceScale(event.target.value);
  };

  const [generatedResult, setGeneratedResult] = useState("");
  const handleSubmit = async (event: any) => {
    const encodedUserName = encodeURIComponent(username);
    const encodedPrompt = encodeURIComponent(prompt);
    const encodedNegativePrompt = encodeURIComponent(String(negativePrompt));
    const encodedModel = encodeURIComponent(model);
    const encodedSampler = encodeURIComponent(sampler);
    const encodedWidth = encodeURIComponent(width);
    const encodedHeight = encodeURIComponent(height);
    const encodedSteps = encodeURIComponent(steps);
    const encodedGuidanceScale = encodeURIComponent(guidanceScale);
    const encodedSeed = encodeURIComponent(seed);
    const encodedNumOutputs = encodeURIComponent(numOutputs);

    try {
      const response = await axios.post(
        `http://localhost:8080/generate`,
        {
          username: encodedUserName,
          prompt: encodedPrompt,
          negativePrompt: encodedNegativePrompt,
          model: encodedModel,
          sampler: encodedSampler,
          width: encodedWidth,
          height: encodedHeight,
          steps: encodedSteps,
          guidanceScale: encodedGuidanceScale,
          seed: encodedSeed,
          numOutputs: encodedNumOutputs,
        },
        {
          withCredentials: true,
        }
      );
      const res = response.data;
      if (res) {
        const match = res.message.match(/\{orderId=(.*), base64Image=(.*)\}/);
        orderId = match[1];
        const base64Image = match[2];
        setIsGenerated(true);
        setGeneratedResult("data:image/png;base64," + base64Image);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching generated image:", error);
    }
  };

  const [showSuccessAlter, setShowSuccessAlter] = useState(false);
  const handleAddWishList = async (event: any) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/addWishPrompt`,
        {
          prompt: prompt,
          negativePrompt: negativePrompt,
          width: width,
          height: height,
          steps: steps,
          guidanceScale: guidanceScale,
          seed: seed,
          model: model,
          modelId: modelId,
          sampler: sampler,
        },
        {
          withCredentials: true,
        }
      );
      const res = response.data;
      if (res.message == "success") {
        setShowSuccessAlter(true); // 显示提示组件
        setTimeout(() => {
          setShowSuccessAlter(false); // 5秒后隐藏提示组件
        }, 3000);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching generated image:", error);
    }
  };

  return (
    <>
      <section>
        <div className="py-8 px-6">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div className="px-5 grid grid-cols-2 gap-4 md:grid-cols-1">
              <img
                src={mainImageURL}
                className="aspect-square w-full rounded-xl object-cover"
              />
              {/* <div className="grid grid-cols-2 gap-4 lg:mt-4">
                <img
                  src={coverImageUrl}
                  className="aspect-square w-full rounded-xl object-cover"
                />
              </div> */}
            </div>
            <div className="px-5">
              <Card>
                <CardHeader>
                  <CardTitle>{productName}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-2 grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="prompt">
                        Prompt&nbsp;
                        {promptError && (
                          <span className="text-sm text-red-500">
                            {promptError}
                          </span>
                        )}
                      </Label>
                      <textarea
                        id="prompt"
                        value={prompt}
                        onChange={handlePromptChange}
                        className="textarea textarea-bordered textarea-md leading-normal h-32"
                        placeholder="Input here"
                      ></textarea>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Negative Prompt</Label>
                      <textarea
                        id="prompt"
                        value={negativePrompt || ""}
                        onChange={handleNegativePromptChange}
                        className="textarea textarea-bordered textarea-md h-32"
                        placeholder="Input here"
                      ></textarea>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="model">Model</Label>
                      {/* <select
                          onChange={handleModelChange}
                          className="select select-accent w-full max-w-xs"
                        >
                          {modelNames &&
                            modelNames.map((modelName, index) =>
                              modelName === model ? (
                                <option selected>{modelName}</option>
                              ) : (
                                <option>{modelName}</option>
                              )
                            )}
                        </select> */}

                      <select
                        onChange={(event) =>
                          handleModelChangeTemp(event.target.value)
                        }
                        className="select select-accent w-full max-w-xs"
                      >
                        {modelObjects &&
                          modelObjects.map((currentModel, index) => (
                            <option
                              key={currentModel.id}
                              value={currentModel.id}
                              selected={currentModel.modelName === model}
                            >
                              {currentModel.modelName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="sampler">Sampler</Label>
                      <select
                        onChange={handleSamplerChange}
                        className="select select-accent w-full max-w-xs"
                      >
                        {instantSamplerList &&
                          instantSamplerList.map((samplerName, index) =>
                            samplerName === sampler ? (
                              <option selected>{samplerName}</option>
                            ) : (
                              <option>{samplerName}</option>
                            )
                          )}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="width">Width</Label>
                      <select
                        onChange={handleResolutionChange}
                        className="select select-accent w-full max-w-xs"
                      >
                        {resolutionList &&
                          resolutionList.map((resolutions, index) =>
                            resolutions === width ? (
                              <option selected>{resolutions}</option>
                            ) : (
                              <option>{resolutions}</option>
                            )
                          )}
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="height">Height</Label>
                      <select
                        onChange={handleResolutionChange}
                        className="select select-accent w-full max-w-xs"
                      >
                        {resolutionList &&
                          resolutionList.map((resolutions, index) =>
                            resolutions === height ? (
                              <option selected>{resolutions}</option>
                            ) : (
                              <option>{resolutions}</option>
                            )
                          )}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="guidanceScale">
                        Guidance Scale <span>：{guidanceScale}</span>
                      </Label>
                      <input
                        id="guidanceScale"
                        type="range"
                        min="1"
                        max={maxScale}
                        value={guidanceScale}
                        className="range range-xs"
                        onChange={handleGuidanceScaleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="steps">
                        Steps <span>：{steps}</span>
                      </Label>
                      <input
                        id="steps"
                        type="range"
                        min="1"
                        max={maxSteps}
                        value={steps}
                        className="range range-xs"
                        onChange={handleStepsChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="seed">
                        Seed&nbsp;
                        {seedError && (
                          <span className="text-sm text-red-500">
                            {seedError}
                          </span>
                        )}
                      </Label>
                      <input
                        type="text"
                        id="seed"
                        value={seed}
                        onChange={handleSeedChange}
                        className="input input-bordered w-full max-w-xs"
                      />
                    </div>
                  </div>
                </CardContent>
                <Separator className="my-5" />

                <div className="grid gap-2 my-4">
                  <h1 className="text-4xl">
                    <span className="text-xl">¥</span>&nbsp;2.00
                  </h1>
                </div>
                <CardFooter className="justify-end space-x-2">
                  <div className="fixed bottom-1/2 right-60 drop-shadow-2xl">
                  {showSuccessAlter && (
                    <Alert>
                      <AlertTitle className="text-2xl">
                        <div className="flex items-center">
                          <CheckCircle className="h-6 w-6" />
                          <p className="ml-2 mr-8">添加成功</p>
                        </div>
                      </AlertTitle>
                    </Alert>
                    )}
                  </div>
                  <Button variant="outline" onClick={handleAddWishList}>
                    <Heart size={16} />
                    &nbsp;&nbsp;加入心愿单
                  </Button>

                  <Button
                    onClick={() => {
                      window.my_modal_5.showModal();
                      handleSubmit(event);
                    }}
                  >
                    <Component size={16} />
                    &nbsp;&nbsp;立即制作
                  </Button>
                  <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <form method="dialog" className="modal-box p-12">
                      {isGenerated ? (
                        <Generated
                          generatedResult={generatedResult}
                          setIsGenerated={setIsGenerated}
                          orderId={orderId}
                        />
                      ) : (
                        <Generating setIsGenerated={setIsGenerated} />
                      )}
                    </form>
                  </dialog>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
