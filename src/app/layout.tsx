import type { Metadata } from "next";
import "./globals.css";
import HeaderComponent from "./components/header";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ConnectIn",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <div className="relative flex flex-col">
          <Theme>
            <div>
              {children}
              <Toaster position="bottom-right" />
            </div>
          </Theme>
        </div>
      </body>
    </html>
  );
}
