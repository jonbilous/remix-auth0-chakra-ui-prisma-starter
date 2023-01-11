import type React from "react";
import { useContext } from "react";

export const createContextConsumer = <Props>(
  ctx: React.Context<Props | null>
) => {
  return () => {
    const context = useContext(ctx);

    if (!context) {
      throw new Error("Could not get context.");
    }

    return context;
  };
};
