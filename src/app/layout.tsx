import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import StoreProvider from "./StoreProvider";
import { getUser } from "@/actions/user_action";
import { AllPageLoader } from "@/components/allloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PriceSphere",
  description: "Find Exclusive Offers",
};

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_API_GOOGLE_CLIENT_ID;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ""}>
          <AllPageLoader />
          <StoreProvider user={user?.user ?? null}>{children}</StoreProvider>
          <Toaster />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
