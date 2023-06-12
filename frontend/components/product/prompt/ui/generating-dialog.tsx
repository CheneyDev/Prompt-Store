import SwapEmoji from "./swap-emoji";

export default function Generating({
  setIsGenerated,
}: {
  setIsGenerated: any;
}) {
  const handleCloseDialog = () => {
    setTimeout(() => {
      setIsGenerated(false);
    }, 1000);
  };

  return (
    <>
      <h3 className="font-bold text-4xl text-center my-2">剩下的交给我们！</h3>
      <p className="py-4 text-2xl text-center my-4">正在生成...</p>
      <p className="text-center my-2">
        <SwapEmoji />
      </p>
      <p className="text-center my-10">
        <progress className="progress w-56"></progress>
      </p>
      <div className="modal-action">
        <button className="btn" onClick={handleCloseDialog}>
          关闭
        </button>
      </div>
    </>
  );
}
