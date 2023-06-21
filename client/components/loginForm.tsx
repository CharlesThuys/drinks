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

const LoginForm = () => {
  const { signIn } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (): ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Feather name={secureTextEntry ? 'eye-off' : 'eye'} size={20} color="gray" />
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
    navigation.navigate('Sign Up' as never);
  };

  const signInUser = () => {
    Haptics.selectionAsync();
    signIn(username, password);
  };
  
  return (
    <Layout style={{ width: '100%', height: '100%', display: 'flex', gap: 15, justifyContent: 'center', backgroundColor: '#0d0e19', padding: 20 }}>
      <Input
        value={username}
        label='Username'
        status='default'
        placeholder='Username'
        size='large'
        onChangeText={nextValue => setUsername(nextValue)}
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
      <Button onPress={signInUser}>Sign in</Button>
      <Layout style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#0d0e19', gap: 3 }}>
        <Text>Don't have an account?</Text>
        <Text onPress={navigateToSignUp} style={{ color: theme['color-primary-500'] }}>Sign up</Text>
      </Layout>
    </Layout>
  );
};

export default LoginForm;