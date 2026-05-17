import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, BrainCircuit } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b glass">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <BrainCircuit className="h-6 w-6 text-primary glow-cyan" />
          <span className="text-lg font-bold text-glow-cyan">CareerMind AI</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="#demo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="hidden sm:flex">Dashboard</Button>
          </Link>
          <Button className="gap-2">
            <Github className="h-4 w-4" />
            Login with GitHub
          </Button>
        </div>
      </div>
    </header>
  )
}
