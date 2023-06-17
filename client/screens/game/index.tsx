import { useGame } from '@/context/gameContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Layout, Text, useTheme } from '@ui-kitten/components';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

const Index = () => {
  const { game } = useGame();
  const navigation = useNavigation();
  const theme = useTheme();


  const navigateBack = () => {
    navigation.goBack();
    Haptics.selectionAsync();
  };

  return (
    game &&
    <Layout style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#0d0e19' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={navigateBack}>
          <Ionicons name="chevron-back" size={32} color={theme['color-primary-500']} onPress={navigateBack}/>
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text category='h5'>{game.name}</Text>
        </View>
      </View>
    </Layout>
  );
};

export default Index;