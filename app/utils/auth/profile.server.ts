import { authenticator } from "./auth.server";

export const getUserProfile = async ({ request }: { request: Request }) => {
  const profile = (await authenticator.isAuthenticated(request))
    ? await authenticator.authenticate("auth0", request)
    : null;

  return profile;
};
