import AuthProvider from './context/authContext';
import Index from './index';

export default function App() {
  return (
    <AuthProvider>
      <Index/>
    </AuthProvider>
  );
}
