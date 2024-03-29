import React from "react";
import { Image } from "lucide-react";

function Filedetail({ details, removefile }) {
  return (
    <>
      <div className=" text-blue-500 flex py-2 gap-4 border min-w-[75%] rounded relative">
        <Image size={70} />
        <div>
          <h1 className="mt-2 text-gray-600">{details.name}</h1>
          <p className=" text-gray-600">
            {details.type}/{(details.size / 1024 / 1024).toFixed(2)}MB
          </p>
        </div>
        <div
          onClick={() => removefile()}
          className="text-blue-500 cursor-pointer  text-xl font-semibold absolute right-4"
        >
          X
        </div>
      </div>
    </>
  );
}

export default Filedetail;
