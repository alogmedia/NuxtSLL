import { db } from "@/utils/firebaseAdmin";

export default defineEventHandler(async (event) => {
  const ref = db.ref("mapVotes");

  try {
    const body = await readBody(event);
    console.log("Received data to save:", JSON.stringify(body, null, 2));

    if (!body || !body.history || !body.totalVotes) {
      throw createError({ statusCode: 400, message: "Invalid data format" });
    }

    await ref.set(body);
    console.log("Data saved successfully to Firebase");

    return { success: true, message: "Votes saved successfully." };
  } catch (error) {
    console.error("Error saving data to Firebase:", error.message);
    throw createError({ statusCode: 500, message: "Failed to save data" });
  }
});
