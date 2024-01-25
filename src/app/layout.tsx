import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cn } from "~/lib/utils";
import { ThemeProvider } from "~/components/theme-provider";
import { SiteHeader } from "~/components/site-header";
import { TailwindIndicator } from "~/components/tailwind-indicator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Aleph Sheet",
  description: "Interactive D&D Sheet",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  applicationName: "AlephSheet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          `min-h-screen bg-background font-sans antialiased`,
          inter.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
          </div>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
