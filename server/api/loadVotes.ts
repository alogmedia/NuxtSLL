import { promises as fs } from "fs";
import { join } from "path";

export default defineEventHandler(async () => {
  const filePath = join(process.cwd(), "data", "mapVotes.json");

  try {
    const data = await fs.readFile(filePath, "utf-8");
    console.log("Loaded data from file:", data);
    return JSON.parse(data); // Return the data as JSON
  } catch (error) {
    console.error("Error loading data from file:", error);
    return {
      timeofvote: {},
      mapVotes: [], // Default structure if file is not found or empty
    };
  }
});
