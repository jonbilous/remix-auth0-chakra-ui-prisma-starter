import { Authenticator } from "remix-auth";
import type { Auth0Profile } from "remix-auth-auth0";
import { Auth0Strategy } from "remix-auth-auth0";
import { sessionStorage } from "./session.server";

export const authenticator = new Authenticator<Auth0Profile>(sessionStorage);

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: "http://localhost:3000/auth/callback/",
    clientID: process.env["AUTH0_CLIENT_ID"]!,
    clientSecret: process.env["AUTH0_CLIENT_SECRET"]!,
    domain: process.env["AUTH0_DOMAIN"]!,
  },
  async ({ profile }) => {
    return profile;
  }
);

authenticator.use(auth0Strategy);
