"use client";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { app } from "../../../firebaseConfig";
import { useRouter } from "next/navigation";

function Files() {
  const [Allfiles, setAllfiles] = useState([]);
  const db = getFirestore(app);

  const router = useRouter();

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "uploadedFile"));
      const filesData = [];
      querySnapshot.forEach((doc) => {
        filesData.push(doc.data());
      });
      setAllfiles(filesData);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  const movetofile = (id) => {
    router.push("/File-preview/" + id);
  };

  return (
    <>
      <div className="mt-28 ml-8">
        <h1 className="text-black text-lg">My Files</h1>
        <div className="border w-[78%] h-9 rounded mt-2">
          <p className="ml-2 mt-1">Total Files: {Allfiles.length}</p>
        </div>
        <div className="flex gap-56 mt-6 ml-2">
          <p>File Name</p>
          <p>Type</p>
          <p>Size</p>
        </div>
        <div className="mr-2 mt-2 ">
          {Allfiles?.map((file, index) => (
            <div
              key={index}
              className="flex gap-64 border-t border-b py-1.5 bg-gray-50 "
            >
              <span className="max-w-4 ml-2">{file?.fileName}</span>
              <span className="max-w-4">{file?.fileType}</span>
              <span className="max-w-4">{file?.fileSize}</span>
              <button
                onClick={() => movetofile(file.id)}
                className="max-w-4 text-blue-700 cursor-pointer"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Files;
