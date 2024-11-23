export default defineNuxtRouteMiddleware((to, from) => {
  const cookiesHeader = useRequestHeaders(["cookie"]).cookie || "";

  // Parse cookies manually
  const cookies = Object.fromEntries(
    cookiesHeader.split("; ").map((cookie) => cookie.split("=")),
  );

  console.log("Cookies from request headers:", cookies);

  const authCookie = cookies.votePageAuth; // Get the specific cookie

  console.log("Auth Cookie Value:", authCookie);

  if (authCookie !== "authenticated") {
    console.log(
      "Redirecting to /enter-password due to missing or invalid cookie.",
    );
    return navigateTo("/enter-password");
  }
});
