import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, logout } from "../services/auth/userService";
import type { User } from "../types/User";
import { getUserJobs } from "../services/jobs/jobListService";
import { apiClient } from "../services/api";

interface Result {
  id: number;
  summary: string;
  task_status: string;
  created_at: string;
  job?: { id: number; title: string };
  repository?: { id: number; name: string };
}

interface Job {
  id: number;
  title: string;
  created_at: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [recentResults, setRecentResults] = useState<Result[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/");
          return;
        }

        // Fetch user data
        try {
          const userData = await getMe();
          setUser(userData);
        } catch (err) {
          console.error("Error fetching user:", err);
          setError("Failed to load user data");
        }

        // Fetch recent results
        try {
          const resultsResponse = await apiClient.get("/results/");
          if (Array.isArray(resultsResponse.data)) {
            setRecentResults(resultsResponse.data.slice(0, 5));
          }
        } catch (err) {
          console.error("Error fetching results:", err);
          setRecentResults([]);
        }

        // Fetch user jobs
        try {
          const jobsData = await getUserJobs();
          if (Array.isArray(jobsData)) {
            setJobs(jobsData);
          }
        } catch (err) {
          console.error("Error fetching jobs:", err);
          setJobs([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNewAnalysis = () => {
    navigate("/Repos");
  };

  const handleViewResult = (resultId: number) => {
    navigate(`/results/${resultId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
          <p className="mt-4 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 md:py-6 border-b border-slate-700 bg-slate-800/50 backdrop-blur">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          CareerMatch AI
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleNewAnalysis}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition font-semibold"
          >
            New Analysis
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition font-semibold"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Header Section */}
      <section className="px-6 md:px-12 py-12 border-b border-slate-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-3xl font-bold">
              {user?.username?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.username}! 👋
              </h1>
              <p className="text-slate-300">
                {user?.email} • GitHub ID: {user?.github_id}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Total Analysis Card */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-8 border border-slate-600 hover:border-blue-500 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-semibold">Total Analyses</p>
                  <h3 className="text-4xl font-bold mt-2">{recentResults.length}</h3>
                </div>
                <div className="text-5xl opacity-20">📊</div>
              </div>
            </div>

            {/* Active Jobs Card */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-8 border border-slate-600 hover:border-cyan-500 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-semibold">Active Jobs</p>
                  <h3 className="text-4xl font-bold mt-2">{jobs.length}</h3>
                </div>
                <div className="text-5xl opacity-20">💼</div>
              </div>
            </div>

            {/* Member Since Card */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-8 border border-slate-600 hover:border-blue-500 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-semibold">Member Since</p>
                  <h3 className="text-lg font-bold mt-2">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                  </h3>
                </div>
                <div className="text-5xl opacity-20">⭐</div>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-8 text-red-200">
              {error}
            </div>
          )}

          {/* Recent Analysis Results */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Recent Analyses</h2>
            {recentResults.length > 0 ? (
              <div className="space-y-4">
                {recentResults.map((result) => (
                  <div
                    key={result.id}
                    className="bg-slate-700/50 rounded-xl p-6 border border-slate-600 hover:border-blue-500 transition cursor-pointer group"
                    onClick={() => handleViewResult(result.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition">
                          Analysis #{result.id}
                        </h3>
                        <div className="flex gap-4 text-sm text-slate-400 mb-3">
                          {result.job && (
                            <span className="flex items-center gap-1">
                              💼 {result.job.title}
                            </span>
                          )}
                          {result.repository && (
                            <span className="flex items-center gap-1">
                              📦 {result.repository.name}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            📅 {new Date(result.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-slate-300 line-clamp-2">
                          {result.summary || "Analysis in progress..."}
                        </p>
                      </div>
                      <div className="ml-6">
                        <div
                          className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                            result.task_status === "SUCCESS"
                              ? "bg-green-500/20 text-green-300"
                              : result.task_status === "FAILURE"
                                ? "bg-red-500/20 text-red-300"
                                : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          {result.task_status === "SUCCESS"
                            ? "✓ Complete"
                            : result.task_status === "FAILURE"
                              ? "✗ Failed"
                              : "⏳ Pending"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-700/50 rounded-xl p-12 border border-slate-600 text-center">
                <p className="text-slate-300 text-lg mb-6">No analyses yet</p>
                <button
                  onClick={handleNewAnalysis}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition font-semibold"
                >
                  Start Your First Analysis
                </button>
              </div>
            )}
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <button
              onClick={handleNewAnalysis}
              className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-8 hover:border-blue-400 hover:from-blue-600/30 hover:to-cyan-600/30 transition text-left group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Start New Analysis</h3>
              <p className="text-slate-300">
                Analyze a new repository against a job description
              </p>
            </button>

            <button
              onClick={() => navigate("/jobs")}
              className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-8 hover:border-purple-400 hover:from-purple-600/30 hover:to-pink-600/30 transition text-left group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition">📋</div>
              <h3 className="text-xl font-semibold mb-2">View All Jobs</h3>
              <p className="text-slate-300">
                Manage and view all your saved job descriptions
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 px-6 md:px-12 py-8 mt-12">
        <div className="max-w-6xl mx-auto text-center text-slate-400 text-sm">
          <p>© 2026 CareerMatch AI. Making job interviews easier with AI.</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
