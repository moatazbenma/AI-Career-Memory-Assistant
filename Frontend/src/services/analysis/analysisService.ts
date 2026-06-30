import { apiClient } from '../api'

export interface Analysis {
    id: number
    job: number
    repo: number
    status: string
    created_at: string
}

export interface AnalysisResult {
    id: number
    analysis: number
    task_id: string
    star_bullets: string
    interview_questions: string
    summary: string
    created_at: string
}

// Create a new analysis for a specific job and repository
// Returns the associated Result object
export const createAnalysis = async (jobId: number, repoId: number): Promise<AnalysisResult> => {
    const response = await apiClient.post('/analysis/create/', {
        job_id: jobId,
        repo_id: repoId,
    })
    return response.data
}

// Get all analyses
export const getAnalyses = async (): Promise<Analysis[]> => {
    const response = await apiClient.get('/analysis/')
    return response.data
}
