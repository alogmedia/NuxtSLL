export default defineNuxtRouteMiddleware((to, from) => {
  const authCookieValue = process.server
    ? useRequestHeaders(["cookie"]).cookie?.match(/votePageAuth=([^;]*)/)?.[1]
    : useCookie("votePageAuth").value;

  console.log("Auth Cookie Value:", authCookieValue);

  if (authCookieValue !== "authenticated") {
    console.log(
      "Redirecting to /enter-password due to missing or invalid cookie.",
    );
    return navigateTo("/enter-password");
  }
});
