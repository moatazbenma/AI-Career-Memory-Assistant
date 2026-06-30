import { apiClient } from '../api'

export interface Repository {
    id: number
    repo_name: string
    description: string
    selected: boolean
    metadata?: Record<string, any>
}

// Fetch repositories from GitHub and sync them to the database
export const fetchRepositoriesFromGithub = async (): Promise<Repository[]> => {
    const response = await apiClient.get('/repos/fetch/')
    return response.data
}

// Get list of repositories from the database
export const getRepositories = async (): Promise<Repository[]> => {
    const response = await apiClient.get('/repos/')
    return response.data
}

// Get a specific repository by ID
export const getRepository = async (repoId: number): Promise<Repository> => {
    const response = await apiClient.get(`/repos/${repoId}/`)
    return response.data
}

// Update repository selection status
export const updateRepository = async (repoId: number, data: Partial<Repository>): Promise<Repository> => {
    const response = await apiClient.patch(`/repos/${repoId}/`, data)
    return response.data
}
