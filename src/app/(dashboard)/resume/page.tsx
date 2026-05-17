import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Sparkles, Download, CheckCircle2 } from "lucide-react"

export default function ResumeGeneratorPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto h-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Tailored Resume Generator</h1>
        <p className="text-muted-foreground">Paste a Job Description to generate ATS-optimized STAR bullet points.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 h-[calc(100vh-12rem)]">
        {/* Input Section */}
        <Card className="flex flex-col border-primary/20 bg-background/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Job Description
            </CardTitle>
            <CardDescription>Paste the target role description here</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <textarea 
              className="w-full h-full min-h-[300px] resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="e.g. We are looking for a Software Engineer with experience in React, Node.js, and AWS..."
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full gap-2">
              <Sparkles className="h-4 w-4" />
              Generate Magic Bullets
            </Button>
          </CardFooter>
        </Card>

        {/* Output Section */}
        <Card className="flex flex-col border-purple-500/20 bg-background/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <Badge variant="glow" className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> ATS Score: 92%
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-glow-purple">
              <Sparkles className="h-5 w-5 text-purple-400" />
              AI Output
            </CardTitle>
            <CardDescription>Tailored STAR-format bullet points</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-foreground">ecommerce-ai-agent</h4>
              <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
                <li className="leading-relaxed"><strong className="text-foreground">Built</strong> a full-stack AI chatbot using Next.js, LangChain, and OpenAI APIs, reducing response latency by 35% through optimized vector search pipelines.</li>
                <li className="leading-relaxed"><strong className="text-foreground">Engineered</strong> an automated metadata extraction flow utilizing advanced NLP to parse raw project repositories into structured insights.</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-foreground">finance-dashboard</h4>
              <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
                <li className="leading-relaxed"><strong className="text-foreground">Developed</strong> a real-time tracking interface using React and WebSockets, rendering live stock updates with minimal re-renders.</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="secondary" className="flex-1 gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" className="flex-1">Copy All</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
