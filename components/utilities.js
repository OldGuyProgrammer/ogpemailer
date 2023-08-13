//
// OGP Web Site Contatuc Server.
// utility functions that can be used by any module.
//
//
// Jim Olivi 2003
//

import nodemailer from "nodemailer";

export function createTransport() {
  console.log("Enter Create Transporter");
  return nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f215753705d0ab",
      pass: "53d266c7542de0",
    },
  });
}
