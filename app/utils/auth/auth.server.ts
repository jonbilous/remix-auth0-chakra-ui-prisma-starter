import { Authenticator } from "remix-auth";
import type { Auth0Profile } from "remix-auth-auth0";
import { Auth0Strategy } from "remix-auth-auth0";
import { db } from "../db";
import { sessionStorage } from "./session.server";

export const authenticator = new Authenticator<
  Auth0Profile & { user: { id: string } }
>(sessionStorage);

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: "/auth/callback/",
    clientID: process.env["AUTH0_CLIENT_ID"]!,
    clientSecret: process.env["AUTH0_CLIENT_SECRET"]!,
    domain: process.env["AUTH0_DOMAIN"]!,
  },
  async ({ profile }) => {
    if (!profile.id) {
      throw new Error("No profile ID");
    }

    const user = await db.user
      .findFirstOrThrow({ where: { auth0id: profile.id } })
      .catch((err) => {
        return db.user.create({
          data: {
            auth0id: profile.id!,
            name: profile.displayName!,
          },
        });
      });

    return { ...profile, user };
  }
);

authenticator.use(auth0Strategy);
