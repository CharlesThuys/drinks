import { User } from './user';

export type Auth = {
  user: User | null
  bearerToken: string | null
  signUp: (username: string, password: string) => Promise<{ data?: any, error?: string }> 
  signIn: (username: string, password: string) => Promise<{ data?: any, error?: string }>
  logout: () => void,
  loading: boolean
};