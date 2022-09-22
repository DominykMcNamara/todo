import Head from "next/head";
import Image from "next/image";
import Layout, {siteTitle} from "../components/Layout";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </Layout>
  );
}
