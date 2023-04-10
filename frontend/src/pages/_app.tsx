import { LayoutDefault } from "@/components/layout/default";
import { SWRConfig } from "swr";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { fetcher } from "@/lib/fetcher";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <LayoutDefault>
          <Component {...pageProps} />
        </LayoutDefault>
      </SWRConfig>
    </>
  );
}
