import "@/styles/globals.css";
import "@/styles/components.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { initGA, logPageView } from "@/lib/ga";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    initGA();
    logPageView(window.location.pathname + window.location.search);

    const handleRouteChange = (url: string) => {
      logPageView(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={inter.variable}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </>
  );
}
