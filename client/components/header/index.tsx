import { View, StyleSheet } from 'react-native';
import Profile from './profile';
import { useHeader } from '@/context/headerContext';
import { AddContent } from './addContent';

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#0d0e19',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 25,
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

const Index = () => {
  const { content } = useHeader();


  return (
    <View style={styles.container}>
      {content}
      <View style={styles.rightContainer}>
        <AddContent />
        <Profile />
      </View>
    </View>
  );
};



export default Index;