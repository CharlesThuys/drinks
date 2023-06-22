import { ReactElement, createContext, useContext, useState } from 'react';
import { User } from '@/types/user';
import { Auth } from '@/types/auth';
import { fetcher } from '@/utils/fetcher';

export const AuthContext = createContext<Auth>({
  user: null,
  bearerToken: '',
  signUp: async () => {
    return { data: '', error: '' };
  },
  signIn: async () => {
    return { data: '', error: '' };
  },
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bearerToken, setBearerToken] = useState<string>('');

  const signUp = async (username: string, password: string): Promise<{ data?: any, error?: string }> => {
    try {
      const res = await fetcher('auth/register', 'post', '', { name: username, password, profile_picture: '' });
      if (res.user) { 
        setUser(res.user); 
        setBearerToken(res.token);
        return { data: res.user };
      } else return { error: res };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      const res = await fetcher('auth/login', 'post', '', { name: username, password });
      if (res.user) { 
        setUser(res.user); 
        setBearerToken(res.token);
        return { data: res.user };
      } else return { error: res };
    } catch (err: any) {
      return { error: err };
    }
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
        bearerToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;