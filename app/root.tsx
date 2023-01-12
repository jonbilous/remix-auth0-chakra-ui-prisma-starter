import { ChakraProvider } from "@chakra-ui/react";
import type { DataFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import brand from "brand";
import EmotionDocumentWrapper from "./chakra/components/EmotionDocumentWrapper";
import { getUserProfile } from "./utils/auth/profile.server";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: brand.name,
  viewport: "width=device-width,initial-scale=1",
});

export const loader = async (ctx: DataFunctionArgs) => {
  const profile = await getUserProfile(ctx);

  return json({ profile });
};

export default function App() {
  return (
    <EmotionDocumentWrapper>
      <ChakraProvider>
        <Outlet />
      </ChakraProvider>
    </EmotionDocumentWrapper>
  );
}
