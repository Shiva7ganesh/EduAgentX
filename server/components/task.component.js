import { getObjectURL, putObject } from "../utils/aws.util.js";
import { config } from "dotenv";

config();

const processStatusStore = new Map();

export const initiateTask = async (req, res) => {
  const { collegeLogoDownloadLink, collegeName,studentExcelDownloadLink } = req.body || {};
  if (!collegeLogoDownloadLink || !collegeName || !studentExcelDownloadLink) {
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
      collegeLogoDownloadLink, collegeName, studentExcelDownloadLink 
    }),
  });
  const result = await response.json();

  // Store initial status keyed by id if present
  if (result && result.key !== undefined && result.key !== null) {
    const idKey = String(result.key);
    processStatusStore.set(idKey, {
      ...result,
      state: "initiated",
      progress: 0,
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
};

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
};

export const getProcessStatus = async (req, res) => {
  const payload = req.body || {};
  const id =
    payload.id ?? payload.processId ?? payload.process_id ?? payload.processid;
  if (id === undefined || id === null) {
    return res
      .status(400)
      .json({ status: "error", error: "Process id is required" });
  }
  const idKey = String(id);
  const existingData = processStatusStore.get(idKey);
  if (existingData) {
    processStatusStore.set(idKey, {
      ...existingData,
      ...payload.data,
    });
  } else {
    processStatusStore.set(idKey, payload.data);
  }
  return res
    .status(200)
    .json({ status: "success", data: processStatusStore.get(idKey) });
};

export const getProcessStatusById = async (req, res) => {
  const idKey = String(req.params.id);
  if (!processStatusStore.has(idKey)) {
    return res.status(404).json({ status: "error", error: "Status not found" });
  }
  return res.json({ status: "success", data: processStatusStore.get(idKey) });
};

export const getDashboardData = async (req, res) => {
  const date = req.query.date || new Date().toISOString().split("T")[0];

  try {
    const response = await fetch(
      "https://cloud.uipath.com/eduautomaters/defaulttenant/dataservice_/api/EntityService/emaildata/query",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.UI_PATH_DASH_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedFields: [
            "totalemails",
            "leavemails",
            "feemails",
            "leaveapproved",
            "leaverejected",
            "feeextended",
            "feerejected",
            "datedash",
            "Id",
          ],
          filterGroup: {
            logicalOperator: 0,
            queryFilters: [
              {
                fieldName: "datedash",
                operator: "=",
                value: date,
              },
            ],
            filterGroups: [],
          },
          start: 0,
          limit: 100,
        }),
      }

    );
    const result = await response.json();
    return res.json(
      { status: "success", data: result || [], date }
    );
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Failed to fetch dashboard data" });
  }
};
