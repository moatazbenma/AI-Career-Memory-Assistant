import { apiClient } from '../api'

export interface Result {
    id: number
    analysis: number
    task_id: string
    star_bullets: string
    interview_questions: string
    summary: string
    created_at: string
    task_status?: string
    task_ready?: boolean
}

// Get a specific result by ID with task status
export const getResult = async (resultId: number): Promise<Result> => {
    const response = await apiClient.get(`/results/${resultId}/`)
    return response.data
}

// Get all results for the authenticated user
export const getResults = async (): Promise<Result[]> => {
    const response = await apiClient.get('/results/')
    return response.data
}

export const deleteResult = async (resultId: number): Promise<void> => {
    await apiClient.delete(`/results/${resultId}/`)
}

// Check Celery task status
export const getTaskStatus = async (taskId: string): Promise<{ task_id: string; status: string; ready: boolean; result?: any }> => {
    const response = await apiClient.get(`/task/${taskId}/status/`)
    return response.data
}
