//
// OGP Web Site Contatuc Server.
// Notify OGP Support of contact query
//
//
// Jim Olivi 2003
//

import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

async function sendToSupport(eMailFrom, mailFromName, message) {
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

  const mailOptions = {
    from: '"Jim Olivi" <ogprogrammer@ogp.io>',
    to: "ogprogrammer@ogp.io'",
    subject: "Contact Us Request.",
    template: "notifuOGP", // the name of the template file i.e email.handlebars
    context: {
      messageFrom: mailFromName,
      eMailFrom: eMailFrom,
      message: message,
    },
  };

  // trigger the sending of the E-mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);

    return info;
  });
}

async function sendToOGP(eMailFrom, mailFromName, message) {
  await sendToSupport(eMailFrom, mailFromName, message);
}

export default sendToOGP;
