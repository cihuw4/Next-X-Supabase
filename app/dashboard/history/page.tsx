"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: string;
};

const formatRupiah = (number: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const loadTransactions = async () => {
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setTransactions(data);
    };

    loadTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8F0] md:px-10 md:py-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#4B2E2B] mb-6">
        Riwayat Transaksi
      </h1>

      <div className="bg-white rounded-md shadow-sm">
        {transactions.length === 0 && (
          <p className="p-6 text-center text-[#8C5A3C]">Belum ada transaksi</p>
        )}

        <div className="divide-y">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between p-4 md:p-5"
            >
              <div>
                <p className="font-medium text-[#4B2E2B] text-sm md:text-base">
                  {t.title}
                </p>
                <p
                  className={
                    t.type === "income"
                      ? "text-green-600 font-medium text-sm md:text-base"
                      : "text-red-600 font-medium text-sm md:text-base"
                  }
                >
                  {formatRupiah(t.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}