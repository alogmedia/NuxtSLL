export default defineNuxtRouteMiddleware((to, from) => {
  const authCookie = useCookie("votePageAuth");
  console.log("Auth Cookie Value:", authCookie.value); // Debugging log

  if (authCookie.value !== "authenticated") {
    console.log(
      "Redirecting to /enter-password due to missing or invalid cookie.",
    );
    return navigateTo("/enter-password");
  }
});
