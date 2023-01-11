import { Button, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import brand from "brand";
import { useUserProfile } from "~/hooks/useUserProfile";
import Contained from "../Contained";

export default function Navigation() {
  const profile = useUserProfile();

  return (
    <Flex shadow="sm" borderBottom="1px" borderColor={"gray.300"}>
      <Contained>
        <Flex>
          <Link to="/">
            <Heading>{brand.name}</Heading>
          </Link>
        </Flex>

        <HStack spacing={4} ml="auto">
          {profile && <Text>{profile.displayName}</Text>}

          {profile ? (
            <Button as="a" href="/auth/logout">
              Logout
            </Button>
          ) : (
            <Button as="a" href="/auth/login">
              Login
            </Button>
          )}
        </HStack>
      </Contained>
    </Flex>
  );
}
