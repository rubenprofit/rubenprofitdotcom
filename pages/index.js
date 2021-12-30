import Link from "next/link";
import { Layout, Bio, SEO } from "@components/common";
import { getSortedPosts } from "@utils/posts";
import { generateRssPostsFeed } from "@utils/rss";

export default function Home({ posts }) {
  return (
    <Layout>
      <SEO title="Ruben Profit" />
      <Bio className="my-14" />
      {posts.map(({ frontmatter: { title, description, date }, slug }) => (
        <article key={slug}>
          <header className="mb-2">
            <h3 className="mb-2">
              <Link href={"/posts/[slug]"} as={`/posts/${slug}`}>
                <a className="text-4xl font-bold font-display">
                  {title}
                </a>
              </Link>
            </h3>
            <span className="text-xs">{date}</span>
          </header>
          <section className="mb-8">
            <p className="text-md">{description}</p>
          </section>
        </article>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  generateRssPostsFeed();
  const posts = getSortedPosts();

  return {
    props: {
      posts,
    },
  };
}
