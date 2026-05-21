import { User, Repository, Job, Analysis, Result, AuthResponse } from '@/types'

// Helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * MOCK API SERVICE
 * Replace these functions with actual fetch/axios calls to your backend endpoints once ready.
 */

// --- AUTH APIs ---
export const loginWithGitHub = async (code: string): Promise<AuthResponse> => {
  await delay(1500)
  return {
    token: "mock_jwt_token_12345",
    user: {
      id: "u_1",
      github_id: "gh_123",
      username: "mock_user",
      email: "user@example.com",
      access_token: "mock_gh_token",
      created_at: new Date().toISOString()
    }
  }
}

export const logout = async (): Promise<void> => {
  await delay(500)
}

// --- REPOSITORY APIs ---
export const fetchRepositories = async (token: string): Promise<Repository[]> => {
  await delay(2000)
  return [
    {
      id: "r_1",
      user_id: "u_1",
      repo_name: "ecommerce-ai-agent",
      description: "An AI customer support agent using LangChain and Next.js.",
      metadata: { language: "TypeScript", stars: 12 },
      selected: false
    },
    {
      id: "r_2",
      user_id: "u_1",
      repo_name: "finance-dashboard",
      description: "Real-time crypto and stock tracking dashboard.",
      metadata: { language: "React", stars: 45 },
      selected: false
    }
  ]
}

// --- JOB APIs ---
export const createJob = async (token: string, title: string, description: string): Promise<Job> => {
  await delay(1000)
  return {
    id: "j_1",
    user_id: "u_1",
    job_title: title,
    job_description: description,
    created_at: new Date().toISOString()
  }
}

// --- ANALYSIS APIs ---
export const runAnalysis = async (token: string, jobId: string, repoIds: string[]): Promise<Analysis> => {
  await delay(3000) // Simulating slow AI extraction
  return {
    id: "a_1",
    job_id: jobId,
    repo_id: repoIds[0], // Simplified for mock
    status: 'COMPLETED',
    created_at: new Date().toISOString()
  }
}

// --- RESULT APIs ---
export const getResults = async (token: string, analysisId: string): Promise<Result> => {
  await delay(1000)
  return {
    id: "res_1",
    analysis_id: analysisId,
    star_bullets: [
      "Built a full-stack AI chatbot using Next.js, LangChain, and OpenAI APIs, reducing response latency by 35% through optimized vector search pipelines.",
      "Engineered an automated metadata extraction flow utilizing advanced NLP to parse raw project repositories into structured insights."
    ],
    interview_questions: {
      technical: ["Why did you choose the App Router over the Pages router in your eCommerce AI agent? What caching challenges did you face?"],
      behavioral: ["Tell me about a time you had to compromise code quality for a hackathon deadline. How did you plan to fix it later?"]
    },
    summary: "A full-stack customer support agent built for eCommerce platforms. It uses Next.js for the frontend, FastAPI for the backend, and LangChain with OpenAI to power conversational RAG.",
    created_at: new Date().toISOString()
  }
}
