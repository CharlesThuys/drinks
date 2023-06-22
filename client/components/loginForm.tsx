import { Input, Text, Layout, Button, useTheme } from '@ui-kitten/components';
import { ReactElement, useState } from 'react';
import { TouchableWithoutFeedback, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { useAuth } from '@/context/authContext';


const LoginForm = () => {
  const { signIn } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (): ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Feather name={secureTextEntry ? 'eye-off' : 'eye'} size={20} color="gray" />
    </TouchableWithoutFeedback>
  );

  const navigateToSignUp = () => {
    if (Platform.OS === 'ios') Haptics.selectionAsync();
    navigation.navigate('Sign Up' as never);
  };

  const signInUser = async () => {
    setError(false);
    if (Platform.OS === 'ios') Haptics.selectionAsync();
    const res = await signIn(username, password);
    if (res.error) { 
      setError(true);
    }
  };
  
  return (
    <Layout style={{ width: '100%', height: '100%', display: 'flex', gap: 15, justifyContent: 'center', backgroundColor: '#0d0e19', padding: 20 }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: theme['color-primary-500'], textAlign: 'center' }}>Sign in</Text>
      {error && <Text style={{ color: 'red' }}>Invalid username or password</Text>}
      <Input
        value={username}
        label='Username'
        status={error ? 'danger' : 'default'}
        placeholder='Username'
        size='large'
        onChangeText={nextValue => setUsername(nextValue)}
      />
      <Input
        value={password}
        label='Password'
        status={error ? 'danger' : 'default'}
        placeholder='Password'
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={nextValue => setPassword(nextValue)}
        size='large'
      />
      <Button onPress={signInUser}>Sign in</Button>
      <Layout style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#0d0e19', gap: 3 }}>
        <Text>Don't have an account?</Text>
        <Text onPress={navigateToSignUp} style={{ color: theme['color-primary-500'] }}>Sign up</Text>
      </Layout>
    </Layout>
  );
};

export default LoginForm;