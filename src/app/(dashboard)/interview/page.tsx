import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BrainCircuit, MessageSquare, Code, PlayCircle } from "lucide-react"

export default function InterviewPrepPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Interview Prep</h1>
          <p className="text-muted-foreground">Personalized mock questions based on your technical memory.</p>
        </div>
        <Button className="gap-2 bg-purple-600 hover:bg-purple-700 text-white hover:glow-purple">
          <PlayCircle className="h-4 w-4" /> Start AI Mock Interview
        </Button>
      </div>

      <div className="grid gap-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 mt-4">
          <Code className="h-5 w-5 text-cyan-400" />
          Technical Deep Dives
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <QuestionCard 
            title="Next.js App Router"
            project="ecommerce-ai-agent"
            question="Why did you choose the App Router over the Pages router in your eCommerce AI agent? What caching challenges did you face?"
          />
          <QuestionCard 
            title="Vector Search Optimization"
            project="ecommerce-ai-agent"
            question="Can you explain how you optimized the vector search pipeline to reduce latency by 35%?"
          />
        </div>

        <h2 className="text-xl font-semibold flex items-center gap-2 mt-8">
          <MessageSquare className="h-5 w-5 text-purple-400" />
          Behavioral & Scenario
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <QuestionCard 
            title="Handling Technical Debt"
            project="General"
            question="Tell me about a time you had to compromise code quality for a hackathon deadline. How did you plan to fix it later?"
            isBehavioral
          />
          <QuestionCard 
            title="Overcoming Blocks"
            project="finance-dashboard"
            question="What was the hardest bug you faced while implementing WebSockets in your finance dashboard, and how did you debug it?"
            isBehavioral
          />
        </div>
      </div>
    </div>
  )
}

function QuestionCard({ title, project, question, isBehavioral = false }: { title: string, project: string, question: string, isBehavioral?: boolean }) {
  return (
    <Card className="hover:border-primary/30 transition-all flex flex-col group relative overflow-hidden">
      {/* Subtle background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0" />
      
      <CardHeader className="pb-3 z-10">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base text-foreground">{title}</CardTitle>
          <Badge variant={isBehavioral ? "secondary" : "default"} className="text-[10px] px-2 py-0">
            {project}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="z-10">
        <p className="text-sm text-muted-foreground italic">&ldquo;{question}&rdquo;</p>
      </CardContent>
      <div className="px-6 pb-4 mt-auto z-10">
        <Button variant="ghost" size="sm" className="w-full h-8 gap-2 text-xs hover:bg-background/80">
          <BrainCircuit className="h-3 w-3" /> Get Hints
        </Button>
      </div>
    </Card>
  )
}
