export interface User {
  id: string;
  github_id: string;
  username: string;
  email: string | null;
  access_token: string;
  created_at: string;
}

export interface Repository {
  id: string;
  user_id: string;
  repo_name: string;
  description: string | null;
  metadata: Record<string, any>;
  selected: boolean;
}

export interface Job {
  id: string;
  user_id: string;
  job_title: string;
  job_description: string;
  created_at: string;
}

export interface Analysis {
  id: string;
  job_id: string;
  repo_id: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  created_at: string;
}

export interface Result {
  id: string;
  analysis_id: string;
  star_bullets: string[];
  interview_questions: {
    technical: string[];
    behavioral: string[];
  };
  summary: string;
  created_at: string;
}

// API Response Wrappers
export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  status: number;
}
