import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getJob, createJob, updateJob, type Job } from '../services/jobs/jobService'

export default function JobDescription() {
    const { jobId } = useParams<{ jobId?: string }>()
    const navigate = useNavigate()
    const [isCreate, setIsCreate] = useState(true)
    const [loading, setLoading] = useState(!!jobId)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [job, setJob] = useState<Partial<Job>>({
        job_title: '',
        job_description: '',
    })

    useEffect(() => {
        if (!jobId) {
            setIsCreate(true)
            setLoading(false)
            return
        }

        setIsCreate(false)
        const loadJob = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await getJob(parseInt(jobId))
                setJob(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load job')
                console.error('Error loading job:', err)
            } finally {
                setLoading(false)
            }
        }

        loadJob()
    }, [jobId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setJob((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!job.job_title?.trim() || !job.job_description?.trim()) {
            setError('Both job title and description are required')
            return
        }

        try {
            setSubmitting(true)
            setError(null)

            if (isCreate) {
                const newJob = await createJob({
                    job_title: job.job_title,
                    job_description: job.job_description,
                })
                navigate(`/jobs/${newJob.id}/analyze`, { state: { jobId: newJob.id, success: 'Job created successfully' } })
            } else {
                await updateJob(parseInt(jobId!), {
                    job_title: job.job_title,
                    job_description: job.job_description,
                })
                navigate('/jobs', { state: { success: 'Job updated successfully' } })
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save job')
            console.error('Error saving job:', err)
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-700 border-t-cyan-400"></div>
                    <p className="text-slate-300">Loading job details...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Header */}
            <header className="border-b border-slate-700 sticky top-0 z-10 bg-slate-900/80 backdrop-blur">
                <div className="max-w-4xl mx-auto px-6 py-6">
                    <button 
                        onClick={() => navigate('/jobs')}
                        className="text-slate-400 hover:text-white transition mb-4 flex items-center gap-2"
                    >
                        ← Back to Jobs
                    </button>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            {isCreate ? 'Create Job Description' : 'Edit Job Description'}
                        </h1>
                        <p className="text-slate-400 mt-2">
                            {isCreate 
                                ? 'Add a new job description to analyze your repository fit'
                                : 'Update the job description details'}
                        </p>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8">
                {/* Error State */}
                {error && (
                    <div className="mb-6 bg-red-900/20 border border-red-800 rounded-lg p-6 flex items-start gap-3">
                        <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h3 className="text-red-400 font-semibold mb-1">Error</h3>
                            <p className="text-red-300">{error}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Job Title */}
                    <div className="space-y-3">
                        <label htmlFor="job_title" className="block text-sm font-semibold text-white">
                            Job Title <span className="text-cyan-400">*</span>
                        </label>
                        <input
                            type="text"
                            id="job_title"
                            name="job_title"
                            value={job.job_title || ''}
                            onChange={handleChange}
                            placeholder="e.g., Senior React Developer, Full Stack Engineer, DevOps Specialist"
                            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition"
                            required
                        />
                        <p className="text-slate-400 text-sm">
                            Enter the exact job title or role you're applying for
                        </p>
                    </div>

                    {/* Job Description */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label htmlFor="job_description" className="block text-sm font-semibold text-white">
                                Job Description <span className="text-cyan-400">*</span>
                            </label>
                            <span className="text-xs text-slate-400">
                                {job.job_description?.length || 0} characters
                            </span>
                        </div>
                        <textarea
                            id="job_description"
                            name="job_description"
                            value={job.job_description || ''}
                            onChange={handleChange}
                            placeholder="Paste the complete job posting here. Include all responsibilities, required skills, qualifications, technologies, and nice-to-have requirements. The more detailed, the better the analysis results."
                            rows={14}
                            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition resize-none font-mono text-sm"
                            required
                        />
                        <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                                <span className="text-cyan-400">•</span>
                                Include all responsibilities
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-cyan-400">•</span>
                                List required technologies
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-cyan-400">•</span>
                                Mention experience requirements
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-cyan-400">•</span>
                                Note nice-to-have skills
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`flex-1 px-8 py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                                submitting
                                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/30'
                            }`}
                        >
                            {submitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {isCreate ? 'Create Job Description' : 'Update Job Description'}
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/jobs')}
                            className="px-8 py-4 rounded-lg font-semibold border border-slate-600 hover:border-slate-500 hover:bg-slate-800 transition text-slate-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                {/* Job Metadata */}
                {!isCreate && job.created_at && (
                    <div className="mt-12 pt-8 border-t border-slate-700">
                        <p className="text-slate-400 text-sm">
                            <span className="text-slate-500">Created:</span> {new Date(job.created_at).toLocaleString()}
                        </p>
                    </div>
                )}
            </main>
        </div>
    )
}
