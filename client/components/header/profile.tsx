import { useNavigation } from '@react-navigation/native';
import { Avatar, Button, Layout, Popover } from '@ui-kitten/components';
import React, { ReactElement, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { StyleSheet } from 'react-native';
import { useAuth } from '@/context/authContext';

const DEFAULT_BACKGROUND = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.aiysxhOBd9_RKdfjJ9wQYAHaEK%26pid%3DApi&f=1&ipt=c95fc3b5ad0164124cfc48ec7d41aaedc70baf99afe36900f9847781f3db11f7&ipo=images';

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 5,
    gap: 10,
    backgroundColor: 'transparent',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#21242a',
    borderColor: '#21242a',
    width: 200,
    height: 50,
  },
});

const Profile = () => {
  const { logout } = useAuth();
  const navigation = useNavigation();
  
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(true);
    Haptics.selectionAsync();
  };

  const openEvent = () => {
    setVisible(false);
    Haptics.selectionAsync();
    navigation.navigate('Profile' as never);
  };
  
  const logoutUser = () => {
    Haptics.selectionAsync();
    logout();
  };

  const renderToggleButton = (): ReactElement => (
    <Button onPress={handleClick} style={{ backgroundColor: 'transparent', borderColor: 'transparent', width: 20 }} children={() => <Avatar size='medium' source={{ uri: DEFAULT_BACKGROUND }}/>} />
  );

  return (
    <Popover
      style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
      placement={'bottom'}
      backdropStyle={styles.backdrop}
      visible={visible}
      onBackdropPress={() => setVisible(false)}
      anchor={renderToggleButton}
    >
      <Layout style={styles.content}>
        <Button style={styles.box} size='large' onPress={openEvent}>
          Profile
        </Button>
        <Button style={styles.box} size='large' onPress={logoutUser}>
          Logout
        </Button>
      </Layout>
    </Popover>
  );
};

export default Profile;