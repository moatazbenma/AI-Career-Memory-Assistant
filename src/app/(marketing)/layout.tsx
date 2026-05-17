import { Navbar } from "@/components/layout/Navbar"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
