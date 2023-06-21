import LoginForm from '@/components/loginForm';
import { Layout } from '@ui-kitten/components';

const LoginScreen = () => {
  return (
    <Layout style={{ width: '100%', height: '100%', backgroundColor: '#0d0e19' }}>
        <LoginForm />
    </Layout>
  );
};

export default LoginScreen;   