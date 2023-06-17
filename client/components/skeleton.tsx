import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  cardEvent: {
    margin: 0,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    height: 200,
    borderRadius: 6,
    backgroundColor: '#191b2b',
  },
  cardGame: {
    margin: 0,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    height: 120,
    borderRadius: 6,
    backgroundColor: '#191b2b',
  },
});

export const EventSkeleton = () => {
  return (
    <View style={styles.cardEvent}>
      <ContentLoader backgroundColor='#0d0e19' foregroundColor='#191b2b'>
        <Rect x='10' y='17' rx='4' ry='4' width='250' height='13' />
        <Rect x='10' y='40' rx='3' ry='3' width='250' height='13' />
        <Circle cx="40" cy="150" r="30" />
        <Rect x='80' y='150' rx='3' ry='3' width='120' height='13' />
      </ContentLoader>
    </View>
  );
};

export const GameSkeleton = () => {
  return (
    <View style={styles.cardGame}>
      <ContentLoader backgroundColor='#0d0e19' foregroundColor='#191b2b'>
        <Rect x='10' y='17' rx='4' ry='4' width='100' height='13' />
        <Rect x='10' y='70' rx='3' ry='3' width='250' height='13' />
        <Rect x='10' y='95' rx='3' ry='3' width='250' height='13' />
      </ContentLoader>
    </View>
  );
};