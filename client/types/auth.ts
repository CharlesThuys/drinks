import { User } from './user';

export type Auth = {
  user: User | null
  signUp: (username: string, password: string) => void
  signIn: (username: string, password: string) => void
  logout: () => void
};