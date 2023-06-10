import React, { useState, useEffect } from "react";

const SwapEmoji = () => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChecked((prev) => !prev);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
    <label className="swap swap-flip text-9xl">
      <input type="checkbox" checked={isChecked} readOnly /> 
      <span className="swap-on text-8xl">😇</span>
      <span className="swap-off text-8xl">😈</span>

    </label>
    </>
  );
};

export default SwapEmoji;
