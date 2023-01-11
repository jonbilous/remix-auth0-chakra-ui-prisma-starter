interface CdnImageParams {
  src: string;
  width: number;
  quality?: number;
}

export const cdnImage = ({ src, ...params }: CdnImageParams) => {
  const cdnConfig = { format: "webp", ...params };

  const configAsString = Object.entries(cdnConfig)
    .flatMap(([key, value]) => {
      return value ? [key, value].join("=") : [];
    })
    .join(",");

  return `https://jonbilous.com/cdn-cgi/image/${configAsString}/${src}`;
};
