import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Code2, Server, Database, BrainCircuit, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProjectAnalysisPage({ params }: { params: { id: string } }) {
  // Mock data for the specific project
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
      <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 mb-2 w-fit">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>
      
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">ecommerce-ai-agent</h1>
            <Badge variant="glow">High Impact</Badge>
          </div>
          <p className="text-muted-foreground flex items-center gap-2">
            <Github className="h-4 w-4" /> github.com/user/ecommerce-ai-agent
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <BrainCircuit className="h-4 w-4 text-primary" />
          Re-Analyze Project
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-4">
        {/* Memory Panel */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Generated Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A full-stack customer support agent built for eCommerce platforms. It uses Next.js for the frontend, FastAPI for the backend, and LangChain with OpenAI to power conversational RAG (Retrieval-Augmented Generation) against a product catalog stored in Pinecone.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg text-primary flex items-center gap-2">
                <BrainCircuit className="h-5 w-5" /> Extracted Career Memories
              </CardTitle>
              <CardDescription>These will be used for your resume and interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Vector Search Integration</p>
                    <p className="text-xs text-muted-foreground">Implemented Pinecone vector database to enable semantic search over 10,000+ products.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Optimized LLM Latency</p>
                    <p className="text-xs text-muted-foreground">Reduced response time by 35% through query caching and async chunk streaming.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Full-Stack Auth</p>
                    <p className="text-xs text-muted-foreground">Built secure JWT authentication via NextAuth.js.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Panel */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Code2 className="h-4 w-4 text-cyan-400" /> Frontend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Next.js 14</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
                <Badge variant="secondary">Zustand</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Server className="h-4 w-4 text-purple-400" /> Backend & AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">FastAPI</Badge>
                <Badge variant="secondary">LangChain</Badge>
                <Badge variant="secondary">OpenAI API</Badge>
                <Badge variant="secondary">Python</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Database className="h-4 w-4 text-emerald-400" /> Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">PostgreSQL</Badge>
                <Badge variant="secondary">Pinecone DB</Badge>
                <Badge variant="secondary">Prisma</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
