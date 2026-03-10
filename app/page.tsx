import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-2xl text-center">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4B2E2B] mb-4">
          DompetDuit
        </h1>

        {/* Tagline */}
        <p className="text-sm sm:text-base md:text-lg text-[#8C5A3C] mb-8">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores
          deleniti, quod distinctio omnis facilis aspernatur totam.
        </p>

        {/* Button */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href="/login"
            className="w-full sm:w-auto bg-[#C08552] text-white px-8 py-3 rounded-lg font-medium shadow hover:bg-[#8C5A3C] transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="w-full sm:w-auto border-2 border-[#C08552] text-[#4B2E2B] px-8 py-3 rounded-lg font-medium hover:bg-[#C08552] hover:text-white transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
