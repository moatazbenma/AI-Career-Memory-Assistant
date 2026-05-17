"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, UserCheck, LineChart, Settings, BrainCircuit } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Resume Gen', href: '/resume', icon: FileText },
  { name: 'Interview Prep', href: '/interview', icon: UserCheck },
  { name: 'Job Fit Insights', href: '/insights', icon: LineChart },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r glass bg-background/50">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary glow-cyan" />
          <span className="font-bold text-glow-cyan text-lg">CareerMind</span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
        <nav className="flex-1 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary glow-cyan border border-primary/20"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="border-t p-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
      </div>
    </div>
  )
}
