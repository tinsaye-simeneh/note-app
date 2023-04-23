import Head from "next/head";
import supabase from "../utilities/supabaseClient";

export default function Home() {
  const { user } = supabase.auth;

  return (
    <div>
      <Head>
        <title>Personal Todo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main></main>
    </div>
  );
}
