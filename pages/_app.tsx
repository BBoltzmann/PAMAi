import '@/styles/globals.css';
import type { AppProps } from 'next/app'
import type { NextPage } from "next";
import { ReactElement, ReactNode, useEffect } from "react";
// import { client } from "@/utils";
import { Toaster } from "@/components/ui/toaster"
import NextNProgress from "nextjs-progressbar";
import { useRouter } from 'next/router';


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
        <NextNProgress
          color="#000000"
          startPosition={0.3}
          stopDelayMs={200}
          height={2}
          showOnShallow={true}
          options={{ showSpinner: true }}
        />
        <Toaster />
        {getLayout(<Component {...pageProps} />)}
    </>
  );
}
