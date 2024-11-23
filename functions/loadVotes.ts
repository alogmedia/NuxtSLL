export default defineEventHandler(async () => {
  try {
    const votes = await KV_NAMESPACE.get("mapVotes", "json"); // KV storage get
    if (votes) {
      console.log("Loaded data from KV Storage:", votes);
      return votes;
    } else {
      console.warn("No data found in KV Storage. Returning default structure.");
      return {
        timeofvote: {},
        mapVotes: [],
      };
    }
  } catch (error) {
    console.error("Error loading data from KV Storage:", error);
    return {
      timeofvote: {},
      mapVotes: [],
    };
  }
});
