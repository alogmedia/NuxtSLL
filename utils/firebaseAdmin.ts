import { initializeApp, cert } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

initializeApp({
  credential: cert(serviceAccount),
  databaseURL:
    "https://sllvoting-default-rtdb.europe-west1.firebasedatabase.app/",
});

const db = getDatabase();
export { db };
