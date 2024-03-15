import React, { useState } from "react";
import Alertmesg from "./Alertmesg";
import Filedetail from "./Filedetail";
import Progressbar from "./Progressbar";

function Uploadform({ uploadfile, progress }) {
  const [file, setfiles] = useState();
  const [errormesg, seterror] = useState();

  const handlechange = (e) => {
    const selesctedfiles = e.target.files[0];
    if (selesctedfiles && selesctedfiles.size > 2000000) {
      seterror("Selected file size is greater then 2 MB");
    } else {
      setfiles(selesctedfiles);
      seterror("");
    }
  };

  return (
    <div className="pb-10">
      <div className="text-2xl text-center mt-24">
        <strong className="text-blue-500">Upload</strong> the files and{" "}
        <strong className="text-blue-500">share it</strong> with friends
      </div>

      <div class="flex items-center justify-center md:w-[60%] mx-auto md:mt-8">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-blue-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4 text-blue-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-blue-500 dark:text-gray-400">
              <span class="font-semibold text-blue-500">Click to upload</span>{" "}
              or drag and drop
            </p>
            <p class="text-xs text-blue-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            onChange={handlechange}
            id="dropzone-file"
            type="file"
            class="hidden"
          />
        </label>
      </div>
      {errormesg ? (
        <div className="flex justify-center mt-6">
          {" "}
          <Alertmesg mesg={"Selected file size is greater then 2 MB"} />
        </div>
      ) : null}
      {file ? (
        <div className="flex ml-[20%] mt-6 ">
          <Filedetail details={file} removefile={() => setfiles(null)} />
        </div>
      ) : null}

      {!progress ? (
        <div className="flex justify-center items-start mt-4">
          <button
            onClick={() => uploadfile(file)}
            disabled={!file}
            className="px-6 text-white py-2 bg-blue-500 rounded-lg text-center disabled:bg-gray-400"
          >
            Upload
          </button>
        </div>
      ) : (
        <div className="text-center">
          <Progressbar progress={progress} />
        </div>
      )}
    </div>
  );
}

export default Uploadform;
