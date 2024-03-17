"use client";
import React from "react";
import Constant from "../_utils/Constant";
import { useRouter } from "next/navigation";
import Footer from "./Footer";
function Hero() {
  const router = useRouter();
  const movehandle = () => {
    router.push("/upload/");
  };
  return (
    <>
      <div className="section  flex flex-col mt-[14%] w-[100%] text-center">
        <div className="font-bold text-5xl">
          {" "}
          <p className="text-blue-600">
            {" "}
            Upload, Save <span className="text-black">and easily</span>
            <br />
            <span className="text-black">
              <span className="text-blue-600">Share</span> Your files in one{" "}
              <br />
              <div className="">
                <p>place</p>
              </div>
            </span>
          </p>
        </div>
        <div className="text-center mt-6  text-xl w-[45%] mx-auto">
          {Constant.desc}
          <div className="flex flex-row justify-center mt-4 gap-4">
            <button
              onClick={movehandle}
              className="px-7 py-1 rounded text-white bg-blue-600 hover:bg-teal-700"
            >
              Get Started
            </button>
            <button className="text-blue-600 rounded px-7 py-1 shadow">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div className="mt-32">
        <Footer />
      </div>
    </>
  );
}

export default Hero;
