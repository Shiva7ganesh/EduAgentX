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
  console.log(req.body);
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
  console.log(req.body);
  const { downloadlink } = req.body || {};
  if (!downloadlink) {
    return res
      .status(400)
      .json({ status: "error", error: "Download link is required" });
  }
  const response = await fetch(
    "https://cloud.uipath.com/eduautomaters/DefaultTenant/orchestrator_/t/0fb89d4f-c754-477e-b343-f706c3d68dce/test123",
    {
      method: "POST",
      headers: {
        Authorization:
          "Bearer rt_85EA3527E76E326C19CA6EE719CB08FE42A9204D98A69CD133E91B7476E5D8B9-1",
      },
      body: JSON.stringify({
        "downloadlink": "https://saiteja.site/api/files/download/Rawrqxm9rSGDEsg",
      }),
    }
  );
  console.log(response);
  return res.json({
    status: "success",
    message: "Task initiated successfully",
  });
});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
