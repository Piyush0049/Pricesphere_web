import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <ColorRing
      visible={true}
      height="30"
      width="30"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="absolute right-[55px]"
      colors={["#d85f00", "#d85f00", "#d85f00", "#d85f00", "#d85f00"]}
    />
  );
};

export default Loader;
