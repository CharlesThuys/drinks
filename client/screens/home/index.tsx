import { Layout, Text } from '@ui-kitten/components';
import { fetcher } from '../../utils/fetcher';
import { useState, useEffect } from 'react';
import { User } from '../../types/user';

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const data = await fetcher('users', 'get');
      setUsers(data.users);
    };

    getAllUsers();
  }, []);

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {users ? users.map(user => <Text key={user.id}>{user.name}</Text>) : <Text>No users</Text>}
    </Layout>
  );
};

export default Home;