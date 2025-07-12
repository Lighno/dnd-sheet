import {
  ErrorComponent,
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "../components/Header";
import NotFound from "../components/NotFound";

import ClerkProvider from "../integrations/clerk/provider";

import TanstackQueryLayout from "../integrations/tanstack-query/layout";
import { Provider as TanstackQueryProvider } from "../integrations/tanstack-query/root-provider";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  component: () => (
    <RootDocument>
      <ClerkProvider>
        <TanstackQueryProvider>
          <Header />

          <Outlet />
          <TanStackRouterDevtools />

          <TanstackQueryLayout />
        </TanstackQueryProvider>
      </ClerkProvider>
    </RootDocument>
  ),
  errorComponent: ErrorComponent,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
