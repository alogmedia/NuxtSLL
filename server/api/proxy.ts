export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Read the request body

  // Determine the API endpoint based on the request body
  let apiUrl;
  if (body.endpoint === "/api/get_votemap_status") {
    apiUrl = "https://scandinavians.crcon.cc/api/get_votemap_status";
  } else if (body.endpoint === "/api/get_gamestate") {
    apiUrl = "https://scandinavians.crcon.cc/api/get_gamestate";
  } else {
    apiUrl = "https://scandinavians.crcon.cc/api/get_recent_logs";
  }

  const headers = {
    "Content-Type": "application/json",
    Cookie:
      "csrftoken=0iwJeGDI8OO18G4Nsr0wxGcBhveEBeaH; sessionid=ya5lfz8zqdz2z0djizqp3mb5yhahfbr5",
    Referer: "https://scandinavians.crcon.cc/",
  };

  // Forward the request to the actual API
  try {
    const response = await $fetch(apiUrl, {
      method: "GET",
      headers,
    });

    console.log("API response:", response);
    return response;
  } catch (error) {
    console.error("Error making request to the API:", error);
    throw createError({ statusCode: 500, message: "Failed to fetch from API" });
  }
});
