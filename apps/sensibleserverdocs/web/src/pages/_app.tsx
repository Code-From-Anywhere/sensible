import "../globals.css";
import type { AppProps } from "next/app";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";

import { StoreProvider } from "../store";
import { ToastContainer } from "react-with-native-notification";
import Head from "next/head";
import nightwind from "nightwind/helper";
import { ThemeProvider } from "next-themes";

const progress = new ProgressBar();

//Binding events.
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      structuralSharing: false,
      retry: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <StoreProvider>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: nightwind.init() }} />
        </Head>
        <ThemeProvider
          attribute="class"
          storageKey="nightwind-mode"
          defaultTheme="system" // default "light"
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}

if (typeof window !== "undefined") {
  const localStoragePersistor = createWebStoragePersistor({
    storage: window.localStorage,
  });
  persistQueryClient({
    queryClient,
    persistor: localStoragePersistor,
  });
}

export default MyApp;
