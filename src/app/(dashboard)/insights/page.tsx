import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

export default function JobFitInsightsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Job Fit Insights</h1>
        <p className="text-muted-foreground">AI analysis of your skills compared to the current market and target roles.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 glass border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Overall Match</CardTitle>
            <CardDescription>Based on your recent JD</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-4 border-muted">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-muted" />
                <circle 
                  cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="4" fill="transparent" 
                  strokeDasharray="364" strokeDashoffset={364 - (364 * 72) / 100} 
                  className="text-primary glow-cyan transition-all duration-1000" 
                />
              </svg>
              <div className="text-4xl font-bold text-glow-cyan">72%</div>
            </div>
            <p className="mt-6 font-medium text-foreground">Backend Developer</p>
          </CardContent>
        </Card>

        <div className="md:col-span-2 flex flex-col gap-4">
          <Card className="flex-1 border-green-500/20 bg-green-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-green-400">
                <CheckCircle2 className="h-4 w-4" /> Strength Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-green-500/30 text-green-400">Node.js Ecosystem</Badge>
                <Badge variant="outline" className="border-green-500/30 text-green-400">REST APIs</Badge>
                <Badge variant="outline" className="border-green-500/30 text-green-400">Next.js Frontends</Badge>
                <Badge variant="outline" className="border-green-500/30 text-green-400">LangChain</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 border-red-500/20 bg-red-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-red-400">
                <AlertCircle className="h-4 w-4" /> Missing Skills (Skill Gap)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="destructive" className="bg-red-500/20 text-red-400 hover:bg-red-500/30">Redis Caching</Badge>
                <Badge variant="destructive" className="bg-red-500/20 text-red-400 hover:bg-red-500/30">Docker / Containers</Badge>
                <Badge variant="destructive" className="bg-red-500/20 text-red-400 hover:bg-red-500/30">CI/CD Pipelines</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <TrendingUp className="h-5 w-5" /> Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="bg-purple-500/20 p-2 rounded-full mt-0.5">
                <Target className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <p className="font-medium">Dockerize your Next.js AI Agent</p>
                <p className="text-sm text-muted-foreground mt-1">This will address your "Docker" skill gap and add a deployment achievement to your memory.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-purple-500/20 p-2 rounded-full mt-0.5">
                <Target className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <p className="font-medium">Implement Redis Caching in Finance Dashboard</p>
                <p className="text-sm text-muted-foreground mt-1">Cache API responses to reduce latency and demonstrate backend performance optimization skills.</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
