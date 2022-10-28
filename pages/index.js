import { useState, useEffect } from "react";
import Head from "next/head";
import Auth from '../components/Auth'
import Layout, { siteTitle } from "../components/Layout";
import TodoList from "../components/TodoList";
import { supabase } from "../lib/supabaseClient";
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Login from "../components/Login";

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

 
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
      {session ? <TodoList session={session} /> : <Login />}
    </div>
  </Layout>
  )
}

