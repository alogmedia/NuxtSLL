import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const storedHash = config.VOTE_PAGE_HASH; // Retrieve the private variable

  if (!storedHash) {
    console.error(
      "Password hash is not set. Check your environment variables.",
    );
    throw new Error(
      "Password hash is not set. Check your environment variables.",
    );
  }

  const body = await readBody(event); // Get the request body
  const isMatch = bcrypt.compareSync(body.password, storedHash);

  if (isMatch) {
    setCookie(event, "votePageAuth", "authenticated", {
      httpOnly: false, // Allow access in client-side JavaScript for debugging
      secure: false, // Ensure this is false for local development
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    return { success: true };
  }

  return { success: false, message: "Invalid password" };
});
