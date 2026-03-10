"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: string;
};

export default function Dashboard() {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<string>("expense");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // ambil transaksi
  const getTransactions = async () => {
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setTransactions(data);
  };

  // tambah transaksi
  const addTransaction = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("User belum login");
      return;
    }

    const { error } = await supabase.from("transactions").insert([
      {
        title,
        amount,
        type,
        user_id: user.id,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      setTitle("");
      setAmount(0);
      getTransactions();
    }
  };

  // hapus transaksi
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

  // hitung total
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="p-10 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">Finance Dashboard</h1>

      {/* summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-green-100 p-4 rounded">
          <p>Pemasukan</p>
          <h2 className="text-xl font-bold">Rp {income}</h2>
        </div>

        <div className="bg-red-100 p-4 rounded">
          <p>Pengeluaran</p>
          <h2 className="text-xl font-bold">Rp {expense}</h2>
        </div>

        <div className="bg-blue-100 p-4 rounded">
          <p>Saldo</p>
          <h2 className="text-xl font-bold">Rp {balance}</h2>
        </div>
      </div>

      {/* form */}
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2"
          placeholder="Nama transaksi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2"
          type="number"
          placeholder="Jumlah"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <select
          className="border p-2"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">Pengeluaran</option>
          <option value="income">Pemasukan</option>
        </select>

        <button
          onClick={addTransaction}
          className="bg-blue-500 text-white px-4"
        >
          Tambah
        </button>
      </div>

      {/* list transaksi */}
      <div className="space-y-3">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <p className="font-semibold">{t.title}</p>
              <p
                className={
                  t.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                Rp {t.amount}
              </p>
            </div>

            <button
              onClick={() => deleteTransaction(t.id)}
              className="text-red-500"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}