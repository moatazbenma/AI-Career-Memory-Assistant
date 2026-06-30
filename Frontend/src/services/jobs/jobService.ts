import { apiClient } from '../api'

export interface Job {
    id: number
    job_title: string
    job_description: string
    created_at: string
}

export interface CreateJobInput {
    job_title: string
    job_description: string
}

// Get all jobs for the authenticated user
export const getJobs = async (): Promise<Job[]> => {
    const response = await apiClient.get('/jobs/')
    return response.data
}

// Get a specific job by ID
export const getJob = async (jobId: number): Promise<Job> => {
    const response = await apiClient.get(`/jobs/${jobId}/`)
    return response.data
}

// Create a new job
export const createJob = async (data: CreateJobInput): Promise<Job> => {
    const response = await apiClient.post('/jobs/', data)
    return response.data
}

// Update a job (full update)
export const updateJob = async (jobId: number, data: Partial<CreateJobInput>): Promise<Job> => {
    const response = await apiClient.put(`/jobs/${jobId}/`, data)
    return response.data
}

// Partially update a job
export const partialUpdateJob = async (jobId: number, data: Partial<CreateJobInput>): Promise<Job> => {
    const response = await apiClient.patch(`/jobs/${jobId}/`, data)
    return response.data
}

// Delete a job
export const deleteJob = async (jobId: number): Promise<void> => {
    await apiClient.delete(`/jobs/${jobId}/`)
}
