import { Flex } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export default function Contained({ children }: PropsWithChildren) {
  return (
    <Flex flex={1} justifyContent={"center"}>
      <Flex p={2} flex={1} maxW="1300px">
        {children}
      </Flex>
    </Flex>
  );
}
