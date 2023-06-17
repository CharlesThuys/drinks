import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Popover } from '@ui-kitten/components';
import { AntDesign } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 4,
    gap: 10,
    backgroundColor: 'transparent',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 50,
  },
});
  

export const AddContent = (): React.ReactElement => {
  const navigation = useNavigation();
  
  const [visible, setVisible] = React.useState(false);

  const handleClick = () => {
    setVisible(true);
    Haptics.selectionAsync();
  };

  const openEvent = () => {
    setVisible(false);
    Haptics.selectionAsync();
    navigation.navigate('AddEvent' as never);
  };

  const openGame = () => {
    setVisible(false);
    Haptics.selectionAsync();
    navigation.navigate('AddGame' as never);
  };

  const renderToggleButton = (): React.ReactElement => (
    <View style={styles.button}>
      <AntDesign onPress={handleClick} name="plus" size={32} color="white"/>
    </View>
  );

  return (
    <Popover
      style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
      placement={'top'}
      backdropStyle={styles.backdrop}
      visible={visible}
      onBackdropPress={() => setVisible(false)}
      anchor={renderToggleButton}
    >
      <Layout style={styles.content}>
        <Button style={styles.box} size='large' onPress={openEvent}>
          Add Event
        </Button>
        <Button style={styles.box} size='large' onPress={openGame}>
          Add Game
        </Button>
      </Layout>
    </Popover>
  );
};

