import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { useEffect } from "react";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Always call hooks before any conditional return statements
  useEffect(() => {
    if (status === "unauthenticated" && router.pathname !== "/login") {
      router.replace("/login"); // Redirect unauthenticated users to login
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Checking authentication...</p>
      </div>
    );
  }

  // Allow access to the login page, even if not authenticated
  if (router.pathname === "/login") {
    return <>{children}</>;
  }

  // Ensure session exists before rendering any protected page
  if (!session) {
    return null;
  }

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <HeroUIProvider>
        <NextThemesProvider>
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        </NextThemesProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
