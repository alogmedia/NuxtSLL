import fetch from "node-fetch";

export default defineEventHandler(async () => {
  const databaseUrl =
    "https://sllvoting-default-rtdb.europe-west1.firebasedatabase.app/.json";

  try {
    // Make the GET request to Firebase without authorization
    const response = await fetch(databaseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(
        `Firebase request failed: ${response.status} - ${errorResponse}`,
      );
    }

    const data = await response.json();
    console.log("Successfully fetched data from Firebase:", data);

    return data;
  } catch (error) {
    console.error("Error fetching data from Firebase:", error.message);
    throw createError({
      statusCode: 500,
      message: `Failed to fetch data from Firebase: ${error.message}`,
    });
  }
});
