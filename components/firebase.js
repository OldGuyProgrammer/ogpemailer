//
// OGP Web Site Contatus Server.
//
// Google Firebase Interface
//
// Jim Olivi 2003
//

// Cloud Firestore SDK
import admin from "firebase-admin";
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "firebase-admin/firestore";

import serviceAccount from "../oldguyprogrammer-firebase-adminsdk-1a42h-22bafb575c.json" assert { type: "json" };

var db;
export function initializeFirebase() {
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
  const res = await db
    .collection("messages")
    .add({
      emailfrom: eMailFrom,
      mailFromName: mailFromName,
      message: message,
    })
    .catch((err) => console.log(`Error code: ${err}`));
  console.log(`Message saved with ID:. ${res.id}`);
}
