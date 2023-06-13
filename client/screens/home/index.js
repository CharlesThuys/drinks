import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { fetcher } from "../../utils/fetcher";
import { useState, useEffect } from "react";

const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Simulating an asynchronous API call
        const getAllUsers = async () => {
            const data = await fetcher("users", "get");
            setUsers(data.users);
        };
    
        // Call the fetchUsers function to retrieve the users
        getAllUsers();
      }, []);

    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {users ? users.map(user => <Text key={user.id}>{user.name}</Text>) : <Text>No users</Text>}
        </Layout>
    )
}

export default Home