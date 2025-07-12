import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

import { env } from "~/env";

const PUBLISHABLE_KEY = env.VITE_CLERK_PUBLISHABLE_KEY;

export default function AppClerkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{ baseTheme: [dark] }}
    >
      {children}
    </ClerkProvider>
  );
}
