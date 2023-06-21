import { ReactElement, createContext, useContext, useState } from 'react';
import { User } from '@/types/user';
import { Auth } from '@/types/auth';

export const AuthContext = createContext<Auth>({ user: null, signUp: () => {}, signIn: () => {}, logout: () => {} });

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User | null>(null);

  const signUp = async (username: string, password: string) => {
    setUser({ password, email: '', id: '', name: username });
  };

  const signIn = async (username: string, password: string) => {
    setUser({ password, email: '', id: '', name: username });
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ 
        user,
        signUp,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;