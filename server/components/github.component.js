import { spawn } from "child_process";
import crypto from "crypto";
import { config } from "dotenv";

config();
function verifySignature(req) {
    const SECRET = process.env.GITHUB_WEBHOOK_PASS;
    const signature = req.headers["x-hub-signature-256"];
    const hmac = crypto.createHmac("sha256", SECRET);
    const digest =
        "sha256=" + hmac.update(JSON.stringify(req.body)).digest("hex");
    return signature === digest;
}

export const githubWebHook = (req, res) => {
  if (!verifySignature(req)) {
    return res.status(401).send("Invalid signature");
  }

  console.log("Push event received. Running update.sh...");

  res.status(200).send("Update started");

  const child = spawn("sh", ["./update.sh"]);
  child.stdout.on("data", (data) => {
    console.log(`[update.sh stdout]: ${data}`);
  });
  child.stderr.on("data", (data) => {
    console.error(`[update.sh stderr]: ${data}`);
  });
  child.on("close", (code) => {
    console.log(`update.sh exited with code ${code}`);
  });
};
