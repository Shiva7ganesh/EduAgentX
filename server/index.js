import express from "express";
import cors from "cors";
import { getObjectURL, putObject } from "./utils/aws.util.js";
import "dotenv/config";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "https://edu-automators.vercel.app"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory store for process statuses keyed by id
const processStatusStore = new Map();

app.post("/api/get-put-object-signed-url", async (req, res) => {
  const { fileName, fileType } = req.body || {};
  if (!fileName || !fileType) {
    return res
      .status(400)
      .json({ status: "error", error: "File name and type are required" });
  }

  const uploadUrl = await putObject(fileName, fileType);

  res.json({ status: "success", uploadUrl }).status(201);
});

app.get("/api/get-object-url/:key", async (req, res) => {
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
});

// Endpoint to receive status updates for a process
app.post("/api/process-status", async (req, res) => {
  const payload = req.body || {};
  const id = payload.id ?? payload.processId ?? payload.process_id;
  if (id === undefined || id === null) {
    return res.status(400).json({ status: "error", error: "Process id is required" });
  }
  const idKey = String(id);
  const existing = processStatusStore.get(idKey) || {};
  const updated = { ...existing, ...payload, updatedAt: new Date().toISOString() };
  processStatusStore.set(idKey, updated);
  return res.status(200).json({ status: "success", data: updated });
});

// Endpoint to fetch current status by id
app.get("/api/process-status/:id", async (req, res) => {
  const idKey = String(req.params.id);
  if (!processStatusStore.has(idKey)) {
    return res.status(404).json({ status: "error", error: "Status not found" });
  }
  return res.json({ status: "success", data: processStatusStore.get(idKey) });
});

app.post("/api/initiate-task", async (req, res) => {
  const { downloadlink } = req.body || {};
  if (!downloadlink) {
    return res
      .status(400)
      .json({ status: "error", error: "Download link is required" });
  }
  const response = await fetch(
    process.env.UI_PATH_API,
    {
      method: "POST",
      headers: {
        Authorization:
          `Bearer ${process.env.UI_AUTH_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        downloadlink
      }),
    }
  );
  const result = await response.json();

  // Store initial status keyed by id if present
  if (result && (result.id !== undefined && result.id !== null)) {
    const idKey = String(result.id);
    processStatusStore.set(idKey, {
      ...result,
      updatedAt: new Date().toISOString(),
    });
  }

  return res.json({
    status: "success",
    message: "Task initiated successfully",
    data: result
  });
});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});