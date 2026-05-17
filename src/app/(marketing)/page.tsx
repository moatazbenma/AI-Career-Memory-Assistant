import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, ArrowRight, BrainCircuit, Code, FileText, CheckCircle } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 lg:py-48 flex flex-col items-center justify-center text-center px-4">
        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 glow-cyan">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          AI-Powered Career Memory Assistant
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mb-6 text-glow">
          Turn Your Projects Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Career Proof</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
          Never forget what you built. Connect your GitHub, and let AI automatically extract your achievements, generate tailored resume bullets, and prep you for interviews.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto font-semibold gap-2">
              <Github className="h-5 w-5" />
              Connect GitHub
            </Button>
          </Link>
          <Link href="#demo">
            <Button variant="glass" size="lg" className="w-full sm:w-auto gap-2">
              See Demo <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="w-full py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to land the job</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">From raw code to polished STAR-format resume bullet points in seconds.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Code className="h-8 w-8 text-cyan-400" />}
            title="Repository Analysis"
            description="Our AI instantly scans your code, dependencies, and commits to understand exactly what you built and the challenges you solved."
          />
          <FeatureCard 
            icon={<FileText className="h-8 w-8 text-purple-400" />}
            title="Tailored Resumes"
            description="Paste a job description, and instantly get ATS-optimized, STAR-format bullet points tailored specifically for the role."
          />
          <FeatureCard 
            icon={<BrainCircuit className="h-8 w-8 text-emerald-400" />}
            title="Interview Prep"
            description="Generate customized technical and behavioral interview questions based on the exact tech stack you used."
          />
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass p-8 rounded-2xl flex flex-col items-start transition-all hover:-translate-y-1 hover:border-primary/50 hover:glow-cyan">
      <div className="p-3 bg-primary/10 rounded-lg mb-6 border border-primary/20">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
