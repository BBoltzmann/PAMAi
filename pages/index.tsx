import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Nubytes Admin for Lawyers</title>
        <meta name="description" content="Admin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center pt-14 font-bold">
        <h1 className="text-xl">Welcome to the admin UI</h1></div>
    </>
  );
}
