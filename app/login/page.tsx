"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] px-4 sm:px-6">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4B2E2B] mb-6 text-center">
          Masuk
        </h1>

        <input
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-[#4B2E2B] placeholder:text-[#8C5A3C] focus:outline-none focus:ring-2 focus:ring-[#C08552]"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-[#4B2E2B] placeholder:text-[#8C5A3C] focus:outline-none focus:ring-2 focus:ring-[#C08552]"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-[#C08552] text-white py-3 rounded-lg font-medium hover:bg-[#8C5A3C] transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-6 text-[#8C5A3C]">
          Belum punya akun?{" "}
          <Link href="/register" className="font-semibold text-[#4B2E2B]">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
