import React from "react";
import { AlertCircle } from "lucide-react";

function Alertmesg({ mesg }) {
  return (
    <>
      <div className="bg-red-500 text-white pl-2 py-2 gap-4 flex w-[50%]  rounded-lg">
        <AlertCircle />
        {mesg}
      </div>
    </>
  );
}

export default Alertmesg;
