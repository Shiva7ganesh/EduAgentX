import { getObjectURL, putObject } from "../utils/aws.util.js";
import { config } from "dotenv";


config();

const processStatusStore = new Map();

export const initiateTask = async (req, res) => {
  const { downloadlink } = req.body || {};
  if (!downloadlink) {
    return res
      .status(400)
      .json({ status: "error", error: "Download link is required" });
  }
  const response = await fetch(process.env.UI_PATH_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UI_AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      downloadlink,
    }),
  });
  const result = await response.json();

  // Store initial status keyed by id if present
  if (result && result.key !== undefined && result.key !== null) {
    const idKey = String(result.key);
    processStatusStore.set(idKey, {
      ...result,
      updatedAt: new Date().toISOString(),
    });
  }

  return res.json({
    status: "success",
    message: "Task initiated successfully",
    data: result,
  });
};

export const getSignedURL = async (req, res) => {
  const { fileName, fileType } = req.body || {};
  if (!fileName || !fileType) {
    return res
      .status(400)
      .json({ status: "error", error: "File name and type are required" });
  }

  const uploadUrl = await putObject(fileName, fileType);

  res.json({ status: "success", uploadUrl }).status(201);
}

export const getExcelURL = async (req, res) => {
  const { key } = req.params;
  if (!key) {
    return res.status(400).json({ status: "error", error: "Key is required" });
  }
  try {
    const objectUrl = await getObjectURL(key);
    res.json({ status: "success", objectUrl });
  } catch (error) {
    console.error("Error getting object URL:", error);
    res
      .status(500)
      .json({ status: "error", error: "Failed to get object URL" });
  }
}

export const getProcessStatus = async (req, res) => {
  const payload = req.body || {};
  const id = payload.id ?? payload.processId ?? payload.process_id ?? payload.processid;
  if (id === undefined || id === null) {
    return res.status(400).json({ status: "error", error: "Process id is required" });
  }
  const idKey = String(id);
  processStatusStore.set(idKey, payload.data);
  return res.status(200).json({ status: "success", data: processStatusStore.get(idKey) });
}

export const getProcessStatusById = async (req, res) => {
  const idKey = String(req.params.id);
  if (!processStatusStore.has(idKey)) {
    return res.status(404).json({ status: "error", error: "Status not found" });
  }
  return res.json({ status: "success", data: processStatusStore.get(idKey) });
}