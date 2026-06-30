

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID
const REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI
const API_URL = import.meta.env.VITE_API_URL


// Initiates GitHub OAuth login flow
// 1. Generates a random security token (state)
// 2. Stores it in sessionStorage for later verification
// 3. Redirects user to GitHub authorization page with required parameters
export const initiateGithubLogin = () => {
    const state = Math.random().toString(36).substring(7)
    sessionStorage.setItem("github_state", state)  // Store it
    
    const params = new URLSearchParams({
        client_id: GITHUB_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        scope: "user:email",
        state: state  // ✅ Use the same state variable
    })
    window.location.href = `https://github.com/login/oauth/authorize?${params.toString()}`
}






export const exchangeCodeForToken = async (code: string) => {
    const response = await fetch(`${API_URL}/auth/github/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
    })
    return response.json()
}