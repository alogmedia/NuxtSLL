export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // Read the incoming data
    console.log("Received data to save:", body);

    if (!body || !body.history || !body.totalVotes) {
      throw createError({ statusCode: 400, message: "Invalid data format" });
    }

    // Save to KV Storage
    await KV_NAMESPACE.put("mapVotes", JSON.stringify(body));

    console.log("Data saved successfully to KV Storage");
    return { success: true, message: "Votes saved successfully." };
  } catch (error) {
    console.error("Error saving data to KV Storage:", error.message);
    throw createError({ statusCode: 500, message: "Failed to save data" });
  }
});
