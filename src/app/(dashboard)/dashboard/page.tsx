import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, FolderGit2, Star, GitBranch, ArrowRight, Activity } from "lucide-react"
import Link from "next/link"

const mockProjects = [
  {
    id: "1",
    name: "ecommerce-ai-agent",
    description: "An AI customer support agent using LangChain and Next.js.",
    language: "TypeScript",
    stars: 12,
    forks: 2,
    updatedAt: "2 days ago",
    matchScore: 92,
  },
  {
    id: "2",
    name: "finance-dashboard",
    description: "Real-time crypto and stock tracking dashboard.",
    language: "React",
    stars: 45,
    forks: 12,
    updatedAt: "1 week ago",
    matchScore: 78,
  },
  {
    id: "3",
    name: "go-microservices",
    description: "High performance order processing system.",
    language: "Go",
    stars: 8,
    forks: 1,
    updatedAt: "3 weeks ago",
    matchScore: 64,
  }
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Manage your connected repositories and career memory.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Connected Repos</CardTitle>
            <Github className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground mt-1">+3 since last month</p>
          </CardContent>
        </Card>
        
        <Card className="hover:border-purple-500/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Generated Resumes</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-glow-cyan">5</div>
            <p className="text-xs text-muted-foreground mt-1">2 high-match scores</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link href="/resume" className="w-full">
              <Button size="sm" className="w-full justify-between group">
                Tailor Resume <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/interview" className="w-full">
              <Button size="sm" variant="outline" className="w-full justify-between group bg-background/50">
                Prep Interview <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FolderGit2 className="h-5 w-5 text-primary" />
            Recent Projects
          </h2>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockProjects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-bold text-foreground">
                    {project.name}
                  </CardTitle>
                  <Badge variant="outline" className="ml-2 font-normal text-xs bg-background/50">
                    {project.language}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2 mt-2 h-10">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pb-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" /> {project.stars}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitBranch className="h-3 w-3" /> {project.forks}
                  </div>
                  <div className="ml-auto">
                    {project.updatedAt}
                  </div>
                </div>
              </CardContent>
              <div className="px-6 pb-6 pt-0 mt-auto">
                <Link href={`/projects/${project.id}`}>
                  <Button variant="secondary" className="w-full h-8 text-xs">
                    Analyze Project
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
