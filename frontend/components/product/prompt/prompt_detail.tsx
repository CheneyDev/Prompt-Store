import React, { ChangeEventHandler, use, useEffect, useState } from "react";
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
import { Slider } from "@/components/ui/slider";
import { Component, Heart, Scale } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const encodedSku = encodeURIComponent("#0001");
let modelNames: any[] = [];
let samplerList: any[] = [];

export default function PromptDetail() {
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
    fetchSamplerList();
  }, []);

  const checkLogin = async () => {
    const response = await axios.post(
      "http://localhost:8080/api/auth/isLogin",
      {},
      {
        withCredentials: true,
      }
    );
    if (response.data.success) {
      console.log(response.data.message);
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

  const fetchSamplerList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getSamplerLeftBySku?sku=${encodedSku}`,
        {
          withCredentials: true,
        }
      );
      const res = response.data;
      if (res) {
        samplerList = res.message;
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
        `http://localhost:8080/getProductModelNamesBySku?sku=${encodedSku}`,
        {
          withCredentials: true,
        }
      );
      const productModel = response.data;
      if (productModel) {
        modelNames = productModel.message;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching product models:", error);
    }
  };

  const fetchSupportedResolutionsLeftByModelID= async () => {
    const encodedModelID = encodeURIComponent(modelId);
    const encodedDefaultResolution = encodeURIComponent(width);
    console.log(encodedModelID, encodedDefaultResolution);
    try {
      const response = await axios.get(
        `http://localhost:8080/getSupportedResolutionsLeftByModelID?modelID=${encodedModelID}&defaultResolution=${encodedDefaultResolution}`,
        {
          withCredentials: true,
        }

      );
      const res = response.data;
      if (res) {
        console.log(res.message);
        // setWidth(res.message.width);
        // setHeight(res.message.height);
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
    validateSteps(steps);
    validateScale(guidanceScale);
    validateSeed(seed);
    fetchSupportedResolutionsLeftByModelID();
  }, [prompt, steps, guidanceScale, seed]);

  const validatePrompt = (prompt: string) => {
    if (prompt == "") {
      setPromptError("不能为空");
    } else {
      setPromptError("");
    }
  };

  const validateSteps = (steps: number) => {
    if (isNaN(steps) || String(steps) == "") {
      setStepsError("不能为空");
    } else {
      setStepsError("");
    }
  };

  const validateScale = (guidanceScale: number) => {
    if (isNaN(guidanceScale) || String(guidanceScale) == "") {
      setScaleError("不能为空");
    } else {
      setScaleError("");
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
    if (value !== "default") {
      setModel(event.target.value);
    }
  };

  const handleSamplerChange = (event: any) => {
    if (event.target.value !== "default") {
      setSampler(event.target.value);
    }
  };

  const handleWidthChange = (event: any) => {
    if (event.target.value !== "default") {
      setWidth(event.target.value);
    }
  };

  const handleHeightChange = (event: any) => {
    if (event.target.value !== "default") {
      setHeight(event.target.value);
    }
  };

  const handleStepsChange = (event: any) => {
    setSteps(event.target.value);
    validateSteps(steps);
  };

  const handleScaleChange = (event: any) => {
    setGuidanceScale(event.target.value);
    validateScale(guidanceScale);
  };

  const handleSeedChange = (event: any) => {
    setSeed(event.target.value);
    validateSeed(seed);
  };

  const handleSliderChange = (event: any) => {
    setSteps(event.target.value);
  };

  const handleGuidanceScaleChange = (event: any) => {
    setGuidanceScale(event.target.value);
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
                        <Label htmlFor="description">
                          Prompt&nbsp;
                          {promptError && (
                            <span className="text-sm text-red-500">
                              {promptError}
                            </span>
                          )}
                        </Label>
                        <Textarea
                          id="description"
                          className="h-36"
                          value={prompt}
                          onChange={handlePromptChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Negative Prompt</Label>
                        <Textarea
                          id="description"
                          className="h-36"
                          value={negativePrompt || ""}
                          onChange={handleNegativePromptChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="model">Model</Label>
                        <select
                          onChange={handleModelChange}
                          className="select select-accent w-full max-w-xs"
                        >
                          <option selected>{model}</option>
                          {modelNames &&
                            modelNames.map((modelName, index) => (
                              <option>{modelName}</option>
                            ))}
                        </select>

                        {/* <Select
                          defaultValue="default"
                          onValueChange={handleModelChange}
                        >
                          <SelectTrigger id="model">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">{model}</SelectItem>
                            {modelNames &&
                              modelNames.map((modelName, index) => (
                                <SelectItem value={modelName}>
                                  {modelName}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select> */}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="sampler">Sampler</Label>
                        <select
                          onChange={handleSamplerChange}
                          className="select select-accent w-full max-w-xs"
                        >
                          <option selected>{sampler}</option>
                          {samplerList &&
                            samplerList.map((samplerName, index) => (
                              <option>{samplerName}</option>
                            ))}
                        </select>
                        {/* <Select
                          defaultValue="default"
                          onValueChange={handleSamplerChange}
                        >
                          <SelectTrigger id="sampler">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">{sampler}</SelectItem>
                            {samplerList &&
                              samplerList.map((samplerName, index) => (
                                <SelectItem value={samplerName}>
                                  {samplerName}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select> */}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="width">Width</Label>
                        <Select
                          defaultValue="default"
                          onValueChange={handleWidthChange}
                        >
                          <SelectTrigger id="width">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">{width}</SelectItem>
                            <SelectItem value="768">768</SelectItem>

                            {/* {modelNames &&
                              modelNames.map((modelName, index) => (
                                <SelectItem value={modelName}>
                                  {modelName}
                                </SelectItem>
                              ))} */}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="height">Height</Label>
                        <Select
                          defaultValue="default"
                          onValueChange={handleHeightChange}
                        >
                          <SelectTrigger id="height">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">{height}</SelectItem>
                            <SelectItem value="768">768</SelectItem>

                            {/* {samplerList &&
                              samplerList.map((samplerName, index) => (
                                <SelectItem value={samplerName}>
                                  {samplerName}
                                </SelectItem>
                              ))} */}
                          </SelectContent>
                        </Select>
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
                    <div className="grid grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="steps">
                          Steps&nbsp;
                          {stepsError && (
                            <span className="text-sm text-red-500">
                              {stepsError}
                            </span>
                          )}
                        </Label>
                        <Input
                          id="steps"
                          value={steps}
                          onChange={handleStepsChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="scale">
                          Scale&nbsp;
                          {scaleError && (
                            <span className="text-sm text-red-500">
                              {scaleError}
                            </span>
                          )}
                        </Label>
                        <Input
                          id="scale"
                          value={guidanceScale}
                          onChange={handleScaleChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="seed">
                          Seed&nbsp;
                          {seedError && (
                            <span className="text-sm text-red-500">
                              {seedError}
                            </span>
                          )}
                        </Label>
                        <Input
                          id="seed"
                          value={seed}
                          onChange={handleSeedChange}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <Separator className="my-5" />

                  <div className="grid gap-2 my-4">
                    <h1 className="text-4xl">
                      <span className="text-xl">¥</span>&nbsp;{guidanceScale}
                    </h1>
                  </div>
                  <CardFooter className="justify-end space-x-2">
                    <Button variant="outline">
                      <Heart size={16} />
                      &nbsp;&nbsp;加入心愿单
                    </Button>
                    <Button>
                      <Component size={16} />
                      &nbsp;&nbsp;立即制作
                    </Button>
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
