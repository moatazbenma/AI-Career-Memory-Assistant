import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { GithubCallback } from './pages/GithubCallback'
import Dashboard from './pages/Dashboard'
import RepositorySelection from './pages/RepositorySelection'
import JobList from './pages/JobList'
import JobDescription from './pages/JobDescription'
import ResultList from './pages/ResultList'
import Results from './pages/Results'
import Analyze from './pages/Analyze'
import CareerPredictor from './pages/CareerPredictor'



function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/callback" element={<GithubCallback/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/Repos" element={<RepositorySelection/>} />
        <Route path="/jobs" element={<JobList/>} />
        <Route path="/jobs/create" element={<JobDescription/>} />
        <Route path="/jobs/:jobId" element={<JobDescription/>} />
        <Route path="/jobs/:jobId/analyze" element={<Analyze/>} />
        <Route path='/results/' element={<ResultList/>}/>
        <Route path="/results/:resultId" element={<Results/>} />
        <Route path="/career-predictor/" element={<CareerPredictor/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
