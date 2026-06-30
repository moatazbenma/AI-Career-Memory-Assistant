import { apiClient } from "../api"

export interface JobListItem {
  id: number
  title: string
  description: string
  created_at: string
}

export async function getUserJobs(): Promise<JobListItem[]> {
  const response = await apiClient.get("/jobs/")
  return response.data
}

export async function getJobStats() {
  const response = await apiClient.get("/jobs/")
  return response.data
}
