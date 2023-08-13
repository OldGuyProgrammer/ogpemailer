//
// OGP Web Site Contatus Server.
// Send email to client upon Contact Us request
//
// Jim Olivi 2003
//

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";
import mailSender from "./components/mailSender.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 3001;

console.log("OGP Web Site Contact Us Server started.");

app.use(
  morgan("Route: :method :url. Reponse time: :response-time. Date: :date()")
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Put authentication stuff here");
  next();
});

process.on("SIGINT", () => {
  console.log("OGP Web Site Contact Us Server ending...");
  process.exit();
});

app.post("/savecontact", (req, res) => {
  console.log("Request to save contact received");
  const mailTo = req.body.mailTo;
  const eMailFrom = req.body.eMailFrom;
  const mailFromName = req.body.mailFromName;
  const message = req.body.message;
  mailSender(eMailFrom, mailFromName, message);
  res.send("<h1>Request to save Contact</h1>");
});

app.get("/shutdown", async (req, res) => {
  console.log("OGP Web Site Contact Us Server ending...");
  res.send("<h1>Request shut down server</h1>");
  process.exit();
});

app.all("*", async (req, res) => {
  console.log("Default Route Triggered.");
  res.statusCode = 404;
  res.send("<h1>You picked the wrong route, buddy</h1>");
});

app.listen(PORT, () => {
  console.log("OGP contact server started: " + new Date());
  console.log(`OGP contact server running on port ${PORT}.`);
  console.log(`Local Directory: ${__dirname}`);
});
