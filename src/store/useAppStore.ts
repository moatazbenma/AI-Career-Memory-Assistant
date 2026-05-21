import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Repository, Job } from '@/types'

interface AppState {
  // Auth & User State
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  
  // Repositories State
  repositories: Repository[];
  setRepositories: (repos: Repository[]) => void;
  toggleRepoSelection: (repoId: string) => void;
  
  // Job State
  currentJob: Job | null;
  setCurrentJob: (job: Job | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial Auth State
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null, repositories: [], currentJob: null }),

      // Initial Repo State
      repositories: [],
      setRepositories: (repos) => set({ repositories: repos }),
      toggleRepoSelection: (repoId) => 
        set((state) => ({
          repositories: state.repositories.map(repo => 
            repo.id === repoId ? { ...repo, selected: !repo.selected } : repo
          )
        })),

      // Initial Job State
      currentJob: null,
      setCurrentJob: (job) => set({ currentJob: job }),
    }),
    {
      name: 'career-memory-storage',
      partialize: (state) => ({ token: state.token, user: state.user }), // Only persist auth
    }
  )
)
