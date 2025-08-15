import { exec } from "child_process";
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
    console.error("Invalid signature");
    return res.status(401).send("Invalid signature");
  }

   console.log("Push event received. Running update.sh...");

  exec("bash ../update.sh", (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).send("Update failed");
    }
    console.log(stdout);
    res.status(200).send("Update completed");
  });
};
