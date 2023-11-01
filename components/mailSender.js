//
// OGP Web Site Contatuc Server.
// Send email to client upon Contact Us request
//
// Mail sender component
//
// Jim Olivi 2003
//

import hbs from "nodemailer-express-handlebars";
import path from "path";
import "dotenv";
import nodemailer from "nodemailer";
// import { createTransport } from "./utilities.js";

const getPoolConfig = () => {
  return (
    "smtps://" +
    process.env.EMAIL_ID +
    ":" +
    process.env.EMAIL_PASSWORD +
    "@mail.hover.com/?pool=true"
  );
};

function sendToProspect(messageFrom, mailFromName, message) {
  // initialize nodemailer
  const transporter = nodemailer.createTransport(getPoolConfig());
  // point to the template folder
  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve("./views/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views/"),
  };

  // use a template file with nodemailer
  transporter.use("compile", hbs(handlebarOptions));

  // Get Copyright date

  var copyRightYear = new Date().getFullYear();

  var mailOptions = {
    from: '"info" <info@oldguyprogrammer.com>', // sender address
    to: messageFrom,
    subject: "Thank You for Contacting the Old Guy Programmer Team.",
    template: "reply", // the name of the template file i.e email.handlebars
    context: {
      copyRight: copyRightYear,
    },
  };

  if (process.env.SEND_PROSPECT_EMAILS) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: " + info.response);

      return info;
    });
  } else {
    console.log("Propect Email Switch turned off.");
    console.log(mailOptions);
  }

  mailOptions = {
    from: '"Jim Olivi" <ogprogrammer@ogp.io>', // sender address
    to: "ogprogrammer@ogp.io", // list of receivers
    subject: "Thank You for Contacting the Old Guy Programmer Team.",
    template: "notifyOGP", // the name of the template file i.e email.handlebars
    context: {
      message: message,
      mailFromName: mailFromName,
      messageFrom: messageFrom,
    },
  };

  //
  // Send message to OGP that a ContactUs was submitted.
  //
  if (process.env.SEND_OGP_EMAILS) {
    if (!process.env.EMAIL_ID) {
      console.log("EMAIL_ID environment variable not set.");
    }
    if (!process.env.EMAIL_PASSWORD) {
      console.log("EMAIL_PASSWORD environment variable not set.");
    }

    const transporter = nodemailer.createTransport(getPoolConfig());

    const ogpMessage =
      "Message from: " +
      mailFromName +
      "\nEmail:" +
      messageFrom +
      "\n" +
      message;
    console.log(ogpMessage);
    const mailOptions = {
      from: "jim@oldguyprogrammer.com",
      to: "jim@oldguyprogrammer.com",
      subject: "OGP Message received",
      text: ogpMessage,
    };
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        transporter.sendMail(mailOptions, function (err, data) {
          if (err) {
            console.log("Error" + err);
          }
        });
      }
    });
  } else {
    console.log("OGP Email Switch turned off.");
    console.log(mailOptions);
  }
}

async function mailSender(eMailFrom, mailFromName, message) {
  console.log(`Message received: ${eMailFrom}, ${mailFromName}, ${message}`);
  await sendToProspect(eMailFrom, mailFromName, message);
}

export default mailSender;
