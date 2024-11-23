export default defineNuxtRouteMiddleware((to, from) => {
  const authCookie = useCookie("votePageAuth");
  const allCookies = useRequestHeaders(["cookie"]);

  console.log("Auth Cookie Value:", authCookie.value); // Debugging log
  console.log("Incoming Cookies:", allCookies); // Log all incoming cookies

  if (authCookie.value !== "authenticated") {
    console.log(
      "Redirecting to /enter-password due to missing or invalid cookie.",
    );
    return navigateTo("/enter-password");
  }
});
