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
      <body className={`antialiased ${geistSans.variable} ${geistMono.variable}`}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ""}>
          <AllPageLoader />
          <StoreProvider user={user?.user ?? null}>{children}</StoreProvider>
          <Toaster
            toastOptions={{
              success: {
                style: {
                  background: "#28a745",
                  color: "#fff",
                  borderRadius: "8px",
                },
              },
              error: {
                style: {
                  background: "#dc3545",
                  color: "#fff",
                  borderRadius: "8px",
                },
              },
              style: {
                background: "#333",
                color: "#fff",
                borderRadius: "8px",
              },
            }}
          />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
