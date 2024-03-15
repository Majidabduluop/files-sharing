import React from "react";

function Progressbar({ progress }) {
  return (
    <>
      <div className="w-[50%] mx-auto bg-gray-500  rounded full mt-6">
        <div
          className="bg-blue-600 text-white text-xs rounded"
          style={{ width: `${progress}%` }}
        >{`${Number(progress).toFixed(0)}%`}</div>
      </div>
    </>
  );
}

export default Progressbar;
