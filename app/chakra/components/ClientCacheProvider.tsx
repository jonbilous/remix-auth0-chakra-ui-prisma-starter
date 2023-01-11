import { CacheProvider } from "@emotion/react";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import { ClientStyleContext } from "../context";
import createEmotionCache, { defaultCache } from "../createEmotionCache";

export default function ClientCacheProvider({ children }: PropsWithChildren) {
  const [cache, setCache] = useState(defaultCache);

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}
