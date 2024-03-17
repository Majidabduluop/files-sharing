"use client";
import React, { useEffect, useState } from "react";
import FileItem from "./_components/FileItem";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig";

function Fileview({ params }) {
  const db = getFirestore(app);
  const [File, setFile] = useState();

  useEffect(() => {
    fetecheddata();
  }, []);

  const fetecheddata = async () => {
    const docRef = doc(db, "/uploadedFile", params.fileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFile(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  return (
    <div>
      <FileItem file={File} />
    </div>
  );
}

export default Fileview;
