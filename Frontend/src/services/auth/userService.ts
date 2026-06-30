export interface User {
  id: number
  username: string
  email: string
  github_id: number
}

let currentUser: User | null = null

export async function getMe(): Promise<User> {
  const token = localStorage.getItem('access_token')
  if (!token) throw new Error('No access token')
  
  try {
    const response = await fetch('http://localhost:8000/api/auth/me/', {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error('getMe error:', error)
    throw error
  }
}

export function setCurrentUser(user: User | null): void {
  currentUser = user
}

export function getCurrentUser(): User | null {
  return currentUser
}

export function logout(): void {
  currentUser = null
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}
