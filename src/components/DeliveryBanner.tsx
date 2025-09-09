import React from "react";
import { Button } from "./ui/button";

const DeliveryBanner = () => {
  return (
    <div className="px-2 lg:px-0">
      <div
        className="container relative mx-auto rounded-sm my-10 h-[25vh] lg:h-[80vh]"
        style={{
          backgroundImage: "url('/delivery.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center absolute top-[75%]  lg:top-[85%] justify-end  w-full">
          <Button className="bg-white text-[#7c3f00] hover:bg-white  lg:text-3xl font-bold mr-7 lg:mr-52">
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBanner;
