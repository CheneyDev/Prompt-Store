import React, { ChangeEventHandler, useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Component, Heart, Scale } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SwapComponent from "./ui/SwapEmoji";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SwapEmoji from "./ui/SwapEmoji";
import Generating from "./ui/generating-dialog";

const encodedSku = encodeURIComponent("#0001");
let modelNames: any[] = [];
let modelIds: any[] = [];
let resolutionList: any[] = [];

export default function PromptDetail() {
  const [samplerList, setSamplerList] = useState([]);

  const [isGenerated, setIsGenerated] = useState(false);




  const [id, setId] = useState("");
  const [sku, setSku] = useState("");
  const [productName, setProductName] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
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

  useEffect(() => {
    checkLogin();
    fetchProductPrompt();
    fetchProductModel();
    fetchSupportedResolutionsByModelID();
    fetchSamplerList(modelId);
  }, [modelId]);

  const checkLogin = async () => {
    const response = await axios.post(
      "http://localhost:8080/api/auth/isLogin",
      {},
      {
        withCredentials: true,
      }
    );
    if (response.data.success) {
    } else {
      return null;
    }
  };

  const fetchProductPrompt = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getProductPrompt?sku=${encodedSku}`,
        {
          withCredentials: true,
        }
      );
      const productPrompt = response.data;
      if (productPrompt) {
        setId(productPrompt.message.id);
        setSku(productPrompt.message.sku);
        setCoverImageUrl(productPrompt.message.coverImageUrl);
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
    console.log("modelID:", modelId);
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

  const handleModelChange = (event: any) => {
    const value = event.target.value;
    setModel(event.target.value);
    fetchSupportedResolutionsByModelID();
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

  const handleSubmit = async (event: any) => {
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
        setIsGenerated(true);
        // setGeneratedImage(res.message);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching generated image:", error);
    }
  };

  const handleCloseDialog = () => {
    setTimeout(() => {
      setIsGenerated(false);
    }, 1000);
    
  };

  return (
    <>
      <section>
        <div className="relative mx-auto max-w-screen-xl px-4 py-8">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              <img
                src={coverImageUrl}
                className="aspect-square w-full rounded-xl object-cover"
              />
              {/* <div className="grid grid-cols-2 gap-4 lg:mt-4">
                <img
                  src={coverImageUrl}
                  className="aspect-square w-full rounded-xl object-cover"
                />
              </div> */}
            </div>
            <div>
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
                          className="textarea textarea-bordered textarea-md leading-normal h-36"
                          placeholder="Input here"
                        ></textarea>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Negative Prompt</Label>
                        <textarea
                          id="prompt"
                          value={negativePrompt || ""}
                          onChange={handleNegativePromptChange}
                          className="textarea textarea-bordered textarea-md h-36"
                          placeholder="Input here"
                        ></textarea>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="model">Model</Label>
                        <select
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
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="sampler">Sampler</Label>
                        <select
                          onChange={handleSamplerChange}
                          className="select select-accent w-full max-w-xs"
                        >
                          {samplerList &&
                            samplerList.map((samplerName, index) =>
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
                      <span className="text-xl">¥</span>&nbsp;99999.89
                    </h1>
                  </div>
                  <CardFooter className="justify-end space-x-2">
                    <Button variant="outline">
                      <Heart size={16} />
                      &nbsp;&nbsp;加入心愿单
                    </Button>

                    <Button onClick={() => {window.my_modal_5.showModal();handleSubmit(event);}}>
                      <Component size={16} />
                      &nbsp;&nbsp;立即制作
                    </Button>
                    <dialog
                      id="my_modal_5"
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <form method="dialog" className="modal-box p-12">
                        {isGenerated ? <p>ssss</p> : <Generating />}
                        <div className="modal-action">
                          <button className="btn" onClick={handleCloseDialog}>关闭</button>
                        </div>
                      </form>
                    </dialog>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
