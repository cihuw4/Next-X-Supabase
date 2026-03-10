"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Wallet = {
  id: string;
  name: string;
  balance: number;
};

const formatRupiah = (number: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(number);

export default function WalletPage() {
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    const getWallets = async () => {
      const { data } = await supabase.from("wallets").select("*");
      if (data) setWallets(data);
    };
    getWallets();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8F0] md:px-10 md:py-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#4B2E2B] mb-6">
        Wallet
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wallets.length === 0 && (
          <p className="text-[#8C5A3C]">Belum ada wallet</p>
        )}
        {wallets.map((w) => (
          <div key={w.id} className="bg-white p-5 rounded-md shadow-sm">
            <h2 className="font-semibold text-[#4B2E2B]">{w.name}</h2>
            <p className="text-[#4B2E2B] mt-2">{formatRupiah(w.balance)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}