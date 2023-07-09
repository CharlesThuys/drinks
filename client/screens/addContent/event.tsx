import { Layout, Text, Input, Datepicker, InputProps, useTheme } from '@ui-kitten/components';
import { Button, Platform, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { fetcher } from '@/utils/fetcher';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const useInputState = (initialValue = ''): InputProps => {
  const [value, setValue] = useState(initialValue);
  return { value, onChangeText: setValue };
};

const AddEvent = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const [date, setDate] = useState(new Date());
  const nameInputState = useInputState();
  const descriptionInputState = useInputState();
  const locationInputState = useInputState();
  const pictureInputState = useInputState();

  const today = new Date();

  const submitEvent = async () => {
    const event = {
      name: nameInputState.value,
      description: descriptionInputState.value,
      date: date,
      location: locationInputState.value,
      picture: pictureInputState.value,
    };
    await fetcher('events', 'post', event);
    navigation.navigate('Events' as never);
  };

  const navigateBack = () => {
    navigation.goBack();
    if (Platform.OS === 'ios') Haptics.selectionAsync();
  };

  return (
    <Layout style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#0d0e19' }}>
      <View style={{ padding: 15, display: 'flex', flexDirection: 'column', gap: 10 }}>

        <View style={{ flexDirection: 'row', alignItems: 'center', 'marginBottom': 10 }}>
          <TouchableOpacity onPress={navigateBack}>
            <Ionicons name="chevron-back" size={32} color={theme['color-primary-500']} onPress={navigateBack}/>
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text category='h5'>Add event</Text>
          </View>
        </View>

        <Input placeholder='Name' {...nameInputState} />
        <Input placeholder='Description' {...descriptionInputState} />
        <Input placeholder='Location' {...locationInputState} />
        <Input placeholder='Picture URL' {...pictureInputState} />
        <Datepicker placeholder='Date' date={date} onSelect={nextDate => setDate(nextDate)} min={today}/>
        <Button title='Create event' onPress={submitEvent} />
      </View>
    </Layout>
  );
};
  
export default AddEvent;