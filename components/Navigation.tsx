"use client";

import Link from "next/link";
import { Home, Wallet, History, BarChart3, Settings } from "lucide-react";

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "History", href: "/dashboard/history", icon: History },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Navigation() {
  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-56 bg-[#4B2E2B] text-white flex-col p-5">
        <h1 className="text-xl font-bold mb-10">DompetDuit</h1>

        <nav className="flex flex-col gap-5">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 py-2 px-2 rounded hover:bg-[#C08552] transition-colors"
              >
                <Icon size={20} />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Bottom Nav Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-t flex justify-around py-2">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center text-gray-600 text-xs"
            >
              <Icon size={20} />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}