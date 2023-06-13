import axios from "axios";
import { use, useState } from "react";

export interface Prompt {
  id: number;
  sku: string;
  productName: string;
  description: string;
  mainImageURL: string;
}

export const fetchPrompts = async (): Promise<Prompt[]> => {
  try {

    const response = await axios.get("http://localhost:8080/getPromptList",{
        withCredentials: true,
    });
    const res = response.data;
    let data: any[] = [];
    data = res.message;
    console.log("data", data);


    const prompts: Prompt[] = data.map((item: any) => ({
      id: item.sku,
      sku: item.sku,
      productName: item.productName,
      description: item.description,
      mainImageURL: item.mainImageURL,
    }));

    return prompts;
  } catch (error) {
    console.error("Failed to fetch prompts:", error);
    return [];
  }
};
