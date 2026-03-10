import Navigation from "@/components/Navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navigation />
      <main className="md:ml-56 pb-20 md:pb-0 p-6">
        {children}
      </main>
    </div>
  );
}