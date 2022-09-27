import Head from "next/head";

export const siteTitle = "Todo App";

export default function Layout({ children }) {
  return (
    <div className="h-screen w-screen">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="Todo" content="A Todo app with user authentication" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <script src="https://kit.fontawesome.com/6331833db0.js" crossorigin="anonymous"></script>
      </Head>
      <main>
        <h1 className="text-center font-semibold text-6xl mt-96">TODO</h1>
        {children}</main>
    </div>
  );
}
