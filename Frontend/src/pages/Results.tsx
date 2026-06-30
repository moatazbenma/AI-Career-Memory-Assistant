import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { getResult, getTaskStatus, type Result } from '../services/results/resultService'
import { parseResultData } from '../utils/resultFormatter'

export default function Results() {
    const { resultId } = useParams<{ resultId?: string }>()
    const navigate = useNavigate()
    const location = useLocation()
    const [result, setResult] = useState<Result | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [taskStatus, setTaskStatus] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        // Get success message from location state
        if (location.state?.success) {
            setSuccessMessage(location.state.success)
        }
    }, [location.state])

    const handleRefresh = async () => {
        try {
            setIsRefreshing(true)
            if (!resultId) return
            
            const data = await getResult(parseInt(resultId))
            setResult(data)
            setTaskStatus(data.task_status || null)
        } catch (err) {
            console.error('Error refreshing result:', err)
            setError(err instanceof Error ? err.message : 'Failed to refresh results')
        } finally {
            setIsRefreshing(false)
        }
    }

    useEffect(() => {
        const loadResult = async () => {
            try {
                setLoading(true)
                setError(null)
                
                if (!resultId) {
                    setError('No result ID provided')
                    setLoading(false)
                    return
                }

                const data = await getResult(parseInt(resultId))
                setResult(data)
                setTaskStatus(data.task_status || null)
                setLoading(false)
                
                // If task is still processing, poll for updates
                if (data.task_id && !data.task_ready) {
                    const pollInterval = setInterval(async () => {
                        try {
                            const updatedData = await getResult(parseInt(resultId))
                            setResult(updatedData)
                            setTaskStatus(updatedData.task_status || null)
                            
                            if (updatedData.task_ready) {
                                clearInterval(pollInterval)
                            }
                        } catch (err) {
                            console.error('Error polling result:', err)
                        }
                    }, 2000) // Poll every 2 seconds
                    
                    return () => clearInterval(pollInterval)
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load results')
                console.error('Error loading results:', err)
                setLoading(false)
            }
        }

        if (resultId) {
            loadResult()
        }
    }, [resultId])

    if (loading) {
        return (
            <div className="p-6 max-w-4xl mx-auto">
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Loading results...</p>
                </div>
            </div>
        )
    }

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
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <button
                        onClick={() => navigate('/jobs')}
                        className="text-blue-600 hover:text-blue-700 font-medium mb-4"
                    >
                        ← Back to Jobs
                    </button>
                    <h1 className="text-3xl font-bold">Analysis Results</h1>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                    <p className="font-semibold">Success</p>
                    <p className="mt-1">{successMessage}</p>
                </div>
            )}

            {!result ? (
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
                    <p className="font-semibold">Processing Analysis</p>
                    <p className="mt-2">Analysis is being processed. Please wait...</p>
                    {taskStatus && <p className="text-sm mt-2">Status: <strong>{taskStatus}</strong></p>}
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Task Status */}
                    {taskStatus && taskStatus !== 'SUCCESS' && (
                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
                            <p className="font-semibold">Processing Status</p>
                            <p className="mt-1"><strong>{taskStatus}</strong></p>
                        </div>
                    )}

                    {/* Summary Section */}
                    {result.summary && result.summary.trim() && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Summary</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{parseResultData(result.summary)}</p>
                        </div>
                    )}

                    {/* Star Bullets Section */}
                    {result.star_bullets && result.star_bullets.trim() && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Key Highlights</h2>
                            <div className="text-gray-700 whitespace-pre-wrap space-y-2 leading-relaxed">
                                {parseResultData(result.star_bullets)}
                            </div>
                        </div>
                    )}

                    {/* Interview Questions Section */}
                    {result.interview_questions && result.interview_questions.trim() && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Potential Interview Questions</h2>
                            <div className="text-gray-700 whitespace-pre-wrap space-y-2 leading-relaxed">
                                {parseResultData(result.interview_questions)}
                            </div>
                        </div>
                    )}

                    {/* No content message */}
                    {(!result.summary || !result.summary.trim()) && 
                     (!result.star_bullets || !result.star_bullets.trim()) && 
                     (!result.interview_questions || !result.interview_questions.trim()) && (
                        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
                            <p>Analysis is still being processed. Results will appear here shortly.</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4 border-t">
                        <button
                            onClick={() => navigate('/jobs')}
                            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
                        >
                            View All Jobs
                        </button>
                        <button
                            onClick={() => navigate('/Repos')}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                        >
                            Analyze Another Job
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
