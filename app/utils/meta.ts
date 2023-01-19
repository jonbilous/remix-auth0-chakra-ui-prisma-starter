import brand from "brand";

export const title = (title: string) => {
  return [title, brand.name].join(" | ");
};
