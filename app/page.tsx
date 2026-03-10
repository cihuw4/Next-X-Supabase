import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Finance Tracker
        </h1>

        <p className="mb-6">
          Aplikasi pencatatan pemasukan dan pengeluaran
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="bg-green-500 text-white px-6 py-2 rounded"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}