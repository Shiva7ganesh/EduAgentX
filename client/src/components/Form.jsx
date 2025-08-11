import React from "react";
import { useState } from "react";

const Form = () => {
  const [file, setFile] = useState();
  const [uploadUrl, setUploadUrl] = useState();
  const getUploadURL = async (fileName, fileType) => {
    if (!fileName || !fileType) {
      console.error("fileName or fileType is undefined");
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/get-put-object-signed-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName,
          fileType,
        }),
      }
    );
    const result = await response.json();
    if (result.status === "success") {
      setUploadUrl(result.uploadUrl);
    }
  };
  const handleOnFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File name:", file.name);
      await getUploadURL(file.name, file.type);
      console.log("File type:", file.type);
      console.log("Last modified:", file.lastModified);
      if (
        file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        console.log("not a valid file");
        return;
      }
      setFile(file);
      await getUploadURL(file.name, file.type);
    }
  };
  const handleGETFileURL = async () => {
    const objectURLResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/get-object-url/${file.name}`
    );
    const result = await objectURLResponse.json();
    if (result.status === "success") {
      return result.objectUrl;
    }
    return "";
  };
  const handleFileupload = async (e) => {
    e.preventDefault();
    if (!file || !uploadUrl) return;
    console.log(file, uploadUrl);
    await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });
    const downloadlink = await handleGETFileURL();
    if (downloadlink === "") {
      console.log("someting went wrong at s3");
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/initiate-task`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          downloadlink
        }),
      }
    );
    console.log(response);
  };

  return (
    <div>
      <form onSubmit={handleFileupload}>
        <div>
          <label htmlFor="upload_file">File</label>
          <input
            type="file"
            id="upload_file"
            onChange={handleOnFileChange}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
        </div>

        <button type="submit">upload</button>
      </form>
    </div>
  );
};

export default Form;
