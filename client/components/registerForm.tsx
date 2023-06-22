import { Input, Text, Layout, Button, useTheme } from '@ui-kitten/components';
import { ReactElement, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { useAuth } from '@/context/authContext';

type Errors = {
  username?: string;
  password?: string;
  passwordConfirm?: string;
};

const RegisterForm = () => {
  const { signUp } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
  const [errors, setErrors] = useState<Errors>({ username: '', password: '', passwordConfirm: '' });


  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleSecureEntryConfirm = (): void => {
    setSecureTextEntryConfirm(!secureTextEntryConfirm);
  };

  const renderIcon = (): ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Feather name={secureTextEntry ? 'eye-off' : 'eye'} size={20} color="gray" />
    </TouchableWithoutFeedback>
  );

  const renderIconConfirm = (): ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntryConfirm}>
      <Feather name={secureTextEntryConfirm ? 'eye-off' : 'eye'} size={20} color="gray" />
    </TouchableWithoutFeedback>
  );

  const navigateToSignUp = () => {
    Haptics.selectionAsync();
    navigation.navigate('Index' as never);
  };

  const signUpUser = async () => {
    setErrors({ username: '', password: '', passwordConfirm: '' });

    if (password !== passwordConfirm) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordConfirm: 'Passwords do not match',
      }));
      return;
    }

    Haptics.selectionAsync();
    const res = await signUp(username, password);
    if (res.error) { 
      if (res.error === 'User already exists') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: res.error,
        }));
      }
    }
  };
  
  return (
    <Layout style={{ width: '100%', height: '100%', display: 'flex', gap: 15, justifyContent: 'center', backgroundColor: '#0d0e19', padding: 20 }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: theme['color-primary-500'], textAlign: 'center' }}>Sign up</Text>
      <Layout style={{ backgroundColor: '#0d0e19' }}>
        { errors.username && <Text style={{ color: 'red' }}>{errors.username}</Text> }
        { errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text> }
        { errors.passwordConfirm && <Text style={{ color: 'red' }}>{errors.passwordConfirm}</Text> }
      </Layout>
      <Input
        value={username}
        label='Username'
        status={errors.username ? 'danger' : 'default'}
        placeholder='Username'
        onChangeText={nextValue => setUsername(nextValue)}
        size='large'
      />
      <Input
        value={password}
        label='Password'
        status={errors.password ? 'danger' : 'default'}
        placeholder='Password'
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={nextValue => setPassword(nextValue)}
        size='large'
      />
      <Input
        value={passwordConfirm}
        label='Confirm Password'
        status={errors.passwordConfirm ? 'danger' : 'default'}
        placeholder='Confirm password'
        accessoryRight={renderIconConfirm}
        secureTextEntry={secureTextEntryConfirm}
        onChangeText={nextValue => setPasswordConfirm(nextValue)}
        size='large'

      />
      <Button onPress={signUpUser}>Sign up</Button>
      <Layout style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#0d0e19', gap: 3 }}>
        <Text>Already have an account?</Text>
        <Text onPress={navigateToSignUp} style={{ color: theme['color-primary-500'] }}>Sign in</Text>
      </Layout>
    </Layout>
  );
};

export default RegisterForm;