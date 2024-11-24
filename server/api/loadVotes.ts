import { db } from "@/utils/firebaseAdmin";

export default defineEventHandler(async () => {
  const ref = db.ref("mapVotes");

  try {
    const snapshot = await ref.once("value");
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return {
        timeofvote: {},
        mapVotes: [],
      };
    }
  } catch (error) {
    console.error("Error loading data from Firebase:", error);
    return {
      timeofvote: {},
      mapVotes: [],
    };
  }
});
