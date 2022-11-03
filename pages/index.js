import Head from "next/head";

import Layout, { siteTitle } from "../components/Layout";

import Login from "../components/Login";

export default function Home() {
  return (
    <>
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="w-screen h-screen">
        <Login />
      </div>
    </Layout>
    </>
  );
}