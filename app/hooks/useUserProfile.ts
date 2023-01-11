import { useRouteLoaderData } from "@remix-run/react";
import type { loader } from "~/root";
import type { LoaderData } from "~/utils/remix";

export const useUserProfile = () => {
  const rootData = useRouteLoaderData("root") as LoaderData<typeof loader>;

  return rootData.profile;
};
