"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User, Headphones, Settings, Lock, LogOut } from "lucide-react";

export default function SettingPage() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Logout gagal: " + error.message);
    } else {
      router.push("/login");
    }
  };

  const menuItems = [
    { name: "Data Diri", href: "/dashboard/settings", icon: <User size={18} /> },
    { name: "CS Support", href: "/dashboard/settings", icon: <Headphones size={18} /> },
    { name: "Preferences", href: "/dashboard/settings", icon: <Settings size={18} /> },
    { name: "Security", href: "/dashboard/settings", icon: <Lock size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F0] md:px-10 md:py-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#4B2E2B] mb-6">
        Settings
      </h1>

      <div className="bg-white p-2 rounded-md shadow-sm">
        {menuItems.map((item, index) => ( 
          <div key={index}>
            <Link
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-lg text-[#4B2E2B]"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
            {index !== menuItems.length - 1 && <hr className="border-gray-200 my-1" />}
          </div>
        ))}

        <div className="mt-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-[#FFF0E5] text-red-600 font-semibold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}