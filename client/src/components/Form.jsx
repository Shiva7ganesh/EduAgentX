import React from "react";
import { useState, useEffect, useRef } from "react";

const Form = () => {
  const [file, setFile] = useState();
  const [uploadUrl, setUploadUrl] = useState();
  const [processId, setProcessId] = useState(null);
  const [processStatus, setProcessStatus] = useState(null);
  const pollingRef = useRef(null);
  const [manualId, setManualId] = useState("");
  const [manualState, setManualState] = useState("");

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

  const startPolling = (id) => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/process-status/${id}`);
        const json = await res.json();
        if (json.status === "success") {
          setProcessStatus(json.data);
          // Stop polling when state indicates completion
          const terminalStates = ["Succeeded", "Failed", "Stopped", "Faulted", "Canceled", "Completed"];
          if (json.data?.state && terminalStates.includes(json.data.state)) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }
        }
      } catch (e) {
        console.error("Polling error", e);
      }
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

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
    const json = await response.json();
    if (json?.data?.id) {
      setProcessId(json.data.id);
      startPolling(json.data.id);
    }
  };

  const handleManualStatusPost = async (e) => {
    e.preventDefault();
    if (!manualId || !manualState) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/process-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Number(manualId), state: manualState })
      });
      const json = await res.json();
      if (json.status === "success") {
        setProcessId(json.data.id || Number(manualId));
        setProcessStatus(json.data);
      }
    } catch (err) {
      console.error("Manual status post failed", err);
    }
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

      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 600 }}>Manual status update (testing)</div>
        <form onSubmit={handleManualStatusPost} style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
          <input
            type="number"
            placeholder="id"
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            style={{ width: 120 }}
          />
          <input
            type="text"
            placeholder="state"
            value={manualState}
            onChange={(e) => setManualState(e.target.value)}
            style={{ width: 220 }}
          />
          <button type="submit">Send</button>
        </form>
      </div>

      {processId && (
        <div style={{ marginTop: 12 }}>
          <div>Process ID: {processId}</div>
          <div>State: {processStatus?.state ?? "Pending"}</div>
          {processStatus?.updatedAt && <div>Last update: {new Date(processStatus.updatedAt).toLocaleTimeString()}</div>}
        </div>
      )}
    </div>
  );
};

export default Form;