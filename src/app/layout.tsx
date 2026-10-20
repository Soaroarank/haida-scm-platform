import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/shared/sidebar";
import { GlobalStatusBar } from "@/components/shared/global-status-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgriCTS - 大宗农牧供应链期现一体化中台",
  description: "上市公司级全流程期现一体化供应链决策系统",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="sap-container">
            <Sidebar />
            <div className="sap-main">
              <GlobalStatusBar />
              <div className="sap-content">
                {children}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
