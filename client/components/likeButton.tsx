import Animated, { useAnimatedStyle, interpolate, Extrapolate, withSpring, useSharedValue } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    backgroundColor: '#3E63F4',
    padding: 5,
  },
});


const LikeButton = ({ liked, onLike }: { liked: boolean, onLike: () => void }) => {
  const likedSping = useSharedValue(liked ? 1 : 0);
  
  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(likedSping.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: likedSping.value,
        },
      ],
      opacity: likedSping.value,
    };
  });


  return (
    <Pressable style={styles.button} onPress={() => {
      likedSping.value = withSpring(likedSping.value ? 0 : 1);
      onLike();
    }}>
      <View>
      <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
        <MaterialCommunityIcons
          name={'heart-outline'}
          size={25}
          color={'white'}
        />
      </Animated.View>

      <Animated.View style={fillStyle}>
        <MaterialCommunityIcons name={'heart'} size={25} color={'white'} />
      </Animated.View>
      </View>
    </Pressable>
      
  );
};

export default LikeButton;