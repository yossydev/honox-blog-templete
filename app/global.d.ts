import {} from "hono";

type Head = {
  title?: string;
  description?: string;
};

declare module "hono" {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      head?: Head & { frontmatter?: Head; description?: string },
    ): Response | Promise<Response>;
  }
}
