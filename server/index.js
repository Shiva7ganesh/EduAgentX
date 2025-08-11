import express from "express";
import cors from "cors";
import { getObjectURL, putObject } from "./utils/aws.util.js";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  return res.json({
    status: "success",
    message: "Task initiated successfully",
    data : result
  });
});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
