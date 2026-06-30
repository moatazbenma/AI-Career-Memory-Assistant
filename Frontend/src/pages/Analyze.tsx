import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getRepositories, type Repository } from '../services/repositories/repo'
import { createAnalysis } from '../services/analysis/analysisService'

export default function Analyze() {
    const { jobId } = useParams<{ jobId?: string }>()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const startAnalyses = async () => {
            try {
                setLoading(true)
                setError(null)

                if (!jobId) {
                    throw new Error('No job ID provided')
                }

                // Get all selected repositories
                const repos = await getRepositories()
                const selectedRepos = repos.filter((r: Repository) => r.selected)

                if (selectedRepos.length === 0) {
                    throw new Error('No repositories selected. Please select at least one repository.')
                }

                // Create an analysis for each selected repository and collect result IDs
                let firstResultId: number | null = null
                for (const repo of selectedRepos) {
                    try {
                        const result = await createAnalysis(parseInt(jobId), repo.id)
                        if (!firstResultId) {
                            firstResultId = result.id
                        }
                    } catch (err) {
                        console.error(`Error creating analysis for repo ${repo.repo_name}:`, err)
                        // Continue with other repos even if one fails
                    }
                }

                if (!firstResultId) {
                    throw new Error('Failed to create analyses for any repository. Please try again.')
                }

                // Navigate to the first result
                navigate(`/results/${firstResultId}`, { state: { success: 'Job created and analyses started successfully' } })
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to start analysis')
                console.error('Error starting analysis:', err)
            } finally {
                setLoading(false)
            }
        }

        if (jobId) {
            startAnalyses()
        }
    }, [jobId, navigate])

    if (error) {
        return (
            <div className="p-6 max-w-4xl mx-auto">
                <div className="mb-6">
                    <button
                        onClick={() => navigate('/jobs')}
                        className="text-blue-600 hover:text-blue-700 font-medium mb-4"
                    >
                        ← Back to Jobs
                    </button>
                </div>
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <p className="font-semibold">Error</p>
                    <p className="mt-2">{error}</p>
                    <button
                        onClick={() => navigate('/Repos')}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        Go Back to Repository Selection
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Starting analysis for your selected repositories...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a moment.</p>
            </div>
        </div>
    )
}
