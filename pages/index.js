import { useState, useEffect } from "react";

import Head from "next/head";
import Image from "next/image";
import Auth from "../components/Auth";
import Layout, { siteTitle } from "../components/Layout";
import TodoList from "../components/TodoList";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Layout >
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="w-screen h-screen">
        {session ? <TodoList session={session} /> : <Auth />}
      </div>
    </Layout>
  );
}
