import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { renderToString } from "react-dom/server";
import { ServerStyleContext } from "~/chakra/context";
import createEmotionCache from "~/chakra/createEmotionCache";

export default function emotionSSR(children: React.ReactNode) {
  const cache = createEmotionCache();

  const { extractCriticalToChunks } = createEmotionServer(cache);

  const html = renderToString(
    <ServerStyleContext.Provider value={null}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ServerStyleContext.Provider>
  );

  const chunks = extractCriticalToChunks(html);

  return renderToString(
    <ServerStyleContext.Provider value={chunks.styles}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ServerStyleContext.Provider>
  );
}
