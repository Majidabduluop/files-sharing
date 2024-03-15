"use client";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app } from "../../../../firebaseConfig";
import "flowbite/dist/flowbite.css"; // Import Flowbite CSS
import ClipboardJS from "clipboard"; // Import ClipboardJS library
import { EyeOff, Eye } from "lucide-react";

function Filepreview({ params }) {
  const db = getFirestore(app);
  const [Filedetail, setdata] = useState();
  const [pass, setpass] = useState();
  const [show, setshow] = useState(false);

  useEffect(() => {
    details();
  }, []);

  const details = async () => {
    const docRef = doc(db, "uploadedFile", params.fileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setdata(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const updatepassword = async () => {
    await setDoc(doc(db, "uploadedFile", params.fileId), {
      fileName: Filedetail.fileName,
      fileSize: Filedetail.fileSize,
      fileType: Filedetail.fileType,
      fileUrl: Filedetail.fileUrl,
      id: Filedetail.id,
      password: pass,
      shortUrl: Filedetail.shortUrl,
      userEmai: Filedetail.userEmai,
      userName: Filedetail.userName,
    });
  };

  useEffect(() => {
    // Initialize clipboard
    const clipboard = new ClipboardJS(".btn");

    // Handle success event
    clipboard.on("success", function (e) {
      const $defaultMessage = document.getElementById("default-message");
      const $successMessage = document.getElementById("success-message");

      $defaultMessage.classList.add("hidden");
      $successMessage.classList.remove("hidden");

      // Reset to default state after 2 seconds
      setTimeout(() => {
        $defaultMessage.classList.remove("hidden");
        $successMessage.classList.add("hidden");
      }, 2000);

      // Destroy clipboard instance after success
      clipboard.destroy();
    });

    // Handle error event
    clipboard.on("error", function (e) {
      console.error("Action:", e.action);
      console.error("Trigger:", e.trigger);
    });
  }, []);

  const handlechange = (e) => {
    setpass(e.target.value);
  };

  return (
    <>
      <div className="relative">
        <div className="md:absolute md:left-[10%] md:top-44 w-[30%] h-72 border justify-center flex items-center">
          <div className="md:w-[70%]">
            {Filedetail && Filedetail.fileUrl && (
              <img
                src={Filedetail.fileUrl}
                className="w-full rounded-lg object-cover"
              />
            )}
            <h1 className="flex justify-center items-center mt-4">
              {Filedetail && Filedetail.fileName}
            </h1>
          </div>
        </div>

        <div className="md:absolute md:right-[6%] md:top-40">
          <label className="ml-1 text-gray-600 ">ShortUrl</label>
          <div class="grid grid-cols-8 gap-2 w-full max-w-[23rem] mt-2">
            <label for="npm-install" class="sr-only">
              Label
            </label>
            <input
              id="npm-install"
              type="text"
              class="col-span-6 bg-white border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={Filedetail && Filedetail.shortUrl}
              readonly
            />
            <button
              data-clipboard-target="#npm-install"
              class="btn w-full col-span-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center inline-flex justify-center"
            >
              <span id="default-message">Copy</span>
              <span
                id="success-message"
                class="hidden inline-flex items-center"
              >
                <svg
                  class="w-3 h-3 text-white me-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                Copied!
              </span>
            </button>
          </div>
          <div className="mt-6 flex relative">
            <input
              onChange={(e) => handlechange(e)}
              type={show ? "text" : "password"}
              className="w-[54%] h-10 rounded-lg mr-2 border border-red-50"
            />
            {show ? (
              <Eye
                onClick={() => setshow(!show)}
                className="absolute top-2 right-[48%] w-4 text-gray-600"
              />
            ) : (
              <EyeOff
                onClick={() => setshow(!show)}
                className="absolute top-2 right-[48%] w-4 text-gray-600"
              />
            )}

            <button
              onClick={updatepassword}
              className="bg-blue-700 text-white rounded-lg text-sm  w-[17%] "
            >
              Password
            </button>
          </div>
          <div className="border w-[54%] h-36 mt-2 pt-2 rounded-lg">
            <label className="ml-2 mt-2 text-gray-600 ">
              Send File to Email
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              className="ml-2 mt-2 w-[90%] h-8 rounded-lg"
            />
            <button className="bg-blue-600 px-6 py-1 ml-2 rounded-lg mt-3 w-[90%] dark:placeholder-gray-400 text-white ">
              Send Email
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filepreview;
