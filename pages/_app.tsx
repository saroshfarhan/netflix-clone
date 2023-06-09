import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>FullStack</title>
        <link href="/favicon.ico" rel="icon" type="image/x-icon" />
        <meta property="og:title" content="fullstack app" key="title" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
