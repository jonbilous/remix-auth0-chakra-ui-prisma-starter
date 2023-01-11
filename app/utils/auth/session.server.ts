import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "auth_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["71efd020-beca-457e-89b7-81705e16f3a9"],
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
