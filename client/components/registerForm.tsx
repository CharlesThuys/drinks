import { Input, Text, Layout, Button, useTheme } from '@ui-kitten/components';
import { ReactElement, useState } from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { useAuth } from '@/context/authContext';


const styles = StyleSheet.create({
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#8F9BB3',
  },
});

const RegisterForm = () => {
  const { signUp } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);


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

  const renderCaption = (): ReactElement => {
    return (
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>
          Should contain at least 8 symbols
        </Text>
      </View>
    );
  };

  const navigateToSignUp = () => {
    Haptics.selectionAsync();
    navigation.navigate('Index' as never);
  };

  const signUpUser = () => {
    Haptics.selectionAsync();
    signUp(username, password);
  };
  
  return (
    <Layout style={{ width: '100%', height: '100%', display: 'flex', gap: 15, justifyContent: 'center', backgroundColor: '#0d0e19', padding: 20 }}>
      <Input
        value={username}
        label='Username'
        status='default'
        placeholder='Username'
        onChangeText={nextValue => setUsername(nextValue)}
        size='large'
      />
      <Input
        value={password}
        label='Password'
        placeholder='Password'
        caption={renderCaption}
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={nextValue => setPassword(nextValue)}
        size='large'
      />
      <Input
        value={passwordConfirm}
        label='Confirm Password'
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