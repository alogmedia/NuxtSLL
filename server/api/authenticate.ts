import bcrypt from "bcryptjs"; // Use bcryptjs instead of bcrypt

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const storedHash = config.VOTE_PAGE_HASH;

  if (!storedHash) {
    console.error(
      "Password hash is not set. Check your environment variables.",
    );
    throw new Error(
      "Password hash is not set. Check your environment variables.",
    );
  }

  const body = await readBody(event);
  const isMatch = bcrypt.compareSync(body.password, storedHash); // Use compareSync for bcryptjs

  if (isMatch) {
    setCookie(event, "votePageAuth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });
    return { success: true };
  }

  return { success: false, message: "Invalid password" };
});
