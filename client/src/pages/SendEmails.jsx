import React, { useState } from "react";
import { GraduationCap, Upload, FileText, CheckCircle } from "lucide-react";
import RobotAssistant from "../components/RobotAssistant";
import FileUpload from "../components/FileUpload";
import ProcessButton from "../components/ProcessButton";
import ProgressBar from "../components/ProgressBar";
import ResultsTable from "../components/ResultsTable";

function Homepage() {

  const [collegeLogoFile, setCollegeLogoFile] = useState(null);
  const [studentExcelFile, setStudentExcelFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processId, setProcessId] = useState("33dsfds");
  const [processStatus, setProcessStatus] = useState(null);
  const [collegeLogoDownloadLink, setCollegeLogoDownloadLink] = useState("");
  const [studentExcelDownloadLink, setStudentExcelDownloadLink] = useState("");
  const [collegeName, setCollegeName] = useState("");

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
          collegeLogoDownloadLink,
          studentExcelDownloadLink,
          collegeName,
        }),
      }
    );
    const json = await response.json();
    if (json?.data?.key) {
      setProcessId(json.data.key);
    }
    return json?.data?.key || "";
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


  const handleCollegeLogoSelect = async (selectedFile) => {
    setCollegeLogoFile(selectedFile);
    const uploadURL = await getUploadURL(selectedFile.name, selectedFile.type);
    await fetch(uploadURL, {
      method: "PUT",
      body: selectedFile,
      headers: {
        "Content-Type": selectedFile.type,
      },
    });
    const downloadLink = await handleGETFileURL(selectedFile.name);
    setCollegeLogoDownloadLink(downloadLink);
  };

  const handleStudentExcelSelect = async (selectedFile) => {
    setStudentExcelFile(selectedFile);
    const uploadURL = await getUploadURL(selectedFile.name, selectedFile.type);
    await fetch(uploadURL, {
      method: "PUT",
      body: selectedFile,
      headers: {
        "Content-Type": selectedFile.type,
      },
    });
    const downloadLink = await handleGETFileURL(selectedFile.name);
    setStudentExcelDownloadLink(downloadLink);
  };

  const handleProcess = async () => {
    if (!collegeName.trim() || !collegeLogoFile || !studentExcelFile) return;
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
        }
      }
    }, 1000);
  };

  return (
    <div className="flex-grow shrink-0  overflow-y-auto h-screen bg-gradient-to-br w-full from-gray-50 via-blue-50 to-indigo-100 relative overflow-hidden">
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
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#007ACC] to-blue-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <div className="relative bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30 shadow-xl">
                <GraduationCap className="w-12 h-12 text-[#007ACC]" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-[#007ACC] to-blue-600 bg-clip-text text-transparent">
              EduAgentX
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Intelligent automation platform for educational institutions
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
          {/* Robot Assistant */}
          <div className="lg:col-span-1 flex justify-center">
            <RobotAssistant 
              isProcessing={isProcessing} 
              hasLogo={!!collegeLogoFile}
              hasExcel={!!studentExcelFile}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upload Form */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-2xl">
              {/* College Name Field */}
              <div className="mb-8">
                <label htmlFor="collegeName" className="block text-sm font-semibold text-gray-700 mb-3">
                  Institution Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="collegeName"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="Enter your college or institution name"
                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#007ACC]/50 focus:border-[#007ACC] transition-all duration-300 placeholder-gray-500 text-gray-800"
                    required
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#007ACC]/5 to-blue-600/5 pointer-events-none"></div>
                </div>
              </div>

              

              {/* College Logo Upload */}
              <div className="mt-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  College Logo
                </label>
                <div
                  onClick={() => document.getElementById('college-logo-input')?.click()}
                  className="relative w-full p-6 border-2 border-dashed border-white/40 rounded-2xl bg-white/20 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-[#007ACC]/50 hover:bg-white/30 group"
                >
                  <input
                    id="college-logo-input"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleCollegeLogoSelect(file);
                    }}
                    className="hidden"
                    accept="image/*"
                  />
                  
                  <div className="text-center">
                    {collegeLogoFile ? (
                      <div className="space-y-3">
                        <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Logo Uploaded</p>
                          <p className="text-xs text-gray-600 flex items-center justify-center mt-1">
                            <FileText className="w-3 h-3 mr-1" />
                            {collegeLogoFile.name}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="w-8 h-8 text-[#007ACC] mx-auto group-hover:scale-110 transition-transform duration-300" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Upload College Logo</p>
                          <p className="text-xs text-gray-600">PNG, JPG, SVG formats supported</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Student Excel File Upload */}
              <div className="mt-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Student Data (Excel File)
                </label>
                <div
                  onClick={() => document.getElementById('student-excel-input')?.click()}
                  className="relative w-full p-6 border-2 border-dashed border-white/40 rounded-2xl bg-white/20 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-[#007ACC]/50 hover:bg-white/30 group"
                >
                  <input
                    id="student-excel-input"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleStudentExcelSelect(file);
                    }}
                    className="hidden"
                    accept=".xlsx,.xls,.csv"
                  />
                  
                  <div className="text-center">
                    {studentExcelFile ? (
                      <div className="space-y-3">
                        <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Excel File Uploaded</p>
                          <p className="text-xs text-gray-600 flex items-center justify-center mt-1">
                            <FileText className="w-3 h-3 mr-1" />
                            {studentExcelFile.name}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="w-8 h-8 text-[#007ACC] mx-auto group-hover:scale-110 transition-transform duration-300" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Upload Student Data</p>
                          <p className="text-xs text-gray-600">Excel (.xlsx, .xls) or CSV files</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <ProcessButton
                  onClick={handleProcess}
                  disabled={!collegeName.trim() || !collegeLogoFile || !studentExcelFile}
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