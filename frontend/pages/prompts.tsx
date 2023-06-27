import { AlbumArtwork } from "@/components/home/album-artwork";
import Navbar from "@/components/navbar/navbar";
import { Separator } from "@/components/ui/separator";
import { Prompt, fetchPrompts } from "@/data/prompts";
import { useEffect, useState } from "react";

export default function Prompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPrompts = await fetchPrompts();
      setPrompts(fetchedPrompts);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl  pt-12 pb-16 lg:max-w-7xl lg:px-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                商品列表
              </h2>
              <p className="text-sm text-muted-foreground">
                所有的 prompts 都显示在这里！
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
            {prompts.map((prompt) => (
              <AlbumArtwork
                key={prompt.id}
                album={prompt}
                className="w-[200px]"
                aspectRatio="portrait"
                width={250}
                height={300}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
