import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        {/* Logo / Title */}
        <h1 className="text-5xl font-bold text-[#4B2E2B] mb-4">DompetDuit</h1>

        {/* Tagline */}
        <p className="text-lg text-[#8C5A3C] mb-8">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores
          deleniti, quod distinctio omnis facilis aspernatur totam, laudantium
          ipsa consequatur hic est magnam voluptatibus corporis voluptates sint,
          aperiam excepturi! Maiores, quia!
        </p>

        {/* Button */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="bg-[#C08552] text-white px-8 py-3 rounded-lg font-medium shadow hover:bg-[#8C5A3C] transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="border-2 border-[#C08552] text-[#4B2E2B] px-8 py-3 rounded-lg font-medium hover:bg-[#C08552] hover:text-white transition"
          >
            Register
          </Link>
        </div>

        {/* Small description */}
        {/* <p className="mt-10 text-sm text-[#8C5A3C]">
          Kelola keuanganmu dengan lebih mudah dan rapi.
        </p> */}
      </div>
    </div>
  );
}
