import type { Metadata } from "next";
import "./globals.css";
import { global } from "./fonts";
import ConditionalLayout from "../components/conditional-layout";
import { AuthProvider } from "../contexts/AuthContext";


export const metadata: Metadata = {
  title: "Quick Hire - Connect Local Skills with Local Opportunities",
  description: "Bridge the gap between talented individuals and businesses in your community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${global.variable} antialiased`}
      >
        <AuthProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
