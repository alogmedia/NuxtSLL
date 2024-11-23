export default defineNuxtRouteMiddleware((to, from) => {
  const authCookie = useCookie("votePageAuth");
  console.log("Auth Cookie Value:", authCookie.value); // Debugging log
  console.log("Incoming Cookies:", useRequestHeaders(["cookie"])); // Log all cookies

  if (authCookie.value !== "authenticated") {
    console.log(
      "Redirecting to /enter-password due to missing or invalid cookie.",
    );
    return navigateTo("/enter-password");
  }
});
