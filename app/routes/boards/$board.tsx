import type { DataFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserProfile } from "~/utils/auth/profile.server";

export const loader = async (ctx: DataFunctionArgs) => {
  const profile = await getUserProfile(ctx.request);

  return profile;
};

export default function Board() {
  const profile = useLoaderData<typeof loader>();

  return <div>{JSON.stringify(profile)}</div>;
}
