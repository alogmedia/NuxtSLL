import { db } from "@/utils/firebaseAdmin";

export default defineEventHandler(async () => {
  const ref = db.ref("mapVotes");

  try {
    const snapshot = await ref.once("value");
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return { timeofvote: {}, mapVotes: [] };
  } catch (error) {
    console.error("Error loading votes:", error);
    throw createError({ statusCode: 500, message: "Failed to load votes" });
  }
});
