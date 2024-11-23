import bcrypt from "bcryptjs"; // Use bcryptjs for Cloudflare compatibility

export default defineEventHandler(async (event) => {
  event.res.setHeader(
    "Access-Control-Allow-Origin",
    event.req.headers.origin || "*",
  );
  event.res.setHeader("Access-Control-Allow-Credentials", "true");

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
  const isMatch = bcrypt.compareSync(body.password, storedHash);

  if (isMatch) {
    setCookie(event, "votePageAuth", "authenticated", {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 7 * 60 * 60,
      sameSite: "Lax",
    });
    return { success: true };
  }

  return { success: false, message: "Invalid password" };
});
