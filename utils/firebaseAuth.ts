// utils/firebaseAuth.ts
import fetch from "node-fetch";

// Anonymous sign-in function
export async function signInAnonymously() {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_WEB_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ returnSecureToken: true }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error signing in anonymously: ${data.error.message}`);
    }

    console.log("Anonymous Sign-in Successful:", data);
    return data.idToken; // Make sure this is returned
  } catch (error) {
    console.error("Error signing in anonymously:", error);
    throw error;
  }
}
