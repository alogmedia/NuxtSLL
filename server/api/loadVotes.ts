import { db } from "@/utils/firebaseAdmin";

export default defineEventHandler(async () => {
  const ref = db.ref("/");

  try {
    // Fetch the entire data structure from Firebase
    const snapshot = await ref.once("value");

    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("Successfully fetched data from Firebase:", data);
      return data; // Return the entire JSON structure
    } else {
      console.warn("No data found in Firebase Realtime Database");
      throw createError({
        statusCode: 404,
        message: "No data found in Firebase Realtime Database",
      });
    }
  } catch (error) {
    console.error("Error while fetching data from Firebase:", error);
    throw createError({
      statusCode: 500,
      message: `Failed to fetch data from Firebase: ${error.message}`,
    });
  }
});
