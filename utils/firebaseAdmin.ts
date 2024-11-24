// utils/firebaseAdmin.ts
import { initializeApp, cert } from "firebase-admin/app";
import { getIdToken } from "@/utils/firebaseAdmin"; // Ensure the path is correct
import { v4 as uuidv4 } from "uuid";

import { getAuth } from "firebase-admin/auth";
import fetch from "node-fetch";

/* const uid = uuidv4(); // Generate a unique user ID
console.log("Generated UID:", uid); */
// Firebase Admin SDK Initialization
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

initializeApp({
  credential: cert(serviceAccount),
});

if (
  !process.env.FIREBASE_PROJECT_ID ||
  !process.env.FIREBASE_PRIVATE_KEY ||
  !process.env.FIREBASE_CLIENT_EMAIL ||
  !process.env.FIREBASE_WEB_API_KEY
) {
  throw new Error("Missing required Firebase environment variables");
}

console.log("Firebase Project ID:", process.env.FIREBASE_PROJECT_ID);
console.log("Firebase Web API Key:", process.env.FIREBASE_WEB_API_KEY);
console.log("Firebase Private Key:", process.env.FIREBASE_PRIVATE_KEY);

const auth = getAuth();

// Function to get ID Token
export async function getIdToken() {
  try {
    // Generate the custom token
    const customToken = await auth.createCustomToken(
      "ed36f510-b6c7-4c4f-9929-edb4cf1fe88c",
    );
    console.log("Custom Token:", customToken);

    // Exchange the custom token for an ID token
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_WEB_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: customToken,
          returnSecureToken: true,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Error exchanging custom token:", data.error);
      throw new Error(`Failed to exchange custom token: ${data.error.message}`);
    }

    console.log("ID Token generated successfully:", data.idToken);
    return data.idToken; // Return the ID token
  } catch (error) {
    console.error("Error generating ID token:", error);
    throw new Error("Unable to generate ID token for Firebase authentication.");
  }
}
