import RegisterForm from '@/components/registerForm';
import { Layout } from '@ui-kitten/components';

const RegisterScreen = () => {
  return (
    <Layout style={{ width: '100%', height: '100%', backgroundColor: '#0d0e19' }}>
      <RegisterForm />
    </Layout>
  );
};

export default RegisterScreen;   