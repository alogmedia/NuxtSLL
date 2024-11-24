import fetch from "node-fetch";

export default defineEventHandler(async (event) => {
  const databaseUrl =
    "https://sllvoting-default-rtdb.europe-west1.firebasedatabase.app/.json";

  try {
    const body = await readBody(event);
    console.log("Received data to save:", JSON.stringify(body, null, 2));

    if (!body || typeof body !== "object") {
      throw createError({ statusCode: 400, message: "Invalid data format" });
    }

    // Save data to the root of the database without authorization
    const response = await fetch(databaseUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(
        `Firebase request failed: ${response.status} - ${errorResponse}`,
      );
    }

    console.log("Data saved successfully to Firebase");
    return { success: true, message: "Votes saved successfully." };
  } catch (error) {
    console.error("Error saving data to Firebase:", error.message);
    throw createError({
      statusCode: 500,
      message: `Failed to save data to Firebase: ${error.message}`,
    });
  }
});
