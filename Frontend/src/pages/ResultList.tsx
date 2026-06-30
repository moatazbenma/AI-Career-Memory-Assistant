import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteResult, getResults, type Result } from '../services/results/resultService'

interface ResultListItem extends Result {
  job?: { id: number; title: string }
  repository?: { id: number; name: string }
}

export default function ResultList() {
  const navigate = useNavigate()
  const [results, setResults] = useState<ResultListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  useEffect(() => {
    const loadResults = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await getResults()
        setResults(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Error loading results:', err)
        setError(err instanceof Error ? err.message : 'Failed to load analysis results')
      } finally {
        setLoading(false)
      }
    }

    loadResults()
  }, [])

  const handleDelete = async (resultId: number) => {
    if (!confirm('Delete this result? This cannot be undone.')) return

    try {
      setDeletingId(resultId)
      await deleteResult(resultId)
      setResults((prev) => prev.filter((item) => item.id !== resultId))
    } catch (err) {
      console.error('Error deleting result:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete result')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Analysis Results
            </h1>
            <p className="text-slate-400 mt-2 max-w-2xl">
              Review your completed analyses and manage results from your account.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-3 rounded-lg border border-slate-700 bg-slate-800/70 text-slate-200 hover:border-slate-500 hover:bg-slate-800 transition"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/Repos')}
              className="px-5 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-semibold hover:from-cyan-600 hover:to-blue-600 transition"
            >
              Analyze Another Job
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-14 w-14 border-4 border-slate-700 border-t-cyan-400"></div>
            <p className="mt-5 text-slate-300 text-lg">Loading your results...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-800 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-red-300 mb-3">Unable to load results</h2>
            <p className="text-red-200 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition text-white"
            >
              Retry
            </button>
          </div>
        ) : results.length === 0 ? (
          <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-12 text-center">
            <p className="text-slate-400 text-lg mb-4">You don't have any analysis results yet.</p>
            <button
              onClick={() => navigate('/Repos')}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-semibold hover:from-cyan-600 hover:to-blue-600 transition"
            >
              Start a New Analysis
            </button>
          </div>
        ) : (
          <div className="grid gap-5">
            {results.map((result) => (
              <div
                key={result.id}
                className="rounded-3xl border border-slate-700 bg-slate-800/80 p-6 transition hover:border-cyan-500 hover:bg-slate-800 shadow-lg shadow-slate-950/30"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-3 items-center mb-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-700/70 px-3 py-1 text-sm font-semibold text-slate-200">
                          #{result.id}
                        </span>
                        {result.job?.title && (
                          <span className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-3 py-1 text-sm text-blue-200">
                            💼 {result.job.title}
                          </span>
                        )}
                        {result.repository?.name && (
                          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-600/10 px-3 py-1 text-sm text-cyan-200">
                            📦 {result.repository.name}
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl font-semibold text-white mb-3">
                        {result.summary ? result.summary.slice(0, 90) + (result.summary.length > 90 ? '...' : '') : 'Analysis result'}
                      </h2>
                      <p className="text-slate-400 line-clamp-3">
                        {result.summary || 'No summary available yet.'}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 items-start md:items-end">
                      <span className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        result.task_status === 'completed'
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : result.task_status === 'failed'
                          ? 'bg-red-500/15 text-red-300'
                          : 'bg-yellow-500/15 text-yellow-300'
                      }`}>
                        {result.task_status?.toUpperCase() || 'PENDING'}
                      </span>
                      <span className="text-slate-500 text-sm">
                        {new Date(result.created_at).toLocaleDateString()}
                      </span>
                      <span className="text-slate-400 text-sm">View details →</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => navigate(`/results/${result.id}`)}
                      className="px-4 py-2 rounded-lg bg-slate-700 text-slate-100 hover:bg-slate-600 transition"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(result.id)}
                      disabled={deletingId === result.id}
                      className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50"
                    >
                      {deletingId === result.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
