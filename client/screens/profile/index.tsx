import { Layout, Text } from '@ui-kitten/components/ui';
import { View } from 'react-native';

const Profile = () => {
  return (
    <Layout style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#0d0e19' }}>
      <View style={{ marginLeft: 15, marginBottom: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text category='h5'>Profile</Text>
      </View>
    </Layout>
  );
};

export default Profile;