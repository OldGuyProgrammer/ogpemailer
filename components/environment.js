//
// OGP Web Site Contatuc Server.
// Environment Variables Class
//
// Jim Olivi 2003
//

import dotenv from "dotenv";

class Environment {
  constructor() {
    dotenv.config();
    this.doEmails = process.env.SEND_EMAILS;
  }

  sendEmails() {
    if (this.doEmails === "true") {
      return true;
    } else {
      return false;
    }
  }
}

export default Environment;
