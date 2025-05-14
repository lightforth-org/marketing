import React from "react";
import { TbLoader2 } from "react-icons/tb";

const PageLoader = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <TbLoader2 className="animate-spin text-blue-400 text-3xl" />
    </div>
  );
};

export default PageLoader;
