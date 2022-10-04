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
      </Head>
      <main>
       <div className="mx-auto text-center">
        <h1 className="font-semibold text-6xl mt-10">TODO</h1>
        </div>
        {children}
      </main>
    </div>
  );
}
