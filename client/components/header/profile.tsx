import { useNavigation } from '@react-navigation/native';
import { Avatar, Button, Layout, Popover } from '@ui-kitten/components';
import React, { ReactElement, useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { StyleSheet, Platform } from 'react-native';
import { useAuth } from '@/context/authContext';
import { checkPictureUrl } from '@/utils';
import { useGame } from '@/context/gameContext';
import { useEvent } from '@/context/eventContext';

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
  const { setGames, setLoadingGames } = useGame();
  const { setEvents, setAttendingEvents, setLoadingAttendingEvents, setLoadingEvents } = useEvent();
  const { logout, user } = useAuth();
  const navigation = useNavigation();
  
  const [visible, setVisible] = useState(false);
  const [validAvatar, setValidAvatar] = useState<boolean>(false);

  const handleClick = () => {
    setVisible(true);
    if (Platform.OS === 'ios') Haptics.selectionAsync();
  };

  const openEvent = () => {
    setVisible(false);
    if (Platform.OS === 'ios') Haptics.selectionAsync();
    navigation.navigate('Profile' as never);
  };
  
  const logoutUser = () => {
    if (Platform.OS === 'ios') Haptics.selectionAsync();
    setGames(null);
    setEvents(null);
    setAttendingEvents(null);

    setLoadingGames(true);
    setLoadingEvents(true);
    setLoadingAttendingEvents(true);

    logout();
  };

  const renderToggleButton = (): ReactElement => {
    return <Button onPress={handleClick} style={{ backgroundColor: 'transparent', borderColor: 'transparent', width: 20 }} children={() => <Avatar size='medium' source={{ uri: user?.profile_picture }}/>} />;
  };

  const renderToggleButton2 = (): ReactElement => {
    return <Button onPress={handleClick} style={{ backgroundColor: 'transparent', borderColor: 'transparent', width: 20 }} children={() => <Avatar size='medium' source={{ uri: DEFAULT_BACKGROUND }}/>} />;
  };

  useEffect(() => {
    if (!user) return;

    checkPictureUrl(user?.profile_picture)
      .then(isValidProfilePictureUrl => {
        if (isValidProfilePictureUrl) {
          setValidAvatar(true);
        } else {
          setValidAvatar(false);
        }
      });
  }, [user]);

  return (
    <Popover
      style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
      placement={'bottom'}
      backdropStyle={styles.backdrop}
      visible={visible}
      onBackdropPress={() => setVisible(false)}
      anchor={validAvatar ?  renderToggleButton : renderToggleButton2}
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