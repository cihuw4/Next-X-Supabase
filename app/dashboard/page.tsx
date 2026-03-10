"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: string;
};

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
};

const formatInputRupiah = (value: string) => {
  const number = value.replace(/\D/g, "");
  return new Intl.NumberFormat("id-ID").format(Number(number));
};

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState("expense");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const getTransactions = async () => {
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setTransactions(data);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmount(formatInputRupiah(value));
  };

  const addTransaction = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("User belum login");
      return;
    }

    const cleanAmount = Number(amount.replace(/\./g, ""));

    const { error } = await supabase.from("transactions").insert([
      {
        title,
        amount: cleanAmount,
        type,
        user_id: user.id,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      setTitle("");
      setAmount("");
      getTransactions();
    }
  };

  const deleteTransaction = async (id: string) => {
    await supabase.from("transactions").delete().eq("id", id);
    getTransactions();
  };

  useEffect(() => {
    const loadTransactions = async () => {
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setTransactions(data);
      }
    };

    loadTransactions();
  }, []);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="min-h-screen bg-[#FFF8F0] px-4 py-6 md:px-10 md:py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#4B2E2B] mb-6 md:mb-10">
          DompetDuit
        </h1>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-10">

          {/* Saldo */}
          <div className="col-span-2 sm:col-span-1 bg-white p-5 md:p-6 rounded-xl shadow-sm">
            <p className="text-sm text-[#8C5A3C] mb-1">Saldo</p>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#4B2E2B] leading-tight break-words">
              {formatRupiah(balance)}
            </h2>
          </div>

          {/* Duit Masuk */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <p className="text-xs md:text-sm text-[#8C5A3C] mb-1">
              Duit Masuk
            </p>

            <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-green-600 leading-tight break-words">
  {formatRupiah(income)}
</h2>
          </div>

          {/* Duit Keluar */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <p className="text-xs md:text-sm text-[#8C5A3C] mb-1">
              Duit Keluar
            </p>

            <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-red-600 leading-tight break-words">
              {formatRupiah(expense)}
            </h2>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-5 md:p-7 rounded-xl shadow-sm mb-8 md:mb-10">

          <h2 className="font-semibold text-[#4B2E2B] mb-4 text-lg">
            Tambah Transaksi
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

            <input
              className="border p-3 rounded-lg text-[#4B2E2B] placeholder:text-[#8C5A3C] focus:outline-none focus:ring-2 focus:ring-[#C08552]"
              placeholder="Nama transaksi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="border p-3 rounded-lg text-[#4B2E2B] placeholder:text-[#8C5A3C] focus:outline-none focus:ring-2 focus:ring-[#C08552]"
              inputMode="numeric"
              placeholder="Jumlah"
              value={amount}
              onChange={handleAmountChange}
            />

            <select
              className="border p-3 rounded-lg text-[#4B2E2B] focus:outline-none focus:ring-2 focus:ring-[#C08552]"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="expense">Duit Keluar</option>
              <option value="income">Duit Masuk</option>
            </select>

            <button
              onClick={addTransaction}
              className="bg-[#C08552] text-white rounded-lg py-3 hover:bg-[#8C5A3C] transition w-full"
            >
              Tambah
            </button>

          </div>

        </div>

        {/* List transaksi */}
        <div className="bg-white rounded-xl shadow-sm">

          <div className="p-5 md:p-6 border-b">
            <h2 className="font-semibold text-[#4B2E2B] text-lg">
              Riwayat Transaksi
            </h2>
          </div>

          {transactions.length === 0 && (
            <p className="p-6 text-center text-[#8C5A3C]">
              Belum ada transaksi
            </p>
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

                <button
                  onClick={() => deleteTransaction(t.id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Hapus
                </button>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}