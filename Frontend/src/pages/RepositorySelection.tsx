import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchRepositoriesFromGithub, getRepositories, updateRepository, type Repository } from '../services/repositories/repo'

export default function RepositorySelection() {
    const navigate = useNavigate()
    const [repositories, setRepositories] = useState<Repository[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    // Fetch repositories when component mounts
    useEffect(() => {
        const loadRepositories = async () => {
            try {
                setLoading(true)
                setError(null)

                // First, fetch repos from GitHub and save them to database
                await fetchRepositoriesFromGithub()

                // Then, get the list of repositories from database
                const data = await getRepositories()
                setRepositories(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load repositories')
                console.error('Error loading repositories:', err)
            } finally {
                setLoading(false)
            }
        }

        loadRepositories()
    }, [])

    // Handle repository selection toggle
    const handleToggleRepository = async (repo: Repository) => {
        try {
            const updated = await updateRepository(repo.id, { selected: !repo.selected })
            setRepositories((prev) =>
                prev.map((r) => (r.id === updated.id ? updated : r))
            )
        } catch (err) {
            console.error('Error updating repository:', err)
            setError('Failed to update repository')
        }
    }

    // Filter repositories based on search
    const filteredRepositories = repositories.filter((repo) =>
        repo.repo_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description?.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const selectedCount = repositories.filter((r) => r.selected).length

    const handleNext = () => {
        navigate('/jobs/create')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Header */}
            <header className="border-b border-slate-700 sticky top-0 z-10 bg-slate-900/80 backdrop-blur">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="text-slate-400 hover:text-white transition mb-4 flex items-center gap-2"
                    >
                        ← Back
                    </button>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Select Your Repositories
                            </h1>
                            <p className="text-slate-400 mt-2">
                                Choose repositories to analyze for job matching
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-cyan-400">{selectedCount}</div>
                            <p className="text-slate-400 text-sm">Selected</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search repositories by name or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition"
                        />
                        <svg className="absolute right-3 top-3.5 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-700 border-t-cyan-400 mb-4"></div>
                        <p className="text-slate-300 text-lg">Fetching your repositories...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 mb-6">
                        <h3 className="text-red-400 font-semibold mb-2">Error Loading Repositories</h3>
                        <p className="text-red-300">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && repositories.length === 0 && !error && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold text-slate-300 mb-2">No Repositories Found</h3>
                        <p className="text-slate-400">We couldn't find any repositories in your GitHub account.</p>
                    </div>
                )}

                {/* Repositories Grid */}
                {!loading && filteredRepositories.length > 0 && (
                    <div className="grid gap-4">
                        {filteredRepositories.map((repo) => (
                            <div
                                key={repo.id}
                                onClick={() => handleToggleRepository(repo)}
                                className={`group cursor-pointer rounded-lg border transition-all duration-200 p-5 ${
                                    repo.selected
                                        ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                                        : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                                                repo.selected 
                                                    ? 'bg-cyan-500 border-cyan-400' 
                                                    : 'border-slate-600 group-hover:border-slate-500'
                                            }`}>
                                                {repo.selected && (
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                            <h2 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition">
                                                {repo.repo_name}
                                            </h2>
                                        </div>
                                        {repo.description && (
                                            <p className="text-slate-400 text-sm ml-9 line-clamp-2">
                                                {repo.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className={`flex-shrink-0 ml-4 px-3 py-1 rounded-full text-sm font-medium transition ${
                                        repo.selected
                                            ? 'bg-cyan-500/20 text-cyan-300'
                                            : 'bg-slate-700/50 text-slate-400'
                                    }`}>
                                        {repo.selected ? '✓ Selected' : 'Select'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* No search results */}
                {!loading && searchTerm && filteredRepositories.length === 0 && repositories.length > 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-400">No repositories match "{searchTerm}"</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="mt-4 text-cyan-400 hover:text-cyan-300 transition"
                        >
                            Clear search
                        </button>
                    </div>
                )}

                {/* Action Buttons */}
                {!loading && repositories.length > 0 && (
                    <div className="mt-12 flex gap-4 justify-end">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-6 py-3 rounded-lg font-semibold border border-slate-600 hover:border-slate-500 hover:bg-slate-800 transition text-slate-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={selectedCount === 0}
                            className={`px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
                                selectedCount === 0
                                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/30'
                            }`}
                        >
                            Continue
                            <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
                                {selectedCount}
                            </span>
                        </button>
                    </div>
                )}
            </main>
        </div>
    )
}
