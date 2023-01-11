import type { LoaderFunction } from "@remix-run/node";

import { authenticator } from "~/utils/auth/auth.server";

export const loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate("auth0", request, {
    successRedirect: "/",
    throwOnError: true,
  });
};
