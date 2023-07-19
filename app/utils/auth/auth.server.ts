import { Authenticator } from "remix-auth";
import type { Auth0Profile } from "remix-auth-auth0";
import { Auth0Strategy } from "remix-auth-auth0";
import { db } from "../db";
import { sessionStorage } from "./session.server";

export const authenticator = new Authenticator<{ id: string }>(sessionStorage);

const getOrCreateUser = async (
  profile: Auth0Profile
): Promise<{ id: string }> => {
  const user = await db.user
    .findFirstOrThrow({
      select: { id: true },
      where: { auth0Id: profile.id },
    })
    .catch(() => {
      return db.user.create({
        select: { id: true },
        data: {
          auth0Id: profile.id!,
        },
      });
    });

  return user;
};

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: "/auth/callback/",
    clientID: process.env["AUTH0_CLIENT_ID"]!,
    clientSecret: process.env["AUTH0_CLIENT_SECRET"]!,
    domain: process.env["AUTH0_ISSUER_BASE_URL"]!,
  },
  async ({ profile }) => {
    if (!profile.id) {
      throw new Error("No profile ID");
    }

    return await getOrCreateUser(profile);
  }
);

authenticator.use(auth0Strategy);
