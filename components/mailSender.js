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
import Environment from "./environment.js";
import { createTransport } from "./utilities.js";

async function sendToProspect(messageFrom, mailFromName, message) {
  // initialize nodemailer
  const transporter = createTransport();
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

  let copyRightYear = new Date().getFullYear();

  let mailOptions = {
    from: '"Jim Olivi" <ogprogrammer@ogp.io>', // sender address
    to: messageFrom, // list of receivers
    subject: "Thank You for Contacting the Old Guy Programmer Team.",
    template: "reply", // the name of the template file i.e email.handlebars
    context: {
      copyRight: copyRightYear,
    },
  };

  // trigger the sending of the E-mails
  const env = new Environment();

  if (env.sendProspectEmails()) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: " + info.response);

      return info;
    });
  } else {
    console.log("Propect Email Switch turned off.");
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

  if (env.sendOGPEmails()) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: " + info.response);

      return info;
    });
  } else {
    console.log("OGP Email Switch turned off.");
  }
}

async function mailSender(eMailFrom, mailFromName, message) {
  await sendToProspect(eMailFrom, mailFromName, message);
}

export default mailSender;
