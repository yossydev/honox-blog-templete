import type { FC } from "hono/jsx";
import type { Manifest } from "vite";

type Options = {
  src: string;
  manifest?: Manifest;
};

export const Script: FC<Options> = async (options) => {
  const src = options.src;
  if (import.meta.env.PROD) {
    let manifest: Manifest | undefined = options.manifest;
    if (!manifest) {
      const MANIFEST = import.meta.glob<{ default: Manifest }>(
        "/dist/.vite/manifest.json",
        {
          eager: true,
        },
      );
      for (const [, manifestFile] of Object.entries(MANIFEST)) {
        console.log("manifestFile", manifestFile);
        if (manifestFile.default) {
          manifest = manifestFile.default;
          break;
        }
      }
    }
    if (manifest) {
      const scriptInManifest = manifest[src.replace(/^\//, "")];
      if (scriptInManifest) {
        return <script type="module" src={`/${scriptInManifest.file}`} />;
      }
    }
    return <></>;
  }
  return <script type="module" src={src} />;
};
