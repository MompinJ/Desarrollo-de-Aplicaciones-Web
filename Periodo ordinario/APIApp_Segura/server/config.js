export const PORT = Number(process.env.PORT) || 3000;
export const JWT_SECRET =
  process.env.JWT_SECRET || "pokeapi-segura-demo-secret-change-in-prod";

/** Cookie name used for HttpOnly session JWT */
export const COOKIE_NAME = "token";

export function cookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
    path: "/",
  };
}
