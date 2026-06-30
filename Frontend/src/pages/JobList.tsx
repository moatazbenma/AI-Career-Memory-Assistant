import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getJobs, deleteJob, type Job } from '../services/jobs/jobService'

export default function JobList() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [deleteLoading, setDeleteLoading] = useState<number | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const loadJobs = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await getJobs()
                setJobs(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load jobs')
                console.error('Error loading jobs:', err)
            } finally {
                setLoading(false)
            }
        }

        loadJobs()
    }, [])

    const handleDelete = async (jobId: number) => {
        if (!confirm('Are you sure you want to delete this job?')) {
            return
        }

        try {
            setDeleteLoading(jobId)
            await deleteJob(jobId)
            setJobs((prev) => prev.filter((job) => job.id !== jobId))
        } catch (err) {
            console.error('Error deleting job:', err)
            setError('Failed to delete job')
        } finally {
            setDeleteLoading(null)
        }
    }

    if (loading) {
        return <div className="p-6 text-center">Loading jobs...</div>
    }

    if (error) {
        return <div className="p-6 text-red-600">Error: {error}</div>
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Job Descriptions</h1>
                <Link
                    to="/jobs/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    + Create Job
                </Link>
            </div>

            {jobs.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg mb-4">No jobs yet</p>
                    <Link
                        to="/jobs/create"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Create your first job description
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="border rounded-lg p-4 hover:shadow-md transition"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h2 className="font-semibold text-xl text-gray-900">
                                        {job.job_title}
                                    </h2>
                                    <p className="text-gray-600 text-sm mt-1">
                                        Created: {new Date(job.created_at).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-700 mt-3 line-clamp-2">
                                        {job.job_description}
                                    </p>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <Link
                                        to={`/jobs/${job.id}`}
                                        className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition text-sm"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(job.id)}
                                        disabled={deleteLoading === job.id}
                                        className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition text-sm disabled:opacity-50"
                                    >
                                        {deleteLoading === job.id ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
