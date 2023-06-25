import { Layout, Text, Input, Datepicker, InputProps } from '@ui-kitten/components';
import { Button, View } from 'react-native';
import { useState } from 'react';
import { fetcher } from '@/utils/fetcher';
import { useNavigation } from '@react-navigation/native';

const useInputState = (initialValue = ''): InputProps => {
  const [value, setValue] = useState(initialValue);
  return { value, onChangeText: setValue };
};

const AddEvent = () => {
  const nav = useNavigation();

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
    nav.goBack();
  };

  return (
    <Layout style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#0d0e19' }}>
      <View style={{ padding: 15, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Text category='h5'>Event</Text>
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