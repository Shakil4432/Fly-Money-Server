import React from "react";
import { Button } from "./ui/button";

const DeliveryBanner = () => {
  return (
    <div
      className="container relative mx-auto rounded-sm my-10 h-[80vh]"
      style={{
        backgroundImage: "url('/delivery.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center absolute top-[85%] justify-end  w-full">
        <Button className="bg-white text-[#7c3f00] hover:bg-white  text-3xl font-bold mr-52">
          Order Now
        </Button>
      </div>
    </div>
  );
};

export default DeliveryBanner;
