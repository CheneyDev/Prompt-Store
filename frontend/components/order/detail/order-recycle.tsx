import axios from "axios";
import { Recycle, Trees } from "lucide-react";

export default function OrderRecycle({orderId}:{orderId:any}) {

  const handleSharePrompt = async () => {
    console.log("deferferfergfergfergfer");
    try {
      const response = await axios.post(
        `http://localhost:8080/sharePrompt?orderID=${orderId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        window.location.replace("/gallery");
      }else{
        console.log("ddd");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
          环境贡献
        </h3>
        <div className="flex justify-between items-start w-full">
          <div className="flex justify-center items-center space-x-4">
            <div>
              <Recycle size={80} />
            </div>
            <div className="flex flex-col justify-start items-center">
              <p className="text-lg leading-7 dark:text-white font-semibold text-gray-800">
                你，也能出一份力。
                <br />
                <span className="font-normal">人工智能模型在调用 GPU 进行运算时会消耗许多能源⚡️，如果你把生成结果分享到画廊，将会帮助别人更快找到心仪的 Prompt 从而减少运算次数。</span>
              </p>
            </div>
          </div>
          
        </div>
        <div className="w-full flex justify-center items-center">
          <button
          onClick={handleSharePrompt}
          className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
            分享成果
          </button>
        </div>
      </div>
    </>
  );
}
