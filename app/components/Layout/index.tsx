import { Flex } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import Navigation from "../Navigation";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Flex direction={"column"}>
      <Navigation />
      {children}
    </Flex>
  );
}
