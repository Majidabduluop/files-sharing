"use client";
import React, { useState, useEffect } from "react";

import Uploadform from "./_components/Uploadform";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../../firebaseConfig";
import { useUser } from "@clerk/nextjs";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { generateRandomString } from "../../../_utils/GenerateRandomString";
import { useRouter } from "next/navigation";

function Upload() {
  const { user } = useUser();
  const storage = getStorage(app);
  const db = getFirestore(app);
  const router = useRouter();

  const [progresses, setprogresss] = useState();
  const [fileid, setfileid] = useState();

  const Uploaddata = (file) => {
    const metadata = {
      contentType: "file.type",
    };
    const storageRef = ref(storage, "uploadfiles/" + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, file.type);

    uploadTask.on("state_changed", (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      setprogresss(progress);
      progress == 100 &&
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          saveInfo(file, downloadURL);
        });
    });
  };

  const saveInfo = async (file, downloadURL) => {
    const docId = generateRandomString().toString();
    await setDoc(doc(db, "uploadedFile", docId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: downloadURL,
      userEmai: user?.primaryEmailAddress.emailAddress,
      userName: user?.fullName,
      id: docId,
      password: "",
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + docId,
    });
    setfileid(docId);
  };

  useEffect(() => {
    if (progresses === 100 && fileid) {
      router.push("/File-preview/" + fileid);
    }
  }, [progresses, fileid]);
  return (
    <>
      <Uploadform
        uploadfile={(file) => Uploaddata(file)}
        progress={progresses}
      />
    </>
  );
}

export default Upload;
