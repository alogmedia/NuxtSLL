import { initializeApp, credential, database } from "firebase-admin";
import { createRequire } from "module"; // Required to resolve runtimeConfig in server

const require = createRequire(import.meta.url);
const { projectId, privateKey, clientEmail } =
  require("#nuxt/config").runtimeConfig.firebase;

// Initialize Firebase Admin SDK
const firebaseAdmin = initializeApp({
  credential: credential.cert({
    projectId,
    privateKey,
    clientEmail,
  }),
  databaseURL:
    "https://sllvoting-default-rtdb.europe-west1.firebasedatabase.app/",
});

const db = database();

export { firebaseAdmin, db };
