import React, { useState } from "react";
import { File } from "lucide-react";

function FileItem({ file }) {
  const [password, setpass] = useState();

  const handlechange = (e) => {
    setpass(e.target.value);
  };

  const handledownload = () => {
    const downloadUrl = file?.fileUrl;
    window.open(downloadUrl, "_blank");
  };
  return (
    <>
      <div className="flex items-center justify-center mt-24 ">
        <div className="bg-[#f4f4f9] w-[30%] h-[68vh] text-center rounded-lg">
          <div className="mt-8 text-lg">
            <strong className="text-blue-600">{file?.userName}</strong>{" "}
            <span>share file with you</span>
          </div>
          <p className="text-sm mt-8">Find file details below</p>

          <div className="flex items-center justify-center mt-8">
            <File style={{ width: "50px", height: "50px" }} />
          </div>
          <div className="mt-16 text-sm">
            <span className="">{file?.fileName}</span>
            <span className="ml-4">{file?.fileType}</span>{" "}
            <span className="ml-4">{file?.fileSize}bytes</span>
          </div>
          {file && file.password.length > 3 ? (
            <input
              onChange={(e) => handlechange(e)}
              type="password"
              className="mt-6 rounded px-2 border"
            />
          ) : null}
          <br />
          <button
            onClick={handledownload}
            disabled={password != file?.password}
            className="text-white bg-blue-600 px-20 mt-6 rounded-lg disabled:bg-gray-400"
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
}

export default FileItem;
