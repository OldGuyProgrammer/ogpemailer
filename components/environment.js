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
    this.doPropectEmails = process.env.SEND_PROSPECT_EMAILS;
    this.doOGPEmails = process.env.SEND_OGP_EMAILS;
  }

  sendProspectEmails() {
    if (this.doPropectEmails === "true") {
      return true;
    } else {
      return false;
    }
  }

  sendOGPEmails() {
    if (this.doOGPEmails === "true") {
      return true;
    } else {
      return false;
    }
  }
}

export default Environment;
