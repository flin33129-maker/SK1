import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "SK1 游戏工作站 · 3D 武侠 FPS 游戏合集",
  description:
    "基于 Next.js + Three.js + PostgreSQL 的浏览器 3D 武侠游戏工作站：FPS 大逃杀、屋顶跑酷、守城、竞技场、随机地牢、飞镖靶场，点击即玩，战绩入库。",
  keywords: ["3D FPS", "武侠", "吃鸡", "Three.js", "浏览器游戏", "Next.js"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[#05070f] text-slate-100 antialiased">{children}</body>
    </html>
  );
}
