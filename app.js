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
import { initializeFirebase, saveMessgeInfo } from "./components/firebase.js";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT;

initializeFirebase();

console.log("OGP Web Site Contact Us Server started.");

//
// Middleware
//

app.use(
  morgan("Route: :method :url. Reponse time: :response-time. Date: :date()")
);

const limiter = rateLimit({
  limit: 100, // Number of hits allowed per time window.
  windowMs: 60 * 60 * 1000, // Milliseconds in an hour
  message: "STOP - STOP Quit trying to clog this web site!",
});

app.use(limiter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

process.on("SIGINT", () => {
  console.log("OGP Web Site Contact Us Server ending...");
  process.exit();
});

app.post("/savecontact", (req, res) => {
  const eMailFrom = req.body.eMailFrom;
  const mailFromName = req.body.mailFromName;
  const contactCompany = req.body.contactCompany;
  const message = req.body.message;
  if (
    eMailFrom == undefined ||
    mailFromName == undefined ||
    message == undefined
  ) {
    const msg = {
      code: 204,
      msg: "Not enough information sent.",
    };
    console.log(msg);
    res.statusCode = 204;
    res.json(msg);
  } else {
    mailSender(eMailFrom, mailFromName, contactCompany, message);
    const msg = {
      code: 201,
      msg: "Contact information saved. Emails sent",
    };

    saveMessgeInfo(eMailFrom, mailFromName, contactCompany, message);
    res.statusCode = 201;
    res.json(msg);
  }
});

app.get("/shutdown", async (req, res) => {
  console.log("OGP Web Site Contact Us Server ending...");
  res.send("<h1>Request shut down server</h1>");
  process.exit();
});

app.get("/ping", async (req, res) => {
  console.log("OGP Web Ping Request");
  res.send("<h1>Here's back to Ya!</h1>");
});

// app.all("*", async (req, res) => {
//   console.log("Default Route Triggered.");
//   res.statusCode = 404;
//   res.sendFile(path.join(__dirname, "/views/error.html"));
// });

app.listen(PORT, () => {
  console.log("OGP contact server started: " + new Date());
  console.log(`OGP contact server running on port ${PORT}.`);
  console.log(`Local Directory: ${__dirname}`);
});
