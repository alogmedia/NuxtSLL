export default defineNuxtRouteMiddleware((to, from) => {
  const cookiesHeader = useRequestHeaders(["cookie"]).cookie || "";

  console.log("Raw Cookie Header:", cookiesHeader);

  if (cookiesHeader) {
    // Safely parse cookies
    const cookies = Object.fromEntries(
      cookiesHeader
        .split("; ")
        .map((cookie) => cookie.split("=").map(decodeURIComponent)),
    );

    console.log("Parsed Cookies:", cookies);

    const authCookie = cookies.votePageAuth;

    console.log("Auth Cookie Value:", authCookie);

    if (authCookie !== "authenticated") {
      console.log(
        "Redirecting to /enter-password due to missing or invalid cookie.",
      );
      return navigateTo("/enter-password");
    }
  } else {
    console.log("No cookies found in headers. Redirecting to /enter-password.");
    return navigateTo("/enter-password");
  }
});
