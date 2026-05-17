import { Sidebar } from "@/components/layout/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        {/* Background glow decoration */}
        <div className="absolute inset-0 z-[-1] bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.1),transparent_40%)]"></div>
        <div className="absolute inset-0 z-[-1] bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.1),transparent_40%)]"></div>
        <div className="p-8 h-full">
          {children}
        </div>
      </main>
    </div>
  )
}
