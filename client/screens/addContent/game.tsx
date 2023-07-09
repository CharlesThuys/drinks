import { Layout, Text, Input, InputProps, List, ListItem, useTheme } from '@ui-kitten/components';
import { Button, Platform, TouchableOpacity, View } from 'react-native';
import { useRef, useState } from 'react';
import { fetcher } from '@/utils/fetcher';
import { useNavigation } from '@react-navigation/native';
import { Game } from '@/types/game';
import { FontAwesome } from '@expo/vector-icons'; 
import Stars from 'react-native-stars';
import { Ionicons } from '@expo/vector-icons'; 
import * as Haptics from 'expo-haptics';

const useInputState = (initialValue = ''): InputProps => {
  const [value, setValue] = useState(initialValue);
  return { value, onChangeText: setValue };
};

type Errors = {
  name?: string;
  description?: string;
  material?: string;
};

type MaterialList = {
  title: string;
};

const AddGame = () => {
  const scrollViewRef = useRef<any>();
  const navigation = useNavigation();
  const theme = useTheme();
  
  const nameInputState = useInputState();
  const descriptionInputState = useInputState();
  const [funCount, setFunCount] = useState<number>(1);
  const [drinkCount, setDrinkCount] = useState<number>(1);
  const [errors, setErrors] = useState<Errors>({ name: '', description: '', material: '' });
  const [materials, setMaterials] = useState<MaterialList[]>([{ title: '' }]);


  const addMaterialInput = () => {
    const newMaterials = [...materials];
    newMaterials.push({ title: '' });
    setMaterials(newMaterials);
  };

  const submitGame = async () => {
    setErrors({ name: '', description: '', material: '' });

    if (nameInputState.value === '' || nameInputState.value == undefined) {
      return setErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Name is required',
      }));
    }

    if (descriptionInputState.value === '' || descriptionInputState.value == undefined) {
      return setErrors((prevErrors) => ({
        ...prevErrors,
        description: 'Description is required',
      }));
    }

    const arrayMaterials = materials.map((material) => material.title);

    for (let material of arrayMaterials) {
      if (material === '' || material == undefined) {
        return setErrors((prevErrors) => ({
          ...prevErrors,
          material: 'Materials are required',
        }));
      }
    }


    const game: Game = {
      name: nameInputState.value,
      description: descriptionInputState.value,
      funFactor: funCount,
      drinkFactor: drinkCount, 
      materials: arrayMaterials,
    };

    await fetcher('games', 'post', game);
    navigation.navigate('Games' as never);
  };

  const renderMaterial = ({ item, index }: { item: { title: string }; index: number }) => {
    return (
      <ListItem style={{ backgroundColor: '#0d0e19', width: '100%', paddingRight: materials.length === 1 ? 0 : 30, paddingLeft: 0, display: 'flex', flexDirection: 'row', gap: 5 }}>
        { materials.length !== 1 && 
          <Ionicons name="remove-circle-outline" size={24} color="white" onPress={() => { 
            if (materials.length === 1) return;
            const newMaterials = [...materials];
            newMaterials.splice(index, 1);
            setMaterials(newMaterials);
          }}/>
        }
        <Input status={errors.material && ( item.title === '' || item.title == undefined) ? 'danger' : 'default'} value={item.title} style={{ width: '100%' }} placeholder='Material' onChangeText={(text) => {
          const newMaterials = [...materials];
          newMaterials[index] = { title: text };
          setMaterials(newMaterials);
        }
        } />
      </ListItem>
    );
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
            <Text category='h5'>Add game</Text>
          </View>
        </View>

        <Layout style={{ backgroundColor: '#0d0e19' }}>
        { errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text> }
        { errors.description && <Text style={{ color: 'red' }}>{errors.description}</Text> }
        { errors.material && <Text style={{ color: 'red' }}>{errors.material}</Text> }
      </Layout>
        <Input placeholder='Name' {...nameInputState} status={errors.name ? 'danger' : 'default'}/>
        <Input placeholder='Description' {...descriptionInputState} status={errors.description ? 'danger' : 'default'}/>
        <Layout style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#0d0e19', padding: 5 }}>
          <Text category='s1'>Fun factor</Text>
          <Stars
          half={false}
          default={1}
          update={setFunCount}
          spacing={4}
          count={5}
          fullStar={<FontAwesome name="star" size={26} color="yellow" />}
          emptyStar={<FontAwesome name="star-o" size={26} color="yellow" />}
          halfStar={<FontAwesome name="star-half-empty" size={26} color="yellow" />}/>
        </Layout>
        <Layout style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#0d0e19', padding: 5 }}>
          <Text category='s1'>Drink factor</Text>
          <Stars
          half={false}
          default={1}
          update={setDrinkCount}
          spacing={4}
          count={5}
          fullStar={<FontAwesome name="star" size={26} color="yellow" />}
          emptyStar={<FontAwesome name="star-o" size={26} color="yellow" />}
          halfStar={<FontAwesome name="star-half-empty" size={26} color="yellow" />}/>
        </Layout>

        <List
          ref={scrollViewRef}
          onContentSizeChange={() => { scrollViewRef.current.scrollToEnd({ animated: true });}}
          style={{ maxHeight: 200, backgroundColor: '#0d0e19' }}
          data={materials}
          renderItem={renderMaterial}
        />

        <Button title='Add material' onPress={addMaterialInput} />
        <Button title='Create game' onPress={submitGame} />
      </View>
    </Layout>
  );
};
  
export default AddGame;