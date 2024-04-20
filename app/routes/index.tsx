import type { FC } from "hono/jsx";

export default function Top() {
  return (
    <>
      <div class="border-b border-blue-200 mt-10">
        <h1 class="text-2xl font-semibold pb-1">Honox Blog Templete</h1>
      </div>
      <div class="mt-5">
        <p class="font-medium">Honox Blog Templete</p>
      </div>
      <Posts />
    </>
  );
}

const Posts: FC = () => {
  const posts = import.meta.glob<{
    frontmatter: { title: string; date: string; published: boolean };
  }>("./posts/*.mdx", { eager: true });
  const entries = Object.entries(posts).filter(
    ([_, module]) => module.frontmatter.published,
  );

  return (
    <div class="mt-16">
      <ul class="mt-10">
        {entries.map(([id, module]) => (
          <li key={id} class="text-lg mt-2 md:mt-1">
            <span class="tabular-nums tnum">{module.frontmatter.date}: </span>
            <br class="block md:hidden" />
            <a
              class="text-blue-600 underline"
              href={`${id.replace(/\.mdx$/, "")}`}
            >
              {module.frontmatter.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
