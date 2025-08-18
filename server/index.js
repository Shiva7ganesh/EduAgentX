import express from "express";
import cors from "cors";
import path from 'path';
import "dotenv/config";
import { getDashboardData, getExcelURL, getProcessStatus, getProcessStatusById, getSignedURL, initiateTask } from "./components/task.component.js";
import { githubWebHook } from "./components/github.component.js";
import { getStudentDetails, sendStudentDetails } from "./components/student.component.js";
import { whatsApi } from "./components/apis.component.js";
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


app.post("/api/get-put-object-signed-url", getSignedURL);

app.get("/api/get-object-url/:key", getExcelURL);

// Endpoint to receive status updates for a process
app.post("/api/process-status", getProcessStatus);

// Endpoint to fetch current status by id
app.get("/api/process-status/:id", getProcessStatusById);

app.post("/api/initiate-task", initiateTask);

app.get('/api/dashboard-data', getDashboardData);

app.get('/api/student-details', getStudentDetails);

app.post('/api/submit-attendance', sendStudentDetails);

app.post('/api/whatsapp', whatsApi);

app.get('/api/testing', (req, res) => {
  res.json({ message: "Testing endpoint is working!" });
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "./frontend")));
app.get("*url", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/index.html"));
});
app.post("/api/github-webhook", githubWebHook);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});