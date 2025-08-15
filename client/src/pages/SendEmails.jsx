import React, { useState } from "react";
import RobotAssistant from "../components/RobotAssistant";
import FileUpload from "../components/FileUpload";
import ProcessButton from "../components/ProcessButton";
import ProgressBar from "../components/ProgressBar";
import ResultsTable from "../components/ResultsTable";

function Homepage() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [processId, setProcessId] = useState("33dsfds");
  const [processStatus, setProcessStatus] = useState(null);
  const [downloadlink, setDownloadlink] = useState("");

  const handleGETFileURL = async (fileName) => {
    const objectURLResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/get-object-url/${fileName}`
    );
    const result = await objectURLResponse.json();
    if (result.status === "success") {
      return result.objectUrl;
    }
    return "";
  };

  const startProcess = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/initiate-task`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          downloadlink,
        }),
      }
    );
    const json = await response.json();
    if (json?.data?.key) {
      setProcessId(json.data.key);
    }
    return json?.data?.key || "";
  };

  const handleFileupload = async (file, uploadUrl) => {
    await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });
    const downloadLink = await handleGETFileURL(file.name);
    console.log(downloadLink);
    setDownloadlink(downloadLink);
    if (downloadLink === "") {
      console.log("someting went wrong at s3");
      return;
    }
  };

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
    return result.uploadUrl;
  };

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    setShowResults(false);
    setProgress(0);
    const uploadURL = await getUploadURL(selectedFile.name, selectedFile.type);
    await handleFileupload(selectedFile, uploadURL);
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    const processId = await startProcess();
    let limit = 3;
    const interval = setInterval(async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/process-status/${processId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result?.status === "error") {
        limit--;
        if (limit === 0) {
          clearInterval(interval)
          alert('process is not started yet')
        }
      } else {
        setProgress(result?.data?.progress);
        setProcessStatus(result);
        if (result?.data?.progress === 100) {
          clearInterval(interval);
          setIsProcessing(false);
          // setShowResults(true);
        }
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circuit patterns */}
        <div className="absolute top-20 left-10 w-32 h-32 opacity-10">
          <div className="absolute inset-0 border border-[#007ACC] rounded-lg transform rotate-45"></div>
          <div className="absolute top-4 left-4 w-6 h-6 border border-[#007ACC] rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 bg-[#007ACC] rounded-full animate-pulse"></div>
        </div>

        <div className="absolute top-40 right-20 w-24 h-24 opacity-10">
          <div className="absolute inset-0 border-2 border-[#007ACC] rounded-full"></div>
          <div className="absolute top-2 left-2 w-4 h-4 bg-[#007ACC] rounded-full animate-ping"></div>
        </div>

        <div className="absolute bottom-32 left-1/4 w-16 h-16 opacity-10">
          <div className="absolute inset-0 border border-[#007ACC]"></div>
          <div className="absolute top-2 left-2 w-2 h-2 bg-[#007ACC] animate-pulse"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-[#007ACC] animate-pulse delay-500"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-[#007ACC]/20 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-blue-400/20 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-[#007ACC]/30 rounded-full animate-float-slow"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-[#007ACC] to-blue-600 bg-clip-text text-transparent">
              EduAgentX
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto"></p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
          {/* Robot Assistant */}
          <div className="lg:col-span-1 flex justify-center">
            <RobotAssistant isProcessing={isProcessing} hasFile={!!file} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upload Form */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-2xl">
              <FileUpload
                onFileSelect={handleFileSelect}
                hasFile={!!file}
                fileName={file?.name || ""}
              />

              <div className="mt-8 flex justify-center">
                <ProcessButton
                  onClick={handleProcess}
                  disabled={!file}
                  isProcessing={isProcessing}
                />
              </div>
            </div>

            {/* Progress Bar */}
            <ProgressBar
              progress={progress}
              isVisible={isProcessing || progress > 0}
              info={processStatus?.data?.state || "Task in the queue"}
            />

            {/* Results Table */}
            <ResultsTable isVisible={showResults} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3"></div>
            <span className="text-sm text-gray-600">
              Powered by UiPath Intelligent Automation Platform
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Homepage;
