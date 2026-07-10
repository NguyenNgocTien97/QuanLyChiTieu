import type { Metadata, Viewport } from "next";
import { BottomNav } from "@/components/layout/BottomNav";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quản Lý Chi Tiêu Tuần",
  description: "Ứng dụng theo dõi và quản lý tài chính cá nhân hàng tuần",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{__html: `if(localStorage.getItem('theme')==='dark'){document.body.classList.add('dark');}`}} />
        <div className="app-container">
          <Providers>
            {children}
            <BottomNav />
          </Providers>
        </div>
      </body>
    </html>
  );
}
