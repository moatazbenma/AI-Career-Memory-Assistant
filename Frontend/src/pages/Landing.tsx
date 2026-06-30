import { initiateGithubLogin } from "../services/auth/githubAuth";

export function Landing() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Navigation */}
            <nav className="flex items-center justify-between px-6 py-4 md:px-12 md:py-6 border-b border-slate-700">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    CareerMatch AI
                </div>
                <button
                    onClick={initiateGithubLogin}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-slate-900 rounded-lg hover:bg-gray-100 transition font-semibold"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.19.092-.926.35-1.546.636-1.903-2.22-.253-4.555-1.112-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.817c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.194 20 14.44 20 10.017 20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                    Sign in with GitHub
                </button>
            </nav>

            {/* Hero Section */}
            <section className="px-6 md:px-12 py-20 md:py-32 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Land Your Dream Job with{" "}
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                AI-Powered Analysis
                            </span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                            Connect your GitHub repositories with job descriptions. Our AI analyzes your code and generates personalized insights to help you stand out.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={initiateGithubLogin}
                                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition font-semibold text-lg shadow-lg hover:shadow-xl"
                            >
                                Get Started with GitHub
                            </button>
                            <button className="px-8 py-4 border-2 border-slate-400 rounded-lg hover:bg-slate-800 transition font-semibold text-lg">
                                Learn More
                            </button>
                        </div>
                        <p className="text-sm text-slate-400 mt-6">✓ No credit card required • ✓ Free analysis • ✓ 100% secure</p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-2xl opacity-20"></div>
                        <div className="relative bg-slate-800 rounded-2xl p-8 border border-slate-700">
                            <div className="space-y-4">
                                <div className="h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full w-1/3"></div>
                                <div className="space-y-2">
                                    <div className="h-2 bg-slate-600 rounded w-full"></div>
                                    <div className="h-2 bg-slate-600 rounded w-5/6"></div>
                                    <div className="h-2 bg-slate-600 rounded w-4/5"></div>
                                </div>
                                <div className="h-32 bg-slate-700 rounded mt-6"></div>
                                <div className="flex gap-2 mt-6">
                                    <div className="flex-1 h-10 bg-blue-500 rounded"></div>
                                    <div className="flex-1 h-10 bg-slate-600 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-slate-800/50 border-y border-slate-700 px-6 md:px-12 py-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-slate-700/50 rounded-xl p-8 border border-slate-600 hover:border-blue-500 transition">
                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 mb-6 font-bold text-xl">
                                1
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Connect GitHub</h3>
                            <p className="text-slate-300">
                                Sign in with your GitHub account and select your repositories to analyze.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-slate-700/50 rounded-xl p-8 border border-slate-600 hover:border-cyan-500 transition">
                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 mb-6 font-bold text-xl">
                                2
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Add Job Description</h3>
                            <p className="text-slate-300">
                                Paste the job description you're interested in. Our AI will analyze your fit.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-slate-700/50 rounded-xl p-8 border border-slate-600 hover:border-blue-500 transition">
                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 mb-6 font-bold text-xl">
                                3
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Get AI Insights</h3>
                            <p className="text-slate-300">
                                Receive personalized analysis, interview questions, and matching highlights.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Highlight */}
            <section className="px-6 md:px-12 py-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-500">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Smart Code Analysis</h3>
                                <p className="text-slate-300">AI-powered analysis of your repositories to identify relevant skills and projects.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-cyan-500">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Interview Preparation</h3>
                                <p className="text-slate-300">Get AI-generated interview questions tailored to the job and your experience.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-500">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Matching Highlights</h3>
                                <p className="text-slate-300">See exactly how your skills and projects match the job requirements.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-cyan-500">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">100% Secure</h3>
                                <p className="text-slate-300">Your data is encrypted and only used for analysis. We never store your code.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 md:px-12 py-20 m-6 rounded-2xl max-w-6xl mx-auto">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
                    <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join hundreds of developers using AI to analyze their code and prepare for interviews.
                    </p>
                    <button
                        onClick={initiateGithubLogin}
                        className="px-10 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-semibold text-lg shadow-lg hover:shadow-xl"
                    >
                        Start with GitHub
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-700 px-6 md:px-12 py-12">
                <div className="max-w-6xl mx-auto text-center text-slate-400">
                    <p>© 2026 CareerMatch AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}