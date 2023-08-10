//
// OGP Web Site Contatuc Server.
// Send email to client upon Contact Us request
//
// Mail sender component
//
// Jim Olivi 2003
//

import nodemailer from "nodemailer";

async function mailSender(mailTo, message) {
  console.log(`Save contact information for ${mailTo}`);

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f215753705d0ab",
      pass: "53d266c7542de0",
    },
  });

  const info = await transport.sendMail({
    from: mailTo, // sender address
    to: "jim@olivi.us", // list of receivers
    subject: "Hello ✔", // Subject line
    html: `<b>${message}</b>`, // html body
  });
  console.log("Exit mainSender");
}

export default mailSender;
