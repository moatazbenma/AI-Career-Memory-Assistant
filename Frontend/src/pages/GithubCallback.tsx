import { useEffect, useState, useRef } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { exchangeCodeForToken } from "../services/auth/githubAuth"
import { getMe, setCurrentUser } from "../services/auth/userService"

export function GithubCallback() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [step, setStep] = useState("validating")
    const hasRunRef = useRef(false)

    useEffect(() => {
        // Prevent double execution in StrictMode (GitHub codes are single-use)
        if (hasRunRef.current) return
        hasRunRef.current = true

        const authenticateUser = async () => {
            try {
                const code = searchParams.get("code")
                const state = searchParams.get("state")
                const storedState = sessionStorage.getItem("github_state")

                if (!code) {
                    setError("Authorization code not found. Please try logging in again.")
                    setStep("error")
                    setTimeout(() => navigate("/"), 3000)
                    return
                }

                if (state !== storedState) {
                    console.error("Invalid state - CSRF attack detected")
                    setError("Security validation failed. Please try logging in again.")
                    setStep("error")
                    setTimeout(() => navigate("/"), 3000)
                    return
                }

                // Exchange code for JWT tokens
                setStep("exchanging")
                const tokenData = await exchangeCodeForToken(code)
                console.log("✓ JWT tokens received")

                // Store tokens
                localStorage.setItem("access_token", tokenData.access)
                localStorage.setItem("refresh_token", tokenData.refresh)
                sessionStorage.removeItem("github_state")

                // Fetch user data
                setStep("loading_user")
                const userData = await getMe()
                console.log("✓ User data loaded:", userData.username)
                setCurrentUser(userData)

                // Redirect to dashboard
                navigate("/dashboard")
            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : String(err)
                console.error("Authentication failed:", errorMsg)
                console.error("Full error:", err)
                setError(`Login failed: ${errorMsg}`)
                setStep("error")
                setTimeout(() => navigate("/"), 5000)
            }
        }

        authenticateUser()
    }, [searchParams, navigate])

    const getStatusMessage = () => {
        switch (step) {
            case "validating":
                return "Validating your login...";
            case "exchanging":
                return "Exchanging authorization code...";
            case "loading_user":
                return "Loading your profile...";
            case "error":
                return error;
            default:
                return "Authenticating...";
        }
    };

    const getStatusIcon = () => {
        switch (step) {
            case "error":
                return "❌";
            default:
                return "🔄";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
            <div className="text-center">
                {step === "error" ? (
                    <div className="max-w-md">
                        <div className="text-5xl mb-6">{getStatusIcon()}</div>
                        <h2 className="text-2xl font-bold text-white mb-4">Login Failed</h2>
                        <p className="text-slate-300 mb-6">{error}</p>
                        <p className="text-slate-400 text-sm">Redirecting to home page...</p>
                    </div>
                ) : (
                    <div>
                        <div className="inline-block mb-6">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-700 border-t-blue-400"></div>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Authenticating</h2>
                        <p className="text-slate-300">{getStatusMessage()}</p>
                        <p className="text-slate-400 text-sm mt-4">
                            <span className="inline-block animate-pulse">•</span>
                            <span className="inline-block animate-pulse" style={{ animationDelay: "0.2s" }}>•</span>
                            <span className="inline-block animate-pulse" style={{ animationDelay: "0.4s" }}>•</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
