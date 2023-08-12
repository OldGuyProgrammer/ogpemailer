//
// OGP Web Site Contatuc Server.
// Send email to client upon Contact Us request
//
// Mail sender component
//
// Jim Olivi 2003
//

import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import Environment from "./environment.js";

async function sendToProspect(messageFrom) {
  // initialize nodemailer
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f215753705d0ab",
      pass: "53d266c7542de0",
    },
  });

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

  const mailOptions = {
    from: '"Jim Olivi" <ogprogrammer@ogp.io>', // sender address
    to: messageFrom, // list of receivers
    subject: "Thank You for Contacting the Old Guy Programmer Team.",
    template: "reply", // the name of the template file i.e email.handlebars
    context: {
      copyRight: copyRightYear,
    },
  };

  // trigger the sending of the E-mail
  const env = new Environment();
  const sendEmails = env.sendEmails();
  console.log(`Send emails: ${sendEmails}`);
  if (sendEmails) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: " + info.response);

      return info;
    });
  } else {
    console.log("Email Switch turned off.");
    return "No emails sent";
  }
}

async function mailSender(eMailFrom, mailFromName, message) {
  await sendToProspect(eMailFrom);
}

export default mailSender;
