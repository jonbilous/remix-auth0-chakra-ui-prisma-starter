import type { MetaFunction, TypedResponse } from "@remix-run/node";
import type { useLoaderData } from "@remix-run/react";

type InferJSONData<T> = T extends TypedResponse<infer R> ? R : T;

type Fn = (...args: any[]) => any;

type InferLoaderData<T extends Fn> = InferJSONData<Awaited<ReturnType<T>>>;

type FirstArg<T> = T extends (...args: infer A) => any ? A[0] : never;

type MetaFunctionArgs<T extends Fn> = Omit<FirstArg<MetaFunction>, "data"> & {
  data: InferLoaderData<T>;
};

export type TypedMetaFunction<T extends Fn> = (
  args: MetaFunctionArgs<T>
) => ReturnType<MetaFunction>;

export type LoaderData<T> = ReturnType<typeof useLoaderData<T>>;
