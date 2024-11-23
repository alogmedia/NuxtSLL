export default defineNuxtRouteMiddleware((to, from) => {
  let authCookie = useCookie("votePageAuth").value;

  if (process.client && !authCookie) {
    // Fallback to client-side cookie reading
    authCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("votePageAuth="))
      ?.split("=")[1];
  }

  console.log("Auth Cookie Value:", authCookie); // Debugging log

  if (authCookie !== "authenticated") {
    console.log(
      "Redirecting to /enter-password due to missing or invalid cookie.",
    );
    return navigateTo("/enter-password");
  }
});
