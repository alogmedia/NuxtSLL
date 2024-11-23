import { promises as fs } from "fs";
import { join } from "path";

export default defineEventHandler(async (event) => {
  const filePath = join(process.cwd(), "data", "mapVotes.json");

  try {
    // Ensure the directory exists
    await fs.mkdir(join(process.cwd(), "data"), { recursive: true });

    // Read the request body
    const body = await readBody(event);
    console.log("Received data to save:", JSON.stringify(body, null, 2));

    // Validate data
    if (!body || !body.history || !body.totalVotes) {
      throw createError({ statusCode: 400, message: "Invalid data format" });
    }

    // Write the data to file
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), "utf-8");
    console.log("Data saved successfully to mapVotes.json");

    return { success: true, message: "Votes saved successfully." };
  } catch (error) {
    console.error("Error saving data to file:", error.message);
    throw createError({ statusCode: 500, message: "Failed to save data" });
  }
});
