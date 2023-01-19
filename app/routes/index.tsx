import { Button, useToast } from "@chakra-ui/react";
import { fetchAction } from "@jonbilous/easy-remix-apis/client";
import Contained from "~/components/Contained";
import Layout from "~/components/Layout";
import type { HelloWorld } from "./api/hello";

export default function Index() {
  const toast = useToast();

  return (
    <Layout>
      <Contained>
        <Button
          onClick={async () => {
            fetchAction<HelloWorld>("/api/hello", { hello: true }).then((res) =>
              toast({ title: res.message })
            );
          }}
        >
          Try the authentication-aware Hello World API!
        </Button>
      </Contained>
    </Layout>
  );
}
