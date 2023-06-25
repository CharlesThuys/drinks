import { ReactElement, createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types/user';
import { Auth } from '@/types/auth';
import { fetcher } from '@/utils/fetcher';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bearerToken, setBearerToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const signUp = async (username: string, password: string): Promise<{ data?: any, error?: string }> => {
    try {
      const res = await fetcher('auth/register', 'post', '', { name: username, password, profile_picture: '' });
      if (res.user) { 
        const jsonValue = JSON.stringify(res);
        await AsyncStorage.setItem('user', jsonValue);

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
        const jsonValue = JSON.stringify(res);
        await AsyncStorage.setItem('user', jsonValue);

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
    await AsyncStorage.removeItem('user');
  };

  useEffect(() => {
    const getUser = async () => {

      try {
        const res = await AsyncStorage.getItem('user');
        if (!res) {
          setLoading(false);
        } else {
          const resJson = JSON.parse(res);
          setUser(resJson.user);
          setBearerToken(resJson.token);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
      }
    };
    
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ 
        user,
        signUp,
        signIn,
        logout,
        bearerToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;