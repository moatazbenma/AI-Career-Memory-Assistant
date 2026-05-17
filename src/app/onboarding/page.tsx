"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Loader2, CheckCircle2, Database, BrainCircuit } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [loading, setLoading] = useState(false)

  const handleConnect = () => {
    setLoading(true)
    // Mock OAuth delay
    setTimeout(() => {
      setLoading(false)
      setStep(2)
    }, 1500)
  }

  const handleAnalyze = () => {
    setLoading(true)
    // Mock Repository Fetching and Analysis Delay
    setTimeout(() => {
      setLoading(false)
      setStep(3)
    }, 3000)
  }

  const handleFinish = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(6,182,212,0.1),rgba(11,15,25,1))]"></div>

      <div className="w-full max-w-md">
        {step === 1 && (
          <Card className="border-primary/20 shadow-lg shadow-primary/5 animate-in fade-in zoom-in duration-500">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-primary/20">
                <Github className="h-6 w-6 text-primary glow-cyan" />
              </div>
              <CardTitle className="text-2xl">Connect GitHub</CardTitle>
              <CardDescription>Link your account to import your projects</CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground pb-6">
              CareerMind AI needs read-only access to your public and private repositories to extract technical features, stack details, and contributions.
            </CardContent>
            <CardFooter>
              <Button onClick={handleConnect} disabled={loading} className="w-full gap-2" size="lg">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Github className="h-5 w-5" />}
                {loading ? "Connecting..." : "Authorize with GitHub"}
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-purple-500/20 shadow-lg shadow-purple-500/5 animate-in slide-in-from-right duration-500">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto bg-purple-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-purple-500/20">
                <Database className="h-6 w-6 text-purple-400" />
              </div>
              <CardTitle className="text-2xl">Analyze Repositories</CardTitle>
              <CardDescription>We found 14 repositories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <div className="rounded-lg border border-border bg-background/50 p-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <div className="flex-1 h-4 bg-muted rounded skeleton" />
                  </div>
                ))}
                <div className="text-xs text-center text-muted-foreground pt-2">
                  + 11 more repositories
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAnalyze} disabled={loading} variant="secondary" className="w-full gap-2" size="lg">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <BrainCircuit className="h-5 w-5" />}
                {loading ? "Extracting Memories..." : "Start AI Analysis"}
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card className="border-green-500/20 shadow-lg shadow-green-500/5 animate-in slide-in-from-bottom duration-500">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto bg-green-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-green-500/20">
                <CheckCircle2 className="h-6 w-6 text-green-400" />
              </div>
              <CardTitle className="text-2xl">You're All Set!</CardTitle>
              <CardDescription>Your career memory is ready</CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground pb-6">
              We've successfully extracted your technical achievements. You can now start generating tailored resumes and practicing mock interviews.
            </CardContent>
            <CardFooter>
              <Button onClick={handleFinish} className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white" size="lg">
                Go to Dashboard
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
