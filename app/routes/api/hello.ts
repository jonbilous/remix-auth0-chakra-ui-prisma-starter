import { createHandler, HTTPError } from "@jonbilous/easy-remix-apis/server";
import type { DataFunctionArgs } from "@remix-run/node";
import zod from "zod";
import { getUserProfile } from "~/utils/auth/profile.server";

const handler = createHandler({
  schema: zod.object({ hello: zod.boolean() }),
  url: "/api/hello",
  async fn(data, ctx) {
    if (data.hello === false) {
      throw new HTTPError("Bad request", 400);
    }

    return {
      message: ctx.user
        ? "Hello world and to you, my logged in user."
        : "Hello world, and to you, my unauthenticated subject.",
    };
  },
  ctx: { user: getUserProfile },
});

export type HelloWorld = typeof handler;

export const action = async (ctx: DataFunctionArgs) => {
  return handler(ctx);
};
