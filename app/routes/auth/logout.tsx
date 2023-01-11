import type { ActionFunction } from "@remix-run/node";

import { redirect } from "@remix-run/node";

import { destroySession, getSession } from "~/utils/auth/session.server";

export const loader: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
