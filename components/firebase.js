//
// OGP Web Site Contatus Server.
//
// Google Firebase Interface
//
// Jim Olivi 2003
//

// Cloud Firestore SDK
import admin from "firebase-admin";
import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
  Firestore,
} from "firebase-admin/firestore";
import "dotenv/config";
import serviceAccount from "../firebase_auth.json" assert { type: "json" };

var db;
export function initializeFirebase() {
  serviceAccount.private_key_id = process.env.PRIVATE_KEY_ID;
  serviceAccount.private_key = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
  // console.log(serviceAccount.private_key);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("App Initialized");

  db = getFirestore();

  // Connection to Firebase works, but this connectionis not secure.
  // Once the app is ready, change to the more secure Google recommended method.

  // const docRef = db.collection("users").doc("alovelace");
  // await docRef.set({
  //   first: "Ada",
  //   last: "Lovelace",
  //   born: 1815,
  // });
  console.log("OGP Server connected to Firestore.");
}

export async function saveMessgeInfo(eMailFrom, mailFromName, message) {
  if (process.env.SAVE_MESSAGE_DATA) {
    const data = {
      timestamp: Firestore.Timestamp.now(),
      emailfrom: eMailFrom,
      mailFromName: mailFromName,
      message: message,
    };
    const res = await db
      .collection("messages")
      .add(data)
      .catch((err) => console.log(`Error code: ${err}`))
      .then((ret) => console.log(`Message saved with ID:. ${ret.id}`));
  } else {
    console.log("Save Data Switch turned off.");
  }
}
