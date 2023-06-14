import { Download, FileText, X } from "lucide-react";

export default function Generated({
  generatedResult,
  setIsGenerated,
  orderId,
}: {
  generatedResult: any;
  setIsGenerated: any;
  orderId: any;
}) {
  const handleCloseDialog = () => {
    setTimeout(() => {
      setIsGenerated(false);
    }, 1000);
  };

  const handleDownload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const link = document.createElement("a");
    link.href = generatedResult;
    link.download = "generated_image.jpg";
    link.click();
  };

  const handleOrder = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(orderId);
    event.preventDefault();
    window.open(`http://localhost:3000/order/detail?orderId=${orderId}`);
  };

  return (
    <>
      <button
        htmlFor="my_modal_5"
        onClick={handleCloseDialog}
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 m-1"
      >
        <X size={25} />
      </button>
      <div className="flex justify-center my-6">
        <figure>
          <img
            id="generated-image"
            src={generatedResult}
            alt="Generated Image"
            className="rounded-xl w-full"
          />
        </figure>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button className="btn btn-md text-lg" onClick={handleDownload}>
          <Download size={20} />
          下载图片
        </button>
        <button onClick={handleOrder} className="btn btn-md text-lg">
          <FileText size={20} />
          查看订单
        </button>
      </div>
    </>
  );
}
